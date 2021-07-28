import { Heading, Text } from "@chakra-ui/layout";
import { Button, Image, Spinner, VStack, AspectRatio } from "@chakra-ui/react";
import React from "react";
import { useParams } from "react-router";
import Layout from "../components/Layout";
import { useBusinessQuery } from "../hooks/useBusinessQuery";

const Result = () => {
  const { location } = useParams() as any;
  const businessesQuery = useBusinessQuery(location, 0);
  const business = businessesQuery?.data;

  if (businessesQuery.isLoading) {
    return <Spinner colorScheme="blue" size="xl"></Spinner>;
  }

  return (
    <Layout>
      {!business ? (
        <Text>No result</Text>
      ) : (
        <VStack>
          <Heading>{business.name}</Heading>
          <Text>Rating: {business.rating}</Text>
          <Text>Price: {business.priceRating}</Text>
          <AspectRatio minW="500px" maxW="500px" ratio={16 / 9}>
            <Image src={business.imgUrl} alt={`${business.name} image`} />
          </AspectRatio>
        </VStack>
      )}
      <Button
        mt={10}
        colorScheme="blue"
        isLoading={businessesQuery.isLoading}
        onClick={() => businessesQuery.refetch()}>
        Next
      </Button>
    </Layout>
  );
};

export default Result;
