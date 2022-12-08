import { api } from "../../util/api";
import { useEffect, useState } from "react";
import { formatError } from "../../util/format-error";

import { Category } from "./Category";
import { Alert } from "../other/Alert";
import { LoadingSpinner } from "../other/LoadingSpinner";

import type { CategoryPublicInterface } from "../../interfaces/category";

type CategoryState =
  | { status: "loading"; data: null }
  | { status: "error"; message: string }
  | { status: "loaded"; data: CategoryPublicInterface[] };

export function FeaturedCategories() {
  const [categoryState, setCategoryState] = useState<CategoryState>({
    status: "loading",
    data: null,
  });

  useEffect(() => {
    (async () => {
      try {
        const response = await api.get<CategoryPublicInterface[]>({
          path: "categories",
          query: { lookup: "all" },
        });

        if (!response.success)
          return setCategoryState({
            status: "error",
            message: formatError({ errorResponse: response! }),
          });

        setCategoryState({
          status: "loaded",
          data: response.data.filter((category) => category.imageUrl),
        });
      } catch (ex) {
        setCategoryState({ status: "error", message: ex.message });
      }
    })();
  }, []);

  const categoryWrapperStyle = {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
  } as const;

  const categoryResult = (() => {
    switch (categoryState.status) {
      case "loading":
        return <LoadingSpinner />;

      case "error":
        return <Alert message={categoryState.message} type={"danger"} />;

      default:
        return (
          <div style={categoryWrapperStyle}>
            {categoryState.data.map((category) => (
              <Category key={category._id} category={category} />
            ))}
          </div>
        );
    }
  })();

  return (
    <div className="container text-center">
      <h2 className="h5 mb-3">Featured Categories</h2>
      {categoryResult}
    </div>
  );
}
