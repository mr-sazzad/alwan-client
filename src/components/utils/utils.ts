import { ISizeVariant } from "../../types";

export const shortenId = (id: string) => {
  if (id.length <= 13) return id;
  return `${id.slice(0, 4)}....${id.slice(-5)}`;
};

export const extractNameFromEmail = (email: string): string => {
  let name = email.split("@")[0];
  name = name.replace(/\d+$/, "");
  name = name.replace(/[^\w\s.-]/g, "");
  name = name.replace(/[._]/g, " ");
  name = name.replace(
    /\w\S*/g,
    (txt: string) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
  );

  return name || email;
};

export const formatPriceRange = (sizeVariants: ISizeVariant[]): string => {
  const prices = sizeVariants.map((variant) => variant.price);
  const uniquePrices = Array.from(new Set(prices));

  if (uniquePrices.length === 1) {
    return `${uniquePrices[0]}`;
  } else {
    const minPrice = Math.min(...uniquePrices);
    const maxPrice = Math.max(...uniquePrices);
    return `${minPrice} - ${maxPrice}`;
  }
};
