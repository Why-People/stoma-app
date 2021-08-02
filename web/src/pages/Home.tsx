import { Heading, Text } from "@chakra-ui/layout";
import { useMediaQuery } from "@chakra-ui/media-query";
import {
  Button,
  Stack,
  Switch,
  useColorMode,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import { SearchForm } from "../components/SearchForm";
import { Tutorial } from "../components/Tutorial/Tutorial";
import { useImagePreloader } from "../hooks/useImagePreloader";
import { useIsDarkMode } from "../hooks/useIsDarkMode";
import { getTutorialImages } from "../lib/utils";

const Home: React.FC = () => {
  const { toggleColorMode } = useColorMode();
  const [isLargerThan300] = useMediaQuery("(min-width: 300px)"); // Handle Small mobile devices
  const { isOpen, onOpen, onClose } = useDisclosure();
  const isDarkMode = useIsDarkMode();

  // useImagePreloader(getTutorialImages());

  return (
    <Stack maxW="95%" align="center" textAlign="center">
      <Heading fontSize={["85px", "95px", "100px", "105px", "110px", "120px"]}>
        Stoma
      </Heading>
      <Heading textAlign="center">
        End Your Arguments And Find A Place To Eat
      </Heading>
      <SearchForm />
      <VStack spacing={8}>
        <Stack
          direction={isLargerThan300 ? "row" : "column-reverse"}
          pt="100px"
          align="center"
          justify="center">
          <Switch
            colorScheme="blue"
            aria-label="dark mode switch"
            size="lg"
            isChecked={isDarkMode}
            onChange={toggleColorMode}
          />
          <Text as="b" fontSize="20px">
            {isDarkMode ? "Betray 😡" : "Join 😊"} the Dark Side
          </Text>
        </Stack>
        <Button colorScheme="red" w="220px" size="lg" onClick={onOpen}>
          How It Works
        </Button>
      </VStack>
      <Tutorial isOpen={isOpen} onClose={onClose} />
    </Stack>
  );
};

export default Home;
