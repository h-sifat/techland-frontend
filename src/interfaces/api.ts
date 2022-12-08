export type API_Error_Response =
  | {
      errorType: "validation";
      error: { formErrors: string[]; fieldErrors: Record<string, string[]> };
    }
  | {
      errorType: "msgAndCode";
      error: { message: string; code?: string; [key: string]: any };
    };

export type APICallResult<T> =
  | { success: true; data: T }
  | ({ success: false } & API_Error_Response);
