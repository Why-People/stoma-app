import { useState } from "react";
import Toggle from "../lib/Toggle";
import { UseToggleValue } from "../lib/types";

// useBoolean-like hook that allows for a more OOP approach
export const useToggle = (
  initialValue: boolean,
  toggleFn?: (value: boolean) => void
): UseToggleValue => {
  const [val, setVal] = useState(initialValue);
  const toggle = new Toggle(val, (value: boolean) => {
    if (toggleFn) toggleFn(value);
    setVal(value);
  });
  return [val, toggle];
};
