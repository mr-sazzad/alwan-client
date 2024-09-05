import { z } from "zod";

export const CouponSchema = z.object({
  code: z.string().min(1, { message: "Coupon Code field required" }),
  discountType: z
    .enum(["PERCENTAGE", "FIXED"])
    .refine((val) => ["PERCENTAGE", "FIXED"].includes(val), {
      message: "Invalid discount type",
    }),
  discountValue: z.number().min(1, { message: "must be a positive number" }),

  type: z
    .enum(["GLOBAL", "CATEGORY", "PRODUCT", "DELIVERY"])
    .refine((val) => ["PERCENTAGE", "FIXED"].includes(val), {
      message: "Invalid discount type",
    }),
  startDate: z.date({
    required_error: "start date is required.",
  }),
  endDate: z.date({
    required_error: "end date is required.",
  }),
  usageLimit: z.number({ required_error: "usage limit is required" }),
  usedCounT: z.number({ required_error: "used CounT is required" }),
  minOrderValue: z.number({ required_error: "min OrderValue is required" }),
  categories: z.string().array().optional(),
  products: z.string().array().optional(),
});
