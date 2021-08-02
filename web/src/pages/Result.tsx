import { Heading } from "@chakra-ui/layout";
import { Button, Spinner, VStack } from "@chakra-ui/react";
import { useParams } from "react-router";
import { useHistory } from "react-router-dom";
import { useBusinessQuery } from "../hooks/useBusinessQuery";
import { ResultView } from "../components/Results/ResultView";

const Result = () => {
  const { location } = useParams() as any;
  const history = useHistory();
  const businessQuery = useBusinessQuery(location);
  const business = businessQuery?.data;

  if (businessQuery.isLoading) {
    return <Spinner colorScheme="blue" size="xl"></Spinner>;
  }

  if (!business || businessQuery.error) {
    return (
      <VStack textAlign="center">
        <Heading>No Results... Try a Different Location...</Heading>
        <Button onClick={() => history.push("/")} colorScheme="red">
          Switch Location
        </Button>
      </VStack>
    );
  }

  return (
    <ResultView business={business} onNext={() => businessQuery.refetch()} />
  );
};

export default Result;
