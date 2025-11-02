import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, Clock, ArrowRight } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

import aiFundamentals from "@/assets/course-ai-fundamentals.jpg";
import generativeAI from "@/assets/course-generative-ai.jpg";
import ethicalAI from "@/assets/course-ethical-ai.jpg";
import mlData from "@/assets/course-ml-data.jpg";
import career from "@/assets/course-career.jpg";
import computerVision from "@/assets/course-computer-vision.jpg";

const courses = [
  {
    id: 1,
    title: "AI Fundamentals Unleashed",
    description: "Intro to neural networks, Python basics, and core AI concepts.",
    image: aiFundamentals,
    duration: "10 hours",
    rating: 4.8,
    reviews: 1250,
    price: "₹1,499",
    priceNum: 1499,
  },
  {
    id: 2,
    title: "Generative AI Mastery",
    description: "Build with Stable Diffusion, ChatGPT APIs, and create AI art.",
    image: generativeAI,
    duration: "15 hours",
    rating: 4.9,
    reviews: 980,
    price: "₹1,999",
    priceNum: 1999,
  },
  {
    id: 3,
    title: "Ethical AI & Bias",
    description: "Navigate responsible AI deployment and fairness principles.",
    image: ethicalAI,
    duration: "8 hours",
    rating: 4.7,
    reviews: 650,
    price: "₹999",
    priceNum: 999,
  },
  {
    id: 4,
    title: "ML for Data Pros",
    description: "Hands-on TensorFlow projects and advanced ML techniques.",
    image: mlData,
    duration: "20 hours",
    rating: 4.9,
    reviews: 1500,
    price: "₹2,499",
    priceNum: 2499,
  },
  {
    id: 5,
    title: "AI Career Accelerator",
    description: "Resumes, interviews, portfolio building for AI roles.",
    image: career,
    duration: "12 hours",
    rating: 4.6,
    reviews: 890,
    price: "₹1,299",
    priceNum: 1299,
  },
  {
    id: 6,
    title: "Computer Vision Basics",
    description: "Image recognition, object detection, and OpenCV fundamentals.",
    image: computerVision,
    duration: "18 hours",
    rating: 4.8,
    reviews: 720,
    price: "₹2,199",
    priceNum: 2199,
  },
];

const CoursesPreview = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleEnroll = (course: typeof courses[0]) => {
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
              <Card className="overflow-hidden hover-lift group border-accent/20">
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
                    onClick={() => handleEnroll(course)}
                  >
                    Enroll Now
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
