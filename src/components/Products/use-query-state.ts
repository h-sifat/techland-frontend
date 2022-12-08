import { Query } from "../../util/query";
import { useEffect, useState } from "react";
import { QuerySchema } from "./query-validation";
import { formatError } from "../../util/format-error";
import type { ListProductsQuery } from "../../interfaces/product";

export type QueryState =
  | { status: "parsing" }
  | { status: "valid"; value: ListProductsQuery }
  | { status: "invalid"; message: string };

export function useQueryState() {
  const [queryState, setQueryState] = useState<QueryState>({
    status: "parsing",
  });

  useEffect(() => {
    let _query: any = { qType: "list" };

    const queryString = new URL(window.location.href).search;
    if (queryString)
      try {
        _query = Query.parse(queryString);
      } catch (ex) {
        setQueryState({ status: "invalid", message: ex.message });
        return;
      }

    const validationResult = QuerySchema.safeParse(_query);
    if (!validationResult.success) {
      setQueryState({
        status: "invalid",
        message: formatError(validationResult.error.flatten() as any),
      });
      return;
    }
    setQueryState({ status: "valid", value: validationResult.data });
  }, []);

  return queryState;
}
