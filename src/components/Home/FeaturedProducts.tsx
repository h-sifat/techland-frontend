import type {
  FindResult,
  MinifiedPublicProductInterface,
} from "../../interfaces/product";
import { priceUnitMap } from "../../util/product";
import { useFetchData } from "../../util/hooks";
import { processFetchedDataState } from "../../util/process-fetched-data";

export function FeaturedProducts() {
  const productsState = useFetchData<
    MinifiedPublicProductInterface[],
    FindResult
  >({
    path: "products",
    processResponseData: (data) => data.products,
    query: { qType: "list", priceRange: { min: 400, max: 1000 } },
  });

  const productsResult = processFetchedDataState<
    MinifiedPublicProductInterface[]
  >({
    state: productsState,
    processLoadedData(products) {
      return (
        <div className="row row-cols-auto g-3 justify-content-center">
          {products.map((product) => (
            <div className="" key={product._id}>
              <FeaturedProductCard product={product} />
            </div>
          ))}
        </div>
      );
    },
  });

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
