import {
  useMediaQuery,
  VStack,
  Heading,
  AspectRatio,
  Button,
  HStack,
  Icon,
  Image,
  Link,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { FaYelp } from "react-icons/fa";
import { StomaBusiness } from "../../lib/types";
import { GoogleMaps } from "../GoogleMaps";
import { Rating } from "../Rating";
import { ResultTable } from "./ResultTable";

interface DesktopResultBody {
  business: StomaBusiness;
}

export const DesktopResultBody: React.FC<DesktopResultBody> = ({
  business,
}) => {
  const displayAddress = business.address.join(", ");
  return (
    <HStack
      justify="center"
      textAlign="center"
      maxW="95%"
      spacing={{ base: 4, xl: 12 }}>
      <VStack spacing={4} maxW="500px">
        <Heading fontSize="40px">{business.name}</Heading>
        <HStack>
          <Rating rating={business.rating} />
          <Link fontSize="18px" href={business.yelpUrl} isExternal>
            Based on {business.reviewCount} Yelp Reviews
          </Link>
        </HStack>
        <AspectRatio minW={{ base: "400px", xl: "500px" }} ratio={16 / 9}>
          <Image
            borderRadius="10px"
            boxShadow="2xl"
            src={business.imgUrl}
            alt={`${business.name} image`}
          />
        </AspectRatio>
        <Button
          as={Link}
          isExternal
          href={business.yelpUrl}
          w={{ base: "400px", xl: "500px" }}
          size="lg"
          colorScheme="red">
          <HStack>
            <Icon as={FaYelp} />
            <Text>View on Yelp</Text>
          </HStack>
        </Button>
      </VStack>
      <VStack align="left" maxW="400px">
        <ResultTable business={business} />
        <GoogleMaps
          location={{
            address: displayAddress,
            coordinates: business.coordinates,
          }}
          zoomLevel={15}
        />
      </VStack>
    </HStack>
  );
};
