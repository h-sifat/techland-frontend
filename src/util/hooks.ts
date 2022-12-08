import { formatError } from "./format-error";
import { useEffect, useState } from "react";
import { api, API_Get_Argument } from "./api";

export type UseFetchData_Argument<ProcessedData, ResponseData> = {
  processResponseData?: (data: ResponseData) => ProcessedData;
  changeFlag?: string;
} & API_Get_Argument;

export type FetchedDataState<T> =
  | { status: "loading" }
  | { status: "error"; message: string }
  | { status: "loaded"; data: T };

export function useFetchData<ProcessedData, ResponseData = ProcessedData>(
  arg: UseFetchData_Argument<ProcessedData, ResponseData>
) {
  const { processResponseData = (v) => v, changeFlag = "not_changed" } = arg;

  const [state, setState] = useState<FetchedDataState<ProcessedData>>({
    status: "loading",
  });

  useEffect(() => {
    (async () => {
      try {
        const { path, query } = arg;
        const response = await api.get<any>({ path, query });

        if (!response.success)
          return setState({
            status: "error",
            message: formatError({ errorResponse: response! }),
          });

        setState({
          status: "loaded",
          data: processResponseData(response.data) as any,
        });
      } catch (ex) {
        setState({ status: "error", message: ex.message });
      }
    })();
  }, [changeFlag]);

  return state;
}
