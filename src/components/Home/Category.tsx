import { Link } from "wouter";
import { config } from "../../config";
import { Query } from "../../util/query";
import { getPageUrl } from "../../util/url";
import { CategoryPublicInterface } from "../../interfaces/category";

export interface Category_Argument {
  category: CategoryPublicInterface;
}
export function Category(arg: Category_Argument) {
  const { category } = arg;
  const { _id, name, imageUrl } = category;

  const productsByCategoryUrl =
    getPageUrl({ page: config.PRODUCTS_PAGE_PATH }) +
    Query.stringify({ qType: "list", categoryId: _id });

  return (
    <div className="shadow bg-body rounded m-2">
      <Link href={productsByCategoryUrl}>
        <a className="text-decoration-none">
          <div
            className="card p-3 pb-0 border-0"
            style={{ width: "6.5rem", objectFit: "cover" }}
          >
            <img
              crossOrigin="anonymous"
              src={imageUrl}
              className="img-thumbnail border-0 p-0"
            />
            <div className="card-body m-0 p-0 text-center">{name}</div>
          </div>
        </a>
      </Link>
    </div>
  );
}
