import { z } from "zod";

export const SingleProductQuerySchema = z.object({
  qType: z.literal("byIds"),
  ids: z.array(z.string().min(1)).min(1).max(1),
});

export type SingleProductQuery = z.infer<typeof SingleProductQuerySchema>;
