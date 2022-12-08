import type { API_Error_Response } from "../interfaces/api";

export interface FormatError_Argument {
  errorResponse: API_Error_Response;
}
export function formatError(arg: FormatError_Argument): string {
  const { errorResponse } = arg;

  if (errorResponse.errorType === "msgAndCode")
    return errorResponse.error.message;

  {
    const { formErrors } = errorResponse.error;
    if (formErrors.length) return formErrors[0];
  }

  {
    const { fieldErrors } = errorResponse.error;
    for (const field in fieldErrors) return fieldErrors[field][0];
  }

  // this line is just to satisfy typescript
  return "";
}
