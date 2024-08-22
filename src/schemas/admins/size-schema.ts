import { z } from "zod";

export const sizeSchema = z.object({
  name: z.string().min(1, { message: "Color Name field required" }),
});

export const sizeUpdateSchema = z.object({
  name: z.string().min(1, { message: "Make change first" }),
});
