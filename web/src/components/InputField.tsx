import { SearchIcon } from "@chakra-ui/icons";
import { HStack } from "@chakra-ui/layout";
import { IconButton, Input, useColorMode } from "@chakra-ui/react";
import React, { RefObject } from "react";

interface InputFieldProps {
  id: string;
  placeholder: string;
  ref?: RefObject<any> | undefined;
  value?: string;
}

export const InputField: React.FC<InputFieldProps> = ({
  id,
  placeholder,
  ref,
  value,
  ...props
}: InputFieldProps) => {
  const { colorMode } = useColorMode();
  const inputBg = colorMode === "dark" ? "transparent" : "white";
  const borderColor = colorMode === "dark" ? "gray.500" : "gray.300";
  return (
    <HStack
      align="center"
      justify="center"
      border="1px solid"
      bg={inputBg}
      pl="10px"
      pr="10px"
      w={["260px", "350px", "400px", "450px", "500px", "550px"]}
      borderColor={borderColor}
      borderRadius="5px">
      <Input
        id={id}
        placeholder={placeholder}
        h={["50px", "55px", "55px", "60px", "60px", "60px"]}
        fontSize={["20px", "22px", "22px", "25px", "25px", "25px"]}
        variant="unstyled"
        border="none"
        outline="none"
        ref={ref}
        isTruncated
        {...props}
      />
      <IconButton
        type="submit"
        variant="ghost"
        aria-label="Find place to eat"
        icon={<SearchIcon />}
      />
    </HStack>
  );
};
