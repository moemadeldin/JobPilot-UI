import { Link } from "react-router-dom";
import type { User } from "../types/auth";

interface NavbarProps {
  user: User | null;
  handleLogout: () => void;
  isLoggingOut: boolean;
}

export default function Navbar({ user, handleLogout, isLoggingOut }: NavbarProps) {
  return (
    <nav className="bg-gray-800 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <div className="shrink-0 font-bold text-2xl text-blue-400">
                JobPilot
              </div>
              <div className="hidden md:ml-10 md:flex md:space-x-8">
                <a href="#features" className="text-gray-300 hover:text-white px-3 py-2 text-sm font-medium transition-colors">
                  Features
                </a>
                <a href="#how-it-works" className="text-gray-300 hover:text-white px-3 py-2 text-sm font-medium transition-colors">
                  How It Works
                </a>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              {user ? (
                <div className="flex items-center space-x-4">
                  <span className="text-gray-300 text-sm">Welcome, {user.email}</span>
                  <Link 
                    to="/dashboard" 
                    className="bg-blue-500 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-600 transition-colors"
                  >
                    Dashboard
                  </Link>
                  <button 
                    onClick={handleLogout}
                    disabled={isLoggingOut}
                    className="text-gray-300 hover:text-white font-medium transition-colors border border-gray-600 px-4 py-2 rounded-lg hover:border-red-500 hover:bg-red-900/20 disabled:opacity-50 cursor-pointer"
                  >
                    {isLoggingOut ? "Logging out..." : "Logout"}
                  </button>
                </div>
              ) : (
                <>
                  <Link 
                    to="/login" 
                    className="text-gray-300 hover:text-white font-medium transition-colors"
                  >
                    Sign In
                  </Link>
                  <Link 
                    to="/register" 
                    className="bg-blue-500 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-600 transition-colors"
                  >
                    Get Started
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
    </nav>
  );
}