import express, { Request, Response } from "express";
import Router from "express-promise-router";
import { query, validationResult } from "express-validator";
import axios, { AxiosResponse } from "axios";
import {
  StomaPriceRating,
  StomaApiResponse,
  StomaBusinessIndex,
} from "./types";
import Redis from "ioredis";
import { YelpApiResponse, YelpBusiness, YelpPrice } from "./yelpTypes";
require("dotenv").config();

const app = express();
const router = Router();
const redis = new Redis(process.env.REDIS_URL);
app.use(router);
const port = 5000;

const maxBusinesses = 1000;
const cacheTime = 1 * 60 * 10; // 10 minutes

axios.defaults.headers["Authorization"] = `Bearer ${process.env.YELP_KEY}`;
axios.defaults.params = {
  term: "restaurant, food",
  open_now: true,
  limit: 50,
};

const stomaPriceMap: Record<YelpPrice, StomaPriceRating> = {
  [YelpPrice.Cheap]: StomaPriceRating.Cheap,
  [YelpPrice.Middling]: StomaPriceRating.Middling,
  [YelpPrice.Expensive]: StomaPriceRating.Expensive,
  [YelpPrice.VeryExpensive]: StomaPriceRating.VeryExpensive,
};

const getPriceRating = (
  yelpPrice: YelpPrice | undefined
): StomaPriceRating | null => {
  if (!yelpPrice) return null;
  return stomaPriceMap[yelpPrice];
};

const formatRestaurantListing = (
  yelpBusiness: YelpBusiness
): StomaApiResponse => {
  const categories: string[] = yelpBusiness.categories.map(
    (category: any) => category.title
  );
  const priceRating = getPriceRating(yelpBusiness.price);

  // Stop the snake case apocalypse
  return {
    yelpId: yelpBusiness.id,
    name: yelpBusiness.name,
    address: yelpBusiness.location.display_address,
    categories: categories,
    transactions: yelpBusiness.transactions,
    priceRating: priceRating,
    phone: yelpBusiness.display_phone,
    rating: yelpBusiness.rating,
    imgUrl: yelpBusiness.image_url,
  };
};

const fetchYelpData = async (
  location: string,
  offset: number,
  redisKey: string
): Promise<YelpApiResponse> => {
  // Try to get from cache
  const cachedData = await redis.get(redisKey);
  if (cachedData) {
    return JSON.parse(cachedData) as YelpApiResponse;
  }

  return await axios
    .get<YelpApiResponse>("https://api.yelp.com/v3/businesses/search", {
      params: {
        location: location,
        offset: offset,
      },
    })
    .then((resp) => resp.data);
};

router.get(
  "/api/search",
  query("location").isString(),
  query("offset").isNumeric(),
  async (req: Request, res: Response) => {
    // Validate Request params
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(400)
        .json({ message: "Invalid Request Params", errors: errors.array() });
    }

    const location = req.query.location as string;
    const offset = req.query.offset as string;
    const redisKey = `remainingBusinesses::${location}::${offset}`;

    const yelpBusinessData = await fetchYelpData(
      location,
      parseInt(offset),
      redisKey
    );

    // Select random business
    const index = Math.floor(
      Math.random() * yelpBusinessData.businesses.length
    );
    const selectedBusiness = yelpBusinessData.businesses[index];

    // Cache data for 10 minutes
    await redis.set(
      redisKey,
      JSON.stringify(yelpBusinessData),
      "ex",
      cacheTime
    );

    res.status(200).json({
      result: formatRestaurantListing(selectedBusiness),
      found:
        yelpBusinessData.total > maxBusinesses
          ? maxBusinesses
          : yelpBusinessData.total,
    });
  }
);

app.listen(port, () => {
  console.log(`Stoma Server started on port ${port}`);
});
