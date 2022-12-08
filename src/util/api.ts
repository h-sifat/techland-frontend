import { getApiUrl } from "../util/url";

import type { APICallResult } from "../interfaces/api";

export interface API_Get_Argument {
  query: object;
  path: string | string[];
}
async function get<T>(arg: API_Get_Argument): Promise<APICallResult<T>> {
  const { path, query } = arg;

  const url = getApiUrl({ path, query });
  return await fetch(url).then((res) => res.json());
}

export const api = Object.freeze({ get });
