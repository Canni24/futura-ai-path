import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Star, Quote } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { useRef } from "react";

const testimonials = [
  {
    name: "Priya Sharma",
    role: "ML Engineer",
    content:
      "This course skyrocketed my AI portfolio – landed a freelance gig in weeks! The hands-on projects and expert guidance were game-changers.",
    rating: 5,
    metric: "275K impressions on AI demos",
    avatar: "PS",
  },
  {
    name: "Arjun Kumar",
    role: "Freelancer",
    content:
      "Eye-opener on ethical AI; now consulting for startups. The practical approach helped me transition careers smoothly.",
    rating: 5,
    metric: "1M+ views on LinkedIn",
    avatar: "AK",
  },
  {
    name: "Neha Reddy",
    role: "Student",
    content:
      "From zero to building chatbots – transformative! I never thought AI could be this accessible and exciting.",
    rating: 5,
    metric: "12K+ GitHub stars",
    avatar: "NR",
  },
  {
    name: "Vikram Singh",
    role: "Data Scientist",
    content:
      "Best investment in my career! The TensorFlow course gave me the skills to lead AI projects at my company.",
    rating: 5,
    metric: "3x salary increase",
    avatar: "VS",
  },
  {
    name: "Ananya Patel",
    role: "Product Manager",
    content:
      "Understanding AI fundamentals helped me bridge the gap with my engineering team. Highly recommended!",
    rating: 5,
    metric: "Promoted to AI PM",
    avatar: "AP",
  },
  {
    name: "Rahul Mehta",
    role: "Entrepreneur",
    content:
      "Built my AI startup after completing the Generative AI course. The ROI was incredible!",
    rating: 5,
    metric: "₹50L funding raised",
    avatar: "RM",
  },
];

const Testimonials = () => {
  const autoplayPlugin = useRef(
    Autoplay({ delay: 4000, stopOnInteraction: true })
  );

  return (
    <section className="py-20 bg-primary relative overflow-hidden">
      <div className="absolute inset-0 opacity-5 bg-[radial-gradient(circle,_hsl(192,100%,50%)_1px,_transparent_1px)] bg-[length:40px_40px]" />

      <div className="container mx-auto px-4 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 space-y-4"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-primary-foreground">
            Learner <span className="text-accent">Success Stories</span>
          </h2>
          <p className="text-lg text-primary-foreground/80 max-w-2xl mx-auto">
            Join thousands of professionals who transformed their careers with
            FaxLab AI.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Carousel
            opts={{ align: "start", loop: true }}
            plugins={[autoplayPlugin.current]}
            className="w-full"
          >
            <CarouselContent className="-ml-4">
              {testimonials.map((testimonial, index) => (
                <CarouselItem
                  key={index}
                  className="pl-4 md:basis-1/2 lg:basis-1/3"
                >
                  <motion.div
                    whileHover={{ y: -6, scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="h-full"
                  >
                    <Card className="p-6 bg-secondary/20 border-accent/20 h-full backdrop-blur-sm hover:border-accent/40 transition-colors duration-300">
                      <div className="space-y-4">
                        <Quote className="h-8 w-8 text-accent opacity-50" />

                        <div className="flex gap-1">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <Star
                              key={i}
                              className="h-4 w-4 fill-accent text-accent"
                            />
                          ))}
                        </div>

                        <p className="text-primary-foreground/90 text-sm leading-relaxed">
                          "{testimonial.content}"
                        </p>

                        <div className="pt-4 border-t border-accent/20 flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <Avatar>
                              <AvatarFallback className="bg-accent text-primary font-semibold">
                                {testimonial.avatar}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-semibold text-primary-foreground">
                                {testimonial.name}
                              </div>
                              <div className="text-xs text-primary-foreground/70">
                                {testimonial.role}
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="text-xs text-accent font-medium">
                          ✨ {testimonial.metric}
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="flex justify-center gap-4 mt-8">
              <CarouselPrevious className="static translate-y-0 bg-accent/10 border-accent/30 text-accent hover:bg-accent hover:text-primary" />
              <CarouselNext className="static translate-y-0 bg-accent/10 border-accent/30 text-accent hover:bg-accent hover:text-primary" />
            </div>
          </Carousel>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center mt-12"
        >
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-accent/10 border border-accent/30 rounded-full">
            <span className="text-accent font-semibold">
              #1 New Release in AI Learning
            </span>
            <span className="text-primary-foreground/80">
              • 500K+ Project Impressions
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
