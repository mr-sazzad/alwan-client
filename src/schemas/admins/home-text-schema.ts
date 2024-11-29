import { z } from "zod";

export const homeTextSchema = z.object({
  id: z.string().optional(),
  title: z.string({ required_error: "Title field is required" }),
  text: z.string({ required_error: "Text field is required" }),
  categoryId: z.string().optional(),
  buttonText: z.string().optional(),
});
