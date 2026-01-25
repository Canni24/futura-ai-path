/**
 * Authentication Routes
 * 
 * Handles user authentication endpoints:
 * - Sign up
 * - Sign in
 * - Sign out
 * - Password reset
 */

import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller';
import { validateRequest } from '../middleware/validateRequest';
import { signUpSchema, signInSchema } from '../validators/auth.validator';

const router = Router();
const authController = new AuthController();

// POST /api/auth/signup - Register a new user
router.post('/signup', validateRequest(signUpSchema), authController.signUp);

// POST /api/auth/signin - Sign in an existing user
router.post('/signin', validateRequest(signInSchema), authController.signIn);

// POST /api/auth/signout - Sign out the current user
router.post('/signout', authController.signOut);

// POST /api/auth/forgot-password - Request password reset
router.post('/forgot-password', authController.forgotPassword);

// POST /api/auth/reset-password - Reset password with token
router.post('/reset-password', authController.resetPassword);

// GET /api/auth/me - Get current user info
router.get('/me', authController.getCurrentUser);

export default router;
