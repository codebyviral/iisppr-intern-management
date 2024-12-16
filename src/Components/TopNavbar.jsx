import { useState } from "react";
import { userIcon as user } from "./URIs.js";
import { Button } from "@/Components/ui/button.jsx";
import { Sheet, SheetContent, SheetTrigger } from "@/Components/ui/sheet";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "@/context/AppContext.jsx";
import {
  Menu,
  Search,
  Bell,
  MessageSquare,
  ChevronDown,
  X,
} from "lucide-react";

const TopNavbar = () => {
  const navigate = useNavigate();

  const { dashboard } = useAppContext();

  const [isSearchVisible, setIsSearchVisible] = useState(false);

  return (
    <div className="sticky top-0 z-50 bg-white">
      <div className="flex items-center justify-between p-4 border-b relative">
        {/* Mobile Layout */}
        <div className="md:hidden flex items-center justify-between w-full">
          {/* Hamburger Menu */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <div className="flex flex-col space-y-4 mt-8">
                <div className="flex items-center space-x-2">
                  <Search className="h-5 w-5 text-gray-500" />
                  <input
                    type="text"
                    placeholder="Search for interns"
                    className="w-full px-2 py-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </div>
                <div
                  onClick={() => {
                    navigate("/notifications");
                  }}
                  className="flex items-center space-x-2 cursor-pointer"
                >
                  <Bell className="h-5 w-5 text-gray-500" />
                  <span>Notifications</span>
                </div>
                <div className="flex items-center space-x-2 cursor-pointer">
                  <MessageSquare className="h-5 w-5 text-gray-500" />
                  <span>Messages</span>
                </div>
                <div className="flex items-center space-x-2 cursor-pointer">
                  <img
                    src={user}
                    alt="Profile"
                    className="w-8 h-8 rounded-full"
                  />
                  <span>Intern Profile</span>
                </div>
              </div>
            </SheetContent>
          </Sheet>

          {/* Title */}
          <Link to="/">
            <span className="text-lg font-semibold">
              {dashboard + ` Workspace `}
            </span>
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
                placeholder="Search for interns"
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
            <span className="text-lg font-semibold">
              {dashboard + ` Workspace  `}
            </span>
          </Link>

          {/* Desktop Search Bar */}
          <div className="relative w-1/3">
            <input
              type="text"
              placeholder="Search for interns"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <span className="absolute inset-y-0 right-3 flex items-center">
              <Search className="w-5 h-5 text-gray-500" />
            </span>
          </div>

          {/* Desktop Icons and Profile */}
          <div className="flex items-center space-x-7">
            {/* Notification Icon */}
            <div
              onClick={() => {
                navigate("/notifications");
              }}
              className="relative text-gray-500 mr-5 cursor-pointer"
            >
              <Bell className="w-6 h-6" />
              {/* Notification Badge */}
              <sup className="absolute top-0 left-7 bg-red-500 text-white text-xs rounded-full px-2 py-0">
                2+
              </sup>
            </div>

            {/* Message Icon */}
            <div className="text-gray-500 cursor-pointer">
              <MessageSquare className="w-6 h-6" />
            </div>

            {/* Profile Section */}
            <div className="flex items-center space-x-2 cursor-pointer">
              <img
                src={user}
                alt="Profile"
                className="w-8 h-8 mx-3 rounded-full"
              />
              <span className="text-gray-700 font-medium">Intern</span>
              <ChevronDown className="w-4 h-4 text-gray-500" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopNavbar;
