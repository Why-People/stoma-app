export type PriceRating =
  | "Cheap"
  | "Mid Range"
  | "Expensive"
  | "Very Expensive";
export type YelpPrice = "$" | "$$" | "$$$" | "$$$$";

export interface PriceMap {
  YelpPrice: PriceRating;
}

// {
//     "id": "ox_OdM0CC3KdJWW8vXwpcQ",
//     "alias": "the-lark-bar-san-francisco",
//     "name": "The Lark Bar",
//     "image_url": "https://s3-media3.fl.yelpcdn.com/bphoto/5PaBPmqWLzX83Vnpg_G0tQ/o.jpg",
//     "is_closed": false,
//     "url": "https://www.yelp.com/biz/the-lark-bar-san-francisco?adjust_creative=8UA0fbQ8l9M6YuKpb7lykA&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=8UA0fbQ8l9M6YuKpb7lykA",
//     "review_count": 173,
//     "categories": [
//       {
//         "alias": "sportsbars",
//         "title": "Sports Bars"
//       },
//       {
//         "alias": "beerbar",
//         "title": "Beer Bar"
//       },
//       {
//         "alias": "cocktailbars",
//         "title": "Cocktail Bars"
//       }
//     ],
//     "rating": 4,
//     "coordinates": {
//       "latitude": 37.7872541,
//       "longitude": -122.4030379
//     },
//     "transactions": [

//     ],
//     "price": "$$",
//     "location": {
//       "address1": "29 3rd St",
//       "address2": null,
//       "address3": "",
//       "city": "San Francisco",
//       "zip_code": "94103",
//       "country": "US",
//       "state": "CA",
//       "display_address": [
//         "29 3rd St",
//         "San Francisco, CA 94103"
//       ]
//     },

export interface StomaRestaurantResponse {
  yelpId: string;
  name: string;
  address: string[];
  categories: string[];
  transactions: string[];
  priceRating: PriceRating | null;
  phone: string | null;
  rating: number;
  imgUrl: string;
}
