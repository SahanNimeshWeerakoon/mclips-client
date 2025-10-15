import { FFmpeg } from '@ffmpeg/ffmpeg';
import { fetchFile } from '@ffmpeg/util';
import React, { useState, useRef, useEffect } from 'react';
import { Download, Crop, Play, Pause } from 'lucide-react';

export default function VideoCropper({videoUrl}: {videoUrl: string }) {
  // const [videoUrl, setVideoUrl] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  const [cropArea, setCropArea] = useState({ x: 50, y: 50, width: 300, height: 200 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragType, setDragType] = useState<any>(null);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [isProcessing, setIsProcessing] = useState(false);
  
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const containerRef = useRef(null);

  const handleVideoLoad = () => {
    const video: any = videoRef.current;
    const canvas: any = canvasRef.current;
    if (video && canvas) {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
    }
  };

  const drawCanvas = () => {
    const video: any = videoRef.current;
    const canvas: any = canvasRef.current;
    if (!video || !canvas) return;

    const ctx = canvas.getContext('2d');
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    // Draw crop area overlay
    ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.clearRect(cropArea.x, cropArea.y, cropArea.width, cropArea.height);

    // Draw crop box border
    ctx.strokeStyle = '#3b82f6';
    ctx.lineWidth = 2;
    ctx.strokeRect(cropArea.x, cropArea.y, cropArea.width, cropArea.height);

    // Draw corner handles
    const handleSize = 10;
    ctx.fillStyle = '#3b82f6';
    const corners = [
      { x: cropArea.x, y: cropArea.y },
      { x: cropArea.x + cropArea.width, y: cropArea.y },
      { x: cropArea.x, y: cropArea.y + cropArea.height },
      { x: cropArea.x + cropArea.width, y: cropArea.y + cropArea.height }
    ];
    corners.forEach(corner => {
      ctx.fillRect(corner.x - handleSize/2, corner.y - handleSize/2, handleSize, handleSize);
    });

    if (isPlaying) {
      requestAnimationFrame(drawCanvas);
    }
  };

  useEffect(() => {
    if (videoRef.current) {
      drawCanvas();
    }
  }, [cropArea, isPlaying]);

  const togglePlay = () => {
    const video: any = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.pause();
    } else {
      video.play();
      drawCanvas();
    }
    setIsPlaying(!isPlaying);
  };

  const getMousePos = (e: any) => {
    const canvas: any = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    return {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY
    };
  };

  const handleMouseDown = (e: any) => {
    const pos = getMousePos(e);
    const handleSize = 10;

    // Check corners for resize
    const corners: any = [
      { type: 'tl', x: cropArea.x, y: cropArea.y },
      { type: 'tr', x: cropArea.x + cropArea.width, y: cropArea.y },
      { type: 'bl', x: cropArea.x, y: cropArea.y + cropArea.height },
      { type: 'br', x: cropArea.x + cropArea.width, y: cropArea.y + cropArea.height }
    ];

    for (let corner of corners) {
      if (Math.abs(pos.x - corner.x) < handleSize && Math.abs(pos.y - corner.y) < handleSize) {
        setIsDragging(true);
        setDragType(corner.type);
        setDragStart(pos);
        return;
      }
    }

    // Check if inside crop area for moving
    if (pos.x >= cropArea.x && pos.x <= cropArea.x + cropArea.width &&
        pos.y >= cropArea.y && pos.y <= cropArea.y + cropArea.height) {
      setIsDragging(true);
      setDragType('move');
      setDragStart(pos);
    }
  };

  const handleMouseMove = (e: any) => {
    if (!isDragging) return;

    const pos = getMousePos(e);
    const dx = pos.x - dragStart.x;
    const dy = pos.y - dragStart.y;

    const canvas: any = canvasRef.current;
    let newCrop = { ...cropArea };

    if (dragType === 'move') {
      newCrop.x = Math.max(0, Math.min(canvas.width - cropArea.width, cropArea.x + dx));
      newCrop.y = Math.max(0, Math.min(canvas.height - cropArea.height, cropArea.y + dy));
    } else if (dragType === 'tl') {
      const newWidth = cropArea.width - dx;
      const newHeight = cropArea.height - dy;
      if (newWidth > 50 && newHeight > 50) {
        newCrop.x = cropArea.x + dx;
        newCrop.y = cropArea.y + dy;
        newCrop.width = newWidth;
        newCrop.height = newHeight;
      }
    } else if (dragType === 'tr') {
      const newWidth = cropArea.width + dx;
      const newHeight = cropArea.height - dy;
      if (newWidth > 50 && newHeight > 50) {
        newCrop.y = cropArea.y + dy;
        newCrop.width = newWidth;
        newCrop.height = newHeight;
      }
    } else if (dragType === 'bl') {
      const newWidth = cropArea.width - dx;
      const newHeight = cropArea.height + dy;
      if (newWidth > 50 && newHeight > 50) {
        newCrop.x = cropArea.x + dx;
        newCrop.width = newWidth;
        newCrop.height = newHeight;
      }
    } else if (dragType === 'br') {
      const newWidth = cropArea.width + dx;
      const newHeight = cropArea.height + dy;
      if (newWidth > 50 && newHeight > 50) {
        newCrop.width = newWidth;
        newCrop.height = newHeight;
      }
    }

    setCropArea(newCrop);
    setDragStart(pos);
    drawCanvas();
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setDragType(null);
  };

  const downloadCroppedVideo = async () => {
    setIsProcessing(true);
    const video = videoRef.current;
    
    try {
      const ffmpeg = new FFmpeg();
      await ffmpeg.load();
      
      // Fetch video from URL
      await ffmpeg.writeFile('input.mp4', await fetchFile(videoUrl));
      
      // Apply crop filter
      await ffmpeg.exec([
        '-i', 'input.mp4',
        '-vf', `crop=${cropArea.width}:${cropArea.height}:${cropArea.x}:${cropArea.y}`,
        '-c:a', 'copy',
        'output.mp4'
      ]);
      
      // Download result
      const data: any = await ffmpeg.readFile('output.mp4');
      const blob = new Blob([data.buffer], { type: 'video/mp4' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'cropped-video.mp4';
      a.click();
      
    } catch (error) {
      console.error('Error processing video:', error);
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
          <Crop className="w-8 h-8" />
          Video Cropper
        </h1>

        {videoUrl && (
          <div className="bg-gray-800 rounded-lg p-6">
            <div ref={containerRef} className="relative inline-block">
              <video
                ref={videoRef}
                src={videoUrl}
                onLoadedMetadata={handleVideoLoad}
                crossOrigin="anonymous"
                className="hidden"
              />
              <canvas
                ref={canvasRef}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
                className="max-w-full border border-gray-700 cursor-crosshair"
              />
            </div>

            <div className="flex gap-4 mt-6">
              <button
                onClick={togglePlay}
                className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
              >
                {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                {isPlaying ? 'Pause' : 'Play'}
              </button>

              <button
                onClick={downloadCroppedVideo}
                disabled={isProcessing}
                className="flex items-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-700 disabled:bg-gray-600 text-white rounded-lg transition-colors"
              >
                <Download className="w-5 h-5" />
                {isProcessing ? 'Processing...' : 'Download Cropped Video'}
              </button>
            </div>

            <div className="mt-6 p-4 bg-gray-700 rounded-lg">
              <h3 className="text-white font-semibold mb-2">Crop Settings:</h3>
              <div className="grid grid-cols-2 gap-4 text-gray-300 text-sm">
                <div>X: {Math.round(cropArea.x)}px</div>
                <div>Y: {Math.round(cropArea.y)}px</div>
                <div>Width: {Math.round(cropArea.width)}px</div>
                <div>Height: {Math.round(cropArea.height)}px</div>
              </div>
            </div>

            <div className="mt-4 p-4 bg-yellow-900/30 border border-yellow-600 rounded-lg">
              <p className="text-yellow-200 text-sm">
                <strong>Note:</strong> This demo downloads a single frame. For full video processing, you'll need to integrate FFmpeg.wasm to process the entire video with the crop filter.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}