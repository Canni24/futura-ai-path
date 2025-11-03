import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Clock, BookOpen, Star } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

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
    description: "Master the core concepts of artificial intelligence including neural networks, deep learning architectures, and Python programming fundamentals.",
    image: aiFundamentals,
    duration: "10 hours",
    modules: 8,
    rating: 4.8,
    price: 1499,
  },
  {
    id: 2,
    title: "Generative AI Mastery",
    description: "Build cutting-edge generative AI applications using Stable Diffusion, ChatGPT APIs, DALL-E, and more.",
    image: generativeAI,
    duration: "15 hours",
    modules: 12,
    rating: 4.9,
    price: 1999,
  },
  {
    id: 3,
    title: "Ethical AI & Bias",
    description: "Navigate the complex landscape of responsible AI deployment, fairness principles, bias detection, and ethical considerations.",
    image: ethicalAI,
    duration: "8 hours",
    modules: 6,
    rating: 4.7,
    price: 999,
  },
  {
    id: 4,
    title: "ML for Data Pros",
    description: "Deep dive into TensorFlow, PyTorch, and advanced machine learning techniques.",
    image: mlData,
    duration: "20 hours",
    modules: 15,
    rating: 4.9,
    price: 2499,
  },
  {
    id: 5,
    title: "AI Career Accelerator",
    description: "Complete guide to landing your dream AI job with expert resume templates and interview preparation.",
    image: career,
    duration: "12 hours",
    modules: 10,
    rating: 4.6,
    price: 1299,
  },
  {
    id: 6,
    title: "Computer Vision Basics",
    description: "Learn image recognition, object detection, facial recognition, and OpenCV fundamentals.",
    image: computerVision,
    duration: "18 hours",
    modules: 14,
    rating: 4.8,
    price: 2199,
  },
];

interface SearchDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const SearchDialog = ({ open, onOpenChange }: SearchDialogProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const filteredCourses = allCourses.filter((course) =>
    course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCourseClick = () => {
    onOpenChange(false);
    setSearchTerm("");
    navigate("/courses");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle>Search Courses</DialogTitle>
        </DialogHeader>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            placeholder="Search for courses..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
            autoFocus
          />
        </div>
        <div className="flex-1 overflow-y-auto space-y-3 pr-2">
          {searchTerm === "" ? (
            <div className="text-center py-8 text-muted-foreground">
              Start typing to search for courses...
            </div>
          ) : filteredCourses.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No courses found for "{searchTerm}"
            </div>
          ) : (
            filteredCourses.map((course) => (
              <div
                key={course.id}
                onClick={handleCourseClick}
                className="flex gap-4 p-3 rounded-lg hover:bg-muted cursor-pointer transition-colors border border-transparent hover:border-accent/20"
              >
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-24 h-24 object-cover rounded-lg"
                />
                <div className="flex-1 space-y-2">
                  <h3 className="font-semibold text-sm hover:text-accent transition-colors">
                    {course.title}
                  </h3>
                  <p className="text-xs text-muted-foreground line-clamp-2">
                    {course.description}
                  </p>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Star className="h-3 w-3 fill-accent text-accent" />
                      <span>{course.rating}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      <span>{course.duration}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <BookOpen className="h-3 w-3" />
                      <span>{course.modules} modules</span>
                    </div>
                    <span className="font-semibold text-accent">
                      ₹{course.price.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
        {filteredCourses.length > 0 && searchTerm !== "" && (
          <div className="pt-4 border-t">
            <Button
              onClick={handleCourseClick}
              className="w-full"
              variant="outline"
            >
              View All Courses
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default SearchDialog;
