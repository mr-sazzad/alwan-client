import { z } from "zod";

export const categorySchema = z.object({
  name: z.string().min(2, { message: "Coupon Code field required" }),
  file: z.nullable(
    z
      .instanceof(File)
      .refine(
        (file) => file.size < 3 * 1024 * 1024,
        "File size must be less than 2MB"
      )
  ),
  parentId: z.string().optional(),
  clientUrl: z.string().min(3, { message: "Client URL field is required" }),
  firstTitle: z.string().optional(),
  secondTitle: z.string().optional(),
  isOnHomePage: z.string().optional(),
});
