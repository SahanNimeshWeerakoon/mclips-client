"use client"
import { useEffect, useRef, useState } from "react";
import CropBox from "@/components/cropBox/CropBox";

interface Props {
  videoUrl: string;
}

export default function VideoCroppper({ videoUrl }: Props) {
  const [croppedVideoUrl, setCroppedVideoUrl] = useState<string | null>(null);
  const [videoHeight, setVideoHeight] = useState<number>(0);
  const [videoWidth, setVideoWidth] = useState<number>(0);

  const videoContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (videoContainerRef.current) {
      console.log(videoContainerRef.current);
      setVideoHeight(videoContainerRef.current.clientHeight);
      setVideoWidth(videoContainerRef.current.clientWidth);
    }
  }, []);

  return (
      <div className="cropper relative h-full overflow-hidden" ref={videoContainerRef}>
        <video
          src={videoUrl}
          className="w-full h-full"
        />
        <div className="overlay"></div>
        <CropBox videoWidth={videoWidth} videoHeight={videoHeight} />
      </div>
  );
} 