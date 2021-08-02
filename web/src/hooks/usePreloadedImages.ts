import { useContext } from "react";
import PreloadedImagesContext from "../contexts/PreloadedImagesContext";

export const usePreloadedImages = () => useContext(PreloadedImagesContext);
