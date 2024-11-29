import { z } from "zod";

export const formSchema = z.object({
  brandPhone: z.string().min(2, {
    message: "Brand phone must be at least 2 characters.",
  }),
  brandEmail: z.string().email({
    message: "Please enter a valid email address.",
  }),
  invoiceDate: z.date(),
  notes: z.string(),
});
