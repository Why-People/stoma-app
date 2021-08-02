import { createContext } from "react";
import { TutorialProgress } from "../../../lib/types";

interface TutorialContextValue {
  progress: TutorialProgress;
  setProgress: (up: boolean) => void;
}

const TutorialContext = createContext<TutorialContextValue>({
  progress: 1,
  setProgress: (up: boolean) => console.log(up),
});

export default TutorialContext;
