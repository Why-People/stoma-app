import React, { useState } from "react";
import LocationContext from "./contexts/LocationContext";

export const LocationContextProvider: React.FC = ({ children }) => {
  const [location, setLocation] = useState("");
  return (
    <LocationContext.Provider
      value={{ location: location, setLocation: setLocation }}>
      {children}
    </LocationContext.Provider>
  );
};
