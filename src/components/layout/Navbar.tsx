import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Search } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import logo from "@/assets/faxlab-logo.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Courses", path: "/courses" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 bg-primary/95 backdrop-blur-md border-b border-accent/20"
    >
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <motion.div
              whileHover={{ scale: 1.05, rotate: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="relative"
            >
              <img 
                src={logo} 
                alt="FaxLab AI Logo" 
                className="h-10 w-10 drop-shadow-lg"
              />
              <div className="absolute inset-0 bg-accent/20 blur-xl opacity-0 group-hover:opacity-100 smooth-transition rounded-full" />
            </motion.div>
            <motion.div
              whileHover={{ x: 2 }}
              className="flex flex-col"
            >
              <span className="text-2xl font-bold text-primary-foreground tracking-tight leading-none">
                FaxLab <span className="text-accent glow-effect">AI</span>
              </span>
              <span className="text-[10px] text-primary-foreground/60 tracking-wider uppercase">
                AI Education Platform
              </span>
            </motion.div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className="text-primary-foreground hover:text-accent smooth-transition relative group"
              >
                {item.name}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-accent group-hover:w-full smooth-transition" />
              </Link>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              className="text-primary-foreground hover:text-accent"
            >
              <Search className="h-5 w-5" />
            </Button>
            <Button variant="secondary" size="sm">
              Login
            </Button>
            <Button size="sm" className="bg-accent text-primary hover:bg-accent-glow glow-effect">
              Get Started
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-primary-foreground hover:text-accent smooth-transition"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden overflow-hidden"
            >
              <div className="py-4 space-y-4">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.path}
                    onClick={() => setIsOpen(false)}
                    className="block text-primary-foreground hover:text-accent smooth-transition py-2"
                  >
                    {item.name}
                  </Link>
                ))}
                <div className="flex flex-col space-y-2 pt-4 border-t border-accent/20">
                  <Button variant="secondary" size="sm">
                    Login
                  </Button>
                  <Button size="sm" className="bg-accent text-primary hover:bg-accent-glow">
                    Get Started
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default Navbar;
