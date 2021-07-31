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
import React, { RefObject, useRef } from "react";
import { SearchForm } from "../components/SearchForm";
import { Tutorial } from "../components/Tutorial/Tutorial";

const Home: React.FC = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const [isLargerThan300] = useMediaQuery("(min-width: 300px)");
  const { isOpen, onOpen, onClose } = useDisclosure();

  const isDarkMode = colorMode === "dark";
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
        <Button colorScheme="blue" onClick={onOpen}>
          How It Works
        </Button>
      </VStack>
      <Tutorial isOpen={isOpen} onClose={onClose} />
    </Stack>
  );
};

export default Home;
