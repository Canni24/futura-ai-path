/**
 * User Service
 * 
 * Handles user profile and account operations.
 */

import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { AppError } from '../utils/AppError';

interface ProfileData {
  full_name?: string;
  avatar_url?: string;
  bio?: string;
}

export class UserService {
  private supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient(
      process.env.SUPABASE_URL || '',
      process.env.SUPABASE_SERVICE_KEY || ''
    );
  }

  /**
   * Get user profile
   */
  async getProfile(userId: string) {
    const { data, error } = await this.supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();

    if (error) {
      throw new AppError(error.message, 500);
    }

    return data;
  }

  /**
   * Update user profile
   */
  async updateProfile(userId: string, profileData: ProfileData) {
    const { data, error } = await this.supabase
      .from('profiles')
      .update(profileData)
      .eq('id', userId)
      .select()
      .single();

    if (error) {
      throw new AppError(error.message, 500);
    }

    return data;
  }

  /**
   * Get user's certificates
   */
  async getCertificates(userId: string) {
    const { data, error } = await this.supabase
      .from('certificates')
      .select(`
        *,
        course:courses(id, title)
      `)
      .eq('user_id', userId)
      .order('issued_at', { ascending: false });

    if (error) {
      throw new AppError(error.message, 500);
    }

    return data;
  }

  /**
   * Get dashboard statistics for a user
   */
  async getDashboardStats(userId: string) {
    // Get enrollments count
    const { data: enrollments, error: enrollError } = await this.supabase
      .from('enrollments')
      .select('id, progress, status')
      .eq('user_id', userId);

    if (enrollError) {
      throw new AppError(enrollError.message, 500);
    }

    // Get certificates count
    const { count: certificateCount, error: certError } = await this.supabase
      .from('certificates')
      .select('id', { count: 'exact', head: true })
      .eq('user_id', userId);

    if (certError) {
      throw new AppError(certError.message, 500);
    }

    // Get video progress for learning hours
    const { data: videoProgress, error: progressError } = await this.supabase
      .from('video_progress')
      .select('watched_seconds')
      .eq('user_id', userId);

    if (progressError) {
      throw new AppError(progressError.message, 500);
    }

    // Calculate statistics
    const totalCourses = enrollments?.length || 0;
    const completedCourses = enrollments?.filter((e) => e.status === 'completed').length || 0;
    const inProgressCourses = totalCourses - completedCourses;
    const totalSeconds = videoProgress?.reduce((acc, p) => acc + (p.watched_seconds || 0), 0) || 0;
    const learningHours = Math.round(totalSeconds / 3600);

    return {
      totalCourses,
      completedCourses,
      inProgressCourses,
      certificates: certificateCount || 0,
      learningHours,
      averageProgress: totalCourses
        ? Math.round(
            (enrollments?.reduce((acc, e) => acc + (e.progress || 0), 0) || 0) / totalCourses
          )
        : 0,
    };
  }

  /**
   * Change user password
   */
  async changePassword(userId: string, currentPassword: string, newPassword: string) {
    // Verify current password first (would need to verify via auth)
    // Then update password
    const { error } = await this.supabase.auth.updateUser({
      password: newPassword,
    });

    if (error) {
      throw new AppError(error.message, 400);
    }
  }
}
