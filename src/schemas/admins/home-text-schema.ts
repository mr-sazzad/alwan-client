import { z } from "zod";

export const homeTextSchema = z.object({
  id: z.string().optional(),
  firstTitle: z.string({ required_error: "First title field is required" }),
  secondTitle: z.string().optional(),
  text: z.string({ required_error: "Text field is required" }),
  categoryId: z.string().optional(),
  buttonText: z.string().optional(),
});
