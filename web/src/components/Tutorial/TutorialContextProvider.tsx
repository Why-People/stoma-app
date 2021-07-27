import React, { useState } from "react";
import TutorialContext from "./contexts/TutorialContext";

export const TutorialContextProvider: React.FC = ({ children }) => {
  const [progress, setProgress] = useState(1);
  return (
    <TutorialContext.Provider
      value={{
        progress: progress,
        setProgress: setProgress,
      }}>
      {children}
    </TutorialContext.Provider>
  );
};
