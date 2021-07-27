import { useDisclosure } from "@chakra-ui/react";

export const useCloseTutorial = (onClose: () => void) => {
  const { onClose: onTutorialClose } = useDisclosure();

  const closeTutorial = () => {
    onClose();
    onTutorialClose();
  };

  return closeTutorial;
};
