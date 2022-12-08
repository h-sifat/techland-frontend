import { api } from "../../util/api";
import { useEffect, useState } from "react";
import { formatError } from "../../util/format-error";

import { Alert } from "../other/Alert";
import { LoadingSpinner } from "../other/LoadingSpinner";

import type {
  FindResult,
  MinifiedPublicProductInterface,
} from "../../interfaces/product";
import { priceUnitMap } from "../../util/product";

type FeaturedProductsState =
  | { status: "loading"; data: null }
  | { status: "error"; message: string }
  | { status: "loaded"; data: FindResult["products"] };

export function FeaturedProducts() {
  const [productsState, setProductsState] = useState<FeaturedProductsState>({
    data: null,
    status: "loading",
  });

  useEffect(() => {
    (async () => {
      try {
        const response = await api.get<FindResult>({
          path: "products",
          query: { qType: "list", priceRange: { min: 300, max: 1000 } },
        });

        if (!response.success)
          return setProductsState({
            status: "error",
            message: formatError({ errorResponse: response! }),
          });

        setProductsState({ status: "loaded", data: response.data.products });
      } catch (ex) {
        setProductsState({ status: "error", message: ex.message });
      }
    })();
  }, []);

  const productsResult = (() => {
    switch (productsState.status) {
      case "loading":
        return <LoadingSpinner />;

      case "error":
        return <Alert message={productsState.message} type={"danger"} />;

      default:
        return (
          <div className="row row-cols-auto g-3 justify-content-center">
            {productsState.data.map((product) => (
              <div className="" key={product._id}>
                <FeaturedProductCard product={product} />
              </div>
            ))}
          </div>
        );
    }
  })();

  return (
    <div className="container my-4">
      <h2 className="h5 mb-3 text-center">Featured Products</h2>
      {productsResult}
    </div>
  );
}

export interface FeaturedProductCard_Argument {
  product: MinifiedPublicProductInterface;
}
export function FeaturedProductCard(arg: FeaturedProductCard_Argument) {
  const { name, price, priceUnit, imageUrl } = arg.product;

  return (
    <div className="card shadow h-100" style={{ width: "15rem" }}>
      <a href="#">
        <img
          src={imageUrl}
          crossOrigin="anonymous"
          className="card-img-top"
          style={{ height: "10rem", objectFit: "cover" }}
        />
      </a>
      <div className="card-body">
        <a href="#" className="card-text text-decoration-none">
          {name}
        </a>
      </div>
      <div className="card-footer text-center fw-bold text-light bg-dark">
        {price} {priceUnitMap[priceUnit]}
      </div>
    </div>
  );
}
