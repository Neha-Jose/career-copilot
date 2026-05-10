import { motion } from "framer-motion";
import { useEffect, useState } from "react";

/**
 * StatsSection - Animated Statistics Display Component
 * Features: Counters, animations, responsive
 */
function StatsSection() {
  const [counts, setCounts] = useState({
    users: 0,
    analyses: 0,
    accuracy: 0,
    avgIncrease: 0,
  });

  const stats = [
    { label: "Active Users", value: 10000, suffix: "+" },
    { label: "Analyses Completed", value: 50000, suffix: "+" },
    { label: "ATS Accuracy", value: 94, suffix: "%" },
    { label: "Avg. Salary Increase", value: 45, suffix: "k+" },
  ];

  useEffect(() => {
    const animationDuration = 2000;
    const startTime = Date.now();

    const updateCounts = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / animationDuration, 1);

      const newCounts = {};
      stats.forEach((stat, index) => {
        const key = Object.keys(counts)[index];
        newCounts[key] = Math.floor(stat.value * progress);
      });

      setCounts(newCounts);

      if (progress < 1) {
        requestAnimationFrame(updateCounts);
      }
    };

    updateCounts();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5 },
    },
  };

  return (
    <section className="relative py-20 md:py-28 overflow-hidden bg-gradient-to-br from-slate-50 via-white to-slate-50 dark:from-slate-900 dark:via-slate-950 dark:to-slate-900">
      {/* Background Elements */}
      <motion.div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-gradient-to-r from-blue-200 to-purple-200 dark:from-blue-900/20 dark:to-purple-900/20 rounded-full blur-3xl opacity-30 dark:opacity-10 pointer-events-none"
        animate={{ y: [0, 50, 0] }}
        transition={{ duration: 10, repeat: Infinity }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
              Trusted by career professionals worldwide
            </span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Join thousands of professionals transforming their careers with AI-powered intelligence
          </p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              variants={itemVariants}
              className="relative p-8 rounded-xl bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl border border-gray-200/50 dark:border-slate-700/50 hover:border-blue-200 dark:hover:border-blue-700/50 transition-all group overflow-hidden"
            >
              {/* Animated Background */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-blue-400/5 to-purple-400/5 opacity-0 group-hover:opacity-100 transition-opacity"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
              />

              {/* Glow Effect */}
              <motion.div
                className="absolute -inset-px rounded-xl bg-gradient-to-r from-blue-500/0 via-purple-500/0 to-blue-500/0 opacity-0 group-hover:opacity-100 blur-xl transition-opacity pointer-events-none"
                animate={{
                  background: [
                    "radial-gradient(circle, transparent 0%, transparent 100%)",
                    "radial-gradient(circle, rgba(59, 130, 246, 0.1) 0%, transparent 100%)",
                    "radial-gradient(circle, transparent 0%, transparent 100%)",
                  ],
                }}
                transition={{ duration: 3, repeat: Infinity }}
              />

              <div className="relative z-10">
                <motion.div
                  className="text-5xl md:text-6xl font-bold mb-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                >
                  {Object.values(counts)[index]}
                  <span className="text-3xl">{stat.suffix}</span>
                </motion.div>
                <p className="text-gray-600 dark:text-gray-400 font-medium">
                  {stat.label}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:shadow-xl hover:shadow-blue-500/30 transition-all"
          >
            Join the Community
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}

export default StatsSection;
