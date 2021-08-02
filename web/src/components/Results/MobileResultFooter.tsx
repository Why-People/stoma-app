import {
  useColorMode,
  Flex,
  HStack,
  Button,
  VStack,
  Icon,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { HiOutlineArrowRight } from "react-icons/hi";
import { ImLocation } from "react-icons/im";
import { useHistory } from "react-router-dom";
import { useIsDarkMode } from "../../hooks/useIsDarkMode";

interface MobileResultFooterProps {
  onNext: () => void;
}

export const MobileResultFooter: React.FC<MobileResultFooterProps> = ({
  onNext,
}) => {
  const history = useHistory();
  const isDarkMode = useIsDarkMode();
  return (
    <Flex
      position="fixed"
      w="95%"
      bg={isDarkMode ? "#5e5d5b" : "#bfbebb"}
      align="center"
      justify="center"
      borderRadius="30px"
      boxShadow="lg"
      bottom={10}
      p="10px">
      <HStack spacing={4}>
        <Button
          variant="ghost"
          _hover={{ bg: "transparent" }}
          _active={{ bg: "transparent" }}
          onClick={() => history.push("/")}>
          <VStack>
            <Text>New Location</Text>
            <Icon as={ImLocation} />
          </VStack>
        </Button>
        <Button
          variant="ghost"
          _hover={{ bg: "transparent" }}
          _active={{ bg: "transparent" }}
          onClick={onNext}>
          <VStack>
            <Text>Next</Text>
            <Icon as={HiOutlineArrowRight} />
          </VStack>
        </Button>
      </HStack>
    </Flex>
  );
};
