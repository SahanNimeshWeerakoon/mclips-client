"use client";

import { useRef } from "react";
import { useState } from "react";
import { VideoCropperHandle } from "@/types/videos";
import ViewVideoModal from "./ViewVideoModal";

interface VideoProps {
  src: string;        // video file URL
  thumbnail: string;  // thumbnail image URL
  title: string;
}

export const Video = ({ src, thumbnail, title }: VideoProps) => {
  
  const [isOpen, setIsOpen] = useState(false);

  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);

  return (
    <>
      <div className="flex flex-col w-64">
        <a
          href="#"
          onClick={open}
          className="relative w-full h-36 overflow-hidden rounded-lg cursor-pointer"
        >
          <video
            muted
            autoPlay
            playsInline
            loop
            src={src}
            className="w-full h-full object-cover"
          />
        </a>
        <div className="flex items-center justify-between">
          <p className="mt-2 text-center font-medium">{title}</p>
        </div>
        <ViewVideoModal isOpen={isOpen} setIsOpen={setIsOpen} title={title} />
      </div>
    </>
  );
};