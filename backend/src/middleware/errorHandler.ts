/**
 * Global Error Handler Middleware
 * 
 * Catches all errors and sends appropriate responses.
 * Logs errors in development mode.
 */

import { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils/AppError';

interface ErrorResponse {
  success: false;
  message: string;
  error?: string;
  stack?: string;
}

/**
 * Global error handling middleware
 */
export const errorHandler = (
  err: Error | AppError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Log error in development
  if (process.env.NODE_ENV === 'development') {
    console.error('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.error('❌ Error:', err.message);
    console.error('📍 Path:', req.path);
    console.error('📝 Method:', req.method);
    if (err.stack) {
      console.error('📚 Stack:', err.stack);
    }
    console.error('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  }

  // Default error values
  let statusCode = 500;
  let message = 'Internal Server Error';

  // Handle known error types
  if (err instanceof AppError) {
    statusCode = err.statusCode;
    message = err.message;
  }

  // Build response object
  const response: ErrorResponse = {
    success: false,
    message,
  };

  // Include error details in development
  if (process.env.NODE_ENV === 'development') {
    response.error = err.message;
    response.stack = err.stack;
  }

  res.status(statusCode).json(response);
};
