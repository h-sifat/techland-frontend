export interface Config {
  API_ROOT: string;
  PRODUCTS_PAGE_PATH: string;
}

export const config: Config = Object.freeze({
  PRODUCTS_PAGE_PATH: "/products",
  API_ROOT: "http://127.0.0.1:3000/api-v0-1-0/",
});
