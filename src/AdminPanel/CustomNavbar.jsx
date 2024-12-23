/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Link } from "react-router-dom"; // Import Link for routing
import { useNavigate } from "react-router-dom";
import iisprLogo from "../assets/Images/iisprlogo.png"

export default function CustomNavbar() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleNavigation =()=>{
    navigate("/login")
  }
  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <img
              className="h-10 w-auto"
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
                className="h-6 w-6"
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
            <Link to="/Adminhomepage" className="text-black font-medium hover:text-red-500">
              Home
            </Link>
            <Link to="/Projectmanagement" className="text-black font-medium hover:text-red-500">
              Project Management
            </Link>
            <Link to="/Weeklyreport" className="text-black font-medium hover:text-red-500">
              WeeklyReport
            </Link>
            <Link to="/Taskassignment" className="text-black font-medium hover:text-red-500">
              Task Assignment
            </Link>
            </div>
          
          </div>
          <button  onClick={()=>handleNavigation()} className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-300">
              Logout
            </button>
        </div>

        {/* Mobile Navigation */}
        {menuOpen && (
          <div className="md:hidden">
            <Link
              to="/Adminhomepage"
              className="block px-4 py-2 text-black hover:text-blue-500 border-b"
            >
              Home
            </Link>
            <Link to="/Projectmanagement" className="text-black font-medium hover:text-red-500">
              Project Management
            </Link>
            <Link
              to="//Weeklyreport"
              className="block px-4 py-2 text-black hover:text-blue-500 border-b"
            >
              Reports
            </Link>
            <Link to ="/Taskassignment" className="block px-4 py-2 text-black hover:text-blue-500 border-b">
            Task Assignment
            </Link>
            <button  onClick={()=>handleNavigation()} className="w-full text-left bg-red-500 text-white px-4 py-2 mt-2 rounded-md hover:bg-red-600 transition duration-300">
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
