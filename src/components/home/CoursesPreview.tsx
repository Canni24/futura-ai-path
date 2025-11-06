import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, Clock, ArrowRight } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";

import aiFundamentals from "@/assets/course-ai-fundamentals.jpg";
import generativeAI from "@/assets/course-generative-ai.jpg";
import ethicalAI from "@/assets/course-ethical-ai.jpg";
import mlData from "@/assets/course-ml-data.jpg";
import career from "@/assets/course-career.jpg";
import computerVision from "@/assets/course-computer-vision.jpg";

// Course images mapping
const courseImages: Record<string, string> = {
  "AI Fundamentals Unleashed": aiFundamentals,
  "Generative AI Mastery": generativeAI,
  "Ethical AI & Bias": ethicalAI,
  "ML for Data Pros": mlData,
  "AI Career Accelerator": career,
  "Computer Vision Basics": computerVision,
};

const CoursesPreview = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  // Fetch courses from database (limit to 6 for preview)
  const { data: dbCourses } = useQuery({
    queryKey: ['courses-preview'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('courses')
        .select('*')
        .limit(6);
      
      if (error) throw error;
      return data;
    },
  });

  // Transform database courses to match frontend structure
  const courses = dbCourses?.map(course => ({
    id: course.id,
    title: course.title,
    description: course.description || "",
    image: courseImages[course.title] || aiFundamentals,
    duration: course.duration || "10 hours",
    rating: Number(course.rating) || 4.8,
    reviews: 1000,
    price: course.price === 0 || course.is_free ? "FREE" : `₹${Number(course.price).toLocaleString()}`,
    priceNum: Number(course.price),
  })) || [];

  const handleEnroll = async (course: typeof courses[0]) => {
    if (!user) {
      toast.error("Please sign in to enroll");
      navigate("/auth");
      return;
    }

    // Handle free courses - direct enrollment
    if (course.priceNum === 0) {
      try {
        const { error } = await supabase
          .from('enrollments')
          .insert({
            user_id: user.id,
            course_id: course.id,
          });

        if (error) throw error;
        
        toast.success(`Successfully enrolled in ${course.title}!`);
      } catch (error: any) {
        if (error.code === '23505') {
          toast.info("You're already enrolled in this course!");
        } else {
          console.error("Enrollment error:", error);
          toast.error("Failed to enroll. Please try again.");
        }
      }
      return;
    }

    // Paid courses go to checkout
    navigate("/checkout", { 
      state: { 
        course: {
          id: course.id,
          title: course.title,
          price: course.priceNum,
          image: course.image
        }
      } 
    });
  };
  
  return (
    <section className="py-20 bg-gradient-to-b from-background to-muted">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 space-y-4"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-gradient">
            Featured AI Courses
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Start your AI journey with our most popular courses, taught by industry experts.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {courses.map((course, index) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card 
                className="overflow-hidden hover-lift group border-accent/20 cursor-pointer"
                onClick={() => navigate(`/courses/${course.id}`)}
              >
                <div className="relative overflow-hidden">
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute top-4 right-4 bg-accent text-primary px-3 py-1 rounded-full text-sm font-semibold">
                    {course.price}
                  </div>
                </div>
                <div className="p-6 space-y-4">
                  <h3 className="text-xl font-semibold group-hover:text-accent smooth-transition">
                    {course.title}
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {course.description}
                  </p>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-1 text-accent">
                      <Star className="h-4 w-4 fill-current" />
                      <span className="font-semibold">{course.rating}</span>
                      <span className="text-muted-foreground">({course.reviews})</span>
                    </div>
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      <span>{course.duration}</span>
                    </div>
                  </div>
                  <Button 
                    className="w-full bg-accent text-primary hover:bg-accent-glow group"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/courses/${course.id}`);
                    }}
                  >
                    View Details
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 smooth-transition" />
                  </Button>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <Link to="/courses">
            <Button size="lg" variant="outline" className="border-accent text-accent hover:bg-accent hover:text-primary">
              View All Courses
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default CoursesPreview;
