import React, { useState } from "react";
import LocationContext from "./contexts/LocationContext";

export const LocationContextProvider: React.FC = ({ children }) => {
  const [location, setLocation] = useState("");

  const storeLocation = (newLocation: string) => {
    // TODO: Store record of locations in localstorage
    setLocation(newLocation);
  };

  return (
    <LocationContext.Provider
      value={{ location: location, setLocation: storeLocation }}>
      {children}
    </LocationContext.Provider>
  );
};
