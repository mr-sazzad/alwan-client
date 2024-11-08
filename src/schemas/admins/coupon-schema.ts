import { z } from "zod";

export const CouponSchema = z
  .object({
    code: z.string().min(1, { message: "Coupon Code is required" }),
    discountType: z.enum(["PERCENTAGE", "FIXED"], {
      errorMap: () => ({ message: "Invalid discount type" }),
    }),
    discountValue: z
      .number()
      .positive({ message: "Discount value must be a positive number" }),
    type: z.enum(["GLOBAL", "CATEGORY", "PRODUCT", "DELIVERY"], {
      errorMap: () => ({ message: "Invalid coupon type" }),
    }),
    startDate: z.coerce.date({
      invalid_type_error: "Start date must be a valid date",
    }),
    endDate: z.coerce.date({
      invalid_type_error: "End date must be a valid date",
    }),
    usageLimit: z
      .number()
      .int()
      .positive({ message: "Usage limit must be a positive integer" }),
    usedCount: z
      .number()
      .int()
      .nonnegative({ message: "Used count must be a non-negative integer" }),
    minOrderValue: z.number().nonnegative({
      message: "Minimum order value must be a non-negative number",
    }),
    categories: z.array(z.string()).optional(),
    products: z.array(z.string()).optional(),
  })
  .refine((data) => data.endDate > data.startDate, {
    message: "End date must be after start date",
    path: ["endDate"],
  });
