import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email({ message: "email is required" }),
  password: z.string().nonempty({ message: "password is required" }),
});
