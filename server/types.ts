import { YelpBusiness } from "./yelpTypes";

export enum StomaPriceRating {
  Cheap = "Cheap",
  Middling = "Middling",
  Expensive = "Expensive",
  VeryExpensive = "Very Expensive",
}

export interface StomaBusinessIndex {
  business: YelpBusiness;
  index: number;
}

export type StomaResponse = [StomaApiResponse, StomaErrorResponse];

export interface StomaApiResponse {
  businesses: StomaBusiness[];
  pageLength: number;
  total: number;
  offset: number;
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
