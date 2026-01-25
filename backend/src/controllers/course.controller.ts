/**
 * Course Controller
 * 
 * Handles all course-related business logic.
 * Works with CourseService for database operations.
 */

import { Request, Response, NextFunction } from 'express';
import { CourseService } from '../services/course.service';
import { AppError } from '../utils/AppError';

export class CourseController {
  private courseService: CourseService;

  constructor() {
    this.courseService = new CourseService();
  }

  /**
   * Get all courses
   * GET /api/courses
   */
  getAllCourses = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { category, search, page = 1, limit = 10 } = req.query;

      const courses = await this.courseService.getAllCourses({
        category: category as string,
        search: search as string,
        page: Number(page),
        limit: Number(limit),
      });

      res.json({
        success: true,
        data: courses,
      });
    } catch (error) {
      next(error);
    }
  };

  /**
   * Get a single course by ID
   * GET /api/courses/:id
   */
  getCourseById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;

      const course = await this.courseService.getCourseById(id);

      if (!course) {
        throw new AppError('Course not found', 404);
      }

      res.json({
        success: true,
        data: course,
      });
    } catch (error) {
      next(error);
    }
  };

  /**
   * Create a new course (admin only)
   * POST /api/courses
   */
  createCourse = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const courseData = req.body;

      const course = await this.courseService.createCourse(courseData);

      res.status(201).json({
        success: true,
        message: 'Course created successfully',
        data: course,
      });
    } catch (error) {
      next(error);
    }
  };

  /**
   * Update a course (admin only)
   * PUT /api/courses/:id
   */
  updateCourse = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const courseData = req.body;

      const course = await this.courseService.updateCourse(id, courseData);

      res.json({
        success: true,
        message: 'Course updated successfully',
        data: course,
      });
    } catch (error) {
      next(error);
    }
  };

  /**
   * Delete a course (admin only)
   * DELETE /api/courses/:id
   */
  deleteCourse = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;

      await this.courseService.deleteCourse(id);

      res.json({
        success: true,
        message: 'Course deleted successfully',
      });
    } catch (error) {
      next(error);
    }
  };

  /**
   * Get course curriculum
   * GET /api/courses/:id/curriculum
   */
  getCourseCurriculum = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;

      const curriculum = await this.courseService.getCourseCurriculum(id);

      res.json({
        success: true,
        data: curriculum,
      });
    } catch (error) {
      next(error);
    }
  };
}
