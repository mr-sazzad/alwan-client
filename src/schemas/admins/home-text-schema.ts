import { z } from "zod";

export const homeTextSchema = z.object({
  id: z.string().optional(),
  title: z.string({ required_error: "Title field is required" }),
  text: z.string({ required_error: "Text field is required" }),
  categoryId: z.string({ required_error: "Category Id field is required" }),
  buttonText: z.string({ required_error: "Button Text field is required" }),
});
