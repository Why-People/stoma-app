export const getRatingAssetPosition = (rating: number) => {
  const pos = (rating / 0.5) * 24 - 24;
  console.log(pos);
  return { backgroundPosition: `0 -${pos}px` };
};

const googleMapsBaseUrl = "https://www.google.com/maps/search/?api=1";

export const getGoogleMapsUrl = (businessName: string) => {
  const queryParam = businessName
    .replace(/[|]+/g, "%7C")
    .replace(/[,]+/g, "%2C")
    .replace(/[ ]+/g, "+")
    .toLowerCase();
  return `${googleMapsBaseUrl}&query=${queryParam}`;
};

export const formatTransactions = (transactions: string[]) => {
  if (transactions.length === 0) return "Unknown";
  return transactions
    .map((transaction) =>
      transaction
        .replace(/[_]+/, " ")
        .replace(/(\b[a-z](?!\s))/g, (x) => x.toUpperCase())
    )
    .join(" • ");
};

const baseImgBucketUrl = "https://storage.googleapis.com/stoma-assets";

export const getTutorialImages = () => {
  // TODO: Do this better tommorow
  return [
    baseImgBucketUrl + "/DarkModeListing.png",
    baseImgBucketUrl + "/DarkModeListingMobile.png",
    baseImgBucketUrl + "/DarkModeNewLocation.png",
    baseImgBucketUrl + "/DarkModeNewLocationMobile.png",
    baseImgBucketUrl + "/DarkModeSearch.png",
    baseImgBucketUrl + "/LightModeListing.png",
    baseImgBucketUrl + "/LightModeListingMobile.png",
    baseImgBucketUrl + "/LightModeNewLocation.png",
    baseImgBucketUrl + "/LightModeNewLocationMobile.png",
    baseImgBucketUrl + "/LightModeSearch.png",
  ];
};
