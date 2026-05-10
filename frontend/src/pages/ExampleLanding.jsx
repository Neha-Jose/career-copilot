import { Navbar, Footer, HeroSection, FeatureCard, StatsSection } from "../components";
import {
  Code,
  Zap,
  BarChart3,
  Users,
  Rocket,
  Brain,
} from "lucide-react";

/**
 * Example Landing Page - Demonstrates reusable component usage
 * Shows how to compose pages using the shared component library
 */
function ExampleLanding() {
  const features = [
    {
      icon: Brain,
      title: "AI-Powered Analysis",
      description:
        "Advanced machine learning algorithms analyze your resume against job requirements with precision.",
      link: "#features",
    },
    {
      icon: BarChart3,
      title: "ATS Scoring",
      description:
        "Get detailed ATS scores and understand exactly how your resume matches job descriptions.",
      link: "#features",
    },
    {
      icon: Rocket,
      title: "Personalized Roadmap",
      description:
        "AI generates customized learning paths based on your skills and career goals.",
      link: "#features",
    },
    {
      icon: Zap,
      title: "Instant Results",
      description:
        "Get comprehensive career insights and recommendations in seconds, not hours.",
      link: "#features",
    },
    {
      icon: Users,
      title: "Community",
      description:
        "Join thousands of professionals and learn from the collective experience of the community.",
      link: "#features",
    },
    {
      icon: Code,
      title: "API Access",
      description:
        "Integrate ACIP into your own applications with our comprehensive REST API.",
      link: "#features",
      isHighlighted: true,
    },
  ];

  return (
    <>
      <Navbar />

      <main>
        {/* Hero Section */}
        <HeroSection
          title="Transform Your Career"
          subtitle="with AI Intelligence"
          primaryCta="Get Started Free"
          secondaryCta="View Demo"
        />

        {/* Features Section */}
        <section className="py-20 md:py-28 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-gray-50 dark:from-slate-950 dark:to-slate-900">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                <span className="bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                  Powerful Features
                </span>
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                Everything you need to take control of your career journey
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature) => (
                <FeatureCard key={feature.title} {...feature} />
              ))}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <StatsSection />

        {/* CTA Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-900/50 dark:to-purple-900/50">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Transform Your Career?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Join thousands of professionals using ACIP to advance their careers
            </p>
            <button className="px-8 py-4 bg-white text-blue-600 font-bold rounded-lg hover:shadow-xl transition-all inline-block">
              Get Started Free
            </button>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

export default ExampleLanding;
