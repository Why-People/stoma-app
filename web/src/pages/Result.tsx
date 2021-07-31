import { Box, Flex, Heading, HStack } from "@chakra-ui/layout";
import { Button, Spinner, VStack, Link, ScaleFade } from "@chakra-ui/react";
import { useParams } from "react-router";
import { useHistory } from "react-router-dom";
import Layout from "../components/Layout";
import { MobileResultBody } from "../components/MobileResultBody";
import { useBusinessQuery } from "../hooks/useBusinessQuery";

const Result = () => {
  const { location } = useParams() as any;
  const history = useHistory();
  const businessQuery = useBusinessQuery(location);
  const business = businessQuery?.data;

  if (businessQuery.isLoading) {
    return <Spinner colorScheme="blue" size="xl"></Spinner>;
  }
  console.log(business);

  return (
    <Layout>
      {!business || businessQuery.error ? (
        <VStack textAlign="center">
          <Heading>No Results... Try a Different Location...</Heading>
        </VStack>
      ) : (
        <Box align="center">
          <MobileResultBody business={business} />
        </Box>
      )}
      <HStack align="center" mt={10}>
        <Button
          colorScheme="red"
          isLoading={businessQuery.isLoading}
          onClick={() => history.push("/")}>
          Switch Location
        </Button>
        <Button
          colorScheme="red"
          isLoading={businessQuery.isLoading}
          onClick={() => businessQuery.refetch()}>
          Next
        </Button>
      </HStack>
    </Layout>
  );
};

export default Result;
