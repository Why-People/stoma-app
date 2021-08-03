import { useRef } from "react";
import { ImagePreloader } from "../lib/ImagePreloader";

export const useImagePreloader = (baseUrl: string | undefined) => {
  const imagePreloaderRef = useRef(new ImagePreloader(baseUrl));
  return imagePreloaderRef.current;
};
