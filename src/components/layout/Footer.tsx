import { Link } from "react-router-dom";
import { Mail, Twitter, Linkedin, MessageCircle } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import faxlabLogo from "@/assets/faxlab-logo.png";

const Footer = () => {
  const quickLinks = [
    { name: "Home", path: "/" },
    { name: "Courses", path: "/courses" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  const socialLinks = [
    { icon: Twitter, label: "Twitter", href: "#" },
    { icon: Linkedin, label: "LinkedIn", href: "#" },
    { icon: MessageCircle, label: "Discord", href: "#" },
  ];

  return (
    <footer className="text-primary-foreground px-3 sm:px-4 pb-4">
      <motion.div
        initial={{ y: 40, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: [0, 0, 0.2, 1] }}
        className="max-w-6xl mx-auto rounded-2xl border border-white/10 bg-primary/60 backdrop-blur-2xl backdrop-saturate-125 shadow-lg shadow-black/10 px-6 lg:px-10 py-12"
      >
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-3">
              <img src={faxlabLogo} alt="FaxLab AI" className="h-12 w-12 rounded-lg object-cover" />
              <div>
                <h3 className="text-xl font-bold text-accent">FaxLab AI</h3>
                <span className="text-[10px] text-primary-foreground/60 tracking-wider uppercase">Future. AI. X-factor</span>
              </div>
            </Link>
            <p className="text-sm opacity-80">
              Master AI skills for the future. Join 500K+ learners transforming their careers.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-semibold">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-sm opacity-80 hover:text-accent hover:opacity-100 smooth-transition"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div className="space-y-4">
            <h4 className="font-semibold">Legal</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-sm opacity-80 hover:text-accent hover:opacity-100 smooth-transition">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-sm opacity-80 hover:text-accent hover:opacity-100 smooth-transition">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h4 className="font-semibold">Stay Updated</h4>
            <p className="text-sm opacity-80">Get AI insights and course updates</p>
            <div className="flex gap-2">
              <Input
                type="email"
                placeholder="Your email"
                className="bg-secondary/20 border-accent/30 text-primary-foreground"
              />
              <Button size="sm" className="bg-accent text-primary hover:bg-accent-glow">
                <Mail className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-accent/20 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm opacity-80">© 2026 FaxLab AI. All rights reserved.</p>
          <div className="flex gap-4">
            {socialLinks.map((social) => (
              <motion.a
                key={social.label}
                href={social.href}
                whileHover={{ scale: 1.1, y: -2 }}
                className="text-primary-foreground hover:text-accent smooth-transition"
                aria-label={social.label}
              >
                <social.icon className="h-5 w-5" />
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
