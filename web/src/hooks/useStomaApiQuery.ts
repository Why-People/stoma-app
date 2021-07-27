import axios from "axios";
import { useQuery } from "react-query";

const formatLocation = (location: string) => {
  return location.replace(/[[\]|{}^`"<>\\]+/, "").toLowerCase();
};

export const useStomaApiQuery = (location: string, offset: number) => {
  const formattedLocation = formatLocation(location);
  return useQuery(
    ["location", formattedLocation],
    async () => {
      return await axios
        .get("/api/search", {
          params: { location: formattedLocation, offset: offset },
        })
        .then((resp) => resp.data);
    },
    {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
    }
  );
};
