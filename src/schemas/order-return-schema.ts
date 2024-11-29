import * as z from "zod";

export const returnOrderSchema = z.object({
  returnReason: z.string().min(1, "Return reason is required"),
  returnNote: z.string().optional(),
  returnQuantity: z.number().min(1).optional(),
  confirmText: z.string().refine((value) => value.toLowerCase() === "return", {
    message: "Please type 'return' to confirm",
  }),
});

export type ReturnOrderFormValues = z.infer<typeof returnOrderSchema>;
