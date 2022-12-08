import {
  ProductPublicInterface,
  RelatedProductDocument,
} from "../../interfaces/product";
import { ImageCarousel } from "./ImageCarousel";
import { ProductInfo } from "./ProductInfo";
import { RelatedProductCard } from "./RelatedProductCard";
import { Specifications } from "./Specifications";
import { parseProductsQuery } from "../../util/prase-products-query";
import {
  SingleProductQuery,
  SingleProductQuerySchema,
} from "./query-validation";
import { Alert } from "../other/Alert";
import { useFetchData } from "../../util/hooks";
import { processFetchedDataState } from "../../util/process-fetched-data";

export function SingleProduct() {
  const parsedQueryResult = parseProductsQuery<SingleProductQuery>(
    SingleProductQuerySchema
  );

  if (!parsedQueryResult.success)
    return <Alert type="danger" message={`Invalid query string in url.`} />;

  const id = parsedQueryResult.value.ids[0];

  const productsState = useFetchData<ProductPublicInterface[]>({
    path: "/products",
    query: parsedQueryResult.value,
    changeFlag: id,
  });

  const relatedProductsState = useFetchData<RelatedProductDocument[]>({
    path: "/products",
    query: { qType: "similar", id },
    changeFlag: id,
  });

  const relatedProductsResult = processFetchedDataState({
    state: relatedProductsState,
    processLoadedData(relatedProducts) {
      return relatedProducts.map((product) => (
        <RelatedProductCard key={product._id} product={product} />
      ));
    },
  });

  const productsResult = processFetchedDataState({
    state: productsState,
    processLoadedData(productArray) {
      if (!productArray.length) return <h2>Product Not Found</h2>;

      const product = productArray[0];
      const urls = product.images.map(({ url }) => url);

      return (
        <>
          {/* Product Card */}
          <div className="row gy-4">
            <div className="col-12 col-sm-6">
              <ImageCarousel urls={urls} />
            </div>
            <div className="col-12 col-sm-6">
              <ProductInfo product={product} />
            </div>
          </div>
          {/* Product Card */}

          <div className="row mt-4 gx-5">
            <div className="col-12 col-sm-7">
              <Specifications product={product} />

              <div className="description">
                <h3 className="fs-4">Description</h3>
                <div
                  dangerouslySetInnerHTML={{ __html: product.description }}
                ></div>
              </div>
            </div>
            <div className="col-12 col-sm-5">
              <h3 className="fs-4">Similar Products</h3>
              <div className="row">{relatedProductsResult}</div>
            </div>
          </div>
        </>
      );
    },
  });

  return <>{productsResult}</>;
}
