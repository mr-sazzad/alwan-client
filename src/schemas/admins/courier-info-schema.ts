import { z } from "zod";

export const courierInfoSchema = z.object({
  courierName: z.string().min(2, "Courier name must be at least 2 characters."),
  trackingNumber: z
    .string()
    .min(2, "Tracking number must be at least 2 characters."),
  trackingUrl: z.string().url("Invalid URL").optional().or(z.literal("")),
  shippedAt: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Invalid date and time",
  }),
});
