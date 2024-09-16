import { z } from "zod";

export const addressSchema = z.object({
  recipientName: z.string().min(1, { message: "Please enter your name" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  phone: z
    .string()
    .min(11, { message: "Please enter a valid phone number" })
    .startsWith("01", { message: "Please enter a valid phone number" }),
  altPhone: z.string().optional(),
  division: z
    .string()
    .min(1, { message: "Please fill the division carefully" }),
  district: z
    .string()
    .min(1, { message: "Please fill the district carefully" }),
  upazila: z.string().min(1, { message: "Please fill the upazila carefully" }),
  union: z.string().min(1, { message: "Please fill the union carefully" }),
  streetAddress: z
    .string()
    .min(3, { message: "Please fill the address carefully" }),
});
