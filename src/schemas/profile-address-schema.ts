import { z } from "zod";

export const profileAddressSchema = z.object({
  id: z.string().optional(),
  recipientName: z.string().optional(),
  phone: z.string().optional(),
  addressId: z.string().optional(),
  division: z.string(),
  divisionId: z.string().optional(),
  district: z.string(),
  districtId: z.string().optional(),
  upazila: z.string(),
  upazilaId: z.string().optional(),
  union: z.string(),
  unionId: z.string().optional(),
  streetAddress: z.string(),
});
