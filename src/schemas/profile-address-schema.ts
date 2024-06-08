import { z } from "zod";

export const profileAddressSchema = z.object({
  shippingDistrict: z.string(),
  shippingAddress: z.string(),
});
