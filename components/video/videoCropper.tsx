  "use client"
  import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
  import { FFmpeg } from "@ffmpeg/ffmpeg"
  import { fetchFile } from "@ffmpeg/util"

  import CropBox from "@/components/cropBox/CropBox";
import { Crop, VideoSize } from "@/types/clips";
import { getDisplayedVideoRect } from "@/lib/functions/videoCrop";

  interface Props {
    videoUrl: string;
    title: string;
  }

  const VideoCropper = forwardRef(({ videoUrl, title }: Props, ref) => {
    const [ready, setReady] = useState<boolean>(false);
    const [cssVideoSize, setCssVideoSize] = useState<VideoSize>({ width: 0, height: 0 });
    const [crop, setCrop] = useState<Crop>({ width: 200, height: 200, x: 0, y: 0 });

    const videoRef = useRef<HTMLVideoElement>(null);
    const videoContainerRef = useRef<HTMLDivElement>(null);
    const ffmpegRef = useRef(new FFmpeg());

    const onLoadedMetadata = () => {
      if(!videoRef.current || !videoContainerRef.current) return;
      const rect = videoContainerRef.current.getBoundingClientRect();
      setCssVideoSize({ width: rect.width, height: rect.height });
    }

    const cropVideo = async () => {
      const ffmpeg = ffmpegRef.current;
      if(!ready) return;

      ffmpeg.writeFile("input.mp4", await fetchFile(videoUrl));

      const { videoWidth, videoHeight, videoOffsetX, videoOffsetY } = getDisplayedVideoRect(videoRef.current!, videoContainerRef.current!);

      const video = videoRef.current!;
      const scaleX = video.videoWidth / videoWidth;
      const scaleY = video.videoHeight / videoHeight;

      const cx = Math.ceil(crop.x - videoOffsetX) * videoOffsetX;
      const cy = Math.ceil(crop.y - videoOffsetY) * videoOffsetY;
      const cw = Math.ceil(crop.width * scaleX);
      const ch = Math.ceil(crop.height * scaleY);

      await ffmpeg.exec([
        "-i", "input.mp4",
        "-vf", `crop=${cw}:${ch}:${cx}:${cy}`,
        "-c:a", "copy",
        "output.mp4"
      ]);

      const data = await ffmpeg.readFile("output.mp4");
      const bytes = new Uint8Array(data.length);
      bytes.set(data as Uint8Array);
      const url = URL.createObjectURL(new Blob([bytes], { type: "video/mp4" }));
      Object.assign(document.createElement('a'), { href: url, style: 'display:none', download:  `${title}_cropped.mp4` }).click();
    }

    useImperativeHandle(ref, () => ({
      cropVideo
    }));

    useEffect(() => {
      if (videoContainerRef.current) {
        setCssVideoSize({ width: videoContainerRef.current.clientWidth, height: videoContainerRef.current.clientHeight });
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
        <CropBox crop={crop} setCrop={setCrop} videoWidth={cssVideoSize.width} videoHeight={cssVideoSize.height} />
      </div>
    );
  });

  export default VideoCropper;