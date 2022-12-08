import { CategoryPublicInterface } from "../../interfaces/category";

export interface Category_Argument {
  category: CategoryPublicInterface;
}
export function Category(arg: Category_Argument) {
  const { category } = arg;
  const { name, imageUrl } = category;

  return (
    <div className="shadow bg-body rounded m-2">
      <a href="/images/234" className="text-decoration-none">
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
    </div>
  );
}
