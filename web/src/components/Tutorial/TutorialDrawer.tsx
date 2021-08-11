import {
  Box,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
} from "@chakra-ui/react";
import { TutorialBody } from "./TutorialBody";
import { TutorialFooter } from "./TutorialFooter";

interface TutorialDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TutorialDrawer = ({ isOpen, onClose }: TutorialDrawerProps) => {
  return (
    <Drawer placement="bottom" onClose={onClose} isOpen={isOpen} size="3xl">
      <DrawerOverlay />
      <DrawerContent>
        <DrawerHeader>How It Works</DrawerHeader>
        <DrawerCloseButton />
        <DrawerBody>
          <Box maxH="50vh" mb={2}>
            <TutorialBody />
          </Box>
        </DrawerBody>
        <DrawerFooter>
          <TutorialFooter onClose={onClose} />
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};
