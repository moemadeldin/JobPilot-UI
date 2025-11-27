import { useAuth } from "../hooks/useAuth";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import FeatureCard from "../components/FeatureCard";
import CTASection from "../components/CTASection";
import Footer from "../components/Footer";

export default function Homepage() {
  const { user, handleLogout, isLoggingOut } = useAuth();

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-900 to-gray-800">
      <Navbar user={user} handleLogout={handleLogout} isLoggingOut={isLoggingOut} />
      
      <Hero user={user} />

      <div id="features" className="bg-gray-800 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Why Choose JobPilot?</h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Our AI-powered platform revolutionizes how you find and apply for jobs
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard 
              icon="🤖" 
              title="Smart Job Matching" 
              description="Advanced AI analyzes your resume and preferences to find perfect job matches with compatibility scores." 
            />
            <FeatureCard 
              icon="📊" 
              title="Detailed Insights" 
              description="Get structured feedback on why jobs match your profile and where you can improve." 
            />
            <FeatureCard 
              icon="⚡" 
              title="Fast Processing" 
              description="Intelligent PDF parsing and queue systems deliver instant results and recommendations." 
            />
          </div>
        </div>
      </div>

      <CTASection user={user} />
      <Footer />
    </div>
  );
}