import { PhoneIcon } from "@chakra-ui/icons";
import {
  VStack,
  StackDivider,
  Heading,
  HStack,
  AspectRatio,
  Image,
  Text,
  useMediaQuery,
  IconButton,
  Icon,
  Link,
  Table,
  Tbody,
  Td,
  Tfoot,
  Th,
  Thead,
  Tr,
  Button,
  Stack,
} from "@chakra-ui/react";
import React from "react";
import { StomaBusiness } from "../lib/types";
import { Rating } from "./Rating";
import { FaYelp } from "react-icons/fa";
import { ImLocation } from "react-icons/im";
import { getGoogleMapsUrl } from "../lib/utils";
import { IoFastFoodSharp, IoPhonePortraitOutline } from "react-icons/io5";
import { BiDollar } from "react-icons/bi";

interface MobileResultBodyProps {
  business: StomaBusiness;
}

export const MobileResultBody: React.FC<MobileResultBodyProps> = ({
  business,
}) => {
  const [isLargerThan330] = useMediaQuery("(min-width: 330px)");
  return (
    <VStack textAlign="center" maxW="95%" spacing={8} mt={5}>
      <VStack align="center" justify="center">
        <Heading fontSize={["40px", "45px", "50px", "55px", "60px", "65px"]}>
          {business.name}
        </Heading>
        <Rating rating={business.rating} />
        <Link fontSize="20px" href={business.yelpUrl} isExternal>
          Based on {business.reviewCount} Yelp Reviews
        </Link>
        <AspectRatio
          minW={
            isLargerThan330 ? ["330px", "350px", "400px", "500px"] : "260px"
          } // Galaxy Fold ughh...
          ratio={16 / 9}>
          <Image
            borderRadius="10px"
            boxShadow="lg"
            src={business.imgUrl}
            alt={`${business.name} image`}
          />
        </AspectRatio>
        <Table w="inherit" variant="unstyled" size="sm">
          <Tbody align="center" justify="center">
            <Tr>
              <Td>
                <Icon w="25px" h="25px" as={IoFastFoodSharp} />
              </Td>
              <Td fontSize="18px">{business.categories.join(" • ")}</Td>
            </Tr>
            <Tr align="center" justify="center">
              <Td>
                <Icon w="25px" h="25px" as={ImLocation} />
              </Td>
              <Td
                fontSize="18px"
                // as={Link}
                // isExternal
                // href={getGoogleMapsUrl(business.name)}>
              >
                <Link
                  as={Link}
                  isExternal
                  href={getGoogleMapsUrl(business.address.join(", "))}>
                  {business.address.join(", ")}
                </Link>
              </Td>
            </Tr>
            <Tr>
              <Td>
                <Icon w="25px" h="25px" as={IoPhonePortraitOutline} />
              </Td>
              <Td fontSize="18px">
                {business.phone && business.phone.length > 0
                  ? business.phone
                  : "Unknown"}
              </Td>
            </Tr>
            <Tr>
              <Td>
                <Icon w="25px" h="25px" as={BiDollar} />
              </Td>
              <Td fontSize="18px">{business.priceRating ?? "Unknown"}</Td>
            </Tr>
          </Tbody>
        </Table>
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
      </VStack>
    </VStack>
  );
};
