/**
 * Enrollment Controller
 * 
 * Handles course enrollment and progress tracking logic.
 */

import { Request, Response, NextFunction } from 'express';
import { EnrollmentService } from '../services/enrollment.service';
import { AppError } from '../utils/AppError';

export class EnrollmentController {
  private enrollmentService: EnrollmentService;

  constructor() {
    this.enrollmentService = new EnrollmentService();
  }

  /**
   * Get all enrollments for current user
   * GET /api/enrollments
   */
  getUserEnrollments = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = (req as any).user.id;

      const enrollments = await this.enrollmentService.getUserEnrollments(userId);

      res.json({
        success: true,
        data: enrollments,
      });
    } catch (error) {
      next(error);
    }
  };

  /**
   * Enroll in a course
   * POST /api/enrollments
   */
  enrollInCourse = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = (req as any).user.id;
      const { courseId } = req.body;

      // Check if already enrolled
      const existingEnrollment = await this.enrollmentService.getEnrollmentStatus(
        userId,
        courseId
      );

      if (existingEnrollment) {
        throw new AppError('Already enrolled in this course', 400);
      }

      const enrollment = await this.enrollmentService.enrollInCourse(userId, courseId);

      res.status(201).json({
        success: true,
        message: 'Enrolled successfully',
        data: enrollment,
      });
    } catch (error) {
      next(error);
    }
  };

  /**
   * Get enrollment status for a course
   * GET /api/enrollments/:courseId
   */
  getEnrollmentStatus = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = (req as any).user.id;
      const { courseId } = req.params;

      const enrollment = await this.enrollmentService.getEnrollmentStatus(
        userId,
        courseId
      );

      res.json({
        success: true,
        data: {
          isEnrolled: !!enrollment,
          enrollment,
        },
      });
    } catch (error) {
      next(error);
    }
  };

  /**
   * Update video progress
   * POST /api/enrollments/:courseId/progress
   */
  updateProgress = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = (req as any).user.id;
      const { courseId } = req.params;
      const { videoId, watchedSeconds, completed } = req.body;

      const progress = await this.enrollmentService.updateProgress(
        userId,
        courseId,
        videoId,
        watchedSeconds,
        completed
      );

      res.json({
        success: true,
        data: progress,
      });
    } catch (error) {
      next(error);
    }
  };

  /**
   * Get course progress
   * GET /api/enrollments/:courseId/progress
   */
  getCourseProgress = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = (req as any).user.id;
      const { courseId } = req.params;

      const progress = await this.enrollmentService.getCourseProgress(userId, courseId);

      res.json({
        success: true,
        data: progress,
      });
    } catch (error) {
      next(error);
    }
  };
}
