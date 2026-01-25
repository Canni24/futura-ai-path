/**
 * User Routes
 * 
 * Handles user profile and account management:
 * - Get/update profile
 * - Get certificates
 * - Dashboard stats
 */

import { Router } from 'express';
import { UserController } from '../controllers/user.controller';
import { authenticate } from '../middleware/auth';

const router = Router();
const userController = new UserController();

// All user routes require authentication
router.use(authenticate);

// GET /api/users/profile - Get current user's profile
router.get('/profile', userController.getProfile);

// PUT /api/users/profile - Update current user's profile
router.put('/profile', userController.updateProfile);

// GET /api/users/certificates - Get user's certificates
router.get('/certificates', userController.getCertificates);

// GET /api/users/dashboard-stats - Get dashboard statistics
router.get('/dashboard-stats', userController.getDashboardStats);

// PUT /api/users/change-password - Change user's password
router.put('/change-password', userController.changePassword);

export default router;
