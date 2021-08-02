import { useState } from "react";
import PreloadedImagesContext from "../contexts/PreloadedImagesContext";

export const PreloadedImagesProvider: React.FC = ({ children }) => {
  const [src, setSrc] = useState<string[]>([]);

  return (
    <PreloadedImagesContext.Provider value={{ src: src, setSrc: setSrc }}>
      {children}
    </PreloadedImagesContext.Provider>
  );
};
