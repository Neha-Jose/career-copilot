import { motion } from "framer-motion";

/**
 * Footer - Premium SaaS Footer Component
 * Features: Dark mode, responsive, animations
 */
function Footer() {
  const footerLinks = {
    Product: [
      { name: "Career", href: "#" },
      { name: "Recruitment", href: "#" },
      { name: "Enterprise", href: "#" },
      { name: "Pricing", href: "#" },
    ],
    Company: [
      { name: "About", href: "#" },
      { name: "Blog", href: "#" },
      { name: "Careers", href: "#" },
      { name: "Contact", href: "#" },
    ],
    Resources: [
      { name: "Documentation", href: "#" },
      { name: "API Docs", href: "#" },
      { name: "Guides", href: "#" },
      { name: "Community", href: "#" },
    ],
    Legal: [
      { name: "Privacy", href: "#" },
      { name: "Terms", href: "#" },
      { name: "Security", href: "#" },
      { name: "Compliance", href: "#" },
    ],
  };

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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3 },
    },
  };

  return (
    <motion.footer
      className="bg-gradient-to-b from-white to-gray-50 dark:from-slate-950 dark:to-slate-900 border-t border-gray-200 dark:border-slate-800 mt-20"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Main Footer Content */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-5 gap-8 mb-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Brand */}
          <motion.div variants={itemVariants} className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">A</span>
              </div>
              <span className="font-bold text-lg bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                ACIP
              </span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              AI Career Intelligence Platform. Transform your career journey.
            </p>
            <div className="flex gap-3">
              {["Twitter", "LinkedIn", "GitHub"].map((social) => (
                <motion.a
                  key={social}
                  href="#"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 rounded-lg bg-gray-100 dark:bg-slate-800 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  {social.charAt(0)}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Link Columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <motion.div key={category} variants={itemVariants}>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4 text-sm uppercase tracking-wider">
                {category}
              </h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>

        {/* Newsletter */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/10 dark:to-purple-900/10 rounded-xl p-6 mb-8 border border-blue-100 dark:border-blue-800/30"
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                Get career insights delivered
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Subscribe to our newsletter for career tips and updates.
              </p>
            </div>
            <motion.div className="flex gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-4 py-2 rounded-lg bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-700 text-sm text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm font-medium rounded-lg hover:shadow-lg transition-all whitespace-nowrap"
              >
                Subscribe
              </motion.button>
            </motion.div>
          </div>
        </motion.div>

        {/* Bottom */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="border-t border-gray-200 dark:border-slate-800 pt-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
        >
          <p className="text-sm text-gray-600 dark:text-gray-400">
            © 2025 AI Career Intelligence Platform. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              Terms of Service
            </a>
            <a href="#" className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              Cookie Settings
            </a>
          </div>
        </motion.div>
      </div>
    </motion.footer>
  );
}

export default Footer;
