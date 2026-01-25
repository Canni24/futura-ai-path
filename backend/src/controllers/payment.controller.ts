/**
 * Payment Controller
 * 
 * Handles payment processing and history.
 */

import { Request, Response, NextFunction } from 'express';
import { PaymentService } from '../services/payment.service';
import { AppError } from '../utils/AppError';

export class PaymentController {
  private paymentService: PaymentService;

  constructor() {
    this.paymentService = new PaymentService();
  }

  /**
   * Create a payment intent
   * POST /api/payments/create-intent
   */
  createPaymentIntent = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = (req as any).user.id;
      const { courseId, amount } = req.body;

      const paymentIntent = await this.paymentService.createPaymentIntent(
        userId,
        courseId,
        amount
      );

      res.json({
        success: true,
        data: paymentIntent,
      });
    } catch (error) {
      next(error);
    }
  };

  /**
   * Confirm a payment
   * POST /api/payments/confirm
   */
  confirmPayment = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = (req as any).user.id;
      const { paymentId, courseId } = req.body;

      const result = await this.paymentService.confirmPayment(
        userId,
        paymentId,
        courseId
      );

      res.json({
        success: true,
        message: 'Payment confirmed',
        data: result,
      });
    } catch (error) {
      next(error);
    }
  };

  /**
   * Get payment history for current user
   * GET /api/payments/history
   */
  getPaymentHistory = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = (req as any).user.id;

      const payments = await this.paymentService.getPaymentHistory(userId);

      res.json({
        success: true,
        data: payments,
      });
    } catch (error) {
      next(error);
    }
  };

  /**
   * Get a specific payment by ID
   * GET /api/payments/:id
   */
  getPaymentById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = (req as any).user.id;
      const { id } = req.params;

      const payment = await this.paymentService.getPaymentById(userId, id);

      if (!payment) {
        throw new AppError('Payment not found', 404);
      }

      res.json({
        success: true,
        data: payment,
      });
    } catch (error) {
      next(error);
    }
  };
}
