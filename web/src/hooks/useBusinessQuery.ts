import axios from "axios";
import { useQuery, useQueryClient } from "react-query";
import { StomaApiResponse, StomaBusiness } from "../lib/types";

const getLocationKey = (location: string) => {
  return ["location", location.replace(/[[\]|{}^`"<>\\]+/, "").toLowerCase()];
};

const useFullResultsQuery = (location: string, offset: number) => {
  // const [isLastPage, setIsLastPage] = useToggle(false);
  const queryClient = useQueryClient();
  const locationKey = getLocationKey(location);
  return useQuery(
    locationKey,
    async (): Promise<StomaApiResponse> => {
      const queryData = queryClient.getQueryData(locationKey) as
        | StomaApiResponse
        | undefined;

      if (!queryData || queryData.businesses.length === 0) {
        const isDone =
          !!queryData &&
          (queryData.pageLength < 50 || queryData.offset + 50 === 1000);
        if (isDone) {
          throw new Error("Done fetching");
        }

        return await axios
          .get<StomaApiResponse>("/api/search", {
            params: {
              location: location,
              offset: !!queryData ? queryData.offset + 50 : offset,
            },
          })
          .then((resp) => resp.data);
      }

      return queryData;
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

export const useBusinessQuery = (location: string, offset: number) => {
  const queryClient = useQueryClient();
  const fullResultsQuery = useFullResultsQuery(location, offset);

  const locationKey = getLocationKey(location);
  const businessQuery = useQuery(
    ["single", location],
    async () => {
      const fullResult = await fullResultsQuery.refetch();
      const hasData =
        !fullResult.error &&
        fullResult.data !== undefined &&
        fullResult.data.businesses.length > 0;

      if (!hasData) {
        throw new Error("Cannot fetch more data");
      }

      const fullResultData = fullResult.data;
      const businesses = fullResultData!.businesses;
      return businesses[Math.floor(Math.random() * businesses.length)];
    },
    {
      retry: 1,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      onSuccess: (data: StomaBusiness) => {
        const resultData = data;
        console.log(resultData);
        queryClient.setQueryData(locationKey, (data: any) => {
          console.log(data);
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
