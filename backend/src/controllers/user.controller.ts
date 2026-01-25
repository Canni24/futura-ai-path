/**
 * User Controller
 * 
 * Handles user profile and account management.
 */

import { Request, Response, NextFunction } from 'express';
import { UserService } from '../services/user.service';
import { AppError } from '../utils/AppError';

export class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  /**
   * Get current user's profile
   * GET /api/users/profile
   */
  getProfile = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = (req as any).user.id;

      const profile = await this.userService.getProfile(userId);

      res.json({
        success: true,
        data: profile,
      });
    } catch (error) {
      next(error);
    }
  };

  /**
   * Update current user's profile
   * PUT /api/users/profile
   */
  updateProfile = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = (req as any).user.id;
      const profileData = req.body;

      const profile = await this.userService.updateProfile(userId, profileData);

      res.json({
        success: true,
        message: 'Profile updated successfully',
        data: profile,
      });
    } catch (error) {
      next(error);
    }
  };

  /**
   * Get user's certificates
   * GET /api/users/certificates
   */
  getCertificates = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = (req as any).user.id;

      const certificates = await this.userService.getCertificates(userId);

      res.json({
        success: true,
        data: certificates,
      });
    } catch (error) {
      next(error);
    }
  };

  /**
   * Get dashboard statistics
   * GET /api/users/dashboard-stats
   */
  getDashboardStats = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = (req as any).user.id;

      const stats = await this.userService.getDashboardStats(userId);

      res.json({
        success: true,
        data: stats,
      });
    } catch (error) {
      next(error);
    }
  };

  /**
   * Change user's password
   * PUT /api/users/change-password
   */
  changePassword = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = (req as any).user.id;
      const { currentPassword, newPassword } = req.body;

      await this.userService.changePassword(userId, currentPassword, newPassword);

      res.json({
        success: true,
        message: 'Password changed successfully',
      });
    } catch (error) {
      next(error);
    }
  };
}
