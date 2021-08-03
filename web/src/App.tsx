import axios from "axios";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useLocation,
} from "react-router-dom";
import "./App.css";
import "@fontsource/raleway/700.css";
import "@fontsource/open-sans/700.css";
import { ChakraProvider, extendTheme, Spinner } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "react-query";
import { lazy, Suspense } from "react";
import Layout from "./components/Layout";
import Background from "./components/Background";

const Home = lazy(() => import("./pages/Home"));
const Result = lazy(() => import("./pages/Result"));
const NotFound404 = lazy(() => import("./pages/NotFound404"));

axios.defaults.baseURL = process.env.REACT_APP_STOMA_API_BASE_URL;

const theme = extendTheme({
  fonts: {
    heading: "Raleway",
    body: "Raleway",
  },
});

const queryClient = new QueryClient();

const AppBody = () => {
  const location = useLocation();

  return (
    <>
      {location.pathname === "/" && <Background particles={100} />}
      <Layout>
        <Suspense fallback={<Spinner colorScheme="blue" size="xl"></Spinner>}>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/results/:location" component={Result} />
            <Route path="*" component={NotFound404} />
          </Switch>
        </Suspense>
      </Layout>
    </>
  );
};

const App = () => {
  return (
    <ChakraProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <Router>
          <AppBody />
        </Router>
      </QueryClientProvider>
    </ChakraProvider>
  );
};

export default App;
