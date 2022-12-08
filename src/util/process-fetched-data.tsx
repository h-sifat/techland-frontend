import type { FetchedDataState } from "./hooks";

import { Alert } from "../components/other/Alert";
import { LoadingSpinner } from "../components/other/LoadingSpinner";

export interface ProcessFetchedDataState_Argument<T> {
  state: FetchedDataState<T>;
  processLoadedData(data: T): any;
}

export function processFetchedDataState<T>(
  arg: ProcessFetchedDataState_Argument<T>
): any {
  const { state } = arg;
  switch (state.status) {
    case "loading":
      return <LoadingSpinner />;

    case "error":
      return <Alert message={state.message} type={"danger"} />;

    default: {
      const { processLoadedData } = arg;
      return processLoadedData(state.data);
    }
  }
}
