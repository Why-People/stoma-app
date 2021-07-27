import { Button } from "@chakra-ui/button";
import { Box, Text } from "@chakra-ui/layout";
import React, { LegacyRef, useRef } from "react";
import { TutorialModal } from "../components/TutorialModal";
import { useHasViewedTutorial } from "../hooks/useShowTutorial";

export const Search = () => {
  const closeRef = useRef() as LegacyRef<HTMLButtonElement> | undefined;
  const [hasViewedTutorial, setHasViewedTutorial] = useHasViewedTutorial();
  return (
    <Box>
      <TutorialModal
        isOpen={!hasViewedTutorial}
        onClose={() => setHasViewedTutorial.switchOn()}
        closeRef={closeRef}
      />
      <Text>{hasViewedTutorial ? "tutorial on" : "tutorial off"}</Text>
      <Button ref={closeRef} onClick={() => setHasViewedTutorial.switch()}>
        Toggle
      </Button>
    </Box>
  );
};
