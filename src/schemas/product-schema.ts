import z from "zod";

export const colors = [
  "black",
  "white",
  "skyblue",
  "gray",
  "purple",
  "lightgreen",
  "multicolor",
] as const;

export const status = ["in_stock", "stock_out"] as const;

export const productSchema = z.object({
  images: z
    .array(
      z
        .instanceof(File)
        .refine(
          (file) => file.size < 3 * 1024 * 1024,
          "File size must be less than 2MB"
        )
    )
    .min(1, "At least 1 file is required")
    .refine(
      (files) => files.every((file) => file.size < 3 * 1024 * 1024),
      "File size must be less than 2MB"
    ),
  name: z.string().min(7, { message: "name shuld be at leates 7 chacracters" }),
  sizes: z.string().array(),
  color: z.enum(colors).default("black"),
  isFreeDelivaryAvailable: z.string().default("no"),
  status: z.enum(status).default("in_stock"),
  prices: z.string().min(3, { message: "price is required" }),
  features: z.string(),
  desc: z.string(),
  mSizeStocks: z.string(),
  lSizeStocks: z.string(),
  xlSizeStocks: z.string(),
  xxlSizeStocks: z.string(),
});
