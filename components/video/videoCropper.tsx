"use client"
import { useState } from "react";

interface Props {
  videoUrl: string;
}

export default function VideoCroppper({ videoUrl }: Props) {
  const [croppedVideoUrl, setCroppedVideoUrl] = useState<string | null>(null);

  return (
    <div className="w-full h-full relative">
      <div className="absolute top-0 bottom-0 left-0 right-0 bg-secondary/50 z-20">
        <div className="border border-2 overflow-hidden w-full h-full">
          <video src={videoUrl} />
        </div>
      </div>
      <video
        // controls
        src={videoUrl}
        className="w-full h-full object-contain relative z-10"
      />
    </div>
  );
} 