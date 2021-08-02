import { Button } from "@chakra-ui/button";
import { Heading, Stack, Text } from "@chakra-ui/layout";
import React from "react";
import { useHistory } from "react-router-dom";

const NotFound404 = () => {
  const history = useHistory();
  return (
    <Stack
      align="center"
      justify="center"
      textAlign="center"
      maxW="95%"
      spacing={6}>
      <Heading fontSize="140px">404</Heading>
      <Text fontSize="20px">
        The page you're looking for doesn't seem to be here...
      </Text>
      <Button colorScheme="red" onClick={() => history.push("/")}>
        Return Home
      </Button>
    </Stack>
  );
};

export default NotFound404;
