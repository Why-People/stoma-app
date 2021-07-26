import { Button } from "@chakra-ui/button";
import { Box, Flex, Grid, Heading, Text, VStack } from "@chakra-ui/layout";
import { useMediaQuery } from "@chakra-ui/media-query";
import React from "react";

const Home: React.FC = () => {
  const [isLargerThan768] = useMediaQuery("(min-width: 768px)");
  return (
    <Flex align="center" justify="center" minH="70vh">
      <Grid
        gridTemplateColumns={isLargerThan768 ? "1fr 1rem 1fr" : "1fr"}
        gridTemplateRows={!isLargerThan768 ? "1fr 1fr" : "1fr"}
        maxW="95%">
        <VStack
          align="left"
          direction="column"
          p="10px"
          textAlign={isLargerThan768 ? "left" : "center"}>
          <Heading fontSize={isLargerThan768 ? "120px" : "100px"}>
            Stoma
          </Heading>
          <Text fontSize={isLargerThan768 ? "22px" : "20px"}>
            Imagine you're with a friend, you two want to eat somewhere, but
            can't agree...
          </Text>
          <Text fontSize={isLargerThan768 ? "22px" : "20px"}>
            Here are your options:
          </Text>
          <Text fontSize={isLargerThan768 ? "22px" : "20px"}>
            1. You {isLargerThan768 ? "click" : "tap"} the button{" "}
            {isLargerThan768 ? "on the right" : "below you"}
          </Text>
          <Text fontSize={isLargerThan768 ? "22px" : "20px"}>
            2. You argue endlessly until the end of time because you didn't use
            Stoma
          </Text>
        </VStack>
        {isLargerThan768 && <Box minH="500px" w="2px" bg="black"></Box>}
        <VStack textAlign="center">
          <Heading fontSize={isLargerThan768 ? "120px" : "100px"}>
            Try It!
          </Heading>
          <Text fontSize={isLargerThan768 ? "22px" : "20px"}>
            The pain will stop once you hit the button!
          </Text>
          <Button colorScheme="blue" w="250px" size="lg">
            End Pain and Suffering
          </Button>
        </VStack>
      </Grid>
    </Flex>
  );
};

export default Home;
