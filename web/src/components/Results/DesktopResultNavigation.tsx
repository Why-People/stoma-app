import { HStack, Button, Icon, Text } from "@chakra-ui/react";
import React from "react";
import { HiOutlineArrowRight } from "react-icons/hi";
import { ImLocation } from "react-icons/im";
import { useHistory } from "react-router-dom";

interface DesktopResultNavigationProps {
  onNext: () => void;
}

export const DesktopResultNavigation: React.FC<DesktopResultNavigationProps> =
  ({ onNext }) => {
    const history = useHistory();
    return (
      <HStack spacing={12}>
        <Button
          w="220px"
          size="lg"
          colorScheme="red"
          onClick={() => history.push("/")}>
          <HStack>
            <Text>New Location</Text>
            <Icon as={ImLocation} />
          </HStack>
        </Button>
        <Button w="220px" size="lg" colorScheme="red" onClick={onNext}>
          <HStack>
            <Text>Next</Text>
            <Icon as={HiOutlineArrowRight} />
          </HStack>
        </Button>
      </HStack>
    );
  };
