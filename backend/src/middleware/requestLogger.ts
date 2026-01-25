/**
 * Request Logger Middleware
 * 
 * Logs all incoming requests for debugging purposes.
 * Only used in development mode.
 */

import { Request, Response, NextFunction } from 'express';

/**
 * Logs request method, path, and timing
 */
export const requestLogger = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const start = Date.now();

  // Log request start
  console.log(`➡️  ${req.method} ${req.path}`);

  // Log response when finished
  res.on('finish', () => {
    const duration = Date.now() - start;
    const statusEmoji = res.statusCode >= 400 ? '❌' : '✅';
    
    console.log(
      `${statusEmoji} ${req.method} ${req.path} - ${res.statusCode} (${duration}ms)`
    );
  });

  next();
};
