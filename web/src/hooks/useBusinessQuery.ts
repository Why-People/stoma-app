import axios from "axios";
import { useQuery, useQueryClient } from "react-query";
import { ImagePreloader } from "../lib/ImagePreloader";
import { StomaApiResponse, StomaBusiness } from "../lib/types";
import { useImagePreloader } from "./useImagePreloader";

const getLocationKey = (location: string) => {
  return [
    "location",
    location
      .replace(/[[\]|{}^`"<>\\]+/g, "")
      .replace(/[ ,]+/g, "_")
      .toLowerCase(),
  ];
};

const fetchStomaDataFromServer = async (
  location: string,
  offset: number,
  imagePreloader: ImagePreloader
) => {
  const stomaData = await axios
    .get<StomaApiResponse>("/api/search", {
      params: {
        location: location,
        offset: offset,
      },
    })
    .then((resp) => resp.data);
  imagePreloader.preloadImages(stomaData.businesses.map((b) => b.imgUrl));
  return stomaData;
};

const useFullResultsQuery = (location: string) => {
  const imagePreloader = useImagePreloader(undefined);
  const queryClient = useQueryClient();
  const locationKey = getLocationKey(location);
  return useQuery(
    locationKey,
    async (): Promise<StomaApiResponse> => {
      const queryData = queryClient.getQueryData(locationKey) as
        | StomaApiResponse
        | undefined;
      if (queryData && queryData.businesses.length > 0) {
        return queryData;
      }

      const isDone =
        queryData &&
        queryData.offset + queryData.pageLength === queryData.total;
      if (isDone) {
        throw new Error("Done fetching");
      }

      return await fetchStomaDataFromServer(
        location,
        queryData ? queryData.offset + 50 : 0,
        imagePreloader
      );
    },
    {
      enabled: false,
      retry: false,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
    }
  );
};

export const useBusinessQuery = (location: string) => {
  const queryClient = useQueryClient();
  const fullResultsQuery = useFullResultsQuery(location);

  const locationKey = getLocationKey(location);
  const businessQuery = useQuery(
    ["single", location],
    async () => {
      const fullResult = await fullResultsQuery.refetch();

      if (fullResult.error || !fullResult.data) {
        throw new Error("Cannot fetch more data");
      }

      const businesses = fullResult.data.businesses;
      return businesses[Math.floor(Math.random() * businesses.length)];
    },
    {
      retry: 1,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      onSuccess: (data: StomaBusiness) => {
        const resultData = data;
        queryClient.setQueryData<StomaApiResponse>(locationKey, (data: any) => {
          return {
            ...data,
            businesses: data?.businesses.filter(
              (b: StomaBusiness) => b.yelpId !== resultData.yelpId
            ),
          };
        });
      },
    }
  );

  return businessQuery;
};
