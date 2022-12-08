import { assert } from "handy-types";
import { config } from "../config";
import { Query } from "./query";

export interface JoinUrlSegments_Argument {
  segments: string[];
}

export function joinUrlSegments(arg: JoinUrlSegments_Argument) {
  const { segments } = arg;

  let joined = "";

  for (let item of segments) {
    if (item[0] === "/") item = item.slice(1);
    if (item[item.length - 1] !== "/") item += "/";

    joined += item;
  }

  return joined;
}

export interface GetUrl_Argument {
  path: string | string[];
  query?: object;
}

function makeUrl(arg: GetUrl_Argument & { root: string }) {
  const { path, root, query } = arg;

  assert<string | string[]>("non_empty_string | non_empty_string[]", path, {
    name: "path",
    code: "INVALID_PAGE",
  });

  const segments = [root];
  if (typeof path === "string") segments.push(path);
  else segments.push(...path);

  let url = joinUrlSegments({ segments });
  if (query) url += Query.stringify(query);

  return url;
}

export function getPageUrl(arg: GetUrl_Argument): string {
  const { path, query } = arg;
  return makeUrl({ path, query, root: window.location.origin });
}

export function getApiUrl(arg: GetUrl_Argument) {
  const { path, query } = arg;
  return makeUrl({ path, query, root: config.API_ROOT });
}
