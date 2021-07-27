import { Button } from "@chakra-ui/button";
import { useDisclosure } from "@chakra-ui/hooks";
import { ArrowBackIcon, ArrowForwardIcon } from "@chakra-ui/icons";
import { Flex, Text } from "@chakra-ui/layout";
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/modal";
import { Progress } from "@chakra-ui/progress";
import { IconButton, ScaleFade, Stack } from "@chakra-ui/react";
import React, { useState } from "react";

interface TutorialModalProps {
  isOpen: boolean;
  onClose: () => void;
  closeRef: any;
}

export const TutorialModal: React.FC<TutorialModalProps> = ({
  isOpen,
  onClose,
  closeRef,
}: TutorialModalProps) => {
  const { onClose: onTutorialClose } = useDisclosure();
  const [progress, setProgress] = useState(1);

  const closeTutorial = () => {
    console.log("closed");
    onClose();
    onTutorialClose();
  };

  const handleValueChange = (up: boolean) => {
    if ((progress === 1 && !up) || (progress === 3 && up)) return;
    setProgress(progress + (up ? 1 : -1));
  };

  return (
    <Modal
      finalFocusRef={closeRef}
      isOpen={isOpen}
      onClose={closeTutorial}
      size="xl"
      isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>How It Works</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <Stack direction="column">
            <Flex justify="space-between">
              <ScaleFade in={progress > 1}>
                <IconButton
                  colorScheme="blue"
                  variant="ghost"
                  aria-label="back"
                  icon={<ArrowBackIcon w="32px" h="32px" />}
                  onClick={() => handleValueChange(false)}
                  cursor={progress === 1 ? "default" : "pointer"}
                />
              </ScaleFade>
              <ScaleFade in={progress < 3}>
                <IconButton
                  colorScheme="blue"
                  variant="ghost"
                  aria-label="forward"
                  icon={<ArrowForwardIcon w="32px" h="32px" />}
                  onClick={() => handleValueChange(true)}
                  cursor={progress === 3 ? "default" : "pointer"}
                />
              </ScaleFade>
            </Flex>
            {progress === 1 && (
              <Stack direction="column">
                <Text>
                  First, input the location you want to find places to eat in.
                </Text>
              </Stack>
            )}
            {progress === 2 && (
              <Stack direction="column">
                <Text>
                  Then we'll select a restaurant for you, if you don't like it,
                  click next.
                </Text>
              </Stack>
            )}
            {progress === 3 && (
              <Stack direction="column">
                <Text>
                  If you want to see your previous results, click the menu
                  below.
                </Text>
              </Stack>
            )}
            <Progress
              aria-valuenow={(progress * 10) / 100}
              colorScheme="blue"
              borderRadius="5px"
              value={progress * 33.5}
            />
          </Stack>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" onClick={closeTutorial}>
            {progress === 3 ? "Start Searching" : "Cancel"}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
