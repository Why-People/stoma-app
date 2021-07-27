import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import logo from "./logo.svg";
import "./App.css";
import { Box, ChakraProvider, extendTheme } from "@chakra-ui/react";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import { Search } from "./pages/Search";

// 2. Extend the theme to include custom colors, fonts, etc
const colors = {
  brand: {
    900: "#1a365d",
    800: "#153e75",
    700: "#2a69ac",
  },
};
const theme = extendTheme({ colors });

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Router>
        <Switch>
          {/* <Box minH="100%" w="3px" bg="black"></Box> */}
          {/* <Layout> */}
          <Route exact path="/" component={Home} />
          <Route exact path="/search" component={Search} />
          {/* </Layout> */}
          {/* <Route exact path="/" component={() => <Home />} /> */}
        </Switch>
      </Router>
    </ChakraProvider>
  );
}

export default App;
