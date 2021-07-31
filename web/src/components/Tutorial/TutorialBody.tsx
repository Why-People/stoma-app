import { ArrowBackIcon, ArrowForwardIcon } from "@chakra-ui/icons";
import {
  Stack,
  Flex,
  ScaleFade,
  IconButton,
  Progress,
  Text,
} from "@chakra-ui/react";
import React, { useContext } from "react";
import TutorialContext from "./contexts/TutorialContext";

export const TutorialBody = () => {
  const { progress, setProgress } = useContext(TutorialContext);
  const handleValueChange = (up: boolean) => {
    if ((progress === 1 && !up) || (progress === 3 && up)) return;
    setProgress(progress + (up ? 1 : -1));
  };
  return (
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
            First, input the location you wish to eat in. Then press enter or
            click the search icon to find places to eat.
          </Text>
        </Stack>
      )}
      {progress === 2 && (
        <Stack direction="column">
          <Text>
            Then we'll select a restaurant for you, if you don't like it, click
            next.
          </Text>
        </Stack>
      )}
      {progress === 3 && (
        <Stack direction="column">
          <Text>
            If you want to see your previous results or change the search
            location, click the menu below.
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
  );
};
