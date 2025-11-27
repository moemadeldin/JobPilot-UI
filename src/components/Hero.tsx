import { Link } from "react-router-dom";
import type { User } from "../types/auth";

interface HeroProps {
  user: User | null;
}

export default function Hero({ user }: HeroProps) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Find Your Dream Job
            <span className="text-blue-400 block">With AI Precision</span>
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            JobPilot uses advanced AI to match your skills and experience with the perfect job opportunities. 
            Get personalized recommendations and insights to accelerate your career journey.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link 
              to={user ? "/jobs" : "/register"}
              className="bg-blue-500 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-600 transition-colors shadow-lg"
            >
              {user ? "Browse Jobs" : "Start Free Today"}
            </Link>
            <button className="border-2 border-gray-600 text-gray-300 px-8 py-4 rounded-lg font-semibold text-lg hover:border-blue-400 hover:text-white transition-colors">
              Watch Demo
            </button>
          </div>
        </div>
    </div>
  );
}