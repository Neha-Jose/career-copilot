import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";

/**
 * HeroSection - Premium SaaS Hero Component
 * Features: Animations, gradients, CTAs
 */
function HeroSection({ title, subtitle, primaryCta, secondaryCta }) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  const floatingVariants = {
    animate: {
      y: [0, -20, 0],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  return (
    <div className="relative min-h-[600px] overflow-hidden bg-gradient-to-br from-white via-blue-50 to-purple-50 dark:from-slate-950 dark:via-blue-950/20 dark:to-purple-950/20">
      {/* Animated Background Elements */}
      <motion.div
        className="absolute top-20 -left-40 w-80 h-80 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 dark:opacity-10"
        animate={{ scale: [1, 1.1, 1], rotate: [0, 90, 360] }}
        transition={{ duration: 20, repeat: Infinity }}
      />
      <motion.div
        className="absolute -bottom-40 right-20 w-80 h-80 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 dark:opacity-10"
        animate={{ scale: [1, 1.2, 1], rotate: [360, 180, 0] }}
        transition={{ duration: 20, repeat: Infinity }}
      />

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
        <motion.div
          className="text-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Badge */}
          <motion.div variants={itemVariants}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border border-blue-200/50 dark:border-blue-800/50 mb-6">
              <Sparkles size={16} className="text-blue-600 dark:text-blue-400" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                AI-Powered Career Intelligence
              </span>
            </div>
          </motion.div>

          {/* Heading */}
          <motion.h1
            variants={itemVariants}
            className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
          >
            <span className="bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
              {title || "Transform Your Career"}
            </span>
            <br />
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">
              {subtitle ? subtitle.split("\n")[0] : "with AI Intelligence"}
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={itemVariants}
            className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto mb-8 leading-relaxed"
          >
            Get personalized career insights, ATS scoring, skill gap analysis, and AI-powered learning roadmaps
            tailored to your dream role.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 20px 25px -5px rgba(59, 130, 246, 0.3)" }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg flex items-center gap-2 hover:shadow-lg transition-all"
            >
              {primaryCta || "Get Started Free"}
              <ArrowRight size={20} />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05, backgroundColor: "rgba(59, 130, 246, 0.1)" }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 border-2 border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-semibold rounded-lg hover:bg-gray-50 dark:hover:bg-slate-800/50 transition-all"
            >
              {secondaryCta || "Watch Demo"}
            </motion.button>
          </motion.div>

          {/* Floating Feature Badges */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl mx-auto mt-16"
          >
            {[
              { icon: "⚡", label: "94% ATS Accuracy" },
              { icon: "🎯", label: "Personalized Roadmap" },
              { icon: "🚀", label: "3x Interview Rate" },
            ].map((feature) => (
              <motion.div
                key={feature.label}
                variants={floatingVariants}
                animate="animate"
                className="p-4 rounded-lg bg-white/40 dark:bg-slate-900/40 backdrop-blur-xl border border-white/20 dark:border-slate-700/30 shadow-lg"
              >
                <div className="text-3xl mb-2">{feature.icon}</div>
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {feature.label}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

export default HeroSection;
