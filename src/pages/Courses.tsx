import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Star, Clock, Users, Filter, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
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

// Course images mapping
const courseImages: Record<string, string> = {
  "AI Fundamentals Unleashed": aiFundamentals,
  "Generative AI Mastery": generativeAI,
  "Ethical AI & Bias": ethicalAI,
  "ML for Data Pros": mlData,
  "AI Career Accelerator": career,
  "Computer Vision Basics": computerVision,
};

// Instructor mapping
const instructorMapping: Record<string, string> = {
  "AI Fundamentals Unleashed": "Dr. Aarav Singh",
  "Generative AI Mastery": "Lena Patel",
  "Ethical AI & Bias": "Sofia Khan",
  "ML for Data Pros": "Vikram Rao",
  "AI Career Accelerator": "Dr. Elena Voss",
  "Computer Vision Basics": "Lena Patel",
  "NLP with Transformers": "Sofia Khan",
  "AI for Business Leaders": "Vikram Rao",
};

// Student count mapping
const studentMapping: Record<string, string> = {
  "AI Fundamentals Unleashed": "12.5K+",
  "Generative AI Mastery": "18.2K+",
  "Ethical AI & Bias": "8.7K+",
  "ML for Data Pros": "15.3K+",
  "AI Career Accelerator": "22.1K+",
  "Computer Vision Basics": "11.4K+",
  "NLP with Transformers": "13.8K+",
  "AI for Business Leaders": "9.2K+",
};

