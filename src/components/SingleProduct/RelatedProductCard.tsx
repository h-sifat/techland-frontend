import { getPageUrl } from "../../util/url";
import { priceUnitMap } from "../../util/product";
import { RelatedProductDocument } from "../../interfaces/product";
import { config } from "../../config";
import { Link } from "wouter";

export interface RelatedProductCard_Argument {
  product: RelatedProductDocument;
}
export function RelatedProductCard(arg: RelatedProductCard_Argument) {
  const { product } = arg;

  const badgeInfo = {
    Price: `${product.price} ${priceUnitMap[product.priceUnit]}`,
    Brand: product.brand.name || "Non-Brand",
  };

  const productUrl = getPageUrl({
    path: config.SINGLE_PRODUCT_PAGE_PATH,
    query: { qType: "byIds", ids: [product._id] },
  });

  return (
    <div className="col col-12 card mb-3 mx-auto px-0 shadow-sm">
      <div className="row g-0">
        <div className="col-md-4">
          <img
            src={product.imageUrl}
            crossOrigin="anonymous"
            style={{ objectFit: "cover" }}
            className="img-fluid rounded-start h-100 w-100"
          />
        </div>
        <div className="col-md-8">
          <div className="card-body">
            <h5 className="card-title">
              <Link href={productUrl} className="text-decoration-none">
                {product.name}
              </Link>
            </h5>
            <p className="card-text">
              {Object.entries(badgeInfo).map(([name, value]) => (
                <span
                  key={name}
                  className="badge rounded-pill text-bg-light fw-normal mx-1"
                >
                  {name}: <span className="fw-bold">{value}</span>
                </span>
              ))}
            </p>
            <p className="card-text"></p>
          </div>
        </div>
      </div>
    </div>
  );
}
