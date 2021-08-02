import { useEffect } from "react";
import { usePreloadedImages } from "./usePreloadedImages";

export const useImagePreloader = (src: string[]) => {
  const { setSrc } = usePreloadedImages();

  useEffect(() => {
    if (!setSrc) return;
    console.log("Preloading Images");
    src.forEach((s) => {
      const img = new Image();
      img.src = s;
    });
    setSrc(src);
  }, [src]);
};
