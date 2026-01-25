/**
 * Payment Service
 * 
 * Handles payment processing logic.
 * Can be extended to integrate with Stripe, Razorpay, etc.
 */

import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { AppError } from '../utils/AppError';

export class PaymentService {
  private supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient(
      process.env.SUPABASE_URL || '',
      process.env.SUPABASE_SERVICE_KEY || ''
    );
  }

  /**
   * Create a payment intent
   * In production, this would integrate with Stripe/Razorpay
   */
  async createPaymentIntent(userId: string, courseId: string, amount: number) {
    // For now, create a pending payment record
    const { data, error } = await this.supabase
      .from('payments')
      .insert({
        user_id: userId,
        course_id: courseId,
        amount,
        currency: 'INR',
        status: 'pending',
      })
      .select()
      .single();

    if (error) {
      throw new AppError(error.message, 500);
    }

    // In production, you would create a Stripe PaymentIntent here
    // and return the client_secret
    return {
      paymentId: data.id,
      amount,
      currency: 'INR',
      // clientSecret: stripe.paymentIntent.client_secret
    };
  }

  /**
   * Confirm a payment
   */
  async confirmPayment(userId: string, paymentId: string, courseId: string) {
    // Update payment status
    const { error: paymentError } = await this.supabase
      .from('payments')
      .update({
        status: 'completed',
        completed_at: new Date().toISOString(),
      })
      .eq('id', paymentId)
      .eq('user_id', userId);

    if (paymentError) {
      throw new AppError(paymentError.message, 500);
    }

    // Enroll user in the course
    const { data: enrollment, error: enrollmentError } = await this.supabase
      .from('enrollments')
      .insert({
        user_id: userId,
        course_id: courseId,
        progress: 0,
        status: 'active',
      })
      .select()
      .single();

    if (enrollmentError) {
      throw new AppError(enrollmentError.message, 500);
    }

    return {
      paymentId,
      enrollment,
    };
  }

  /**
   * Get payment history for a user
   */
  async getPaymentHistory(userId: string) {
    const { data, error } = await this.supabase
      .from('payments')
      .select(`
        *,
        course:courses(id, title)
      `)
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) {
      throw new AppError(error.message, 500);
    }

    return data;
  }

  /**
   * Get a specific payment by ID
   */
  async getPaymentById(userId: string, paymentId: string) {
    const { data, error } = await this.supabase
      .from('payments')
      .select(`
        *,
        course:courses(id, title)
      `)
      .eq('id', paymentId)
      .eq('user_id', userId)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return null;
      }
      throw new AppError(error.message, 500);
    }

    return data;
  }
}
