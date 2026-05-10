import { motion } from "framer-motion";

/**
 * LoadingSkeleton - Reusable Skeleton Loading Component
 * Features: Animations, variants, dark mode
 */
function LoadingSkeleton({ 
  variant = "card", 
  count = 1,
  width = "w-full",
  height = "h-12",
  className = ""
}) {
  const shimmer = {
    animate: {
      background: [
        "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.1) 50%, transparent 100%)",
        "linear-gradient(90deg, transparent 100%, rgba(255,255,255,0.1) 150%, transparent 200%)",
      ],
      backgroundPosition: ["200% 0", "0 0"],
    },
    transition: {
      duration: 1.5,
      repeat: Infinity,
      ease: "linear",
    },
  };

  const cardSkeleton = (
    <motion.div
      className="p-6 rounded-xl bg-gray-200 dark:bg-slate-700/40 border border-gray-300 dark:border-slate-600/50"
      initial={{ opacity: 0.5 }}
      animate={{ opacity: [0.5, 1, 0.5] }}
      transition={{ duration: 2, repeat: Infinity }}
    >
      <div className="space-y-4">
        {/* Icon placeholder */}
        <motion.div
          className="w-12 h-12 rounded-lg bg-gray-300 dark:bg-slate-600"
          variants={shimmer}
          animate="animate"
        />

        {/* Title placeholder */}
        <motion.div
          className="h-6 rounded-md bg-gray-300 dark:bg-slate-600 w-3/4"
          variants={shimmer}
          animate="animate"
        />

        {/* Text placeholders */}
        <motion.div
          className="space-y-2"
          initial={{ opacity: 0.5 }}
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="h-4 rounded-md bg-gray-300 dark:bg-slate-600 w-full" />
          <div className="h-4 rounded-md bg-gray-300 dark:bg-slate-600 w-5/6" />
        </motion.div>
      </div>
    </motion.div>
  );

  const lineSkeleton = (
    <motion.div
      className={`${width} ${height} rounded-md bg-gray-200 dark:bg-slate-700/40`}
      variants={shimmer}
      animate="animate"
    />
  );

  const gridSkeleton = (
    <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {Array(count)
        .fill(0)
        .map((_, i) => (
          <motion.div
            key={i}
            className="p-6 rounded-xl bg-gray-200 dark:bg-slate-700/40 border border-gray-300 dark:border-slate-600/50 space-y-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: [0.5, 1, 0.5], y: 0 }}
            transition={{ duration: 2, repeat: Infinity, delay: i * 0.1 }}
          >
            <motion.div
              className="w-full h-40 rounded-lg bg-gray-300 dark:bg-slate-600"
              variants={shimmer}
              animate="animate"
            />
            <motion.div
              className="h-6 rounded-md bg-gray-300 dark:bg-slate-600 w-3/4"
              variants={shimmer}
              animate="animate"
            />
            <motion.div
              className="space-y-2"
              initial={{ opacity: 0.5 }}
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <div className="h-4 rounded-md bg-gray-300 dark:bg-slate-600 w-full" />
              <div className="h-4 rounded-md bg-gray-300 dark:bg-slate-600 w-4/5" />
            </motion.div>
          </motion.div>
        ))}
    </motion.div>
  );

  const tableSkeleton = (
    <motion.div className="space-y-4">
      {Array(5)
        .fill(0)
        .map((_, i) => (
          <motion.div
            key={i}
            className="flex gap-4 items-center p-4 rounded-lg bg-gray-200 dark:bg-slate-700/40 border border-gray-300 dark:border-slate-600/50"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: [0.5, 1, 0.5], x: 0 }}
            transition={{ duration: 2, repeat: Infinity, delay: i * 0.1 }}
          >
            <motion.div
              className="w-12 h-12 rounded-lg bg-gray-300 dark:bg-slate-600 flex-shrink-0"
              variants={shimmer}
              animate="animate"
            />
            <div className="flex-1 space-y-2">
              <motion.div
                className="h-4 rounded-md bg-gray-300 dark:bg-slate-600 w-1/2"
                variants={shimmer}
                animate="animate"
              />
              <motion.div
                className="h-3 rounded-md bg-gray-300 dark:bg-slate-600 w-3/4"
                variants={shimmer}
                animate="animate"
              />
            </div>
          </motion.div>
        ))}
    </motion.div>
  );

  const renderSkeleton = () => {
    switch (variant) {
      case "card":
        return cardSkeleton;
      case "line":
        return lineSkeleton;
      case "grid":
        return gridSkeleton;
      case "table":
        return tableSkeleton;
      default:
        return lineSkeleton;
    }
  };

  return (
    <div className={className}>
      {variant === "line" ? renderSkeleton() : renderSkeleton()}
    </div>
  );
}

// Export variant presets for common use cases
export const SkeletonPresets = {
  CardList: () => <LoadingSkeleton variant="grid" count={3} />,
  LineList: () => (
    <div className="space-y-3">
      {Array(5)
        .fill(0)
        .map((_, i) => (
          <LoadingSkeleton key={i} variant="line" width="w-full" height="h-4" />
        ))}
    </div>
  ),
  TableList: () => <LoadingSkeleton variant="table" />,
};

export default LoadingSkeleton;
