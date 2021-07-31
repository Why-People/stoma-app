import Toggle from "./Toggle";

export type UseToggleValue = [boolean, Toggle];

export type StomaData = StomaApiResponse | StomaErrorResponse;

export interface Coordinates {
  latitude: number;
  longitude: number;
}

export interface StomaApiResponse {
  businesses: StomaBusiness[];
  pageLength: number;
  total: number;
  offset: number;
}

export enum StomaPriceRating {
  Cheap = "Cheap",
  Middling = "Middling",
  Expensive = "Expensive",
  VeryExpensive = "Very Expensive",
}

export interface StomaErrorResponse {
  error: string;
  message: string;
}

export interface StomaBusiness {
  yelpId: string;
  yelpUrl: string;
  name: string;
  address: string[];
  categories: string[];
  transactions: string[];
  priceRating: StomaPriceRating | null;
  coordinates: Coordinates;
  phone: string | null;
  rating: number;
  reviewCount: number;
  imgUrl: string;
}
