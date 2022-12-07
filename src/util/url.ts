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
