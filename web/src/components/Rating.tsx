import { Box, Image } from "@chakra-ui/react";
import React from "react";

const starsAssetUrl =
  "https://s3-media0.fl.yelpcdn.com/assets/srv0/yelp_design_web/9b34e39ccbeb/assets/img/stars/stars.png";

const getRatingAssetPosition = (rating: number) => {
  const pos = (rating / 0.5) * 24 - 24;
  return { backgroundPosition: `0 -${pos}px` };
};

interface RatingProps {
  rating: number;
}

export const Rating: React.FC<RatingProps> = ({ rating }) => {
  return (
    <Box
      bg={`url(${starsAssetUrl}) no-repeat;`}
      w="132px"
      h="24px"
      {...getRatingAssetPosition(rating)}>
      <Image
        w="1px"
        h="1px"
        src={starsAssetUrl}
        alt={`Rating: ${rating} stars`}
      />
    </Box>
  );
};
