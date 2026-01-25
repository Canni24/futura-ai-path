/**
 * Payment Routes
 * 
 * Handles payment processing endpoints:
 * - Create payment intent
 * - Process payments
 * - Payment history
 */

import { Router } from 'express';
import { PaymentController } from '../controllers/payment.controller';
import { authenticate } from '../middleware/auth';

const router = Router();
const paymentController = new PaymentController();

// All payment routes require authentication
router.use(authenticate);

// POST /api/payments/create-intent - Create a payment intent
router.post('/create-intent', paymentController.createPaymentIntent);

// POST /api/payments/confirm - Confirm a payment
router.post('/confirm', paymentController.confirmPayment);

// GET /api/payments/history - Get payment history for current user
router.get('/history', paymentController.getPaymentHistory);

// GET /api/payments/:id - Get a specific payment by ID
router.get('/:id', paymentController.getPaymentById);

export default router;
