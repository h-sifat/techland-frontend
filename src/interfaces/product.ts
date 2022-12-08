import type { CategoryInterface } from "./category";

export interface ProductImage {
  url: string;
  isMain: boolean;
}

export interface ProductBrand {
  id: string;
  name: string;
}

export interface CommonProductFields {
  _id: string;
  name: string;
  price: number;
  createdAt: number;
  categoryId: string;
  brand: ProductBrand;
  description: string;
  images: ProductImage[];
  lastModifiedAt: number;
  priceUnit: "USD" | "TAKA";
  shortDescriptions: string[];
  specifications: Record<string, Record<string, string>>;
}

export type ProductPublicInterface = CommonProductFields & {
  inStock: boolean;
};

enum PRICE_UNITS {
  USD = "USD",
  TAKA = "TAKA",
}
Object.freeze(PRICE_UNITS);
export { PRICE_UNITS };

export type MinifiedPublicProductInterface = Pick<
  CommonProductFields,
  "_id" | "name" | "price" | "priceUnit" | "shortDescriptions"
> & { imageUrl: string };

export interface FindResult {
  count: number;
  maxPrice: number;
  minPrice: number;
  brands: ProductBrand[];
  products: MinifiedPublicProductInterface[];
  categories: Pick<CategoryInterface, "_id" | "name" | "parentId">;
}

export interface PaginationObject {
  pageNumber: number;
  itemsPerPage: number;
}

export interface FindProductArg {
  categoryId?: string;
  pagination: PaginationObject;
  sortBy: { price: "1" | "-1" };
  priceRange?: { min?: number; max?: number };
}

export interface SearchProductsArg {
  query: string;
  pagination: PaginationObject;
}

export type ListProductsQuery =
  | ({ qType: "list" } & FindProductArg)
  | ({ qType: "search" } & SearchProductsArg);

export type ProductSearchSuggestionDocument = Pick<
  ProductPublicInterface,
  "_id" | "name"
> & { imageUrl: string; score: number };
