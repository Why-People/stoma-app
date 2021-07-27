import { createContext } from "react";

interface TutorialContextValue {
  progress: number;
  setProgress: (value: number) => void;
}

const TutorialContext = createContext<TutorialContextValue>({
  progress: 1,
  setProgress: (value: number) => console.log(value),
});

export default TutorialContext;
