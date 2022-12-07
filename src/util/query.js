import base64 from "base-64";
import { assert } from "handy-types";

function stringify(query) {
  assert("plain_object", query, {
    message: "Invalid query object.",
    code: "INVALID_QUERY_OBJECT",
  });

  const base64Json = base64.encode(JSON.stringify(query));
  return `?q=` + encodeURIComponent(base64Json);
}

function parse(query) {
  assert("non_empty_string", query, {
    name: "query",
    code: "INVALID_QUERY_STRING",
  });

  if (!query.startsWith("?q=")) throw new Error(`Invalid query: "${query}"`);

  const json = base64.decode(decodeURIComponent(query.slice(3)));
  console.log(json);
  return JSON.parse(json);
}

export const Query = Object.freeze({ parse, stringify });
