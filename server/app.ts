import express, { Request, Response } from "express";
import cors from "cors";
import Router from "express-promise-router";
import { query, validationResult } from "express-validator";
import axios from "axios";
import { StomaApiResponse, StomaPriceRating } from "./types";
import Redis from "ioredis";
import { YelpApiResponse, YelpBusiness, YelpPrice } from "./yelpTypes";
require("dotenv").config();

const corsConfig = {
  origin: process.env.CORS_ORIGIN,
};

const app = express();
// const corsObj = cors(corsConfig);
const router = Router();
const redis = new Redis(process.env.REDIS_URL);
app.use(router);
// app.use(corsObj);
const port = process.env.SERVER_PORT;

const maxBusinesses = 1000; // Yelp only allows upto 1000 results to be fetched through pagination
const cacheTime = 60 * 20; // 20 minutes

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

const getPriceRating = (yelpPrice: YelpPrice | undefined) => {
  if (!yelpPrice) return null;
  return stomaPriceMap[yelpPrice];
};

// Yelp Api Response -> Stoma Response
const formatRestaurantListing = (yelpBusiness: YelpBusiness) => {
  const categories: string[] = yelpBusiness.categories.map(
    (category: any) => category.title
  );
  const priceRating = getPriceRating(yelpBusiness.price);

  // Stop the snake case apocalypse
  return {
    yelpId: yelpBusiness.id,
    yelpUrl: yelpBusiness.url,
    name: yelpBusiness.name,
    address: yelpBusiness.location.display_address,
    categories: categories,
    transactions: yelpBusiness.transactions,
    priceRating: priceRating,
    coordinates: yelpBusiness.coordinates,
    phone: yelpBusiness.display_phone,
    rating: yelpBusiness.rating,
    reviewCount: yelpBusiness.review_count,
    imgUrl: yelpBusiness.image_url,
  };
};

const getCacheKey = (location: string, offset: number) => {
  // Try to make "very" similar keys match
  // Eg. A user may input "san francisco" another may input "San Francisco"
  // Those 2 keys would return the same response, so only 1 cache key is needed for both
  const locationKey = location.replace(/[ ,]+/g, "_").toLowerCase();
  return `remainingBusinesses::${locationKey}::${offset}`;
};

const fetchStomaData = async (location: string, offset: number) => {
  if (offset === maxBusinesses) throw new Error("Maximum Offset exceeded");
  const cacheKey = getCacheKey(location, offset);
  // Try to get from cache
  const cachedData = await redis.get(cacheKey);
  if (cachedData) {
    return JSON.parse(cachedData) as StomaApiResponse;
  }

  const yelpData = await axios
    .get<YelpApiResponse>("https://api.yelp.com/v3/businesses/search", {
      params: {
        location: location,
        offset: offset,
      },
    })
    .then((resp) => resp.data);

  const stomaData: StomaApiResponse = {
    businesses: yelpData.businesses.map((yelpBusiness) =>
      formatRestaurantListing(yelpBusiness)
    ),
    pageLength: yelpData.businesses.length,
    total: yelpData.total > maxBusinesses ? maxBusinesses : yelpData.total,
    offset: offset,
  };

  // Cache data for 10 minutes
  await redis.set(cacheKey, JSON.stringify(stomaData), "ex", cacheTime);
  return stomaData;
};

router.get(
  "/api/search",
  query("location").isString(),
  query("offset").isNumeric(),
  cors(corsConfig),
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

    try {
      res.status(200).json(await fetchStomaData(location, parseInt(offset)));
    } catch (err) {
      console.log(err);
      res
        .status(400)
        .json({ error: "DataFetchError", message: "Failed to fetch Data" });
    }
  }
);

app.listen(port, () => {
  console.log(`Stoma Server started on port ${port}`);
});
