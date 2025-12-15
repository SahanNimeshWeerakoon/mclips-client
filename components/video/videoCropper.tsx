  "use client"
  import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
  import CropBox from "@/components/cropBox/CropBox";
  import { FFmpeg } from "@ffmpeg/ffmpeg"
  import { fetchFile } from "@ffmpeg/util"
import { Crop, VideoSize } from "@/types/clips";

  interface Props {
    videoUrl: string;
  }

  // const ffmpeg = new FFmpeg.createFFmpeg();

  const VideoCropper = forwardRef(({ videoUrl }: Props, ref) => {
    const [ready, setReady] = useState<boolean>(false);
    const [videoSize, setVideoSize] = useState<VideoSize>({ width: 0, height: 0 });
    const [crop, setCrop] = useState<Crop>({ width: 200, height: 200, x: 0, y: 0 });
    const [outputUrl, setOutputUrl] = useState<string | null>(null);

    const videoRef = useRef<HTMLVideoElement>(null);
    const videoContainerRef = useRef<HTMLDivElement>(null);
    const ffmpegRef = useRef(new FFmpeg());

    const onLoadedMetadata = () => {
      if(!videoRef.current || !videoContainerRef.current) return;
      const rect = videoContainerRef.current.getBoundingClientRect();
      setVideoSize({ width: rect.width, height: rect.height });
    }

    const cropVideo = async () => {
      console.log("Crop my ass");
      const ffmpeg = ffmpegRef.current;
      if(!ready) return;

      ffmpeg.writeFile("input.mp4", await fetchFile(videoUrl));

      const video = videoRef.current!;
      const scaleX = video.videoWidth / videoSize.width;
      const scaleY = video.videoHeight / videoSize.height;

      const cx = Math.round(crop.x * scaleX);
      const cy = Math.round(crop.y * scaleY);
      const cw = Math.round(crop.width * scaleX);
      const ch = Math.round(crop.height * scaleY);

      await ffmpeg.exec([
        "-i", "input.mp4",
        "-vf", `crop=${cw}:${ch}:${cx}:${cy}`,
        "-c:a", "copy",
        "output.mp4"
      ]);

      const data = await ffmpeg.readFile("output.mp4");
      // const bytes = new Uint8Array(data);
      // const url = URL.createObjectURL(new Blob([data], { type: "video/mp4" }));
      console.log(data);
    }

    useImperativeHandle(ref, () => ({
      cropVideo
    }));

    useEffect(() => {
      if (videoContainerRef.current) {
        setVideoSize({ width: videoContainerRef.current.clientWidth, height: videoContainerRef.current.clientHeight });
      }

      const load = async () => {
        const ffmpeg = ffmpegRef.current;
        if(!ffmpeg.loaded) {
          await ffmpeg.load({
            coreURL: "/ffmpeg/ffmpeg-core.js",
            wasmURL: "/ffmpeg/ffmpeg-core.wasm"
          });
          setReady(true);
        }
      }
      load();
    }, []);

    return (
      <div className="cropper relative h-full overflow-hidden" ref={videoContainerRef}>
        <video
          ref={videoRef}
          src={videoUrl}
          className="w-full h-full"
          onLoadedMetadata={onLoadedMetadata}
        />
        <div className="overlay"></div>
        <CropBox videoWidth={videoSize.width} videoHeight={videoSize.height} />
      </div>
    );
  });

  export default VideoCropper;

  // export default function VideoCroppper({ videoUrl }: Props) {
    
  // } 