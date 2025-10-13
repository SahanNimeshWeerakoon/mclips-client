"use client";

import { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@heroui/modal";
import { Button } from "@heroui/button"; // HeroUI also exports Button

export default function ExampleModal() {
  const [isOpen, setIsOpen] = useState(false);

  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);

  return (
    <>
      <Button color="primary" onPress={open}>
        Open Modal
      </Button>

      <Modal isOpen={isOpen} size="full" onOpenChange={setIsOpen} backdrop="blur">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                HeroUI Modal
              </ModalHeader>

              <ModalBody>
                <p>
                  This modal is built using <strong>@heroui/modal</strong>. It
                  supports transitions, backdrops, and responsive design out of
                  the box.
                </p>
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
    </>
  );
}