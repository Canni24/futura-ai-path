-- Add is_free column to courses table
ALTER TABLE public.courses 
ADD COLUMN is_free boolean DEFAULT false;

-- Update some existing courses to be free (if any exist)
-- This is optional and won't fail if no courses exist yet
UPDATE public.courses 
SET is_free = true 
WHERE title IN ('AI Fundamentals Unleashed', 'Ethical AI & Bias');

-- Create free_enrollments view for analytics
CREATE OR REPLACE VIEW public.free_enrollments_stats AS
SELECT 
  c.id as course_id,
  c.title,
  COUNT(e.id) as total_enrollments
FROM public.courses c
LEFT JOIN public.enrollments e ON c.id = e.course_id
WHERE c.is_free = true
GROUP BY c.id, c.title;