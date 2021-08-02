import { Table, Tbody, Tr, Td, Icon, Link } from "@chakra-ui/react";
import React from "react";
import { BiDollar } from "react-icons/bi";
import { ImLocation } from "react-icons/im";
import {
  IoFastFoodSharp,
  IoCart,
  IoPhonePortraitOutline,
} from "react-icons/io5";
import { StomaBusiness } from "../../lib/types";
import { formatTransactions, getGoogleMapsUrl } from "../../lib/utils";

interface ResultTableProps {
  business: StomaBusiness;
}

export const ResultTable: React.FC<ResultTableProps> = ({ business }) => {
  const displayAddress = business.address.join(", ");
  return (
    <Table w="inherit" variant="unstyled" size="sm">
      <Tbody align="center" justify="center">
        <Tr>
          <Td>
            <Icon w="25px" h="25px" as={IoFastFoodSharp} />
          </Td>
          <Td fontSize="18px">{business.categories.join(" • ")}</Td>
        </Tr>
        <Tr>
          <Td>
            <Icon w="25px" h="25px" as={IoCart} />
          </Td>
          <Td fontSize="18px">{formatTransactions(business.transactions)}</Td>
        </Tr>
        <Tr align="center" justify="center">
          <Td>
            <Icon w="25px" h="25px" as={ImLocation} />
          </Td>
          <Td fontSize="18px">
            <Link as={Link} isExternal href={getGoogleMapsUrl(displayAddress)}>
              {displayAddress}
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
  );
};
