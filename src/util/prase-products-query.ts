import { formatError } from "./format-error";
import { Query } from "./query";

export type ParsedProductQueryResult<QueryType> =
  | { success: true; value: QueryType }
  | { success: false; message: string };

export function parseProductsQuery<QueryType>(
  querySchema: any
): ParsedProductQueryResult<QueryType> {
  let _query: any = { qType: "list" };

  const queryString = new URL(window.location.href).search;
  if (queryString)
    try {
      _query = Query.parse(queryString);
    } catch (ex) {
      return { success: false, message: ex.message };
    }

  const validationResult = querySchema.safeParse(_query);
  if (!validationResult.success) {
    return {
      success: false,
      message: formatError(validationResult.error.flatten() as any),
    };
  }

  return { success: true, value: validationResult.data as any };
}
