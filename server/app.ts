import express, { Request, Response, NextFunction } from "express";
import axios from "axios";
import {
  PriceMap,
  PriceRating,
  StomaRestaurantResponse,
  YelpPrice,
} from "./types";
require("dotenv").config();

const priceMap = {
  $: "Cheap",
  $$: "Mid Range",
  $$$: "Expensive",
  $$$$: "Very Expensive",
};

const app = express();
const port = 8080;

axios.defaults.headers["Authorization"] = `Bearer ${process.env.YELP_KEY}`;
axios.defaults.params = {
  term: "restaurant, food",
  open_now: true,
  limit: 50,
};

app.get("/", (req, res) => {
  res.send("Hello World!");
});

const getPriceRating = (yelpPrice: YelpPrice): PriceRating | null => {
  switch (yelpPrice) {
    case "$":
      return "Cheap";
    case "$$":
      return "Mid Range";
    case "$$$":
      return "Expensive";
    case "$$$$":
      return "Very Expensive";
    default:
      return null;
  }
};

const getCategories = (categories: any): string[] => {
  return categories.map((category: any) => category.title);
};

const formatRestaurantListing = (
  yelpApiResponse: any
): StomaRestaurantResponse => {
  return {
    yelpId: yelpApiResponse.id,
    name: yelpApiResponse.name,
    address: yelpApiResponse.location.display_address,
    categories: getCategories(yelpApiResponse.categories),
    transactions: yelpApiResponse.transactions,
    priceRating: getPriceRating(yelpApiResponse.price),
    phone: yelpApiResponse.display_phone,
    rating: yelpApiResponse.rating,
    imgUrl: yelpApiResponse.image_url,
  };
};

app.get("/api/search", async (req: Request, res: Response) => {
  const location = req.query.location;
  const resp = await axios.get("https://api.yelp.com/v3/businesses/search", {
    params: {
      location: location,
    },
  });

  // console.log(resp.data);
  const testResp = resp.data.businesses?.map((yelpResponse: any) =>
    formatRestaurantListing(yelpResponse)
  );
  res.status(200).json({ data: testResp, length: resp.data.businesses.length });
});

app.listen(port, () => {
  console.log(`Stoma Server started on port ${port}`);
});
