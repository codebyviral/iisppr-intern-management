import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "@/context/AuthContext";
import {
  ArrowRight,
  Users,
  Calendar,
  BookOpen,
  Award,
  CheckCircle,
  MessageCircle,
} from "lucide-react";
//fix
const IntroPage = () => {
  const { loggedIn } = useAuthContext();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-blue-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="pt-16 pb-20 text-center lg:pt-24">
              <h1 className="text-4xl font-extrabold text-white sm:text-5xl md:text-6xl">
                IISPPR Intern Management
              </h1>
              <p className="mt-6 max-w-2xl mx-auto text-xl text-gray-100">
                Empowering future professionals through structured internships
                at the Indian Institute of Sugarcane & Power Plant Research
              </p>
              <div className="mt-10 flex justify-center space-x-4">
                <button
                  onClick={() => navigate("/login")}
                  className="flex items-center px-8 py-3 text-base font-medium text-blue-700 bg-white rounded-md hover:bg-gray-50 md:py-4 md:text-lg md:px-10"
                >
                  Login to Dashboard
                  <ArrowRight className="ml-2 h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-3 bg-white rounded-lg shadow divide-y sm:divide-y-0 sm:divide-x divide-gray-200">
            <div className="p-6 text-center">
              <p className="text-3xl font-bold text-blue-600">500+</p>
              <p className="mt-2 text-sm text-gray-600">Active Interns</p>
            </div>
            <div className="p-6 text-center">
              <p className="text-3xl font-bold text-blue-600">50+</p>
              <p className="mt-2 text-sm text-gray-600">Research Projects</p>
            </div>
            <div className="p-6 text-center">
              <p className="text-3xl font-bold text-blue-600">15+</p>
              <p className="mt-2 text-sm text-gray-600">Departments</p>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Comprehensive Internship Management
          </h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: <Users className="h-8 w-8 text-blue-600" />,
                title: "Profile Management",
                description:
                  "Complete intern profiles with academic records, projects, and performance tracking",
              },
              {
                icon: <Calendar className="h-8 w-8 text-blue-600" />,
                title: "Attendance System",
                description:
                  "Digital attendance tracking with automated reports and analytics",
              },
              {
                icon: <BookOpen className="h-8 w-8 text-blue-600" />,
                title: "Project Tracking",
                description:
                  "Monitor research projects, milestones, and deliverables",
              },
              {
                icon: <MessageCircle className="h-8 w-8 text-blue-600" />,
                title: "Communication Hub",
                description:
                  "Integrated messaging system for mentors and interns",
              },
              {
                icon: <CheckCircle className="h-8 w-8 text-blue-600" />,
                title: "Progress Reports",
                description:
                  "Generate detailed progress reports and performance evaluations",
              },
              {
                icon: <Award className="h-8 w-8 text-blue-600" />,
                title: "Certificate Generation",
                description:
                  "Automated internship completion certificates with verification",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default IntroPage;
