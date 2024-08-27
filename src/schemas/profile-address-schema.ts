import { z } from "zod";

export const profileAddressSchema = z.object({
  id: z.string().optional(),
  addressId: z.string().optional(),
  division: z.string(),
  district: z.string(),
  upazila: z.string(),
  union: z.string(),
  streetAddress: z.string(),
});
