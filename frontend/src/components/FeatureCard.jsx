import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

/**
 * FeatureCard - Reusable Feature Card Component
 * Features: Animations, glassmorphism, dark mode
 */
function FeatureCard({ icon: Icon, title, description, link, isHighlighted = false }) {
  return (
    <motion.div
      whileHover={{ y: -8, boxShadow: "0 20px 25px -5px rgba(59, 130, 246, 0.2)" }}
      whileTap={{ scale: 0.98 }}
      className={`relative group p-6 rounded-xl transition-all duration-300 cursor-pointer ${
        isHighlighted
          ? "bg-gradient-to-br from-blue-500/10 to-purple-500/10 dark:from-blue-900/30 dark:to-purple-900/30 border border-blue-200 dark:border-blue-700/50 shadow-lg"
          : "bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm border border-gray-200/50 dark:border-slate-700/50 hover:border-blue-200 dark:hover:border-blue-700/50"
      }`}
    >
      {/* Animated Background Gradient */}
      <motion.div
        className="absolute inset-0 rounded-xl bg-gradient-to-br from-blue-400/0 to-purple-400/0 group-hover:from-blue-400/5 group-hover:to-purple-400/5 transition-all duration-300 pointer-events-none"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
      />

      {/* Content */}
      <div className="relative z-10">
        {/* Icon */}
        <motion.div
          whileHover={{ rotate: 6, scale: 1.1 }}
          transition={{ type: "spring", stiffness: 400 }}
          className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 transition-all ${
            isHighlighted
              ? "bg-gradient-to-br from-blue-500 to-purple-600 text-white shadow-lg"
              : "bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 text-blue-600 dark:text-blue-400"
          }`}
        >
          <Icon size={24} />
        </motion.div>

        {/* Title */}
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          {title}
        </h3>

        {/* Description */}
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
          {description}
        </p>

        {/* Link */}
        {link && (
          <motion.a
            href={link}
            className="inline-flex items-center gap-2 text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
            whileHover={{ x: 4 }}
          >
            Learn more
            <ArrowRight size={16} />
          </motion.a>
        )}

        {/* Hover Border Animation */}
        <motion.div
          className="absolute inset-0 rounded-xl pointer-events-none"
          initial={{ background: "none" }}
          whileHover={{
            background: "radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(59, 130, 246, 0.1), transparent 80%)",
          }}
        />
      </div>
    </motion.div>
  );
}

export default FeatureCard;