const Courses = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  const [category, setCategory] = useState("all");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Fetch courses from database
  const { data: dbCourses, isLoading } = useQuery({
    queryKey: ['courses'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('courses')
        .select('*');
      
      if (error) throw error;
      return data;
    },
  });

  // Transform database courses to match frontend structure
  const allCourses = dbCourses?.map(course => ({
    id: course.id,
    title: course.title,
    description: course.description || "",
    image: courseImages[course.title] || aiFundamentals,
    duration: course.duration || "10 hours",
    modules: course.modules || 8,
    rating: Number(course.rating) || 4.8,
    reviews: 1000,
    price: Number(course.price),
    category: course.category || "Basics",
    level: course.level || "Beginner",
    instructor: instructorMapping[course.title] || "Expert Instructor",
    students: studentMapping[course.title] || "10K+",
  })) || [];

  // Get popular courses (top 3 by rating)
  const popularCourses = [...allCourses]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 3);

  // Auto-filter for free courses if coming from "Get Started Free"
  useEffect(() => {
    if (location.state?.filterFree) {
      setCategory("all");
    }
  }, [location.state]);

  const handleEnroll = async (course: typeof allCourses[0]) => {
    if (!user) {
      toast.error("Please sign in to enroll");
      navigate("/auth");
      return;
    }

    // Handle free courses - direct enrollment
    if (course.price === 0) {
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
          price: course.price,
          image: course.image
        }
      } 
    });
  };

  const filteredCourses = allCourses
    .filter((course) => {
      const matchesCategory =
        category === "all" || course.category.toLowerCase() === category.toLowerCase();
      // If coming from "Get Started Free", show only free courses
      const matchesFree = location.state?.filterFree ? course.price === 0 : true;
      return matchesCategory && matchesFree;
    });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="pt-20 flex">
        {/* Mobile Filter Button */}
        <div className="lg:hidden fixed bottom-6 right-6 z-50">
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button size="lg" className="rounded-full shadow-lg">
                <Filter className="w-5 h-5 mr-2" />
                Filters
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-80 p-0">
              <SheetHeader className="p-6 border-b border-border">
                <SheetTitle className="flex items-center gap-2">
                  <Filter className="w-4 h-4" />
                  Filters
                </SheetTitle>
              </SheetHeader>
              <div className="p-6 space-y-6 overflow-y-auto max-h-[calc(100vh-80px)]">
                {/* Category Filter */}
                <div className="space-y-2">
                  <h3 className="text-sm font-medium text-foreground mb-3">Category</h3>
                  {["all", "basics", "advanced", "ethics", "career"].map((cat) => (
                    <button
                      key={cat}
                      onClick={() => {
                        setCategory(cat);
                        setMobileMenuOpen(false);
                      }}
                      className={`w-full text-left px-4 py-2 rounded-md text-sm transition-colors ${
                        category === cat
                          ? "bg-accent text-accent-foreground font-medium"
                          : "hover:bg-muted text-muted-foreground"
                      }`}
                    >
                      {cat === "all" ? "All" : cat === "basics" ? "AI Basics" : cat === "advanced" ? "ML Advanced" : cat.charAt(0).toUpperCase() + cat.slice(1)}
                    </button>
                  ))}
                </div>

                {/* Popular Courses */}
                <div className="space-y-4 pt-6 border-t border-border">
                  <h3 className="text-sm font-semibold text-foreground">Popular Courses</h3>
                  <div className="space-y-3">
                    {popularCourses.map((course) => (
                      <button
                        key={course.id}
                        onClick={() => {
                          navigate(`/courses/${course.id}`);
                          setMobileMenuOpen(false);
                        }}
                        className="w-full text-left space-y-1 group"
                      >
                        <p className="text-sm font-medium text-foreground group-hover:text-accent transition-colors">
                          {course.title}
                        </p>
                        <div className="flex items-center gap-1">
                          <Star className="w-3 h-3 fill-accent text-accent" />
                          <span className="text-xs text-muted-foreground">{course.rating}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {/* Desktop Sidebar */}
        <aside className="hidden lg:block w-64 border-r border-border min-h-screen sticky top-20 self-start">
          <div className="p-6 space-y-6">
            {/* Filters Section */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-sm font-semibold text-primary">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                </svg>
                Filters
              </div>
              
              <div className="space-y-2">
                <h3 className="text-sm font-medium text-foreground mb-3">Category</h3>
                <button
                  onClick={() => setCategory("all")}
                  className={`w-full text-left px-4 py-2 rounded-md text-sm transition-colors ${
                    category === "all"
                      ? "bg-accent text-accent-foreground font-medium"
                      : "hover:bg-muted text-muted-foreground"
                  }`}
                >
                  All
                </button>
                <button
                  onClick={() => setCategory("basics")}
                  className={`w-full text-left px-4 py-2 rounded-md text-sm transition-colors ${
                    category === "basics"
                      ? "bg-accent text-accent-foreground font-medium"
                      : "hover:bg-muted text-muted-foreground"
                  }`}
                >
                  AI Basics
                </button>
                <button
                  onClick={() => setCategory("advanced")}
                  className={`w-full text-left px-4 py-2 rounded-md text-sm transition-colors ${
                    category === "advanced"
                      ? "bg-accent text-accent-foreground font-medium"
                      : "hover:bg-muted text-muted-foreground"
                  }`}
                >
                  ML Advanced
                </button>
                <button
                  onClick={() => setCategory("ethics")}
                  className={`w-full text-left px-4 py-2 rounded-md text-sm transition-colors ${
                    category === "ethics"
                      ? "bg-accent text-accent-foreground font-medium"
                      : "hover:bg-muted text-muted-foreground"
                  }`}
                >
                  Ethics
                </button>
                <button
                  onClick={() => setCategory("career")}
                  className={`w-full text-left px-4 py-2 rounded-md text-sm transition-colors ${
                    category === "career"
                      ? "bg-accent text-accent-foreground font-medium"
                      : "hover:bg-muted text-muted-foreground"
                  }`}
                >
                  Career
                </button>
              </div>
            </div>

            {/* Popular Courses Section */}
            <div className="space-y-4 pt-6 border-t border-border">
              <h3 className="text-sm font-semibold text-foreground">Popular Courses</h3>
              <div className="space-y-3">
                {popularCourses.map((course) => (
                  <button
                    key={course.id}
                    onClick={() => navigate(`/courses/${course.id}`)}
                    className="w-full text-left space-y-1 group"
                  >
                    <p className="text-sm font-medium text-foreground group-hover:text-accent transition-colors">
                      {course.title}
                    </p>
                    <div className="flex items-center gap-1">
                      <Star className="w-3 h-3 fill-accent text-accent" />
                      <span className="text-xs text-muted-foreground">{course.rating}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 lg:p-8">
          <div className="mb-6">
            <p className="text-sm text-muted-foreground">
              Showing <span className="font-semibold text-foreground">{filteredCourses.length}</span> courses
            </p>
          </div>

          {isLoading ? (
            <div className="text-center py-20">
              <p className="text-muted-foreground text-lg">Loading courses...</p>
            </div>
          ) : filteredCourses.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-muted-foreground text-lg">No courses found. Try adjusting your filters.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredCourses.map((course, index) => (
                <motion.div
                  key={course.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                >
                  <Card className="overflow-hidden group border-border hover:shadow-lg transition-shadow">
                    <div 
                      className="relative overflow-hidden h-48 cursor-pointer"
                      onClick={() => navigate(`/courses/${course.id}`)}
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/80 to-secondary/80 z-10" />
                      <img
                        src={course.image}
                        alt={course.title}
                        className="w-full h-full object-cover"
                      />
                      <Badge className="absolute top-4 right-4 z-20 bg-accent text-accent-foreground border-0 font-semibold">
                        {course.price === 0 ? "FREE" : `₹${course.price.toLocaleString()}`}
                      </Badge>
                      <Badge className="absolute bottom-4 left-4 z-20 bg-accent text-accent-foreground border-0 text-xs">
                        {course.category}
                      </Badge>
                    </div>
                    
                    <div className="p-6 space-y-4">
                      <div className="flex items-center gap-2 text-sm">
                        <Star className="w-4 h-4 fill-accent text-accent" />
                        <span className="font-semibold text-foreground">{course.rating}</span>
                        <span className="text-muted-foreground">({course.reviews})</span>
                      </div>
                      
                      <div 
                        className="space-y-2 cursor-pointer"
                        onClick={() => navigate(`/courses/${course.id}`)}
                      >
                        <h3 className="text-xl font-semibold text-foreground group-hover:text-accent transition-colors">
                          {course.title}
                        </h3>
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {course.description}
                        </p>
                      </div>

                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          <span>{course.duration}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          <span>{course.students}</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-2">
                        <p className="text-sm text-muted-foreground">
                          By <span className="font-medium text-foreground">{course.instructor}</span>
                        </p>
                        <Button 
                          size="sm"
                          onClick={() => navigate(`/courses/${course.id}`)}
                          className="bg-primary text-primary-foreground hover:bg-primary/90"
                        >
                          Enroll Now
                        </Button>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default Courses;
