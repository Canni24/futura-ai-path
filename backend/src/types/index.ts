/**
 * Shared TypeScript Types
 * 
 * Central location for all TypeScript interfaces and types
 * used across the backend application.
 */

// ==================
// User Types
// ==================

export interface User {
  id: string;
  email: string;
  full_name?: string;
  avatar_url?: string;
  created_at: string;
  updated_at?: string;
}

export interface Profile {
  id: string;
  email: string;
  full_name?: string;
  avatar_url?: string;
  bio?: string;
  created_at: string;
}

// ==================
// Course Types
// ==================

export interface Course {
  id: number;
  title: string;
  description?: string;
  short_description?: string;
  price: number;
  category?: string;
  level?: string;
  duration_hours?: number;
  rating?: number;
  instructor?: string;
  created_at: string;
  updated_at?: string;
}

export interface CourseModule {
  id: string;
  course_id: number;
  title: string;
  order: number;
  lessons: Lesson[];
}

export interface Lesson {
  id: string;
  module_id: string;
  title: string;
  type: 'video' | 'article' | 'quiz';
  duration?: string;
  order: number;
}

// ==================
// Enrollment Types
// ==================

export interface Enrollment {
  id: string;
  user_id: string;
  course_id: number;
  progress: number;
  status: 'active' | 'completed' | 'paused';
  enrolled_at: string;
  completed_at?: string;
}

export interface VideoProgress {
  id: string;
  user_id: string;
  course_id: number;
  video_id: string;
  watched_seconds: number;
  completed: boolean;
  last_watched_at: string;
}

// ==================
// Payment Types
// ==================

export interface Payment {
  id: string;
  user_id: string;
  course_id: number;
  amount: number;
  currency: string;
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  payment_method?: string;
  transaction_id?: string;
  created_at: string;
  completed_at?: string;
}

// ==================
// Certificate Types
// ==================

export interface Certificate {
  id: string;
  user_id: string;
  course_id: number;
  certificate_number: string;
  issued_at: string;
}

// ==================
// API Response Types
// ==================

export interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
  error?: string;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// ==================
// Request Types
// ==================

export interface PaginationQuery {
  page?: number;
  limit?: number;
}

export interface CourseFilterQuery extends PaginationQuery {
  category?: string;
  search?: string;
  level?: string;
  minPrice?: number;
  maxPrice?: number;
}
