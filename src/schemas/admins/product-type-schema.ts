import { z } from "zod";

export const productTypeSchema = z.object({
  name: z.string().min(2, { message: "product type field required" }),
});
