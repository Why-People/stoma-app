export const getRatingAssetPosition = (rating: number) => {
  const pos = (rating / 0.5) * 24 - 24;
  console.log(pos);
  return { backgroundPosition: `0 -${pos}px` };
};

const googleMapsBaseUrl = "https://www.google.com/maps/search/?api=1";

export const getGoogleMapsUrl = (businessName: string) => {
  const queryParam = businessName
    .replace(/[|]+/, "%7C")
    .replace(/[,]+/, "%2C")
    .replace(/[ ]+/, "+")
    .toLowerCase();
  return `${googleMapsBaseUrl}&query=${queryParam}`;
};
