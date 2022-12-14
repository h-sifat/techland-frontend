import { joinUrlSegments } from "../util/url";

export interface Config {
  API_ROOT: string;
  PRODUCTS_PAGE_PATH: string;
  SINGLE_PRODUCT_PAGE_PATH: string;
  MAX_SEARCH_QUERY_LENGTH: number;
  DEFAULT_PRODUCTS_PER_PAGE: number;
}

export const config: Config = Object.freeze({
  MAX_SEARCH_QUERY_LENGTH: 150,
  DEFAULT_PRODUCTS_PER_PAGE: 20,
  PRODUCTS_PAGE_PATH: "/products",
  SINGLE_PRODUCT_PAGE_PATH: "/product",
  API_ROOT: joinUrlSegments({
    // segments: ["http://127.0.0.1:3000" + "/api-v0-1-0/"],
    segments: [window.location.origin + "/api-v0-1-0/"],
  }),
});
