import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
} from "@chakra-ui/react";
import { RefObject } from "react";
import { useCloseTutorial } from "./hooks/useCloseTutorial";
import { TutorialBody } from "./TutorialBody";
import { TutorialFooter } from "./TutorialFooter";

interface TutorialDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  closeRef: RefObject<any> | undefined;
}

export const TutorialDrawer = ({
  isOpen,
  onClose,
  closeRef,
}: TutorialDrawerProps) => {
  const closeTutorial = useCloseTutorial(onClose);
  return (
    <Drawer
      placement="bottom"
      finalFocusRef={closeRef}
      onClose={closeTutorial}
      isOpen={isOpen}
      size="3xl">
      <DrawerOverlay />
      <DrawerContent>
        <DrawerHeader>How It Works</DrawerHeader>
        <DrawerBody>
          <TutorialBody />
        </DrawerBody>
        <DrawerFooter>
          <TutorialFooter onClose={closeTutorial} />
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};
