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
    const [videoSize, setVideoSize] = useState<VideoSize>({ width: 0, height: 0 });
    const [crop, setCrop] = useState<Crop>({ width: 200, height: 200, x: 0, y: 0 });

    const videoRef = useRef<HTMLVideoElement>(null);
    const videoContainerRef = useRef<HTMLDivElement>(null);
    const ffmpegRef = useRef(new FFmpeg());

    const onLoadedMetadata = () => {
      if(!videoRef.current) return;
      const rect = videoRef.current.getBoundingClientRect();
      setVideoSize({ width: rect.width, height: rect.height });
    }

    const cropVideo = async () => {
      const ffmpeg = ffmpegRef.current;
      if(!ready) return;

      ffmpeg.writeFile("input.mp4", await fetchFile(videoUrl));

      const video = videoRef.current!;
      const Kw = video.videoWidth / video.clientWidth;  // width video ratio (actual video width / displayed width)
      const Kh = video.videoHeight / video.clientHeight;  // height video ratio (actual video height / displayed height)
      const { videoOffsetX, videoOffsetY } = getDisplayedVideoRect(video, videoContainerRef.current!);

      const cw = Kw * crop.width;
      const ch = Kh * crop.height;
      const cx = Kw * crop.x - videoOffsetX;
      const cy = Kh * crop.y - videoOffsetY;

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
          className="max-w-full max-h-full mx-auto my-auto object-contain"
          onLoadedMetadata={onLoadedMetadata}
        />
        <div className="overlay"></div>
        <CropBox crop={crop} setCrop={setCrop} videoWidth={videoSize.width} videoHeight={videoSize.height} />
      </div>
    );
  });

  export default VideoCropper;