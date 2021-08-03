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

export const getTutorialImages = (isDarkMode: boolean, isMobile: boolean) => {
  const imgs = [
    "DarkModeListing.png",
    "DarkModeListingMobile.png",
    "DarkModeNewLocation.png",
    "DarkModeNewLocationMobile.png",
    "DarkModeSearch.png",
    "LightModeListing.png",
    "LightModeListingMobile.png",
    "LightModeNewLocation.png",
    "LightModeNewLocationMobile.png",
    "LightModeSearch.png",
  ];
  const tutorialImages: string[] = [];

  imgs.forEach((img) => {
    const isProperColorMode =
      (img.startsWith("DarkMode") && isDarkMode) ||
      (img.startsWith("LightMode") && !isDarkMode);
    if (!isProperColorMode) return;

    if (img.includes("Search")) {
      tutorialImages.push(img);
      return;
    }

    const isProperDevice =
      (img.includes("Mobile") || isMobile) &&
      (!img.includes("Mobile") || !isMobile);

    if (isProperDevice) {
      tutorialImages.push(img);
    }
  });

  return tutorialImages;
};
