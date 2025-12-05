import { motion } from "framer-motion";
import { Target, Users, Award, TrendingUp } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Card } from "@/components/ui/card";
import founderImage from "@/assets/founder-rishabh.jpg";
import teamRitikaImage from "@/assets/team-ritika.jpg";
import teamMeghnaImage from "@/assets/team-meghna.jpg";

const stats = [
  { icon: Users, value: "500K+", label: "Active Learners" },
  { icon: Award, value: "50+", label: "Expert Courses" },
  { icon: TrendingUp, value: "95%", label: "Success Rate" },
  { icon: Target, value: "24/7", label: "Support" },
];

const values = [
  {
    title: "Accessible Learning",
    description:
      "We believe AI education should be accessible to everyone, regardless of background or experience level.",
  },
  {
    title: "Practical Skills",
    description:
      "Our courses focus on hands-on projects and real-world applications, not just theory.",
  },
  {
    title: "Community Driven",
    description:
      "Join a thriving community of AI enthusiasts, collaborate on projects, and grow together.",
  },
  {
    title: "Continuous Innovation",
    description:
      "We constantly update our content to reflect the latest developments in AI and machine learning.",
  },
];

const About = () => {
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
              About <span className="text-accent">FaxLab AI</span>
            </h1>
            <p className="text-lg text-primary-foreground/80">
              Empowering the next generation of AI innovators through accessible,
              hands-on education.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gradient">
                Our Mission
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                FaxLab AI was founded by a team of AI pioneers and educators who recognized
                a critical gap in accessible, practical AI education. We're on a mission to
                democratize artificial intelligence learning, making it available to students,
                professionals, and entrepreneurs worldwide.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Our platform combines cutting-edge curriculum with hands-on projects,
                expert mentorship, and a supportive community to ensure every learner can
                master AI skills and transform their career prospects.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="grid grid-cols-2 gap-6"
            >
              {stats.map((stat, index) => (
                <Card
                  key={index}
                  className="p-6 text-center hover-lift bg-gradient-to-br from-card to-muted border-accent/20"
                >
                  <stat.icon className="h-8 w-8 mx-auto mb-3 text-accent" />
                  <div className="text-3xl font-bold text-gradient">{stat.value}</div>
                  <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
                </Card>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16 space-y-4"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gradient">
              Our Core Values
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              The principles that guide everything we do at FaxLab AI.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="p-6 hover-lift border-accent/20 h-full">
                  <h3 className="text-xl font-semibold mb-3 text-accent">
                    {value.title}
                  </h3>
                  <p className="text-muted-foreground">{value.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Founder Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-5xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gradient text-center mb-12">
              Meet Our Founder
            </h2>
            
            <div className="grid md:grid-cols-2 gap-12 items-center">
              {/* Founder Image */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="relative group"
              >
                <div className="relative overflow-hidden rounded-2xl border-2 border-accent/20 shadow-elegant hover-lift">
                  <img 
                    src={founderImage} 
                    alt="Rishabh Agarwal - Founder & CEO of FaxLab AI"
                    className="w-full h-full object-cover aspect-square"
                  />
                </div>
              </motion.div>

              {/* Founder Info */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="space-y-6"
              >
                <div>
                  <h3 className="text-3xl font-bold text-gradient mb-2">
                    Rishabh Agarwal
                  </h3>
                  <p className="text-xl text-accent font-semibold">
                    Founder & CEO
                  </p>
                </div>

                <p className="text-muted-foreground leading-relaxed">
                  Visionary entrepreneur and AI education advocate, Rishabh Agarwal founded FaxLab AI 
                  with a mission to democratize artificial intelligence learning. With a deep passion 
                  for technology and education, Rishabh recognized the critical need for accessible, 
                  practical AI education that empowers learners worldwide.
                </p>

                <p className="text-muted-foreground leading-relaxed">
                  Under his leadership, FaxLab AI has grown into a comprehensive learning platform 
                  that combines cutting-edge curriculum with hands-on projects, expert mentorship, 
                  and a thriving community of AI enthusiasts.
                </p>

                <div className="flex gap-4 pt-4">
                  <a
                    href="https://www.linkedin.com/in/rishabhagarwaliimc"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium"
                  >
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                    </svg>
                    LinkedIn
                  </a>
                  <a
                    href="https://linktr.ee/rishabh.iimc"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 transition-colors font-medium"
                  >
                    Bio Links
                  </a>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16 space-y-4"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gradient">
              Meet the FaxLab Team
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              The talented individuals driving innovation and excellence at FaxLab AI.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <Card className="overflow-hidden hover-lift border-accent/20">
                <div className="relative">
                  <img
                    src={teamRitikaImage}
                    alt="Ritika Singhal - Associate Director at FaxLab AI"
                    className="w-full aspect-square object-cover"
                  />
                </div>
                <div className="p-6 text-center space-y-3">
                  <h3 className="text-xl font-bold text-foreground">Ritika Singhal</h3>
                  <p className="text-accent font-semibold">Associate Director</p>
                  <a
                    href="https://www.linkedin.com/in/ritika-singhal-4562b316/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors text-sm font-medium"
                  >
                    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                    </svg>
                    LinkedIn
                  </a>
                </div>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Card className="overflow-hidden hover-lift border-accent/20">
                <div className="relative">
                  <img
                    src={teamMeghnaImage}
                    alt="Meghna Nag - FaxLab AI"
                    className="w-full aspect-square object-cover"
                  />
                </div>
                <div className="p-6 text-center space-y-3">
                  <h3 className="text-xl font-bold text-foreground">Meghna Nag</h3>
                  <p className="text-accent font-semibold">Team Member</p>
                  <a
                    href="https://www.linkedin.com/in/meghna-nag-5247b33a/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors text-sm font-medium"
                  >
                    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                    </svg>
                    LinkedIn
                  </a>
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto space-y-8"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gradient text-center">
              Our Story
            </h2>
            <div className="space-y-6 text-muted-foreground leading-relaxed">
              <p>
                FaxLab AI was born out of a simple observation: artificial intelligence is
                transforming every industry, yet quality AI education remains inaccessible
                to most people. Founded by Rishabh Agarwal, FaxLab AI emerged from his vision 
                to bridge this critical gap in accessible AI education.
              </p>
              <p>
                Rishabh assembled a team of AI experts, educators, and engineers
                to create a learning platform that would democratize AI knowledge. The result is
                FaxLab AI – a comprehensive ecosystem that combines world-class curriculum,
                hands-on projects, expert mentorship, and a thriving community of learners.
              </p>
              <p>
                Today, FaxLab AI serves over 500,000 learners across 150 countries,
                helping individuals from all backgrounds master AI skills and unlock new
                career opportunities. Our learners have gone on to work at leading tech
                companies, start their own AI ventures, and contribute to groundbreaking
                research.
              </p>
              <p className="text-accent font-semibold">
                Join us on our mission to democratize AI education and shape the future of
                technology, one learner at a time.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
