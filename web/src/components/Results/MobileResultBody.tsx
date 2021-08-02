import {
  VStack,
  Heading,
  HStack,
  AspectRatio,
  Image,
  Text,
  useMediaQuery,
  Icon,
  Link,
  Button,
} from "@chakra-ui/react";
import React from "react";
import { StomaBusiness } from "../../lib/types";
import { Rating } from "../Rating";
import { FaYelp } from "react-icons/fa";
import { GoogleMaps } from "../GoogleMaps";
import { ResultTable } from "./ResultTable";

interface MobileResultBodyProps {
  business: StomaBusiness;
}

export const MobileResultBody: React.FC<MobileResultBodyProps> = ({
  business,
}) => {
  const [isLargerThan330] = useMediaQuery("(min-width: 330px)"); // Handle Small Mobile Devices (eg. Galaxy Fold S1 and it's 280px width display when folded)
  const displayAddress = business.address.join(", ");
  return (
    <VStack textAlign="center" maxW="95%" spacing={8} mt={5}>
      <VStack align="center" justify="center" spacing={4}>
        <Heading fontSize="40px">{business.name}</Heading>
        <Rating rating={business.rating} />
        <Link fontSize="20px" href={business.yelpUrl} isExternal>
          Based on {business.reviewCount} Yelp Reviews
        </Link>
        <AspectRatio
          minW={isLargerThan330 ? ["330px", "350px"] : "260px"}
          ratio={16 / 9}>
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
          w="220px"
          size="lg"
          colorScheme="red">
          <HStack>
            <Icon as={FaYelp} />
            <Text>View on Yelp</Text>
          </HStack>
        </Button>
        <ResultTable business={business} />
        <GoogleMaps
          location={{
            address: displayAddress,
            coordinates: business.coordinates,
          }}
          zoomLevel={15}
        />
      </VStack>
    </VStack>
  );
};
