import { createContext, useState } from "react";

interface PreloadedImagesContextType {
  src: string[];
  setSrc: (src: string[]) => void;
}

const PreloadedImagesContext = createContext<
  Partial<PreloadedImagesContextType>
>({});

export default PreloadedImagesContext;
