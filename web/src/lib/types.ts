import Toggle from "./Toggle";

export type UseToggleValue = [boolean, Toggle];

export type StomaData = StomaApiResponse | StomaErrorResponse;

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
  name: string;
  address: string[];
  categories: string[];
  transactions: string[];
  priceRating: StomaPriceRating | null;
  phone: string | null;
  rating: number;
  imgUrl: string;
}
