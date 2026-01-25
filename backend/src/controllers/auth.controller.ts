/**
 * Authentication Controller
 * 
 * Handles all authentication-related business logic.
 * Works with AuthService for database operations.
 */

import { Request, Response, NextFunction } from 'express';
import { AuthService } from '../services/auth.service';
import { AppError } from '../utils/AppError';

export class AuthController {
  private authService: AuthService;

  constructor() {
    this.authService = new AuthService();
  }

  /**
   * Register a new user
   * POST /api/auth/signup
   */
  signUp = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password, fullName } = req.body;

      const result = await this.authService.signUp(email, password, fullName);

      res.status(201).json({
        success: true,
        message: 'User registered successfully',
        data: result,
      });
    } catch (error) {
      next(error);
    }
  };

  /**
   * Sign in an existing user
   * POST /api/auth/signin
   */
  signIn = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body;

      const result = await this.authService.signIn(email, password);

      res.json({
        success: true,
        message: 'Signed in successfully',
        data: result,
      });
    } catch (error) {
      next(error);
    }
  };

  /**
   * Sign out the current user
   * POST /api/auth/signout
   */
  signOut = async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Clear session/token logic here
      res.json({
        success: true,
        message: 'Signed out successfully',
      });
    } catch (error) {
      next(error);
    }
  };

  /**
   * Request password reset
   * POST /api/auth/forgot-password
   */
  forgotPassword = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email } = req.body;

      await this.authService.sendPasswordResetEmail(email);

      res.json({
        success: true,
        message: 'Password reset email sent',
      });
    } catch (error) {
      next(error);
    }
  };

  /**
   * Reset password with token
   * POST /api/auth/reset-password
   */
  resetPassword = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { token, newPassword } = req.body;

      await this.authService.resetPassword(token, newPassword);

      res.json({
        success: true,
        message: 'Password reset successfully',
      });
    } catch (error) {
      next(error);
    }
  };

  /**
   * Get current authenticated user
   * GET /api/auth/me
   */
  getCurrentUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      // User should be attached to request by auth middleware
      const user = (req as any).user;

      if (!user) {
        throw new AppError('Not authenticated', 401);
      }

      res.json({
        success: true,
        data: user,
      });
    } catch (error) {
      next(error);
    }
  };
}
