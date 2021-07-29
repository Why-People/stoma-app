import axios from "axios";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import { ChakraProvider, extendTheme, Spinner, Text } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "react-query";
import { LocationContextProvider } from "./components/Location/LocationContextProvider";
import React, { lazy, Suspense } from "react";
import { Background } from "./components/Background";
import Layout from "./components/Layout";

const Home = lazy(() => import("./pages/Home"));
const Search = lazy(() => import("./pages/Search"));
const Result = lazy(() => import("./pages/Result"));

axios.defaults.baseURL = process.env.REACT_APP_STOMA_API_BASE_URL;

const theme = extendTheme();

const queryClient = new QueryClient();

const App = () => {
  return (
    <ChakraProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <LocationContextProvider>
          <Background particles={100} />
          <Router>
            <Layout>
              <Suspense
                fallback={<Spinner colorScheme="blue" size="xl"></Spinner>}>
                <Switch>
                  <Route exact path="/" component={Home} />
                  <Route exact path="/search" component={Search} />
                  <Route exact path="/results/:location" component={Result} />
                </Switch>
              </Suspense>
            </Layout>
          </Router>
        </LocationContextProvider>
      </QueryClientProvider>
    </ChakraProvider>
  );
};

export default App;
