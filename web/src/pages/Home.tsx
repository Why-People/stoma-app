import { Button } from "@chakra-ui/button";
import {
  Box,
  Flex,
  Grid,
  Heading,
  Link,
  Text,
  VStack,
} from "@chakra-ui/layout";
import { useMediaQuery } from "@chakra-ui/media-query";
import { HStack, Stack, Switch, useColorMode } from "@chakra-ui/react";
import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { SearchForm } from "../components/SearchForm";

const Home: React.FC = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const isDarkMode = colorMode === "dark";
  const [isLargerThan300] = useMediaQuery("(min-width: 300px)");
  return (
    <Stack maxW="95%" align="center" textAlign="center">
      <Heading fontSize={["85px", "95px", "100px", "105px", "110px", "120px"]}>
        Stoma
      </Heading>
      <Heading textAlign="center">
        End Your Arguments Over A Place To Eat
      </Heading>
      <SearchForm />
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
      {/* <Text>Hello World</Text> */}
    </Stack>
  );
};

export default Home;
