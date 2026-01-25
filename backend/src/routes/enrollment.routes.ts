/**
 * Enrollment Routes
 * 
 * Handles course enrollment endpoints:
 * - Enroll in a course
 * - Get user enrollments
 * - Track video progress
 */

import { Router } from 'express';
import { EnrollmentController } from '../controllers/enrollment.controller';
import { authenticate } from '../middleware/auth';

const router = Router();
const enrollmentController = new EnrollmentController();

// All enrollment routes require authentication
router.use(authenticate);

// GET /api/enrollments - Get all enrollments for current user
router.get('/', enrollmentController.getUserEnrollments);

// POST /api/enrollments - Enroll in a course
router.post('/', enrollmentController.enrollInCourse);

// GET /api/enrollments/:courseId - Get enrollment status for a course
router.get('/:courseId', enrollmentController.getEnrollmentStatus);

// POST /api/enrollments/:courseId/progress - Update video progress
router.post('/:courseId/progress', enrollmentController.updateProgress);

// GET /api/enrollments/:courseId/progress - Get course progress
router.get('/:courseId/progress', enrollmentController.getCourseProgress);

export default router;
