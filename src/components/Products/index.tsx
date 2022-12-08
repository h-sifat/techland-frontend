import { api } from "../../util/api";
import { Alert } from "../other/Alert";
import { useEffect, useState } from "react";
import { useQueryState } from "./use-query-state";
import { FetchedDataState } from "../../util/hooks";
import { FindResult } from "../../interfaces/product";
import { formatError } from "../../util/format-error";
import { processFetchedDataState } from "../../util/process-fetched-data";

export function Products() {
  const query = useQueryState();
  const [productsState, setProducts] = useState<FetchedDataState<FindResult>>({
    status: "loading",
  });

  useEffect(() => {
    if (query.status !== "valid") return;

    (async () => {
      try {
        console.log("api call");
        const response = await api.get<any>({
          path: "/products",
          query: query.value,
        });

        if (!response.success) {
          setProducts({
            status: "error",
            message: formatError({ errorResponse: response! }),
          });
          return;
        }

        setProducts({ status: "loaded", data: response.data });
      } catch (ex) {
        setProducts({ status: "error", message: ex.message });
      }
    })();
  }, [query.status]);

  if (query.status === "parsing") return <></>;
  if (query.status === "invalid")
    return <Alert type="danger" message={`Invalid query string in url.`} />;

  const productsResult = processFetchedDataState({
    state: productsState,
    processLoadedData(findResult) {
      const { minPrice, maxPrice } = findResult;
      return (
        <div>
          <p>
            Price, min: {minPrice}, max: {maxPrice}
          </p>
        </div>
      );
    },
  });

  return (
    <>
      <h2>Products</h2>
      {productsResult}
    </>
  );
}
