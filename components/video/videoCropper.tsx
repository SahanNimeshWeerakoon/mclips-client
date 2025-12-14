"use client"
import { useEffect, useRef, useState } from "react";
import CropBox from "@/components/cropBox/CropBox";

interface Props {
  videoUrl: string;
}

export default function VideoCroppper({ videoUrl }: Props) {
  const [croppedVideoUrl, setCroppedVideoUrl] = useState<string | null>(null);
  const [videoHeight, setVideoHeight] = useState<number>(0);

  const videoContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (videoContainerRef.current) {
      console.log(videoContainerRef.current);
      setVideoHeight(videoContainerRef.current.clientHeight);
    }
  }, []);

  return (
      <div className="cropper relative h-full overflow-hidden" ref={videoContainerRef}>
        {/* <img src="/dark-background.jpg" /> */}
        <video
          // controls
          src={videoUrl}
          className="w-full h-full"
        />

        <div className="overlay"></div>

        <CropBox videoHeight={videoHeight} />
      </div>
  );
} 