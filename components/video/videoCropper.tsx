"use client"
import { useState } from "react";
import CropBox from "@/components/cropBox/CropBox";

interface Props {
  videoUrl: string;
}

export default function VideoCroppper({ videoUrl }: Props) {
  const [croppedVideoUrl, setCroppedVideoUrl] = useState<string | null>(null);

  return (
      <div className="cropper relative h-full overflow-hidden">
        {/* <img src="/dark-background.jpg" /> */}
        <video
          // controls
          src={videoUrl}
          className="w-full h-full"
        />

        <div className="overlay"></div>

        <CropBox>
          <div className="w-full h-full border shadow-[0_0_0_9999px_rgba(0,0,0,0.25)]">test</div>
        </CropBox>
      </div>
  );
} 