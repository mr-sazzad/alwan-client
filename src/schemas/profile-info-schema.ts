import { z } from "zod";

export const profileInfoSchema = z.object({
  username: z.string().min(3, { message: "Name field is required" }),
  phone: z
    .string()
    .min(11, { message: "Phone field must contain at least 11 character(s)" }),
  altPhone: z
    .string()
    .optional()
    .refine((val) => !val || val.length === 11, {
      message: "Phone number must be exactly 11 digits",
    }),
  email: z
    .string()
    .email({ message: "Email field is required" })
    .readonly()
    .optional(),
});
