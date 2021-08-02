import React from "react";
import { GoogleMapsLocation } from "../lib/types";
import GoogleMapReact from "google-map-react";
import Icon from "@chakra-ui/icon";
import { ImLocation } from "react-icons/im";
import { AspectRatio, Box, Text } from "@chakra-ui/layout";
import { useMediaQuery } from "@chakra-ui/react";

interface GoogleMapsProps {
  location: GoogleMapsLocation;
  zoomLevel: number;
}

const GoogleMapsPin: React.FC<any> = ({ text }) => {
  return (
    <Box w="100px" p="5px" bg="whiteAlpha.600" borderRadius="10px">
      <Icon w="30px" h="30px" color="#E53E3E" as={ImLocation} />
      <Text fontSize="14px" color="black">
        {text}
      </Text>
    </Box>
  );
};

export const GoogleMaps: React.FC<GoogleMapsProps> = ({
  location,
  zoomLevel,
}) => {
  const [isLargerThan330] = useMediaQuery("(min-width: 330px)");
  const { longitude, latitude } = location.coordinates;
  const center = {
    address: location.address,
    lat: latitude,
    lng: longitude,
  };
  return (
    <AspectRatio
      borderRadius="10px"
      boxShadow="xl"
      w={isLargerThan330 ? { base: "330px", xl: "400px" } : "260px"}
      ratio={16 / 9}>
      <Box borderRadius="10px">
        <GoogleMapReact
          bootstrapURLKeys={{
            key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY || "",
          }}
          center={center}
          zoom={zoomLevel}>
          <GoogleMapsPin
            lat={latitude}
            lng={longitude}
            text={location.address}
          />
        </GoogleMapReact>
      </Box>
    </AspectRatio>
  );
};
