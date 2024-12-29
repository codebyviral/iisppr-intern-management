import React, { useEffect } from "react";
import iispprLogo from "../assets/Images/iisprlogo.png";
import { ArrowRight, Users, Calendar, ChartBar } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "@/context/AuthContext";
const LandingPage = () => {
  const { loggedIn } = useAuthContext();
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              {/* Logo placeholder */}
              <div className="w-40 h-12 flex items-center justify-center rounded">
                <img className="h-10" src={iispprLogo} alt="" />
              </div>
            </div>
            <div>
              <button
                onClick={() => navigate("/login")}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg flex items-center"
              >
                Login
                <ArrowRight className="ml-2 h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl md:text-6xl">
            IISPPR Intern Management
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            Streamline your internship program with our comprehensive management
            platform. Track progress, manage assignments, and foster growth.
          </p>
          <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
            <div className="rounded-md shadow">
              <button
                onClick={() => navigate("/login")}
                className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 md:py-4 md:text-lg md:px-10"
              >
                Login to Access Dashboard
                <ArrowRight className="ml-2 h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {/* Feature 1 */}
            <div className="p-6 bg-blue-50 rounded-xl">
              <Users className="h-12 w-12 text-blue-600" />
              <h3 className="mt-4 text-xl font-medium text-gray-900">
                Intern Management
              </h3>
              <p className="mt-2 text-gray-500">
                Efficiently manage interns, track their progress, and maintain
                detailed profiles.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="p-6 bg-blue-50 rounded-xl">
              <Calendar className="h-12 w-12 text-blue-600" />
              <h3 className="mt-4 text-xl font-medium text-gray-900">
                Schedule Tracking
              </h3>
              <p className="mt-2 text-gray-500">
                Monitor attendance, manage assignments, and coordinate project
                timelines.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="p-6 bg-blue-50 rounded-xl">
              <ChartBar className="h-12 w-12 text-blue-600" />
              <h3 className="mt-4 text-xl font-medium text-gray-900">
                Performance Analytics
              </h3>
              <p className="mt-2 text-gray-500">
                Generate detailed reports and analyze intern performance
                metrics.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-50">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-gray-500">© 2024 IISPPR. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
