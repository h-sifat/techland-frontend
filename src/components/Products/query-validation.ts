import { z } from "zod";
import { config } from "../../config";

const ListQuerySchema = z.object({
  brandIds: z.array(z.string().min(1)).default([]),
  categoryId: z.string().min(1).optional(),

  priceRange: z
    .object({
      min: z.number().positive().optional(),
      max: z.number().positive().optional(),
    })
    .strict()
    .refine(({ min = -Infinity, max = Infinity }) => min <= max, {
      message: `Price Range: "min" must be less than "max".`,
    })
    .optional(),

  sortBy: z
    .object({
      price: z.union([z.literal("1"), z.literal("-1")]),
    })
    .default({ price: "1" }),
  pagination: z
    .object({
      pageNumber: z.number().nonnegative().int(),
      itemsPerPage: z.number().int().nonnegative(),
    })
    .default({
      pageNumber: 1,
      itemsPerPage: config.DEFAULT_PRODUCTS_PER_PAGE,
    }),
});

const SearchQuerySchema = z
  .object({
    query: z.string().trim().min(1).max(config.MAX_SEARCH_QUERY_LENGTH),
  })
  .merge(ListQuerySchema.pick({ pagination: true }));

export const QuerySchema = z.discriminatedUnion("qType", [
  z.object({ qType: z.literal("list") }).merge(ListQuerySchema),
  z.object({ qType: z.literal("search") }).merge(SearchQuerySchema),
]);
