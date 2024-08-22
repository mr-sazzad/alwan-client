import { z } from "zod";

export const couponSchema = z.object({
  code: z.string().min(1, { message: "Coupon Code field required" }),
  discountType: z
    .enum(["PERCENTAGE", "FIXED"])
    .refine((val) => ["PERCENTAGE", "FIXED"].includes(val), {
      message: "Invalid discount type",
    }),
  discountValue: z
    .string()
    .min(0, { message: "Discount value must be a positive number" }),
  expiryDate: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: "Invalid expiry date",
  }),
});
