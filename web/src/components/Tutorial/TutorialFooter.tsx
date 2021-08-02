import { Button } from "@chakra-ui/react";
import React, { useContext } from "react";
import TutorialContext from "./contexts/TutorialContext";

interface TutorialFooterProps {
  onClose: () => void;
}

export const TutorialFooter: React.FC<TutorialFooterProps> = ({
  onClose,
}: TutorialFooterProps) => {
  const { progress } = useContext(TutorialContext);
  return (
    <Button colorScheme="red" onClick={onClose}>
      {progress === 3 ? "Start Searching" : "Cancel"}
    </Button>
  );
};
