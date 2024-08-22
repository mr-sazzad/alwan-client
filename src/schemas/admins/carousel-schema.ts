import { z } from "zod";

export const carouselSchema = z.object({
  files: z
    .array(
      z
        .instanceof(File)
        .refine(
          (file) => file.size < 3 * 1024 * 1024,
          "File size must be less than 2MB"
        )
    )
    .min(1, "At least 1 file is required")
    .refine(
      (files) => files.every((file) => file.size < 3 * 1024 * 1024),
      "File size must be less than 2MB"
    ),
});
