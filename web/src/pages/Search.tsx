import { Button } from "@chakra-ui/button";
import { Heading } from "@chakra-ui/layout";
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Stack,
  useMediaQuery,
} from "@chakra-ui/react";
import { RefObject, useRef } from "react";
import { TutorialContextProvider } from "../components/Tutorial/TutorialContextProvider";
import { TutorialDrawer } from "../components/Tutorial/TutorialDrawer";
import { TutorialModal } from "../components/Tutorial/TutorialModal";
import { useHasViewedTutorial } from "../components/Tutorial/hooks/useHasViewedTutorial";
import { Formik, Form, Field, FieldProps } from "formik";
import Layout from "../components/Layout";
import { useLocationQueryParam } from "../components/Location/hooks/useLocationQuery";
import { useHistory } from "react-router";

const Search = () => {
  const history = useHistory();
  const closeRef = useRef() as RefObject<any> | undefined;
  const [hasViewedTutorial, setHasViewedTutorial] = useHasViewedTutorial();
  const [isLargerThan769] = useMediaQuery("(min-width: 769px)");
  const { setLocation } = useLocationQueryParam();
  return (
    <Layout>
      <TutorialContextProvider>
        {isLargerThan769 ? (
          <TutorialModal
            isOpen={!hasViewedTutorial}
            onClose={() => setHasViewedTutorial.switchOn()}
            closeRef={closeRef}
          />
        ) : (
          <TutorialDrawer
            isOpen={!hasViewedTutorial}
            onClose={() => setHasViewedTutorial.switchOn()}
            closeRef={closeRef}
          />
        )}
      </TutorialContextProvider>
      <Formik
        initialValues={{ location: "" }}
        onSubmit={(values, { setErrors }) => {
          if (!values.location) {
            setErrors({ location: "You must enter a location" });
            return;
          }
          values.location = values.location.replace(/[[\]|{}^`"<>\\]+/, "");
          setLocation(values.location);
          history.push(`/results/${values.location}`);
        }}>
        {() => (
          <Form>
            <Stack align="center" justify="center">
              <Heading textAlign="center">
                Enter a Location, City, or Address
              </Heading>
              <Field name="location">
                {({ field, form }: FieldProps) => {
                  console.log(field, form);
                  return (
                    <FormControl
                      size="lg"
                      w={["260px", "400px", "450px", "500px", "550px"]}
                      isInvalid={!!form.errors.location}>
                      <FormLabel htmlFor="location"></FormLabel>
                      <Input
                        {...field}
                        ref={closeRef}
                        id="location"
                        placeholder="location"
                      />
                      <FormErrorMessage>
                        {form.errors.location}
                      </FormErrorMessage>
                    </FormControl>
                  );
                }}
              </Field>
              <Button mt={4} w="50%" colorScheme="blue" type="submit">
                Submit
              </Button>
            </Stack>
          </Form>
        )}
      </Formik>
    </Layout>
  );
};

export default Search;
