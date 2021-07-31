import {
  Stack,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import { Formik, Form, Field, FieldProps } from "formik";
import { RefObject, useRef } from "react";
import { useHistory } from "react-router-dom";
import { InputField } from "./InputField";
import { Tutorial } from "./Tutorial/Tutorial";

export const SearchForm = () => {
  const history = useHistory();
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
              {({ field, form }: FieldProps) => (
                <FormControl isInvalid={!!form.errors.location}>
                  <FormLabel htmlFor="location"></FormLabel>
                  <InputField
                    id="location"
                    placeholder="Enter a Location, City, or Address"
                    {...field}
                  />
                  <FormErrorMessage>{form.errors.location}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
          </Stack>
        </Form>
      )}
    </Formik>
  );
};
