import { UseToggleValue } from "../lib/types";
import { useToggle } from "./useToggle";

const STORAGE_KEY = "viewedTutorial";

const parseBoolean = (str: string | null) => str?.toLowerCase() === "true";

export const useHasViewedTutorial = (): UseToggleValue => {
  const [val, setVal] = useToggle(
    parseBoolean(localStorage.getItem(STORAGE_KEY)) ?? false,
    (value: boolean) => {
      if (value) localStorage.setItem(STORAGE_KEY, "true");
      else localStorage.removeItem(STORAGE_KEY);
    }
  );

  return [val, setVal];
};
