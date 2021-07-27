import { createContext } from "react";

interface LocationContextValue {
  location: string;
  setLocation: (value: string) => void;
}

const LocationContext = createContext<LocationContextValue>({
  location: "",
  setLocation: (value: string) => console.log(value),
});
export default LocationContext;
