import axios from "axios";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import { ChakraProvider, extendTheme, Text } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "react-query";
import { LocationContextProvider } from "./components/Location/LocationContextProvider";
import { lazy, Suspense } from "react";

const Home = lazy(() => import("./pages/Home"));
const Search = lazy(() => import("./pages/Search"));
const Result = lazy(() => import("./pages/Result"));

axios.defaults.baseURL = process.env.REACT_APP_STOMA_API_BASE_URL;

// 2. Extend the theme to include custom colors, fonts, etc
const colors = {
  brand: {
    900: "#1a365d",
    800: "#153e75",
    700: "#2a69ac",
  },
};
const theme = extendTheme({ colors });

const queryClient = new QueryClient();

const App = () => {
  return (
    <ChakraProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <LocationContextProvider>
          <Suspense fallback={<Text>Loading...</Text>}>
            <Router>
              <Switch>
                {/* <Box minH="100%" w="3px" bg="black"></Box> */}
                {/* <Layout> */}
                <Route exact path="/" component={Home} />
                <Route exact path="/search" component={Search} />
                <Route exact path="/results/:location" component={Result} />
                {/* </Layout> */}
                {/* <Route exact path="/" component={() => <Home />} /> */}
              </Switch>
            </Router>
          </Suspense>
        </LocationContextProvider>
      </QueryClientProvider>
    </ChakraProvider>
  );
};

export default App;
