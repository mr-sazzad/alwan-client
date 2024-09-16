import { z } from "zod";

export const signUpSchema = z.object({
  email: z.string().email({ message: "It could be an valid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
  retypePassword: z.string().min(6),
});
