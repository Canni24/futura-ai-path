import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import heroImage from "@/assets/hero-neural-network.jpg";

const ROTATING_WORDS = ["AI Skills", "Your Career", "Your Business", "Your Socials", "The Future"];

const Hero = () => {
  const navigate = useNavigate();
  const [wordIndex, setWordIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  const currentWord = ROTATING_WORDS[wordIndex];

  useEffect(() => {
    const typeSpeed = isDeleting ? 50 : 100;
    const pauseTime = isDeleting ? 200 : 2000;

    if (!isDeleting && displayText === currentWord) {
      const timeout = setTimeout(() => setIsDeleting(true), pauseTime);
      return () => clearTimeout(timeout);
    }

    if (isDeleting && displayText === "") {
      setIsDeleting(false);
      setWordIndex((prev) => (prev + 1) % ROTATING_WORDS.length);
      return;
    }

    const timeout = setTimeout(() => {
      setDisplayText(
        isDeleting
          ? currentWord.substring(0, displayText.length - 1)
          : currentWord.substring(0, displayText.length + 1)
      );
    }, typeSpeed);

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, currentWord]);

  const handleGetStartedFree = () => {
    navigate("/courses", {
      state: {
        filterFree: true
      }
    });
  };
  return <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-primary via-primary to-secondary">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0 opacity-40" style={{
      backgroundImage: `url(${heroImage})`,
      backgroundSize: "cover",
      backgroundPosition: "center"
    }} />
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-primary/80 via-primary/70 to-secondary/80" />

      {/* Content */}
      <div className="container mx-auto px-4 lg:px-8 relative z-10 pt-24 pb-16">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          {/* Badge */}
          <motion.div initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.6
        }} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/30 text-accent">
            <Sparkles className="h-4 w-4" />
            <span className="text-sm font-medium">Join 500K+ AI Learners</span>
          </motion.div>

          {/* Heading */}
          <motion.h1 initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.6,
          delay: 0.2
        }} className="text-4xl md:text-6xl lg:text-7xl font-bold text-primary-foreground leading-tight">
            Unlock the Future with{" "}
            <span className="text-accent inline-block min-w-[200px] md:min-w-[300px] text-left">
              {displayText}
              <span className="animate-pulse">|</span>
            </span>
            {" "}at FaxLab AI
          </motion.h1>

          {/* Subheading */}
          <motion.p initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.6,
          delay: 0.4
        }} className="text-lg md:text-xl text-primary-foreground/80 max-w-2xl mx-auto">
            Master machine learning, generative AI, and ethical tech through practical,
            self-paced courses designed for beginners to pros. Transform your career today.
          </motion.p>

          {/* CTAs */}
          <motion.div initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.6,
          delay: 0.6
        }} className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to="/courses">
              <Button size="lg" className="bg-accent text-primary hover:bg-accent-glow glow-effect group">
                Explore Courses
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 smooth-transition" />
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="border-accent text-accent hover:bg-accent hover:text-primary" onClick={handleGetStartedFree}>
              Get Started Free
            </Button>
          </motion.div>

          {/* Stats */}
          <motion.div initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.6,
          delay: 0.8
        }} className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8">
            {[{
            value: "500K+",
            label: "Learners"
          }, {
            value: "50+",
            label: "Courses"
          }, {
            value: "95%",
            label: "Success Rate"
          }, {
            value: "24/7",
            label: "Support"
          }].map((stat, index) => <div key={index} className="space-y-1">
                <div className="text-3xl md:text-4xl font-bold text-accent">{stat.value}</div>
                <div className="text-sm text-primary-foreground/70">{stat.label}</div>
              </div>)}
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div initial={{
      opacity: 0
    }} animate={{
      opacity: 1
    }} transition={{
      duration: 1,
      delay: 1
    }} className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
        
      </motion.div>
    </section>;
};
export default Hero;