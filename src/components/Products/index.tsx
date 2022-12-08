import hash from "object-hash";
import { Alert } from "../other/Alert";
import { ProductCard } from "./ProductCard";
import { useReducer } from "react";
import { parseProductsQuery } from "./prase-products-query";
import { useFetchData } from "../../util/hooks";
import { FindResult } from "../../interfaces/product";
import { Pagination, Pagination_Argument } from "./Pagination";
import { processFetchedDataState } from "../../util/process-fetched-data";

function reducer(state: any, action: any) {
  switch (action.type) {
    case "change_page":
      return {
        ...state,
        pagination: { ...state.pagination, pageNumber: action.payload },
      };
    default:
      throw new Error(`Unknown action: "${action.type}"`);
  }
}

export function Products() {
  const parsedQueryResult = parseProductsQuery();

  if (!parsedQueryResult.success)
    return <Alert type="danger" message={`Invalid query string in url.`} />;

  const [query, dispatch] = useReducer(reducer, parsedQueryResult.value);

  const productsState = useFetchData<FindResult>({
    path: "/products",
    query,
    changeFlag: hash(query, { algorithm: "md5" }),
  });

  const productsResult = processFetchedDataState({
    state: productsState,
    processLoadedData,
  });

  function processLoadedData(findResult: FindResult) {
    const { products } = findResult;

    const paginationArg: Pagination_Argument = {
      itemsCount: findResult.count,
      currentPage: query.pagination.pageNumber,
      itemsPerPage: query.pagination.itemsPerPage,
      onPageChange: ({ pageNumber }) => {
        dispatch({ type: "change_page", payload: pageNumber });
      },
    };

    return (
      <>
        <div className="row row-cols-auto g-3 justify-content-center">
          {products.map((product) => (
            <div className="mb-2" key={product._id}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>

        <Pagination {...paginationArg} />
      </>
    );
  }

  return <>{productsResult}</>;
}
