import { useContext } from "react";
import LocationContext from "../contexts/LocationContext";

export const useLocationQuery = () => {
  return useContext(LocationContext);
};
