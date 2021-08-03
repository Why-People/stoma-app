import { useMediaQuery } from "@chakra-ui/react";
import React from "react";
import { TutorialContextProvider } from "./TutorialContextProvider";
import { TutorialDrawer } from "./TutorialDrawer";
import { TutorialModal } from "./TutorialModal";

interface TutorialProps {
  isOpen: boolean;
  onClose: () => void;
}
export const Tutorial: React.FC<TutorialProps> = ({ isOpen, onClose }) => {
  const [isLargerThan768] = useMediaQuery("(min-width: 768px)");
  return (
    <TutorialContextProvider>
      {isLargerThan768 ? (
        <TutorialModal isOpen={isOpen} onClose={onClose} />
      ) : (
        <TutorialDrawer isOpen={isOpen} onClose={onClose} />
      )}
    </TutorialContextProvider>
  );
};
