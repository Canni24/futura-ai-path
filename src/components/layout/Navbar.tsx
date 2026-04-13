import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Menu, X, Search, LogOut, User as UserIcon } from "lucide-react";
import { motion, AnimatePresence, type Variants, type Easing } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useAuth } from "@/contexts/AuthContext";
import SearchDialog from "./SearchDialog";
import logo from "@/assets/faxlab-logo.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Courses", path: "/courses" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  const userNavItems = user
    ? [...navItems, { name: "Dashboard", path: "/dashboard" }]
    : navItems;

  const easeOut = [0, 0, 0.2, 1] as const;
  const easeInOut = [0.4, 0, 0.2, 1] as const;

  const navLinkVariants = {
    initial: { opacity: 0, y: -8 },
    animate: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: 0.1 + i * 0.05, duration: 0.3, ease: easeOut },
    }),
  };

  const mobileMenuVariants = {
    hidden: { opacity: 0, height: 0, transition: { duration: 0.25, ease: easeInOut } },
    visible: { opacity: 1, height: "auto" as const, transition: { duration: 0.35, ease: easeOut } },
  };

  const mobileItemVariants = {
    hidden: { opacity: 0, x: -16 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: { delay: 0.05 * i, duration: 0.25, ease: easeOut },
    }),
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex justify-center px-3 sm:px-4 pt-3">
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 120, damping: 20 }}
        className={`w-full max-w-6xl rounded-2xl border backdrop-blur-2xl transition-all duration-500 ${
          scrolled
            ? "bg-primary/80 shadow-2xl shadow-accent/15 border-accent/30 backdrop-saturate-150"
            : "bg-primary/60 shadow-lg shadow-black/10 border-white/10 backdrop-saturate-125"
        }`}
      >
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14 sm:h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2 sm:space-x-3 group">
              <motion.div
                whileHover={{ scale: 1.08, rotate: 3 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 15 }}
                className="relative"
              >
                <img
                  src={logo}
                  alt="FaxLab AI Logo"
                  className="h-10 w-10 sm:h-12 sm:w-12 rounded-lg object-cover drop-shadow-lg"
                />
                <motion.div
                  className="absolute inset-0 bg-accent/30 blur-xl rounded-full"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>
              <motion.div whileHover={{ x: 2 }} className="flex flex-col">
                <span className="text-xl sm:text-2xl font-bold text-primary-foreground tracking-tight leading-none">
                  FaxLab <span className="text-accent glow-effect">AI</span>
                </span>
                <span className="text-[9px] sm:text-[10px] text-primary-foreground/60 tracking-wider uppercase">
                  Future. AI. X-factor
                </span>
              </motion.div>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-1 lg:space-x-2">
              {userNavItems.map((item, i) => (
                <motion.div
                  key={item.name}
                  custom={i}
                  variants={navLinkVariants}
                  initial="initial"
                  animate="animate"
                >
                  <Link
                    to={item.path}
                    className={`relative px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                      location.pathname === item.path
                        ? "text-accent bg-accent/10"
                        : "text-primary-foreground/80 hover:text-accent hover:bg-accent/5"
                    }`}
                  >
                    {item.name}
                    {location.pathname === item.path && (
                      <motion.span
                        layoutId="navbar-active"
                        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-accent rounded-full"
                        transition={{ type: "spring", stiffness: 300, damping: 25 }}
                      />
                    )}
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Desktop Actions */}
            <div className="hidden md:flex items-center space-x-2 lg:space-x-3">
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-primary-foreground/80 hover:text-accent hover:bg-accent/10 rounded-xl"
                  onClick={() => setSearchOpen(true)}
                >
                  <Search className="h-4 w-4" />
                </Button>
              </motion.div>

              {user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                      <Avatar className="h-9 w-9">
                        <AvatarFallback className="bg-accent text-primary text-sm font-semibold">
                          {user.email?.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56 rounded-xl">
                    <DropdownMenuLabel>
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">My Account</p>
                        <p className="text-xs leading-none text-muted-foreground">
                          {user.email}
                        </p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => navigate("/profile")}>
                      <UserIcon className="mr-2 h-4 w-4" />
                      Profile
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={signOut} className="text-destructive">
                      <LogOut className="mr-2 h-4 w-4" />
                      Sign Out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <div className="flex items-center space-x-2">
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-primary-foreground/80 hover:text-primary-foreground hover:bg-accent/10 rounded-xl text-sm"
                      onClick={() => navigate("/auth")}
                    >
                      Login
                    </Button>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button
                      size="sm"
                      className="bg-accent text-primary hover:bg-accent-glow rounded-xl text-sm font-semibold shadow-lg shadow-accent/20"
                      onClick={() => navigate("/auth")}
                    >
                      Get Started
                    </Button>
                  </motion.div>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden text-primary-foreground hover:text-accent p-2 rounded-xl hover:bg-accent/10 transition-colors"
            >
              <AnimatePresence mode="wait">
                {isOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    <X className="h-5 w-5" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    <Menu className="h-5 w-5" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>

          {/* Mobile Menu */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                variants={mobileMenuVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                className="md:hidden overflow-hidden"
              >
                <div className="py-3 space-y-1 border-t border-accent/15">
                  {userNavItems.map((item, i) => (
                    <motion.div
                      key={item.name}
                      custom={i}
                      variants={mobileItemVariants}
                      initial="hidden"
                      animate="visible"
                    >
                      <Link
                        to={item.path}
                        onClick={() => setIsOpen(false)}
                        className={`block px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                          location.pathname === item.path
                            ? "text-accent bg-accent/10"
                            : "text-primary-foreground/80 hover:text-accent hover:bg-accent/5"
                        }`}
                      >
                        {item.name}
                      </Link>
                    </motion.div>
                  ))}

                  <motion.div
                    custom={userNavItems.length}
                    variants={mobileItemVariants}
                    initial="hidden"
                    animate="visible"
                    className="flex items-center gap-2 pt-3 px-1 border-t border-accent/15 mt-2"
                  >
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-primary-foreground/80 hover:text-accent hover:bg-accent/10 rounded-xl"
                      onClick={() => setSearchOpen(true)}
                    >
                      <Search className="h-4 w-4 mr-2" />
                      Search
                    </Button>
                  </motion.div>

                  <motion.div
                    custom={userNavItems.length + 1}
                    variants={mobileItemVariants}
                    initial="hidden"
                    animate="visible"
                    className="flex flex-col space-y-2 pt-2 px-1"
                  >
                    {user ? (
                      <>
                        <div className="px-3 py-2 text-xs text-primary-foreground/60 truncate">
                          {user.email}
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="justify-start rounded-xl text-primary-foreground/80 hover:bg-accent/10"
                          onClick={() => {
                            navigate("/profile");
                            setIsOpen(false);
                          }}
                        >
                          <UserIcon className="mr-2 h-4 w-4" />
                          Profile
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="justify-start rounded-xl text-destructive hover:bg-destructive/10"
                          onClick={() => {
                            signOut();
                            setIsOpen(false);
                          }}
                        >
                          <LogOut className="mr-2 h-4 w-4" />
                          Sign Out
                        </Button>
                      </>
                    ) : (
                      <div className="flex gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="flex-1 rounded-xl text-primary-foreground/80"
                          onClick={() => {
                            navigate("/auth");
                            setIsOpen(false);
                          }}
                        >
                          Login
                        </Button>
                        <Button
                          size="sm"
                          className="flex-1 bg-accent text-primary hover:bg-accent-glow rounded-xl font-semibold shadow-lg shadow-accent/20"
                          onClick={() => {
                            navigate("/auth");
                            setIsOpen(false);
                          }}
                        >
                          Get Started
                        </Button>
                      </div>
                    )}
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <SearchDialog open={searchOpen} onOpenChange={setSearchOpen} />
      </motion.nav>
    </div>
  );
};

export default Navbar;
