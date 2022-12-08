import { Query } from "../../util/query";
import { QuerySchema } from "./query-validation";
import { formatError } from "../../util/format-error";
import type { ListProductsQuery } from "../../interfaces/product";

export type ParsedProductQueryResult =
  | { success: true; value: ListProductsQuery }
  | { success: false; message: string };

export function parseProductsQuery(): ParsedProductQueryResult {
  let _query: any = { qType: "list" };

  const queryString = new URL(window.location.href).search;
  if (queryString)
    try {
      _query = Query.parse(queryString);
    } catch (ex) {
      return { success: false, message: ex.message };
    }

  const validationResult = QuerySchema.safeParse(_query);
  if (!validationResult.success) {
    return {
      success: false,
      message: formatError(validationResult.error.flatten() as any),
    };
  }

  return { success: true, value: validationResult.data as any };
}
