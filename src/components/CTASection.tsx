import { Link } from "react-router-dom";
import type { User } from "../types/auth";

interface CTASectionProps {
  user: User | null;
}

export default function CTASection({ user }: CTASectionProps) {
  return (
    <div className="bg-blue-600 py-16">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Land Your Dream Job?
          </h2>
          <p className="text-blue-100 text-xl mb-8">
            Join thousands of job seekers who found their perfect match with JobPilot
          </p>
          <Link 
            to={user ? "/jobs" : "/register"}
            className="inline-block bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors"
          >
            {user ? "Browse Jobs" : "Get Started Free"}
          </Link>
        </div>
      </div>
  );
}