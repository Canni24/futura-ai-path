import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Search, Filter, Star, Clock, BookOpen } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

import aiFundamentals from "@/assets/course-ai-fundamentals.jpg";
import generativeAI from "@/assets/course-generative-ai.jpg";
import ethicalAI from "@/assets/course-ethical-ai.jpg";
import mlData from "@/assets/course-ml-data.jpg";
import career from "@/assets/course-career.jpg";
import computerVision from "@/assets/course-computer-vision.jpg";

const allCourses = [
  {
    id: 1,
    title: "AI Fundamentals Unleashed",
    description:
      "Master the core concepts of artificial intelligence including neural networks, deep learning architectures, and Python programming fundamentals. Perfect for absolute beginners.",
    image: aiFundamentals,
    duration: "10 hours",
    modules: 8,
    rating: 4.8,
    reviews: 1250,
    price: 1499,
    category: "Basics",
    level: "Beginner",
  },
  {
    id: 2,
    title: "Generative AI Mastery",
    description:
      "Build cutting-edge generative AI applications using Stable Diffusion, ChatGPT APIs, DALL-E, and more. Create AI-powered art, content, and applications.",
    image: generativeAI,
    duration: "15 hours",
    modules: 12,
    rating: 4.9,
    reviews: 980,
    price: 1999,
    category: "Advanced",
    level: "Intermediate",
  },
  {
    id: 3,
    title: "Ethical AI & Bias",
    description:
      "Navigate the complex landscape of responsible AI deployment, fairness principles, bias detection, and ethical considerations in machine learning systems.",
    image: ethicalAI,
    duration: "8 hours",
    modules: 6,
    rating: 4.7,
    reviews: 650,
    price: 999,
    category: "Ethics",
    level: "All Levels",
  },
  {
    id: 4,
    title: "ML for Data Pros",
    description:
      "Deep dive into TensorFlow, PyTorch, and advanced machine learning techniques. Build production-ready models with hands-on projects and real-world datasets.",
    image: mlData,
    duration: "20 hours",
    modules: 15,
    rating: 4.9,
    reviews: 1500,
    price: 2499,
    category: "Advanced",
    level: "Advanced",
  },
  {
    id: 5,
    title: "AI Career Accelerator",
    description:
      "Complete guide to landing your dream AI job with expert resume templates, interview preparation, portfolio building strategies, and networking tips.",
    image: career,
    duration: "12 hours",
    modules: 10,
    rating: 4.6,
    reviews: 890,
    price: 1299,
    category: "Career",
    level: "All Levels",
  },
  {
    id: 6,
    title: "Computer Vision Basics",
    description:
      "Learn image recognition, object detection, facial recognition, and OpenCV fundamentals. Build real-world computer vision applications from scratch.",
    image: computerVision,
    duration: "18 hours",
    modules: 14,
    rating: 4.8,
    reviews: 720,
    price: 2199,
    category: "Basics",
    level: "Intermediate",
  },
];

const Courses = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("all");
  const [sortBy, setSortBy] = useState("popular");

  const handleEnroll = (course: typeof allCourses[0]) => {
    if (!user) {
      toast.error("Please sign in to enroll in courses");
      navigate("/auth");
      return;
    }
    
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
      const matchesSearch = course.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesCategory =
        category === "all" || course.category.toLowerCase() === category.toLowerCase();
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      if (sortBy === "price-low") return a.price - b.price;
      if (sortBy === "price-high") return b.price - a.price;
      if (sortBy === "rating") return b.rating - a.rating;
      return b.reviews - a.reviews; // popular (default)
    });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-24 pb-12 bg-gradient-to-b from-primary to-secondary">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center space-y-4 max-w-3xl mx-auto"
          >
            <h1 className="text-4xl md:text-6xl font-bold text-primary-foreground">
              Explore AI <span className="text-accent">Courses</span>
            </h1>
            <p className="text-lg text-primary-foreground/80">
              Transform your career with industry-leading AI courses taught by experts.
              Start learning today!
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 bg-muted/50 sticky top-16 z-40 backdrop-blur-md border-b">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="relative flex-1 w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="Search courses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-4 w-full md:w-auto">
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger className="w-full md:w-40">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="basics">Basics</SelectItem>
                  <SelectItem value="advanced">Advanced</SelectItem>
                  <SelectItem value="ethics">Ethics</SelectItem>
                  <SelectItem value="career">Career</SelectItem>
                </SelectContent>
              </Select>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-full md:w-40">
                  <SelectValue placeholder="Sort By" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="popular">Most Popular</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </section>

      {/* Courses Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4 lg:px-8">
          {filteredCourses.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-muted-foreground text-lg">No courses found. Try adjusting your filters.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredCourses.map((course, index) => (
                <motion.div
                  key={course.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="overflow-hidden hover-lift group border-accent/20 h-full flex flex-col">
                    <div className="relative overflow-hidden">
                      <img
                        src={course.image}
                        alt={course.title}
                        className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute top-4 right-4 bg-accent text-primary px-3 py-1 rounded-full text-sm font-semibold">
                        ₹{course.price.toLocaleString()}
                      </div>
                      <div className="absolute bottom-4 left-4 bg-primary/90 text-primary-foreground px-3 py-1 rounded-full text-xs font-medium">
                        {course.level}
                      </div>
                    </div>
                    <div className="p-6 space-y-4 flex-1 flex flex-col">
                      <div className="flex-1 space-y-3">
                        <h3 className="text-xl font-semibold group-hover:text-accent smooth-transition">
                          {course.title}
                        </h3>
                        <p className="text-sm text-muted-foreground line-clamp-3">
                          {course.description}
                        </p>
                      </div>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between text-sm">
                          <div className="flex items-center gap-1 text-accent">
                            <Star className="h-4 w-4 fill-current" />
                            <span className="font-semibold">{course.rating}</span>
                            <span className="text-muted-foreground">({course.reviews})</span>
                          </div>
                          <div className="flex items-center gap-3 text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Clock className="h-4 w-4" />
                              <span>{course.duration}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <BookOpen className="h-4 w-4" />
                              <span>{course.modules} modules</span>
                            </div>
                          </div>
                        </div>
                        <Button 
                          className="w-full bg-accent text-primary hover:bg-accent-glow"
                          onClick={() => handleEnroll(course)}
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
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Courses;
