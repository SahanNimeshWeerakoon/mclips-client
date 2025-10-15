"use client";

import { useRef } from "react";
import { Link } from "@heroui/link";
import { DownloadIcon } from "@/components/icons";
import { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@heroui/modal";
import { Button } from "@heroui/button";
import VideoCropper from "./videoCropper";

interface VideoProps {
  src: string;        // video file URL
  thumbnail: string;  // thumbnail image URL
  title: string;
}

export const Video = ({ src, thumbnail, title }: VideoProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);

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

        <Modal isOpen={isOpen} size="full" onOpenChange={setIsOpen} backdrop="blur">
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  {title}
                </ModalHeader>

                <ModalBody>
                  <VideoCropper videoUrl={`${process.env.NEXT_PUBLIC_API_URL}/clips/proxy?blobName=${src}`} />
                </ModalBody>

                <ModalFooter>
                  <Button color="secondary" variant="light" onPress={onClose}>
                    Close
                  </Button>
                  <Button color="primary" onPress={close}>
                    Confirm
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      </div>
    </>
  );
};