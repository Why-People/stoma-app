import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/modal";
import React from "react";
import { TutorialBody } from "./TutorialBody";
import { TutorialFooter } from "./TutorialFooter";

interface TutorialModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TutorialModal: React.FC<TutorialModalProps> = ({
  isOpen,
  onClose,
}: TutorialModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>How It Works</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <TutorialBody />
        </ModalBody>
        <ModalFooter>
          <TutorialFooter onClose={onClose} />
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
