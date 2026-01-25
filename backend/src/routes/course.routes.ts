/**
 * Course Routes
 * 
 * Handles all course-related endpoints:
 * - List courses
 * - Get course details
 * - Create/update courses (admin)
 */

import { Router } from 'express';
import { CourseController } from '../controllers/course.controller';
import { authenticate, requireAdmin } from '../middleware/auth';

const router = Router();
const courseController = new CourseController();

// GET /api/courses - Get all courses (public)
router.get('/', courseController.getAllCourses);

// GET /api/courses/:id - Get a single course by ID (public)
router.get('/:id', courseController.getCourseById);

// POST /api/courses - Create a new course (admin only)
router.post('/', authenticate, requireAdmin, courseController.createCourse);

// PUT /api/courses/:id - Update a course (admin only)
router.put('/:id', authenticate, requireAdmin, courseController.updateCourse);

// DELETE /api/courses/:id - Delete a course (admin only)
router.delete('/:id', authenticate, requireAdmin, courseController.deleteCourse);

// GET /api/courses/:id/curriculum - Get course curriculum
router.get('/:id/curriculum', courseController.getCourseCurriculum);

export default router;
