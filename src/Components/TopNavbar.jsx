import { useState } from "react";
import { userIcon as user, authenticatedUser } from "./URIs.js";
import { Button } from "@/Components/ui/button.jsx";
import { Sheet, SheetContent, SheetTrigger } from "@/Components/ui/sheet";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "@/context/AppContext.jsx";
import { UserRoundCheck, UserRound } from "lucide-react";
import {
  Menu,
  Search,
  Bell,
  MessageSquare,
  ChevronDown,
  X,
} from "lucide-react";
import { NotiBadge } from "./compIndex.js";
import { useAuthContext } from "@/context/AuthContext.jsx";

const TopNavbar = () => {
  const navigate = useNavigate();
  const { loggedIn } = useAuthContext();
  const { dashboard, setDashboard, notiCounter } = useAppContext();
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [activeItem, setActiveItem] = useState("Home");

  // Menu Items (from SideNav)
  const menuItems = [
    { name: "Home", icon: "bi-house" },
    { name: "Projects", icon: "bi-people" },
    { name: "Categories", icon: "bi-list-task" },
    { name: "Stores", icon: "bi-shop" },
    { name: "Reports", icon: "bi-bar-chart" },
    { name: "Settings", icon: "bi-gear" },
  ];

  const handleMenuClick = (item) => {
    setActiveItem(item);
    setDashboard(item);
    navigate("/" + item.toLowerCase());
  };

  const handleLoginRedirect = () => {
    loggedIn ? navigate("/logout") : navigate("/login");
  };

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
              {/* Sidenav Items in Mobile */}
              <div className="flex flex-col mt-8 space-y-4">
                {menuItems.map((item) => (
                  <div
                    key={item.name}
                    onClick={() => handleMenuClick(item.name)}
                    className={`flex items-center space-x-2 cursor-pointer py-3 px-4 rounded-lg ${
                      activeItem === item.name
                        ? "bg-blue-500 text-white"
                        : "hover:bg-blue-600 text-gray-700"
                    }`}
                  >
                    <i className={`bi ${item.icon} text-lg`} />
                    <span className="text-sm">{item.name}</span>
                  </div>
                ))}
                {/* Search Section */}
                <div className="flex items-center space-x-2 mt-6">
                  <Search className="h-5 w-5 text-gray-500" />
                  <input
                    type="text"
                    placeholder="Search for interns"
                    className="w-full px-2 py-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </div>
                {/* Notifications */}
                <div
                  onClick={() => {
                    navigate("/notifications");
                  }}
                  className="flex items-center space-x-2 cursor-pointer mt-6"
                >
                  <Bell className="h-5 w-5 text-gray-500" />
                  <span>Notifications</span>
                </div>
                {/* Messages */}
                <div className="flex items-center space-x-2 cursor-pointer mt-4">
                  <MessageSquare className="h-5 w-5 text-gray-500" />
                  <span>Messages</span>
                </div>
                {/* Profile */}
                <div className="flex items-center space-x-2 cursor-pointer mt-4">
                  <div
                    onClick={() => {
                      navigate("/settings");
                    }}
                  >
                    {loggedIn ? <UserRoundCheck /> : <UserRound />}
                  </div>
                  <div onClick={() => handleLoginRedirect()}>
                    {loggedIn ? "Logout" : "Login"}
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>

          {/* Title */}
          <Link to="/">
            <span className="text-lg font-semibold">
              {dashboard + ` Workspace`}
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
            <span
              onClick={() => setDashboard("Home")}
              className="text-lg font-semibold"
            >
              {dashboard + ` Workspace`}
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
            <NotiBadge count={notiCounter} />

            {/* Message Icon */}
            <div className="text-gray-500 cursor-pointer">
              <MessageSquare className="w-6 h-6" />
            </div>

            {/* Profile Section */}
            <div className="flex items-center space-x-2 cursor-pointer">
              <div
                onClick={() => {
                  navigate("/settings");
                }}
              >
                {loggedIn ? <UserRoundCheck /> : <UserRound />}
              </div>
              <div
                onClick={() => handleLoginRedirect()}
                className="text-gray-700 font-medium"
              >
                {loggedIn ? "Logout" : "Login"}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopNavbar;
