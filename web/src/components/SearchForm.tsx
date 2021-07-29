import { SearchIcon } from "@chakra-ui/icons";
import {
  Stack,
  Heading,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Button,
  useColorMode,
  InputGroup,
  InputRightElement,
  IconButton,
  Center,
} from "@chakra-ui/react";
import { Formik, Form, Field, FieldProps } from "formik";
import React from "react";
import { useHistory } from "react-router-dom";

export const SearchForm = () => {
  const { colorMode } = useColorMode();
  const history = useHistory();
  const inputBg = colorMode === "dark" ? "transparent" : "white";
  return (
    <Formik
      initialValues={{ location: "" }}
      onSubmit={(values, { setErrors }) => {
        if (!values.location) {
          setErrors({ location: "You must enter a location" });
          return;
        }
        values.location = values.location.replace(/[[\]|{}^`"<>\\]+/, "");
        history.push(`/results/${values.location}`);
      }}>
      {() => (
        <Form>
          <Stack align="center" justify="center" spacing={4}>
            <Field name="location">
              {({ field, form }: FieldProps) => {
                // console.log(field, form);
                return (
                  <FormControl
                    size="lg"
                    w={["260px", "350px", "400px", "450px", "500px", "550px"]}
                    isInvalid={!!form.errors.location}>
                    <FormLabel htmlFor="location"></FormLabel>
                    <Center>
                      <InputGroup align="center" justify="center">
                        <Input
                          {...field}
                          bg={inputBg}
                          id="location"
                          h={["50px", "55px", "55px", "60px", "60px", "60px"]}
                          fontSize={[
                            "20px",
                            "22px",
                            "22px",
                            "25px",
                            "25px",
                            "25px",
                          ]}
                          placeholder="Enter a Location, City, or Address"
                        />

                        {/* <InputRightElement align="center" justify="center">
                          <IconButton
                            // mt="10px"
                            align="center"
                            justify="center"
                            aria-label="Find place to eat"
                            icon={<SearchIcon />}
                          />
                          
                        </InputRightElement> */}
                      </InputGroup>
                    </Center>
                    <FormErrorMessage>{form.errors.location}</FormErrorMessage>
                  </FormControl>
                );
              }}
            </Field>
            {/* <Button mt={4} w="50%" colorScheme="blue" type="submit">
              Find Places to Eat
            </Button> */}
          </Stack>
        </Form>
      )}
    </Formik>
  );
};
