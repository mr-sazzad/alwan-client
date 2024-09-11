import { z } from "zod";

export const notificationSchema = z.object({
  email: z.string().email({ message: "email is required" }),
});
