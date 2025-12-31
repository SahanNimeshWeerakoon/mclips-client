"use client";

import { useState, useEffect } from "react";
import ViewVideoModal from "./ViewVideoModal";
import DownloadIcon from "./DownloadIcon";

import { useAppDispatch } from "@/store/hooks";
import { setSelectedVideoSrc } from "@/store/slices/videoSlice";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

interface VideoProps {
  title: string;
  videoKey: string;
  thumbnail: string;  // thumbnail image URL
}

export const Video = ({ thumbnail, title, videoKey }: VideoProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const { selectedVideoSrc } = useSelector((state: RootState) => state.video);
  const dispatch = useAppDispatch();

  const fetchSignedUrl = async (selectedVideoKey: string) => {
    if(selectedVideoKey) {
      const res = await fetch(`/api/video/download?key=${selectedVideoKey}&title=${title}`);
      const resData = await res.json();
      dispatch(setSelectedVideoSrc(resData.data));
    }
  }

  const handleVideoClick = (key: string) => {
    fetchSignedUrl(key);
    open();
  }
  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);

  return (
    <>
      <div className="flex flex-col w-64">
        <a
          href="#"
          onClick={() => handleVideoClick(videoKey)}
          className="relative w-full h-36 overflow-hidden rounded-lg cursor-pointer"
        >
          { selectedVideoSrc ?? (
            <video
              loop
              muted
              autoPlay
              src={selectedVideoSrc}
              playsInline
              className="w-full h-full object-cover"
            />
          ) }
        </a>
        <div className="flex items-center justify-between">
          <p className="mt-2 text-center font-medium">{title}</p>
          <DownloadIcon videoKey={videoKey} title={title} />
        </div>
        <ViewVideoModal isOpen={isOpen} setIsOpen={setIsOpen} title={title} />
      </div>
    </>
  );
};