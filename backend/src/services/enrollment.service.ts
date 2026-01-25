/**
 * Enrollment Service
 * 
 * Handles course enrollment and progress tracking.
 */

import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { AppError } from '../utils/AppError';

export class EnrollmentService {
  private supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient(
      process.env.SUPABASE_URL || '',
      process.env.SUPABASE_SERVICE_KEY || ''
    );
  }

  /**
   * Get all enrollments for a user
   */
  async getUserEnrollments(userId: string) {
    const { data, error } = await this.supabase
      .from('enrollments')
      .select(`
        *,
        course:courses(*)
      `)
      .eq('user_id', userId)
      .order('enrolled_at', { ascending: false });

    if (error) {
      throw new AppError(error.message, 500);
    }

    return data;
  }

  /**
   * Enroll a user in a course
   */
  async enrollInCourse(userId: string, courseId: string) {
    const { data, error } = await this.supabase
      .from('enrollments')
      .insert({
        user_id: userId,
        course_id: courseId,
        progress: 0,
        status: 'active',
      })
      .select()
      .single();

    if (error) {
      throw new AppError(error.message, 500);
    }

    return data;
  }

  /**
   * Get enrollment status for a specific course
   */
  async getEnrollmentStatus(userId: string, courseId: string) {
    const { data, error } = await this.supabase
      .from('enrollments')
      .select('*')
      .eq('user_id', userId)
      .eq('course_id', courseId)
      .single();

    if (error && error.code !== 'PGRST116') {
      throw new AppError(error.message, 500);
    }

    return data;
  }

  /**
   * Update video progress
   */
  async updateProgress(
    userId: string,
    courseId: string,
    videoId: string,
    watchedSeconds: number,
    completed: boolean
  ) {
    // Upsert video progress
    const { data: progressData, error: progressError } = await this.supabase
      .from('video_progress')
      .upsert({
        user_id: userId,
        course_id: courseId,
        video_id: videoId,
        watched_seconds: watchedSeconds,
        completed,
        last_watched_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (progressError) {
      throw new AppError(progressError.message, 500);
    }

    // Update overall course progress
    await this.updateCourseProgress(userId, courseId);

    return progressData;
  }

  /**
   * Get course progress for a user
   */
  async getCourseProgress(userId: string, courseId: string) {
    const { data, error } = await this.supabase
      .from('video_progress')
      .select('*')
      .eq('user_id', userId)
      .eq('course_id', courseId);

    if (error) {
      throw new AppError(error.message, 500);
    }

    return data;
  }

  /**
   * Update overall course progress percentage
   */
  private async updateCourseProgress(userId: string, courseId: string) {
    // Get all video progress for the course
    const { data: progressData } = await this.supabase
      .from('video_progress')
      .select('completed')
      .eq('user_id', userId)
      .eq('course_id', courseId);

    if (!progressData || progressData.length === 0) {
      return;
    }

    // Calculate completion percentage
    const completedCount = progressData.filter((p) => p.completed).length;
    const totalCount = progressData.length;
    const progressPercentage = Math.round((completedCount / totalCount) * 100);

    // Update enrollment progress
    await this.supabase
      .from('enrollments')
      .update({
        progress: progressPercentage,
        status: progressPercentage === 100 ? 'completed' : 'active',
        completed_at: progressPercentage === 100 ? new Date().toISOString() : null,
      })
      .eq('user_id', userId)
      .eq('course_id', courseId);
  }
}
