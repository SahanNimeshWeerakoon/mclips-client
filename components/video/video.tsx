"use client";

import { useRef } from "react";
import { Link } from "@heroui/link";
import { DownloadIcon } from "@/components/icons";
import { useState, useEffect } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@heroui/modal";
import { Button } from "@heroui/button";
import VideoCropper from "./VideoCropper";
import CropRatios from "../cropBox/CropRatios";
import { VideoCropperHandle } from "@/types/clips";

interface VideoProps {
  src: string;        // video file URL
  thumbnail: string;  // thumbnail image URL
  title: string;
}

export const Video = ({ src, thumbnail, title }: VideoProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const videoCropperRef = useRef<VideoCropperHandle>(null);
  const [outputUrl, setOutputUrl] = useState<string | null>(null);

  const [isOpen, setIsOpen] = useState(false);

  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);

  const handleMouseEnter = () => {
    videoRef.current?.play();
  };

  const handleMouseLeave = () => {
    videoRef.current?.pause();
    videoRef.current!.currentTime = 0; // reset to start
  };

  useEffect(() => {console.log({outputUrl});}, [outputUrl]);

  return (
    <>
      <div className="flex flex-col w-64">
        <a
          href="#"
          onClick={open}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className="relative w-full h-36 overflow-hidden rounded-lg cursor-pointer"
        >
          <video
            ref={videoRef}
            src={src}
            poster={thumbnail}
            className="w-full h-full object-cover"
            muted
            loop
          />
        </a>
        <div className="flex items-center justify-between">
          <p className="mt-2 text-center font-medium">{title}</p>
          <Link>
              <DownloadIcon className="w-5 h-5" />
          </Link>
        </div>

        <Modal isOpen={isOpen} size="full"
        // classNames={{base: ['w-[75%] max-w-full'], backdrop: ['bg-black/50']}}
        onOpenChange={setIsOpen} backdrop="blur">
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1 font-bold">
                  {title}
                </ModalHeader>

                <ModalBody className="p-0">
                  <div className="w-full h-[80vh] overflow-y-scroll">
                    <VideoCropper title={title} ref={videoCropperRef} videoUrl="/video.mp4" />
                  </div>
                </ModalBody>

                <ModalFooter>
                  <div className="flex justify-between w-full p-10">
                    <CropRatios />
                    <Button color="primary" onPress={() => {videoCropperRef.current?.cropVideo()}}>
                      Download
                    </Button>
                  </div>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      </div>
    </>
  );
};