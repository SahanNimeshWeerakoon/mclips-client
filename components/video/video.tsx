"use client";

import { useRef } from "react";
import { Link } from "@heroui/link";
import { DownloadIcon } from "@/components/icons";

interface VideoProps {
  src: string;        // video file URL
  thumbnail: string;  // thumbnail image URL
  title: string;
}

export const Video = ({ src, thumbnail, title }: VideoProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleMouseEnter = () => {
    videoRef.current?.play();
  };

  const handleMouseLeave = () => {
    videoRef.current?.pause();
    videoRef.current!.currentTime = 0; // reset to start
  };

  return (
    <div className="flex flex-col w-64">
      <div
        className="relative w-full h-36 overflow-hidden rounded-lg cursor-pointer"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <video
          ref={videoRef}
          src={src}
          poster={thumbnail}
          className="w-full h-full object-cover"
          muted
          loop
        />
      </div>
      <div className="flex items-center justify-between">
        <p className="mt-2 text-center font-medium">{title}</p>
        <Link>
            <DownloadIcon className="w-5 h-5" />
        </Link>
      </div>
    </div>
  );
};