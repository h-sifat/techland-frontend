import { priceUnitMap } from "../../util/product";
import { ProductPublicInterface } from "../../interfaces/product";

export interface ProductInfo_Argument {
  product: ProductPublicInterface;
}
export function ProductInfo(arg: ProductInfo_Argument) {
  const { product } = arg;

  const badgeInfo = {
    Price: `${product.price} ${priceUnitMap[product.priceUnit]}`,
    Brand: product.brand.name || "Non-Brand",
    Status: product.inStock ? "In Stock" : "Out Of Stock",
  };

  //
  return (
    <>
      <h2 className="fs-5">{product.name}</h2>
      {Object.entries(badgeInfo).map(([name, value]) => (
        <span
          key={name}
          className="badge rounded-pill text-bg-light fw-normal mx-1"
        >
          {name}: <span className="fw-bold">{value}</span>
        </span>
      ))}

      <h3 className="fs-6 mt-2">Key Features</h3>
      <ul className="ps-4">
        {product.shortDescriptions.map((description) => (
          <li key={description}>{description}</li>
        ))}
      </ul>

      <button className="btn btn-primary">Buy Now</button>
    </>
  );
}
