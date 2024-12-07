import z from "zod";

export const statusEnum = ["AVAILABLE", "OUT_OF_STOCK", "COMING_SOON"] as const;

export const availabilityTag = [
  "sustainable material",
  "Just In",
  "Comfortable",
  "Durable",
  "Stylish",
  "Trendy",
  "Elegant",
  "Casual",
  "Formal",
  "Sporty",
  "Luxurious",
  "Minimalist",
  "Premium",
  "Limited Edition",
  "Exclusive",
  "Versatile",
  "Unique",
  "Handmade",
  "Organic",
  "Eco-Friendly",
  "High-Quality",
  "Innovative",
  "Modern",
  "Classic",
  "Trending",
  "Hipster",
  "Vintage",
  "Retro",
  "Budget friendly",
];

export const productSchema = z.object({
  files: z
    .array(
      z.instanceof(File).refine((file) => file.size < 3 * 1024 * 1024, {
        message: "File size must be less than 3MB",
      })
    )
    .min(1, { message: "At least 1 file is required" }),
  name: z.string().min(4, { message: "name field is required / 4" }),
  description: z.string().min(1, { message: "Description is required" }),
  features: z.string().min(5, { message: "Feature is required" }),
  categoryId: z.string().min(5, { message: "Category ID is required" }),
  productTypeId: z.string().min(5, { message: "Product Type ID is required" }),
  stockStatus: z
    .enum(statusEnum)
    .refine((value) => statusEnum.includes(value), {
      message: "must be either 'In stock' or 'Out of stock'",
    })
    .default("AVAILABLE"),
  availabilityTag: z
    .string()
    .refine((value) => availabilityTag.includes(value), {
      message: "Invalid availability tag",
    })
    .optional(),
  couponEligible: z.boolean().default(false),
  freeShippingAvailable: z.boolean().default(false),
  isNewArrival: z.boolean().default(false),
  sku: z.string().min(1, { message: "SKU is required" }),
  sizeVariants: z.array(
    z.object({
      price: z.number(),
      discountedPrice: z.number().optional(),
      stock: z.number(),
      colorId: z.string().min(1, { message: "Color ID is required" }),
      sizeId: z.string().min(1, { message: "Size ID is required" }),
      manufacturingCost: z.number(),
    })
  ),
});

export type ProductSchema = z.infer<typeof productSchema>;
