/**
 * Custom Application Error Class
 * 
 * Extends the built-in Error class to include HTTP status codes
 * and operational error flagging.
 */

export class AppError extends Error {
  public statusCode: number;
  public isOperational: boolean;

  /**
   * Create a new AppError
   * @param message - Error message
   * @param statusCode - HTTP status code (default: 500)
   */
  constructor(message: string, statusCode: number = 500) {
    super(message);

    this.statusCode = statusCode;
    this.isOperational = true;

    // Capture stack trace
    Error.captureStackTrace(this, this.constructor);
  }
}

/**
 * Common HTTP error factory methods
 */
export const HttpErrors = {
  badRequest: (message: string = 'Bad Request') => new AppError(message, 400),
  unauthorized: (message: string = 'Unauthorized') => new AppError(message, 401),
  forbidden: (message: string = 'Forbidden') => new AppError(message, 403),
  notFound: (message: string = 'Not Found') => new AppError(message, 404),
  conflict: (message: string = 'Conflict') => new AppError(message, 409),
  internal: (message: string = 'Internal Server Error') => new AppError(message, 500),
};
