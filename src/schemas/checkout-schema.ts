import { z } from "zod";

export const checkOutSchema = z.object({
  username: z.string().min(1, { message: "Please enter your name" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  phone: z
    .string()
    .min(11, { message: "Please enter a valid phone number" })
    .startsWith("01", { message: "Please enter a valid phone number" }),
  altPhone: z
    .string()
    .min(11, { message: "Please enter a valid phone number" })
    .startsWith("01", { message: "Please enter a valid phone number" }),
  city: z.string(),
  shippingAddress: z
    .string()
    .min(3, { message: "Please fill the address carefully" }),
  orderNote: z.string().optional(),
});
