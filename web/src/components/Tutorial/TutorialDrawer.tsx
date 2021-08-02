import {
  Box,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Spacer,
} from "@chakra-ui/react";
import React from "react";
import { TutorialBody } from "./TutorialBody";
import { TutorialFooter } from "./TutorialFooter";

interface TutorialDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TutorialDrawer = ({ isOpen, onClose }: TutorialDrawerProps) => {
  return (
    <Drawer placement="bottom" onClose={onClose} isOpen={isOpen} size="6xl">
      <DrawerOverlay />
      <DrawerContent>
        <DrawerHeader>How It Works</DrawerHeader>
        <DrawerCloseButton />
        <DrawerBody>
          <TutorialBody />
        </DrawerBody>
        <DrawerFooter>
          <TutorialFooter onClose={onClose} />
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};
