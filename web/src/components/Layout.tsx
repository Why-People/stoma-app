import { Box } from "@chakra-ui/layout";
import React from "react";

// interface LayoutProps {
//     children: react
// }

const Layout: React.FC = ({ children }) => {
  return (
    <Box mt={8} mx="auto" maxW="1200px" w="100%">
      {children}
    </Box>
  );
};

export default Layout;
