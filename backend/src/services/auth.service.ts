/**
 * Authentication Service
 * 
 * Handles authentication business logic and database operations.
 * This service can be extended to use different auth providers.
 */

import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { AppError } from '../utils/AppError';

// Types for auth operations
interface AuthResult {
  user: any;
  session: any;
}

export class AuthService {
  private supabase: SupabaseClient;

  constructor() {
    // Initialize Supabase client
    // In production, these should come from environment variables
    this.supabase = createClient(
      process.env.SUPABASE_URL || '',
      process.env.SUPABASE_SERVICE_KEY || ''
    );
  }

  /**
   * Register a new user
   */
  async signUp(email: string, password: string, fullName: string): Promise<AuthResult> {
    // Create user in Supabase Auth
    const { data: authData, error: authError } = await this.supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
        },
      },
    });

    if (authError) {
      throw new AppError(authError.message, 400);
    }

    if (!authData.user) {
      throw new AppError('Failed to create user', 500);
    }

    // Create profile in profiles table
    const { error: profileError } = await this.supabase
      .from('profiles')
      .insert({
        id: authData.user.id,
        email: email,
        full_name: fullName,
      });

    if (profileError) {
      console.error('Profile creation error:', profileError);
      // Don't throw here - user was created, profile creation is secondary
    }

    return {
      user: authData.user,
      session: authData.session,
    };
  }

  /**
   * Sign in an existing user
   */
  async signIn(email: string, password: string): Promise<AuthResult> {
    const { data, error } = await this.supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      throw new AppError('Invalid email or password', 401);
    }

    return {
      user: data.user,
      session: data.session,
    };
  }

  /**
   * Send password reset email
   */
  async sendPasswordResetEmail(email: string): Promise<void> {
    const { error } = await this.supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${process.env.FRONTEND_URL}/reset-password`,
    });

    if (error) {
      throw new AppError(error.message, 400);
    }
  }

  /**
   * Reset password with token
   */
  async resetPassword(token: string, newPassword: string): Promise<void> {
    const { error } = await this.supabase.auth.updateUser({
      password: newPassword,
    });

    if (error) {
      throw new AppError(error.message, 400);
    }
  }

  /**
   * Verify JWT token and get user
   */
  async verifyToken(token: string): Promise<any> {
    const { data: { user }, error } = await this.supabase.auth.getUser(token);

    if (error || !user) {
      throw new AppError('Invalid or expired token', 401);
    }

    return user;
  }
}
