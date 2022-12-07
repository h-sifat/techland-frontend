import { Query } from "./query";
import { config } from "../config/index";
import { joinUrlSegments } from "./url";

export interface API_Get_Argument {
  query: object;
  path: string | string[];
}
async function get(arg: API_Get_Argument) {
  const { path, query } = arg;

  const url = (() => {
    const segments: string[] = [config.API_ROOT];
    if (typeof path === "string") segments.push(path);
    else segments.push(...path);

    return joinUrlSegments({ segments }) + Query.stringify(query);
  })();

  return await fetch(url).then((res) => res.json());
}

export const api = Object.freeze({ get });
