"use client";

import { useRef, useState } from "react";
import { FFmpeg } from "@ffmpeg/ffmpeg";
import { fetchFile } from "@ffmpeg/util";

interface VideoCropperProps {
  videoUrl: string; // source video URL passed in as prop
}

export default function VideoCropper({ videoUrl }: VideoCropperProps) {
  const [processing, setProcessing] = useState(false);
  const [outputUrl, setOutputUrl] = useState<string | null>(null);

  // persistent ffmpeg instance
  const ffmpegRef = useRef<FFmpeg | null>(null);
  if (!ffmpegRef.current) {
    ffmpegRef.current = new FFmpeg();
    ffmpegRef.current.on("log", ({ message }) => console.log(message));
  }
  const ffmpeg = ffmpegRef.current;

  const cropAndDownload = async () => {
    setProcessing(true);

    if (!ffmpeg.loaded) {
      await ffmpeg.load();
    }

    // fetchFile works with URLs and returns Uint8Array
    await ffmpeg.writeFile("input.mp4", await fetchFile(videoUrl));

    // crop: 1:2 ratio (center crop)
    await ffmpeg.exec([
      "-i",
      "input.mp4",
      "-vf",
      "crop=iw:iw*2",
      "-c:a",
      "copy",
      "output.mp4",
    ]);

    const data = (await ffmpeg.readFile("output.mp4")) as Uint8Array;

    const url = URL.createObjectURL(
    new Blob([new Uint8Array(data)], { type: "video/mp4" })
    );
    
    setOutputUrl(url);

    setProcessing(false);
  };

  return (
    <div className="space-y-4">
      {/* original video */}
      <video src={videoUrl} controls className="max-w-md" />

      <button
        onClick={cropAndDownload}
        disabled={processing}
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        {processing ? "Processing..." : "Crop & Download"}
      </button>

      {outputUrl && (
        <a
          href={outputUrl}
          download="cropped-video.mp4"
          className="px-4 py-2 bg-green-500 text-white rounded inline-block"
        >
          Download Cropped Video
        </a>
      )}
    </div>
  );
}