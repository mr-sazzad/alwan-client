import { z } from "zod";

export const colorSchema = z.object({
  name: z.string().min(2, { message: "Color field required" }),
  hexCode: z.string().min(3, { message: "hex code field required" }),
});
