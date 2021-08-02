import React, { useState } from "react";
import { TutorialProgress } from "../../lib/types";
import TutorialContext from "./contexts/TutorialContext";

export const TutorialContextProvider: React.FC = ({ children }) => {
  const [progress, setProgress] = useState(1);
  const handleValueChange = (up: boolean) => {
    if (
      (progress === TutorialProgress.Start && !up) ||
      (progress === TutorialProgress.End && up)
    )
      return;
    setProgress(progress + (up ? 1 : -1));
  };
  return (
    <TutorialContext.Provider
      value={{
        progress: progress,
        setProgress: handleValueChange,
      }}>
      {children}
    </TutorialContext.Provider>
  );
};
