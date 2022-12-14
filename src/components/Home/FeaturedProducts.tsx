import type {
  FindResult,
  MinifiedPublicProductInterface,
} from "../../interfaces/product";
import { priceUnitMap } from "../../util/product";
import { useFetchData } from "../../util/hooks";
import { processFetchedDataState } from "../../util/process-fetched-data";
import { getPageUrl } from "../../util/url";
import { Link } from "wouter";
import { config } from "../../config";

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

  const productUrl = getPageUrl({
    path: config.SINGLE_PRODUCT_PAGE_PATH,
    query: { qType: "byIds", ids: [arg.product._id] },
  });

  return (
    <div className="card shadow h-100" style={{ width: "15rem" }}>
      <Link href={productUrl}>
        <img
          src={imageUrl}
          crossOrigin="anonymous"
          className="card-img-top"
          style={{ height: "10rem", objectFit: "cover" }}
        />
      </Link>
      <div className="card-body">
        <Link href={productUrl} className="card-text text-decoration-none">
          {name}
        </Link>
      </div>
      <div className="card-footer text-center fw-bold text-light bg-dark">
        {price} {priceUnitMap[priceUnit]}
      </div>
    </div>
  );
}
