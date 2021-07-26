export interface YelpApiResponse {
  businesses: YelpBusiness[];
  total: number;
  region: Region;
}

export interface YelpBusiness {
  id: string;
  alias: string;
  name: string;
  image_url: string;
  is_closed: boolean;
  url: string;
  review_count: number;
  categories: Category[];
  rating: number;
  coordinates: Center;
  transactions: string[];
  price?: YelpPrice;
  location: Location;
  phone: string;
  display_phone: string;
  distance: number;
}

export interface Category {
  alias: string;
  title: string;
}

export interface Center {
  latitude: number;
  longitude: number;
}

export interface Location {
  address1: string;
  address2: string | null;
  address3: string | null;
  city: string;
  zip_code: string;
  country: string;
  state: string;
  display_address: string[];
}

export enum YelpPrice {
  Middling = "$$",
  Cheap = "$",
  Expensive = "$$$",
  VeryExpensive = "$$$$",
}

export interface Region {
  center: Center;
}
