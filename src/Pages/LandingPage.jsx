import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "@/context/AuthContext";

const LandingPage = () => {
  const { loggedIn } = useAuthContext();
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="px-4 py-20 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl md:text-6xl">
            IISPPR Intern Management
          </h1>
          <p className="max-w-md mx-auto mt-3 text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            Streamline your internship program with our comprehensive management
            platform. Track progress, manage assignments, and foster growth.
          </p>
          <div className="max-w-md mx-auto mt-5 sm:flex sm:justify-center md:mt-8">
            <div className="rounded-md shadow">
              <button
                onClick={() => navigate("/login")}
                className="flex items-center justify-center w-full px-8 py-3 text-base font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 md:py-4 md:text-lg md:px-10"
              >
                Login to Access Dashboard
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <section className="py-16">
        <div className="container px-4 mx-auto text-center">
          <h2 className="mb-8 text-3xl font-bold">Why Choose Intern Hub?</h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="p-6 bg-white rounded-lg shadow">
              <div className="mb-4 text-4xl text-blue-600">📁</div>
              <h3 className="text-xl font-bold">Internship Tracking</h3>
              <p className="mt-2 text-gray-600">
                Manage and track internship progress with ease.
              </p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow">
              <div className="mb-4 text-4xl text-blue-600">✅</div>
              <h3 className="text-xl font-bold">Attendance Management</h3>
              <p className="mt-2 text-gray-600">
                Keep track of attendance seamlessly in one place.
              </p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow">
              <div className="mb-4 text-4xl text-blue-600">💬</div>
              <h3 className="text-xl font-bold">Collaborative Platform</h3>
              <p className="mt-2 text-gray-600">
                Foster teamwork and collaboration among interns.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-gray-100">
        <div className="container px-4 mx-auto text-center">
          <h2 className="mb-8 text-3xl font-bold">What Our Users Say</h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            <div className="p-6 bg-white rounded-lg shadow">
              <p className="italic">
                "Intern Hub simplified our internship management like never
                before!"
              </p>
              <p className="mt-4 font-bold">- Ashish Patel</p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow">
              <p className="italic">
                "The best platform for managing interns efficiently."
              </p>
              <p className="mt-4 font-bold">- Viral Vaghela </p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow">
              <p className="italic">
                "User-friendly and feature-rich! Highly recommended."
              </p>
              <p className="mt-4 font-bold">- Ishika Ranjan</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
