import { motion } from "framer-motion";
import { Play, Lock, Video, MessageCircle, Code, Rocket } from "lucide-react";
import { Card } from "@/components/ui/card";

const features = [
  {
    icon: Play,
    title: "On-Demand AI Learning",
    description:
      "Watch anytime, anywhere – build real projects at your pace with video streaming.",
  },
  {
    icon: Lock,
    title: "Lifetime Access & Upgrades",
    description:
      "One-time payment, free updates as AI evolves, track progress in dashboard.",
  },
  {
    icon: Video,
    title: "Live AI Expert Sessions",
    description:
      "Monthly Q&A with top AI instructors (premium only, book via calendar).",
  },
  {
    icon: MessageCircle,
    title: "AI Community Hub",
    description:
      "Realtime chat for collaborating on projects with fellow AI enthusiasts.",
  },
  {
    icon: Code,
    title: "Hands-On & Affordable",
    description:
      "Actionable AI labs starting at ₹999, including code downloads and resources.",
  },
  {
    icon: Rocket,
    title: "Career Boost Guarantee",
    description:
      "30-day skill challenge with resume templates and certificate API.",
  },
];

const Features = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 space-y-4"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-gradient">
            Why Choose FaxLab AI?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Experience a complete learning ecosystem designed to transform your AI journey
            from beginner to expert.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="p-6 hover-lift bg-gradient-to-br from-card to-muted border-accent/20 h-full">
                <div className="space-y-4">
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center text-accent"
                  >
                    <feature.icon className="h-6 w-6" />
                  </motion.div>
                  <h3 className="text-xl font-semibold">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm">{feature.description}</p>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
