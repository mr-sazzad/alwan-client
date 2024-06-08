import { z } from "zod";

export const couponSchema = z.object({
  coupon: z.string().min(3, { message: "Coupon atleast will be 3 character" }),
});
