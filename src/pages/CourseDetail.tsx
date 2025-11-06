import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import {
  Star,
  Clock,
  BookOpen,
  Users,
  CheckCircle2,
  PlayCircle,
  Award,
  TrendingUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

import aiFundamentals from "@/assets/course-ai-fundamentals.jpg";
import generativeAI from "@/assets/course-generative-ai.jpg";
import ethicalAI from "@/assets/course-ethical-ai.jpg";
import mlData from "@/assets/course-ml-data.jpg";
import career from "@/assets/course-career.jpg";
import computerVision from "@/assets/course-computer-vision.jpg";
import founderImage from "@/assets/founder-rishabh.jpg";

const courseImages: Record<string, string> = {
  "AI Fundamentals Unleashed": aiFundamentals,
  "Generative AI Mastery": generativeAI,
  "Ethical AI & Bias": ethicalAI,
  "ML for Data Pros": mlData,
  "AI Career Accelerator": career,
  "Computer Vision Basics": computerVision,
};

// Mock curriculum data
const mockCurriculum: Record<string, any[]> = {
  "AI Fundamentals Unleashed": [
    { id: 1, title: "Introduction to AI", duration: "45 min", locked: false },
    { id: 2, title: "Machine Learning Basics", duration: "1h 20min", locked: false },
    { id: 3, title: "Neural Networks Fundamentals", duration: "1h 15min", locked: false },
    { id: 4, title: "Deep Learning Overview", duration: "50 min", locked: false },
    { id: 5, title: "AI Applications & Use Cases", duration: "1h", locked: false },
    { id: 6, title: "Ethics in AI", duration: "40 min", locked: false },
    { id: 7, title: "Future of AI", duration: "35 min", locked: false },
    { id: 8, title: "Final Project", duration: "2h", locked: false },
  ],
  "Generative AI Mastery": [
    { id: 1, title: "Introduction to Generative AI", duration: "50 min", locked: false },
    { id: 2, title: "GPT and Large Language Models", duration: "1h 30min", locked: false },
    { id: 3, title: "Prompt Engineering", duration: "1h 10min", locked: false },
    { id: 4, title: "Image Generation with AI", duration: "1h 20min", locked: false },
    { id: 5, title: "Fine-tuning Models", duration: "1h 40min", locked: false },
    { id: 6, title: "AI Content Creation", duration: "55 min", locked: false },
    { id: 7, title: "Advanced Applications", duration: "1h 15min", locked: false },
    { id: 8, title: "Capstone Project", duration: "2h 30min", locked: false },
  ],
};

// Mock reviews
const mockReviews = [
  {
    id: 1,
    author: "Sarah Johnson",
    rating: 5,
    comment: "Excellent course! The instructor explains complex concepts in a very understandable way.",
    date: "2024-01-15",
  },
  {
    id: 2,
    author: "Michael Chen",
    rating: 5,
    comment: "Best AI course I've taken. Practical examples and hands-on projects really helped.",
    date: "2024-01-10",
  },
  {
    id: 3,
    author: "Emily Davis",
    rating: 4,
    comment: "Great content and well-structured. Would love to see more advanced topics covered.",
    date: "2024-01-05",
  },
];

const CourseDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  // Fetch course details
  const { data: course, isLoading } = useQuery({
    queryKey: ["course", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("courses")
        .select("*")
        .eq("id", id)
        .single();

      if (error) throw error;
      return data;
    },
  });

  // Check if user is enrolled
  const { data: enrollment } = useQuery({
    queryKey: ["enrollment", id, user?.id],
    queryFn: async () => {
      if (!user) return null;
      const { data, error } = await supabase
        .from("enrollments")
        .select("*")
        .eq("course_id", id)
        .eq("user_id", user.id)
        .maybeSingle();

      if (error) throw error;
      return data;
    },
    enabled: !!user && !!id,
  });

  useEffect(() => {
    if (!isLoading && !course) {
      navigate("/courses");
    }
  }, [course, isLoading, navigate]);

  const handleEnroll = async () => {
    if (!user) {
      toast.error("Please sign in to enroll");
      navigate("/auth");
      return;
    }

    if (enrollment) {
      toast.info("You're already enrolled in this course!");
      navigate("/dashboard");
      return;
    }

    // Handle free courses - direct enrollment
    if (course.price === 0 || course.is_free) {
      try {
        const { error } = await supabase.from("enrollments").insert({
          user_id: user.id,
          course_id: course.id,
        });

        if (error) throw error;

        toast.success(`Successfully enrolled in ${course.title}!`);
        navigate("/dashboard");
      } catch (error: any) {
        if (error.code === "23505") {
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
          price: course.price,
          image: courseImages[course.title] || aiFundamentals,
        },
      },
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground text-lg">Loading course...</p>
      </div>
    );
  }

  if (!course) return null;

  const curriculum = mockCurriculum[course.title] || mockCurriculum["AI Fundamentals Unleashed"];
  const courseImage = courseImages[course.title] || aiFundamentals;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-24 pb-12 bg-gradient-to-b from-primary to-secondary relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <img src={courseImage} alt="" className="w-full h-full object-cover" />
        </div>
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <div className="flex items-center gap-3">
                <Badge className="bg-accent text-primary">
                  {course.level || "Beginner"}
                </Badge>
                <Badge variant="outline" className="border-accent text-accent">
                  {course.category || "AI Basics"}
                </Badge>
              </div>

              <h1 className="text-4xl md:text-5xl font-bold text-primary-foreground">
                {course.title}
              </h1>

              <p className="text-lg text-primary-foreground/80">
                {course.description}
              </p>

              <div className="flex flex-wrap items-center gap-6 text-primary-foreground/80">
                <div className="flex items-center gap-2">
                  <Star className="h-5 w-5 fill-accent text-accent" />
                  <span className="font-semibold text-accent">
                    {Number(course.rating) || 4.8}
                  </span>
                  <span>(1,234 reviews)</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  <span>5,432 students</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  <span>{course.duration || "10 hours"}</span>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <Button
                  size="lg"
                  className="bg-accent text-primary hover:bg-accent-glow"
                  onClick={handleEnroll}
                >
                  {enrollment ? "Go to Dashboard" : course.price === 0 || course.is_free ? "Enroll Free" : `Enroll Now - ₹${Number(course.price).toLocaleString()}`}
                </Button>
                {course.price > 0 && !course.is_free && (
                  <div className="text-2xl font-bold text-accent">
                    ₹{Number(course.price).toLocaleString()}
                  </div>
                )}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <img
                src={courseImage}
                alt={course.title}
                className="rounded-lg shadow-2xl w-full"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-primary/80 backdrop-blur-sm rounded-full p-6 hover:scale-110 smooth-transition cursor-pointer">
                  <PlayCircle className="h-16 w-16 text-accent" />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* What You'll Learn */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <Card className="border-accent/20">
                  <CardContent className="p-6">
                    <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                      <TrendingUp className="h-6 w-6 text-accent" />
                      What You'll Learn
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {[
                        "Master fundamental AI concepts",
                        "Build real-world AI projects",
                        "Understand machine learning algorithms",
                        "Deploy AI models to production",
                        "Work with neural networks",
                        "Apply best practices in AI development",
                      ].map((item, index) => (
                        <div key={index} className="flex items-start gap-2">
                          <CheckCircle2 className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                          <span className="text-sm">{item}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Course Curriculum */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <Card className="border-accent/20">
                  <CardContent className="p-6">
                    <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                      <BookOpen className="h-6 w-6 text-accent" />
                      Course Curriculum
                    </h2>
                    <div className="space-y-2">
                      {curriculum.map((module, index) => (
                        <div
                          key={module.id}
                          className="flex items-center justify-between p-4 rounded-lg hover:bg-muted/50 smooth-transition border border-transparent hover:border-accent/20"
                        >
                          <div className="flex items-center gap-4">
                            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-accent/10 text-accent font-semibold text-sm">
                              {index + 1}
                            </div>
                            <div>
                              <h3 className="font-medium">{module.title}</h3>
                              <p className="text-sm text-muted-foreground flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                {module.duration}
                              </p>
                            </div>
                          </div>
                          <PlayCircle className="h-5 w-5 text-muted-foreground" />
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Student Reviews */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <Card className="border-accent/20">
                  <CardContent className="p-6">
                    <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                      <Star className="h-6 w-6 text-accent" />
                      Student Reviews
                    </h2>
                    <div className="space-y-6">
                      {mockReviews.map((review) => (
                        <div key={review.id}>
                          <div className="flex items-start gap-4">
                            <Avatar>
                              <AvatarFallback className="bg-accent text-primary">
                                {review.author.charAt(0)}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <div className="flex items-center justify-between mb-2">
                                <h3 className="font-semibold">{review.author}</h3>
                                <span className="text-sm text-muted-foreground">
                                  {new Date(review.date).toLocaleDateString()}
                                </span>
                              </div>
                              <div className="flex items-center gap-1 mb-2">
                                {Array.from({ length: 5 }).map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`h-4 w-4 ${
                                      i < review.rating
                                        ? "fill-accent text-accent"
                                        : "text-muted"
                                    }`}
                                  />
                                ))}
                              </div>
                              <p className="text-sm text-muted-foreground">
                                {review.comment}
                              </p>
                            </div>
                          </div>
                          {review.id !== mockReviews[mockReviews.length - 1].id && (
                            <Separator className="mt-6" />
                          )}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            {/* Right Column - Sidebar */}
            <div className="space-y-6">
              {/* Course Stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <Card className="border-accent/20 sticky top-24">
                  <CardContent className="p-6 space-y-4">
                    <h3 className="text-xl font-bold">Course Includes</h3>
                    <Separator />
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <Clock className="h-5 w-5 text-accent" />
                        <span className="text-sm">
                          {course.duration || "10 hours"} on-demand video
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <BookOpen className="h-5 w-5 text-accent" />
                        <span className="text-sm">
                          {course.modules || 8} modules
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Award className="h-5 w-5 text-accent" />
                        <span className="text-sm">Certificate of completion</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Users className="h-5 w-5 text-accent" />
                        <span className="text-sm">Lifetime access</span>
                      </div>
                    </div>
                    <Separator />
                    <Button
                      className="w-full bg-accent text-primary hover:bg-accent-glow"
                      onClick={handleEnroll}
                    >
                      {enrollment ? "Continue Learning" : course.price === 0 || course.is_free ? "Enroll Free" : "Enroll Now"}
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Instructor Info */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <Card className="border-accent/20">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold mb-4">Instructor</h3>
                    <div className="flex items-start gap-4">
                      <img
                        src={founderImage}
                        alt="Rishabh Shekhar"
                        className="w-16 h-16 rounded-full object-cover"
                      />
                      <div className="flex-1">
                        <h4 className="font-semibold">Rishabh Shekhar</h4>
                        <p className="text-sm text-muted-foreground mb-2">
                          AI Expert & Educator
                        </p>
                        <p className="text-xs text-muted-foreground">
                          With over 10 years of experience in AI and machine learning,
                          Rishabh has helped thousands of students master AI concepts.
                        </p>
                      </div>
                    </div>
                    <Separator className="my-4" />
                    <div className="grid grid-cols-2 gap-4 text-center">
                      <div>
                        <div className="text-2xl font-bold text-accent">12+</div>
                        <div className="text-xs text-muted-foreground">Courses</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-accent">50k+</div>
                        <div className="text-xs text-muted-foreground">Students</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CourseDetail;
