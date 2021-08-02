import { Box, useMediaQuery } from "@chakra-ui/react";
import React from "react";
import { StomaBusiness } from "../../lib/types";
import { DesktopResultBody } from "./DesktopResultBody";
import { DesktopResultNavigation } from "./DesktopResultNavigation";
import { MobileResultBody } from "./MobileResultBody";
import { MobileResultFooter } from "./MobileResultFooter";

interface ResultBodyProps {
  business: StomaBusiness;
  onNext: () => void;
}

export const ResultView: React.FC<ResultBodyProps> = ({ business, onNext }) => {
  const [isLargerThan768] = useMediaQuery("(min-width: 768px)");
  if (!isLargerThan768) {
    return (
      <>
        <Box align="center" mb="100px">
          <MobileResultBody business={business} />
        </Box>
        <MobileResultFooter onNext={onNext} />
      </>
    );
  }

  return (
    <>
      <DesktopResultBody business={business} />
      <Box mt={20}>
        <DesktopResultNavigation onNext={onNext} />
      </Box>
    </>
  );
};
