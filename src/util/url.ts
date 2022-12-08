import { assert } from "handy-types";
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

export interface GetPageUrl_Argument {
  page: string | string[];
  query?: object;
}

export function getPageUrl(arg: GetPageUrl_Argument) {
  const { page, query } = arg;

  assert<string | string[]>("non_empty_string | non_empty_string[]", page, {
    name: "page",
    code: "INVALID_PAGE",
  });

  const segments = [window.location.origin];
  if (typeof page === "string") segments.push(page);
  else segments.push(...page);

  let url = joinUrlSegments({ segments });
  if (query) url += Query.stringify(query);

  return url;
}
