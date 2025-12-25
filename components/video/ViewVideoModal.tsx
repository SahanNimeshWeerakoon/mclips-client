"use client"

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@heroui/modal";
import { useRef, useState, useEffect } from "react";
import { Button } from "@heroui/button";

import VideoCropper from "./VideoCropper";
import CropRatios from "../cropBox/CropRatios";
import { VideoCropperHandle } from "@/types/videos";


interface Props {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    title: string;
}

const ViewVideoModal = ({ isOpen, setIsOpen, title}: Props) => {
    
    const videoCropperRef = useRef<VideoCropperHandle>(null);
    
    return (
        <Modal isOpen={isOpen} size="full"
        onOpenChange={setIsOpen} backdrop="blur">
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1 font-bold">
                  {title}
                </ModalHeader>

                <ModalBody className="p-0">
                  <div className="w-full h-[80vh] overflow-y-scroll">
                    <VideoCropper title={title} ref={videoCropperRef} />
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
    );
}

export default ViewVideoModal;