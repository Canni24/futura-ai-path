import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import {
  BookOpen,
  Award,
  Clock,
  TrendingUp,
  CheckCircle2,
  GraduationCap,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";

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

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();

  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/auth");
    }
  }, [user, authLoading, navigate]);

  // Fetch enrolled courses
  const { data: enrollments } = useQuery({
    queryKey: ["enrollments", user?.id],
    queryFn: async () => {
      if (!user) return [];
      const { data, error } = await supabase
        .from("enrollments")
        .select(`
          *,
          courses (*)
        `)
        .eq("user_id", user.id);

      if (error) throw error;
      return data;
    },
    enabled: !!user,
  });

  // Fetch certificates
  const { data: certificates } = useQuery({
    queryKey: ["certificates", user?.id],
    queryFn: async () => {
      if (!user) return [];
      const { data, error } = await supabase
        .from("certificates")
        .select(`
          *,
          courses (title)
        `)
        .eq("user_id", user.id);

      if (error) throw error;
      return data;
    },
    enabled: !!user,
  });

  // Fetch video progress for statistics
  const { data: videoProgress } = useQuery({
    queryKey: ["video-progress", user?.id],
    queryFn: async () => {
      if (!user) return [];
      const { data, error } = await supabase
        .from("video_progress")
        .select("*")
        .eq("user_id", user.id);

      if (error) throw error;
      return data;
    },
    enabled: !!user,
  });

  if (authLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  if (!user) return null;

  // Calculate statistics
  const totalEnrolled = enrollments?.length || 0;
  const completedCourses = enrollments?.filter((e) => e.completed).length || 0;
  const inProgressCourses = totalEnrolled - completedCourses;
  const totalCertificates = certificates?.length || 0;

  // Calculate total hours (mock calculation based on video progress)
  const totalMinutesWatched = videoProgress?.reduce((acc, v) => {
    return acc + (Number(v.video_position) / 60 || 0);
  }, 0) || 0;
  const totalHours = Math.round(totalMinutesWatched / 60);

  // Data for pie chart
  const chartData = [
    { name: "Completed", value: completedCourses, color: "hsl(var(--accent))" },
    { name: "In Progress", value: inProgressCourses, color: "hsl(var(--primary))" },
  ];

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
              My <span className="text-accent">Dashboard</span>
            </h1>
            <p className="text-lg text-primary-foreground/80">
              Track your learning progress and achievements
            </p>
          </motion.div>
        </div>
      </section>

      {/* Statistics Cards */}
      <section className="py-12">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="border-accent/20">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Enrolled Courses
                  </CardTitle>
                  <BookOpen className="h-4 w-4 text-accent" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{totalEnrolled}</div>
                  <p className="text-xs text-muted-foreground">
                    Total courses enrolled
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Card className="border-accent/20">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Completed
                  </CardTitle>
                  <CheckCircle2 className="h-4 w-4 text-accent" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{completedCourses}</div>
                  <p className="text-xs text-muted-foreground">
                    Courses completed
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Card className="border-accent/20">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Certificates
                  </CardTitle>
                  <Award className="h-4 w-4 text-accent" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{totalCertificates}</div>
                  <p className="text-xs text-muted-foreground">
                    Certificates earned
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Card className="border-accent/20">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Learning Hours
                  </CardTitle>
                  <Clock className="h-4 w-4 text-accent" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{totalHours}</div>
                  <p className="text-xs text-muted-foreground">
                    Hours spent learning
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Progress Chart and Enrolled Courses */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Progress Chart */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-1"
            >
              <Card className="border-accent/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-accent" />
                    Course Progress
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {totalEnrolled > 0 ? (
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={chartData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={({ name, percent }) =>
                              `${name}: ${(percent * 100).toFixed(0)}%`
                            }
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                          >
                            {chartData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <Tooltip />
                          <Legend />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  ) : (
                    <div className="h-64 flex items-center justify-center">
                      <p className="text-muted-foreground text-center">
                        No enrollment data yet.
                        <br />
                        Start enrolling in courses!
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>

            {/* Enrolled Courses */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-2"
            >
              <Card className="border-accent/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <GraduationCap className="h-5 w-5 text-accent" />
                    My Enrolled Courses
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {enrollments && enrollments.length > 0 ? (
                    <div className="space-y-4">
                      {enrollments.map((enrollment: any) => {
                        const course = enrollment.courses;
                        const progress = enrollment.completed ? 100 : 45; // Mock progress
                        
                        return (
                          <div
                            key={enrollment.id}
                            className="flex items-center gap-4 p-4 rounded-lg border border-accent/20 hover:border-accent/40 smooth-transition"
                          >
                            <img
                              src={courseImages[course.title] || aiFundamentals}
                              alt={course.title}
                              className="w-20 h-20 rounded-lg object-cover"
                            />
                            <div className="flex-1 space-y-2">
                              <div className="flex items-center justify-between">
                                <h3 className="font-semibold">{course.title}</h3>
                                {enrollment.completed && (
                                  <Badge className="bg-accent text-primary">
                                    <CheckCircle2 className="h-3 w-3 mr-1" />
                                    Completed
                                  </Badge>
                                )}
                              </div>
                              <Progress value={progress} className="h-2" />
                              <p className="text-xs text-muted-foreground">
                                {progress}% complete
                              </p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <BookOpen className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                      <p className="text-muted-foreground mb-4">
                        You haven't enrolled in any courses yet
                      </p>
                      <button
                        onClick={() => navigate("/courses")}
                        className="text-accent hover:underline"
                      >
                        Browse Courses
                      </button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Certificates Section */}
          {certificates && certificates.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-8"
            >
              <Card className="border-accent/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Award className="h-5 w-5 text-accent" />
                    My Certificates
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {certificates.map((cert: any) => (
                      <div
                        key={cert.id}
                        className="p-6 rounded-lg border-2 border-accent/40 bg-gradient-to-br from-primary/10 to-accent/10 space-y-3"
                      >
                        <Award className="h-8 w-8 text-accent" />
                        <h3 className="font-semibold">{cert.courses?.title}</h3>
                        <p className="text-xs text-muted-foreground">
                          Certificate #{cert.certificate_number}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Issued: {new Date(cert.issued_at).toLocaleDateString()}
                        </p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Dashboard;
