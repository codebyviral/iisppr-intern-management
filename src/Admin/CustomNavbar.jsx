/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import iisprLogo from "../assets/Images/iisprlogo.png";
import { Logout } from "@/Pages/pageIndex";
export default function CustomNavbar() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    // Clear any stored authentication data (like tokens or session)
    localStorage.removeItem("authToken"); // Remove token from localStorage
    sessionStorage.clear(); // Clear sessionStorage
    // Redirect to the homepage
    navigate("/logout");
  };
  

  return (
    <nav className="bg-white shadow-md">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <img
              className="w-auto h-10"
              src={iisprLogo} // Replace with your logo path
              alt="Connect Counsellor Logo"
            />
          </div>

          {/* Hamburger Icon (Visible only on mobile) */}
          <div className="block md:hidden">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-gray-600 focus:outline-none"
            >
              <svg
                className="w-6 h-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:space-x-6 md:items-center lg:mr-20 ">
            <div className="navelemets md:space-x-12">
              <Link
                to="/Adminhomepage"
                className="font-medium text-black hover:text-red-500"
              >
                Home
              </Link>
              <Link
                to="/Projectmanagement"
                className="font-medium text-black hover:text-red-500"
              >
                Project Management
              </Link>
              <Link
                to="/Weeklyreport"
                className="font-medium text-black hover:text-red-500"
              >
                WeeklyReport
              </Link>
              <Link
                to="/Taskassignment"
                className="font-medium text-black hover:text-red-500"
              >
                Task Assignment
              </Link>
            </div>
          </div>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="px-4 py-2 text-white transition duration-300 bg-red-500 rounded-md hover:bg-red-600"
          >
            Logout
          </button>
        </div>

        {/* Mobile Navigation */}
        {menuOpen && (
          <div className="md:hidden">
            <Link
              to="/Adminhomepage"
              className="block px-4 py-2 text-black border-b hover:text-blue-500"
            >
              Home
            </Link>
            <Link
              to="/Projectmanagement"
              className="block px-4 py-2 text-black border-b hover:text-red-500"
            >
              Project Management
            </Link>
            <Link
              to="/Weeklyreport"
              className="block px-4 py-2 text-black border-b hover:text-blue-500"
            >
              Reports
            </Link>
            <Link
              to="/Taskassignment"
              className="block px-4 py-2 text-black border-b hover:text-blue-500"
            >
              Task Assignment
            </Link>
            <button
              onClick={handleLogout}
              className="w-full px-4 py-2 mt-2 text-left text-white transition duration-300 bg-red-500 rounded-md hover:bg-red-600"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
