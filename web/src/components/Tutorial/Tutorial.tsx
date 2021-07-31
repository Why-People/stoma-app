import { useMediaQuery } from "@chakra-ui/react";
import React, { RefObject } from "react";
import { TutorialContextProvider } from "./TutorialContextProvider";
import { TutorialDrawer } from "./TutorialDrawer";
import { TutorialModal } from "./TutorialModal";

interface TutorialProps {
  isOpen: boolean;
  onClose: () => void;
}
export const Tutorial: React.FC<TutorialProps> = ({ isOpen, onClose }) => {
  const [isLargerThan769] = useMediaQuery("(min-width: 769px)");
  return (
    <TutorialContextProvider>
      {isLargerThan769 ? (
        <TutorialModal isOpen={isOpen} onClose={onClose} />
      ) : (
        <TutorialDrawer isOpen={isOpen} onClose={onClose} />
      )}
    </TutorialContextProvider>
  );
};
