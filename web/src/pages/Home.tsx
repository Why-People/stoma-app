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
import React from "react";
import { Link as RouterLink } from "react-router-dom";

const Home: React.FC = () => {
  const [isLargerThan769] = useMediaQuery("(min-width: 769px)");
  return (
    <Flex align="center" justify="center" minH="70vh">
      <Grid
        gridTemplateColumns={isLargerThan769 ? "1fr 1rem 1fr" : "1fr"}
        gridTemplateRows={!isLargerThan769 ? "1fr 1fr" : "1fr"}
        maxW="95%">
        <VStack
          align="left"
          justify="center"
          direction="column"
          p="10px"
          textAlign={isLargerThan769 ? "left" : "center"}>
          <Heading fontSize={isLargerThan769 ? "120px" : "100px"}>
            Stoma
          </Heading>
          <Text fontSize={isLargerThan769 ? "22px" : "20px"}>
            Imagine you're with a friend, you two want to eat somewhere, but
            can't agree...
          </Text>
          <Text fontSize={isLargerThan769 ? "22px" : "20px"}>
            Here are your options:
          </Text>
          <Text fontSize={isLargerThan769 ? "22px" : "20px"}>
            1. You {isLargerThan769 ? "click" : "tap"} the button{" "}
            {isLargerThan769 ? "on the right" : "below you"}
          </Text>
          <Text fontSize={isLargerThan769 ? "22px" : "20px"}>
            2. You argue endlessly until the end of time because you didn't use
            Stoma
          </Text>
        </VStack>
        {isLargerThan769 && <Box minH="500px" w="2px" bg="black"></Box>}
        <VStack justify="center" textAlign="center">
          <Heading fontSize={isLargerThan769 ? "120px" : "75px"}>
            Try It!
          </Heading>
          <Text fontSize={isLargerThan769 ? "22px" : "20px"}>
            The pain will stop once you hit the button!
          </Text>
          <RouterLink to="/search">
            <Button
              as={Link}
              colorScheme="blue"
              w="250px"
              size="lg"
              _hover={{ textDecoration: "none", bg: "blue.400" }}>
              End Pain and Suffering
            </Button>
          </RouterLink>
        </VStack>
      </Grid>
    </Flex>
  );
};

export default Home;
