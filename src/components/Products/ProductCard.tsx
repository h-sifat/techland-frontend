import { BsCart } from "react-icons/bs";
import { priceUnitMap } from "../../util/product";
import { FindResult } from "../../interfaces/product";

export interface ProductCard_Argument {
  product: FindResult["products"][number];
}
export function ProductCard(arg: ProductCard_Argument) {
  const { product } = arg;

  const { name, price, priceUnit, shortDescriptions, imageUrl } = product;

  return (
    <div
      className="card shadow h-100 border border-2"
      style={{ width: "15rem", fontSize: "0.86rem" }}
    >
      <a href="#">
        <img
          src={imageUrl}
          crossOrigin="anonymous"
          className="card-img-top"
          style={{ height: "10rem", objectFit: "cover" }}
        />
      </a>
      <div className="card-body pb-0">
        <a
          href="#"
          className="text-decoration-none card-title fw-semibold d-block mb-0"
        >
          {name}
        </a>
        <ul className="p-3 pb-0 mb-1">
          {shortDescriptions.slice(0, 4).map((text, index) => (
            <li key={index} className=" p-0">
              {text}
            </li>
          ))}
        </ul>
      </div>
      <div className="card-footer bg-white text-center border-0 pt-0">
        <p className="fw-bold fs-5 text-black mb-1">
          {price} {priceUnitMap[priceUnit]}
        </p>

        <button className="btn btn-primary mb-3">
          <BsCart size={"1.5rem"} /> Add to Cart
        </button>
      </div>
    </div>
  );
}