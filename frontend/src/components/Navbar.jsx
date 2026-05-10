import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";

/**
 * Navbar - Premium SaaS Navigation Component
 * Features: Responsive, glassmorphism, dark mode, animations
 */
function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: "Career", href: "/career" },
    { name: "Recruitment", href: "/recruitment" },
    { name: "Enterprise", href: "/enterprise" },
    { name: "Pricing", href: "/pricing" },
  ];

  const isActive = (href) => location.pathname === href;

  const navVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.05 },
    }),
  };

  const mobileMenuVariants = {
    hidden: { opacity: 0, height: 0 },
    visible: { opacity: 1, height: "auto" },
    exit: { opacity: 0, height: 0 },
  };

  return (
    <motion.nav
      className="sticky top-0 z-50 backdrop-blur-md bg-white/30 dark:bg-slate-950/40 border-b border-white/20 dark:border-slate-700/30"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <motion.div
            className="flex items-center gap-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">A</span>
              </div>
              <span className="font-bold text-lg bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent hidden sm:inline">
                ACIP
              </span>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item, i) => (
              <motion.div key={item.href} custom={i} variants={navVariants} initial="hidden" animate="visible">
                <Link
                  to={item.href}
                  className={`relative text-sm font-medium transition-colors ${
                    isActive(item.href)
                      ? "text-blue-600 dark:text-blue-400"
                      : "text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100"
                  }`}
                >
                  {item.name}
                  {isActive(item.href) && (
                    <motion.div
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-600"
                      layoutId="navbar-underline"
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Desktop Action Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
            >
              Login
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-2 text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg hover:shadow-lg hover:shadow-blue-500/30 transition-all"
            >
              Get Started
            </motion.button>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors"
          >
            {isOpen ? (
              <X size={24} className="text-gray-700 dark:text-gray-200" />
            ) : (
              <Menu size={24} className="text-gray-700 dark:text-gray-200" />
            )}
          </motion.button>
        </div>

        {/* Mobile Menu */}
        <motion.div
          variants={mobileMenuVariants}
          initial="hidden"
          animate={isOpen ? "visible" : "hidden"}
          exit="exit"
          transition={{ duration: 0.2 }}
          className="md:hidden overflow-hidden"
        >
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                onClick={() => setIsOpen(false)}
                className={`block px-3 py-2 rounded-lg text-base font-medium transition-colors ${
                  isActive(item.href)
                    ? "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-800"
                }`}
              >
                {item.name}
              </Link>
            ))}
            <div className="px-3 py-2 space-y-2">
              <button className="w-full px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-gray-100 transition-colors">
                Login
              </button>
              <button className="w-full px-3 py-2 text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg hover:shadow-lg transition-all">
                Get Started
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.nav>
  );
}

export default Navbar;
