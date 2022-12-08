import { Category } from "./Category";
import { useFetchData } from "../../util/hooks";
import type { CategoryPublicInterface } from "../../interfaces/category";
import { processFetchedDataState } from "../../util/process-fetched-data";

const categoryWrapperStyle = Object.freeze({
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "center",
} as const);

export function FeaturedCategories() {
  const categoryState = useFetchData<CategoryPublicInterface[]>({
    path: "categories",
    query: { lookup: "all" },
    processResponseData: (categories) =>
      categories.filter((category) => category.imageUrl),
  });

  const categoryResult = processFetchedDataState<CategoryPublicInterface[]>({
    state: categoryState,
    processLoadedData(categories) {
      return (
        <div style={categoryWrapperStyle}>
          {categories.map((category) => (
            <Category key={category._id} category={category} />
          ))}
        </div>
      );
    },
  });

  return (
    <div className="container text-center">
      <h2 className="h5 mb-3">Featured Categories</h2>
      {categoryResult}
    </div>
  );
}
