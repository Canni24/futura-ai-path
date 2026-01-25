/**
 * Course Service
 * 
 * Handles course-related database operations.
 */

import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { AppError } from '../utils/AppError';

interface CourseFilters {
  category?: string;
  search?: string;
  page: number;
  limit: number;
}

interface CourseData {
  title: string;
  description?: string;
  short_description?: string;
  price?: number;
  category?: string;
  level?: string;
  duration_hours?: number;
  rating?: number;
  instructor?: string;
}

export class CourseService {
  private supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient(
      process.env.SUPABASE_URL || '',
      process.env.SUPABASE_SERVICE_KEY || ''
    );
  }

  /**
   * Get all courses with optional filters
   */
  async getAllCourses(filters: CourseFilters) {
    let query = this.supabase
      .from('courses')
      .select('*', { count: 'exact' });

    // Apply category filter
    if (filters.category) {
      query = query.eq('category', filters.category);
    }

    // Apply search filter
    if (filters.search) {
      query = query.or(`title.ilike.%${filters.search}%,description.ilike.%${filters.search}%`);
    }

    // Apply pagination
    const start = (filters.page - 1) * filters.limit;
    const end = start + filters.limit - 1;
    query = query.range(start, end);

    // Order by created_at
    query = query.order('created_at', { ascending: false });

    const { data, error, count } = await query;

    if (error) {
      throw new AppError(error.message, 500);
    }

    return {
      courses: data,
      total: count,
      page: filters.page,
      limit: filters.limit,
      totalPages: Math.ceil((count || 0) / filters.limit),
    };
  }

  /**
   * Get a single course by ID
   */
  async getCourseById(id: string) {
    const { data, error } = await this.supabase
      .from('courses')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return null; // Not found
      }
      throw new AppError(error.message, 500);
    }

    return data;
  }

  /**
   * Create a new course
   */
  async createCourse(courseData: CourseData) {
    const { data, error } = await this.supabase
      .from('courses')
      .insert(courseData)
      .select()
      .single();

    if (error) {
      throw new AppError(error.message, 500);
    }

    return data;
  }

  /**
   * Update a course
   */
  async updateCourse(id: string, courseData: Partial<CourseData>) {
    const { data, error } = await this.supabase
      .from('courses')
      .update(courseData)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      throw new AppError(error.message, 500);
    }

    return data;
  }

  /**
   * Delete a course
   */
  async deleteCourse(id: string) {
    const { error } = await this.supabase
      .from('courses')
      .delete()
      .eq('id', id);

    if (error) {
      throw new AppError(error.message, 500);
    }
  }

  /**
   * Get course curriculum
   * Note: This returns mock data for now - implement curriculum table if needed
   */
  async getCourseCurriculum(id: string) {
    // Placeholder - implement with actual curriculum table
    return {
      courseId: id,
      modules: [
        {
          id: '1',
          title: 'Introduction',
          lessons: [
            { id: '1-1', title: 'Welcome', duration: '5:00', type: 'video' },
            { id: '1-2', title: 'Course Overview', duration: '10:00', type: 'video' },
          ],
        },
      ],
    };
  }
}
