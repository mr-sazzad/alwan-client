import z from "zod";

export const statusEnum = ["IN_STOCK", "OUT_OF_STOCK"] as const;

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
  status: z
    .enum(statusEnum)
    .refine((value) => statusEnum.includes(value), {
      message: "must be either 'In stock' or 'Out of stock'",
    })
    .default("IN_STOCK"),
  isCouponApplicable: z.string().default("No"),
  isFreeDeliveryAvailable: z.string().default("No"),
  sizeVariants: z.array(
    z.object({
      price: z.number(),
      stock: z.number(),
      colorId: z.string().min(1, { message: "Color ID is required" }),
      sizeId: z.string().min(1, { message: "Size ID is required" }),
    })
  ),
});

export type ProductSchema = z.infer<typeof productSchema>;
