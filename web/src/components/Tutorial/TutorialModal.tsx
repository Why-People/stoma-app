import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/modal";
import React, { RefObject } from "react";
import { useCloseTutorial } from "./hooks/useCloseTutorial";
import { TutorialBody } from "./TutorialBody";
import { TutorialFooter } from "./TutorialFooter";

interface TutorialModalProps {
  isOpen: boolean;
  onClose: () => void;
  closeRef: RefObject<any> | undefined;
}

export const TutorialModal: React.FC<TutorialModalProps> = ({
  isOpen,
  onClose,
  closeRef,
}: TutorialModalProps) => {
  const closeTutorial = useCloseTutorial(onClose);

  return (
    <Modal
      finalFocusRef={closeRef}
      isOpen={isOpen}
      onClose={closeTutorial}
      size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>How It Works</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <TutorialBody />
        </ModalBody>
        <ModalFooter>
          <TutorialFooter onClose={closeTutorial} />
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
