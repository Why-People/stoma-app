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

export interface StomaApiResponse {
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
