import { ArrowBackIcon, ArrowForwardIcon } from "@chakra-ui/icons";
import {
  Stack,
  Flex,
  ScaleFade,
  IconButton,
  Progress,
  Text,
  Image,
  useMediaQuery,
} from "@chakra-ui/react";
import React, { useContext } from "react";
import { useIsDarkMode } from "../../hooks/useIsDarkMode";
import { TutorialProgress } from "../../lib/types";
import TutorialContext from "./contexts/TutorialContext";

const baseImgBucketUrl = "https://storage.googleapis.com/stoma-assets";

interface TutorialBodyContentProps {
  text: string;
  imgUrls?: string[];
}

const TutorialBodyContent: React.FC<TutorialBodyContentProps> = ({
  text,
  imgUrls,
}) => {
  return (
    <Stack direction="column">
      <Text>{text}</Text>
      {imgUrls?.map((imgUrl, i) => (
        <Image
          key={i}
          borderRadius="10px"
          boxShadow="xl"
          src={`${baseImgBucketUrl}/${imgUrl}`}
          alt="Tutorial Image"
        />
      ))}
    </Stack>
  );
};

export const TutorialBody = () => {
  const { progress, setProgress } = useContext(TutorialContext);
  const [isLargerThan768] = useMediaQuery("(min-width: 768px)");
  const isDarkMode = useIsDarkMode();

  return (
    <Stack direction="column" mb={7}>
      <Flex justify="space-between">
        <ScaleFade in={progress > 1}>
          <IconButton
            colorScheme="red"
            variant="ghost"
            aria-label="back"
            icon={<ArrowBackIcon w="32px" h="32px" />}
            onClick={() => setProgress(false)}
            cursor={progress === 1 ? "default" : "pointer"}
          />
        </ScaleFade>
        <ScaleFade in={progress < 3}>
          <IconButton
            colorScheme="red"
            variant="ghost"
            aria-label="forward"
            icon={<ArrowForwardIcon w="32px" h="32px" />}
            onClick={() => setProgress(true)}
            cursor={progress === 3 ? "default" : "pointer"}
          />
        </ScaleFade>
      </Flex>
      <Progress
        aria-valuenow={(progress * 10) / 100}
        colorScheme="red"
        borderRadius="5px"
        value={progress * 33.5}
      />
      {progress === TutorialProgress.Start && (
        <TutorialBodyContent
          text="First, input the location you wish to eat in which can either be a city or address. Then press enter or
        click the search icon to find places to eat!"
          imgUrls={[`${isDarkMode ? "DarkMode" : "LightMode"}Search.png`]}
        />
      )}
      {progress === TutorialProgress.Middle && (
        <TutorialBodyContent
          text="Then we'll select a restaurant for you, if you don't like it, simpy click
        next! You can also view the listing on Yelp or Google Maps."
          imgUrls={[
            `${isDarkMode ? "DarkMode" : "LightMode"}Listing${
              isLargerThan768 ? "" : "Mobile"
            }.png`,
          ]}
        />
      )}
      {progress === TutorialProgress.End && (
        <TutorialBodyContent
          text="If you're still in an argument with your friend, try switching the location!"
          imgUrls={[
            `${isDarkMode ? "DarkMode" : "LightMode"}NewLocation${
              isLargerThan768 ? "" : "Mobile"
            }.png`,
          ]}
        />
      )}
    </Stack>
  );
};
