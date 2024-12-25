import { useState } from "react";
import { Button } from "@/Components/ui/button.jsx";
import {
  Menu,
  Search,
  Bell,
  MessageSquare,
  ChevronDown,
  X,
  UserRound,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAppContext } from "@/context/AppContext.jsx";
import { NotiBadge } from "./compIndex.js";
import { useAuthContext } from "@/context/AuthContext.jsx";

const TopNavbar = () => {
  const navigate = useNavigate();
  const { loggedIn } = useAuthContext();
  const { notiCounter } = useAppContext();
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Dropdown options for logged-in users
  const dropdownOptions = loggedIn
    ? [
        { label: "Your Profile", onClick: () => navigate("/your-profile") },
        { label: "Your Attendance", onClick: () => navigate("/my-attendance") },
        { label: "Have a Query", onClick: () => navigate("/frequently-asked-questions") },
        { label: "Task Submissions", onClick: () => navigate("/tasks") },
        {
          label: "Leave Application",
          onClick: () => navigate("/leave-application"),
        },
        { label: "Logout", onClick: () => navigate("/logout") },
      ]
    : [
        { label: "Login", onClick: () => navigate("/login") }, // Login option if not logged in
      ];

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <div className="sticky top-0 z-50 bg-white shadow-md">
      <div className="flex items-center justify-between p-4 border-b relative">
        {/* Mobile Layout */}
        <div className="md:hidden flex items-center justify-between w-full">
          {/* Hamburger Menu */}
          <button
            className="text-gray-500 focus:outline-none"
            onClick={toggleSidebar}
          >
            <Menu className="w-6 h-6" />
          </button>

          {/* Title */}
          <Link to="/">
            <span className="text-lg font-semibold">IISPPR Intern Hub</span>
          </Link>

          {/* Search Toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsSearchVisible(!isSearchVisible)}
          >
            {!isSearchVisible ? <Search className="h-5 w-5" /> : <X />}
          </Button>
        </div>

        {/* Mobile Search Input - Conditional Rendering */}
        {isSearchVisible && (
          <div className="absolute top-full left-0 w-full p-2 bg-white border-b md:hidden">
            <div className="relative">
              <input
                type="text"
                placeholder="Search"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <span className="absolute inset-y-0 right-3 flex items-center">
                <Search className="w-5 h-5 text-gray-500" />
              </span>
            </div>
          </div>
        )}

        {/* Desktop Layout */}
        <div className="hidden md:flex items-center justify-between w-full">
          {/* Desktop Title */}
          <Link to="/">
            <span className="text-lg font-semibold">IISPPR Intern Hub</span>
          </Link>

          {/* Desktop Search Bar */}
          <div className="relative w-1/3">
            <input
              type="text"
              placeholder="Search"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <span className="absolute inset-y-0 right-3 flex items-center">
              <Search className="w-5 h-5 text-gray-500" />
            </span>
          </div>

          {/* Desktop Icons and Profile */}
          <div className="flex items-center space-x-7">
            <NotiBadge count={notiCounter} />

            {/* Profile Section */}
            <div className="relative">
              {/* User Icon */}
              <div
                className="flex items-center space-x-2 cursor-pointer"
                onClick={toggleDropdown}
              >
                <UserRound className="w-6 h-6 text-gray-500" />
                <ChevronDown className="w-4 h-4 text-gray-500" />
              </div>

              {/* Dropdown Menu */}
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg z-10">
                  {dropdownOptions.map((option, index) => (
                    <div
                      key={index}
                      onClick={() => {
                        option.onClick();
                        setIsDropdownOpen(false); // Close dropdown after click
                      }}
                      className="px-4 py-2 hover:bg-blue-500 hover:text-white cursor-pointer text-gray-700"
                    >
                      {option.label}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Sidebar */}
      {isSidebarOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 flex">
          {/* Sidebar Content */}
          <div className="bg-white w-64 h-full shadow-lg flex flex-col space-y-4 p-4">
            <button className="self-end text-gray-500" onClick={toggleSidebar}>
              <X className="w-6 h-6" />
            </button>

            {/* Mobile Sidebar Content */}
            <nav className="flex flex-col space-y-4">
              {/* Dashboard Title */}
              <Link to="/" className="text-lg font-semibold">
                IISPPR Intern Hub
              </Link>

              {/* Search Bar */}
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <span className="absolute inset-y-0 right-3 flex items-center">
                  <Search className="w-5 h-5 text-gray-500" />
                </span>
              </div>

              {/* Navigation Options */}
              {dropdownOptions.map((option, index) => (
                <button
                  key={index}
                  onClick={() => {
                    option.onClick();
                    setIsSidebarOpen(false); // Close sidebar after navigation
                  }}
                  className="text-left px-4 py-2 rounded-lg hover:bg-blue-500 hover:text-white text-gray-700"
                >
                  {option.label}
                </button>
              ))}

              {/* Notification and Message Icons */}
              <div className="flex items-center justify-between space-x-4">
                <NotiBadge count={notiCounter} />
              </div>
            </nav>
          </div>
        </div>
      )}
    </div>
  );
};

export default TopNavbar;
