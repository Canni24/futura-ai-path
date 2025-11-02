import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { CheckCircle, Download, ArrowRight, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import confetti from "canvas-confetti";

interface CourseData {
  id: number;
  title: string;
  price: number;
  image: string;
}

const PaymentSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const course = location.state?.course as CourseData;

  useEffect(() => {
    // Trigger confetti animation
    const duration = 3000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    const randomInRange = (min: number, max: number) => {
      return Math.random() * (max - min) + min;
    };

    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
      });
    }, 250);

    return () => clearInterval(interval);
  }, []);

  if (!course) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-2xl font-bold mb-4">No payment information found</h1>
          <Button onClick={() => navigate("/courses")}>Browse Courses</Button>
        </div>
        <Footer />
      </div>
    );
  }

  const orderId = `ORD-${Date.now().toString(36).toUpperCase()}`;
  const transactionDate = new Date().toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container mx-auto px-4 lg:px-8 py-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto"
        >
          {/* Success Message */}
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            >
              <CheckCircle className="h-20 w-20 text-accent mx-auto mb-4" />
            </motion.div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Payment <span className="text-accent">Successful!</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Thank you for your purchase. You now have lifetime access to this course.
            </p>
          </div>

          {/* Order Details Card */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Order Details</CardTitle>
              <CardDescription>Order #{orderId}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-4">
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-24 h-24 object-cover rounded-md"
                />
                <div className="flex-1">
                  <h3 className="font-semibold text-lg">{course.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Purchased on {transactionDate}
                  </p>
                  <p className="text-lg font-semibold text-accent mt-2">
                    ₹{course.price.toLocaleString()}
                  </p>
                </div>
              </div>

              <Separator />

              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Order ID</p>
                  <p className="font-semibold">{orderId}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Payment Method</p>
                  <p className="font-semibold">Credit Card</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Status</p>
                  <p className="font-semibold text-accent">Completed</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Date</p>
                  <p className="font-semibold">{transactionDate}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Next Steps Card */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>What's Next?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-start gap-3">
                <Mail className="h-5 w-5 text-accent mt-0.5" />
                <div>
                  <p className="font-semibold">Check Your Email</p>
                  <p className="text-sm text-muted-foreground">
                    We've sent a confirmation email with your receipt and course access details.
                  </p>
                </div>
              </div>
              <Separator />
              <div className="flex items-start gap-3">
                <Download className="h-5 w-5 text-accent mt-0.5" />
                <div>
                  <p className="font-semibold">Download Resources</p>
                  <p className="text-sm text-muted-foreground">
                    Access all course materials, videos, and downloadable resources in your dashboard.
                  </p>
                </div>
              </div>
              <Separator />
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-accent mt-0.5" />
                <div>
                  <p className="font-semibold">Start Learning</p>
                  <p className="text-sm text-muted-foreground">
                    Begin your AI journey right away with immediate access to all course content.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              size="lg"
              className="flex-1 bg-accent text-primary hover:bg-accent-glow"
              onClick={() => navigate("/courses")}
            >
              Start Learning
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="flex-1"
              onClick={() => window.print()}
            >
              <Download className="mr-2 h-5 w-5" />
              Download Receipt
            </Button>
          </div>

          <p className="text-center text-sm text-muted-foreground mt-6">
            Need help? Contact our support team at support@faxlabai.com
          </p>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
};

export default PaymentSuccess;
