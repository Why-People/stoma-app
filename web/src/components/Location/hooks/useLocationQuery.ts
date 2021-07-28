import { useContext } from "react";
import LocationContext from "../contexts/LocationContext";

export const useLocationQueryParam = () => {
  return useContext(LocationContext);
};
