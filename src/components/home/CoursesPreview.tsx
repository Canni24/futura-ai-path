import { motion } from "framer-motion";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, Clock, ArrowRight, Users } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { Badge } from "@/components/ui/badge";

import aiFundamentals from "@/assets/course-ai-fundamentals.jpg";
import generativeAI from "@/assets/course-generative-ai.jpg";
import ethicalAI from "@/assets/course-ethical-ai.jpg";
import mlData from "@/assets/course-ml-data.jpg";
import career from "@/assets/course-career.jpg";
import computerVision from "@/assets/course-computer-vision.jpg";

const courseImages: Record<string, string> = {
  "AI Fundamentals Unleashed": aiFundamentals,
  "Generative AI Mastery": generativeAI,
  "Ethical AI & Bias": ethicalAI,
  "ML for Data Pros": mlData,
  "AI Career Accelerator": career,
  "Computer Vision Basics": computerVision,
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      delay: i * 0.12,
      ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number],
    },
  }),
};

const CoursesPreview = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

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
    level: course.level || "Beginner",
    students: course.students_count || "1K+",
    category: course.category || "AI",
  })) || [];

  const handleEnroll = async (course: typeof courses[0]) => {
    if (!user) {
      toast.error("Please sign in to enroll");
      navigate("/auth");
      return;
    }
    if (course.priceNum === 0) {
      try {
        const { error } = await supabase
          .from('enrollments')
          .insert({ user_id: user.id, course_id: course.id });
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
    navigate("/checkout", {
      state: {
        course: { id: course.id, title: course.title, price: course.priceNum, image: course.image },
      },
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
              custom={index}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              whileHover={{ y: -8 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <Card
                className="overflow-hidden group border-accent/20 cursor-pointer h-full flex flex-col bg-card hover:shadow-xl hover:shadow-accent/10 transition-shadow duration-300"
                onClick={() => navigate(`/courses/${course.id}`)}
              >
                <div className="relative overflow-hidden">
                  <motion.img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-48 object-cover"
                    whileHover={{ scale: 1.08 }}
                    transition={{ duration: 0.6 }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <Badge className="absolute top-3 right-3 bg-accent text-primary border-0 font-bold text-sm">
                    {course.price}
                  </Badge>
                  <Badge variant="secondary" className="absolute top-3 left-3 bg-primary/80 text-primary-foreground border-0 text-xs backdrop-blur-sm">
                    {course.level}
                  </Badge>
                </div>

                <CardHeader className="pb-2">
                  <h3 className="text-lg font-bold group-hover:text-accent transition-colors duration-200 line-clamp-1">
                    {course.title}
                  </h3>
                  <Badge variant="outline" className="w-fit text-xs border-accent/30 text-muted-foreground">
                    {course.category}
                  </Badge>
                </CardHeader>

                <CardContent className="flex-1 pb-3">
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {course.description}
                  </p>
                </CardContent>

                <CardFooter className="flex flex-col gap-3 pt-0">
                  <div className="flex items-center justify-between w-full text-sm">
                    <div className="flex items-center gap-1 text-accent">
                      <Star className="h-4 w-4 fill-current" />
                      <span className="font-semibold">{course.rating}</span>
                      <span className="text-muted-foreground text-xs">({course.reviews})</span>
                    </div>
                    <div className="flex items-center gap-3 text-muted-foreground text-xs">
                      <span className="flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5" />
                        {course.duration}
                      </span>
                      <span className="flex items-center gap-1">
                        <Users className="h-3.5 w-3.5" />
                        {course.students}
                      </span>
                    </div>
                  </div>
                  <Button
                    className="w-full bg-accent text-primary hover:bg-accent-glow group/btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/courses/${course.id}`);
                    }}
                  >
                    View Details
                    <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                  </Button>
                </CardFooter>
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
