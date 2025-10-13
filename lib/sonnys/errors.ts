/**
 * Sonny's API Error Handling
 * Normalizes errors from both eCommerce and BackOffice APIs
 */

export interface NormalizedError {
  ok: false;
  code: string;
  message: string;
  details?: unknown;
  status?: number;
}

export interface SuccessResponse<T = unknown> {
  ok: true;
  data: T;
}

export type ApiResponse<T = unknown> = SuccessResponse<T> | NormalizedError;

/**
 * Format API error responses into a normalized structure
 */
export async function formatError(res: Response): Promise<NormalizedError> {
  let errorBody: any;
  let rawText: string = '';

  try {
    // Clone the response so we can read it twice if needed
    const clonedRes = res.clone();
    rawText = await clonedRes.text();

    errorBody = JSON.parse(rawText);
  } catch (parseError) {
    console.error('Failed to parse error response:', parseError);
    errorBody = { type: 'UnknownError', message: res.statusText || rawText };
  }

  const error: NormalizedError = {
    ok: false,
    code: errorBody.type || errorBody.errorType || 'UnexpectedFailure',
    message: errorBody.message || errorBody.errorMessage || 'An unexpected error occurred',
    details: errorBody.messages || errorBody.details || errorBody.errors || errorBody.validationErrors || errorBody,
    status: res.status,
  };

  return error;
}

/**
 * Create a normalized error object
 */
export function createError(
  code: string,
  message: string,
  details?: unknown
): NormalizedError {
  return { ok: false, code, message, details };
}

/**
 * Create a success response
 */
export function createSuccess<T>(data: T): SuccessResponse<T> {
  return { ok: true, data };
}

/**
 * User-friendly error messages
 */
export function getFriendlyErrorMessage(code: string): string {
  const messages: Record<string, string> = {
    NotAuthorizedError: 'Authentication failed. Please try again.',
    BadClientCredentialsError: 'Invalid API credentials. Please contact support.',
    MissingClientCredentialsError: 'Missing authentication information.',
    BadCustomerCredentialsError: 'Invalid customer credentials. Please verify your information.',
    MissingCustomerCredentialsError: 'Customer authentication required.',
    EntityNotFoundError: 'The requested resource was not found.',
    PayloadValidationError: 'Invalid request data. Please check your input.',
    RequestRateExceedError: 'Too many requests. Please try again in a moment.',
    UnexpectedFailure: 'An unexpected error occurred. Please try again.',
    ServerUnexpectedFailure: 'Server error. Please try again later.',
  };

  return messages[code] || 'An error occurred. Please try again.';
}
