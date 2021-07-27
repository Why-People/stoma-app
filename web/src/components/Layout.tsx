import { Flex } from "@chakra-ui/layout";
import React from "react";

const Layout: React.FC = ({ children }) => {
  return (
    <Flex
      align="center"
      justify="center"
      direction="column"
      // maxW="95%"
      minH="70vh">
      {children}
    </Flex>
  );
};

export default Layout;
