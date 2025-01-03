import { useState, useEffect } from "react";
import { Button } from "@/Components/ui/button.jsx";
import {
  Menu,
  Search,
  X,
  UserRound,
  ChevronDown,
  Building2,
} from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAppContext } from "@/context/AppContext.jsx";
import { NotiBadge } from "./compIndex.js";
import { useAuthContext } from "@/context/AuthContext.jsx";

const TopNavbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { notiCounter, setNotiCounter } = useAppContext();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { loggedIn } = useAuthContext();
  const isAdmin = localStorage.getItem("isAdmin") === "true";

  const availableRoutes = [
    // Public Routes
    { path: "/login", label: "Login", public: true },
    { path: "/signup", label: "Sign Up", public: true },
    { path: "/aboutus", label: "About Us", public: true },
    { path: "/privacypolicy", label: "Privacy Policy", public: true },
    { path: "/frequently-asked-questions", label: "FAQ", public: true },

    // Protected User Routes
    { path: "/", label: "Home", public: false },
    { path: "/dashboard", label: "Dashboard", public: false },
    { path: "/your-profile", label: "Profile", public: false },
    { path: "/notifications", label: "Notifications", public: false },
    { path: "/reports", label: "Reports", public: false },
    { path: "/projects", label: "Projects", public: false },
    { path: "/help", label: "Help", public: false },
    { path: "/my-attendance", label: "My Attendance", public: false },
    { path: "/stores", label: "Stores", public: false },
    { path: "/leave-application", label: "Leave Application", public: false },
    { path: "/setting", label: "Settings", public: false },

    // Admin Routes
    { path: "/adminhomepage", label: "Admin Dashboard", adminOnly: true },
    {
      path: "/projectmanagement",
      label: "Project Management",
      adminOnly: true,
    },
    { path: "/admintask", label: "Admin Tasks", adminOnly: true },
    { path: "/weeklyreport", label: "Weekly Reports", adminOnly: true },
    { path: "/allusers", label: "All Users", adminOnly: true },
    { path: "/intern-attendance", label: "Intern Attendance", adminOnly: true },
    {
      path: "/view-attendance-all",
      label: "View All Attendance",
      adminOnly: true,
    },
  ];

  const filteredRoutes = availableRoutes.filter((route) => {
    if (!loggedIn) return route.public;
    if (isAdmin) return true;
    return !route.adminOnly;
  });

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query.trim()) {
      const filtered = filteredRoutes.filter((route) =>
        route.label.toLowerCase().includes(query.toLowerCase())
      );
      setSearchResults(filtered);
    } else {
      setSearchResults([]);
    }
  };

  const dropdownOptions = [
    { label: "Your Profile", path: "/your-profile" },
    { label: "Your Attendance", path: "/my-attendance" },
    { label: "Have a Query", path: "/frequently-asked-questions" },
    { label: "Leave Application", path: "/leave-application" },
    { label: "Settings", path: "/setting" },
    ...(isAdmin ? [{ label: "Admin Panel", path: "/adminhomepage" }] : []),
    { label: "Logout", path: "/logout" },
  ];

  useEffect(() => {
    if (loggedIn) {
      const fetchNotifications = async () => {
        const userId = localStorage.getItem("userId");
        try {
          const response = await fetch(
            `https://iisppr-backend.vercel.app/get-notifications?userId=${userId}`
          );
          if (!response.ok) throw new Error("Failed to fetch notifications");
          const data = await response.json();
          setNotiCounter(data.notifications.notifications.length);
        } catch (error) {
          console.error("Error fetching notifications:", error);
        }
      };
      fetchNotifications();
    }
  }, [loggedIn]);

  return (
    <div className="sticky top-0 z-50 bg-white shadow-md">
      <div className="flex items-center justify-between p-4 border-b relative">
        {/* Mobile Header */}
        <div className="md:hidden flex items-center justify-between w-full">
          <button
            className="text-gray-500 focus:outline-none"
            onClick={() => setIsSidebarOpen((prev) => !prev)}
          >
            <Menu className="w-6 h-6" />
          </button>

          <Link to="/">
            <div className="flex flex-row">
              <Building2 />
              <span className="text-lg font-semibold ml-4">
                IISPPR Intern Hub
              </span>
            </div>
          </Link>

          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsSearchVisible(!isSearchVisible)}
          >
            {!isSearchVisible ? <Search className="h-5 w-5" /> : <X />}
          </Button>
        </div>

        {/* Desktop Header */}
        <div className="hidden md:flex items-center justify-between w-full">
          <Link to="/">

            <div className="flex flex-row">
              <Building2 />
              <span className="text-lg font-semibold ml-4">
                IISPPR Intern Hub
              </span>
            </div>

            <span className="text-lg font-semibold"></span>

          </Link>

          <div className="relative w-1/3">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              placeholder="Search pages..."
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />

            {searchResults.length > 0 && (
              <div className="absolute w-full mt-1 bg-white border rounded-lg shadow-lg z-50">
                {searchResults.map((result) => (
                  <div
                    key={result.path}
                    onClick={() => {
                      navigate(result.path);
                      setSearchQuery("");
                      setSearchResults([]);
                    }}
                    className="px-4 py-2 hover:bg-blue-50 cursor-pointer"
                  >
                    {result.label}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="flex items-center space-x-7">
            {loggedIn && <NotiBadge count={notiCounter} />}

            {loggedIn ? (
              <div className="relative">
                <div
                  className="flex items-center space-x-2 cursor-pointer"
                  onClick={() => setIsDropdownOpen((prev) => !prev)}
                >
                  <UserRound className="w-6 h-6 text-gray-500" />
                  <ChevronDown className="w-4 h-4 text-gray-500" />
                </div>

                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg z-10">
                    {dropdownOptions.map((option, index) => (
                      <div
                        key={index}
                        onClick={() => {
                          navigate(option.path);
                          setIsDropdownOpen(false);
                        }}
                        className="px-4 py-2 hover:bg-blue-50 cursor-pointer"
                      >
                        {option.label}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <Button
                variant="primary"
                className="px-6 py-2 text-white bg-blue-500 hover:bg-blue-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                onClick={() => navigate("/login")}
              >
                Login
              </Button>
            )}
          </div>
        </div>

        {/* Mobile Search and Sidebar */}
        {isSearchVisible && (
          <div className="absolute top-full left-0 w-full p-2 bg-white border-b md:hidden">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                placeholder="Search pages..."
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />

              {searchResults.length > 0 && (
                <div className="absolute w-full mt-1 bg-white border rounded-lg shadow-lg">
                  {searchResults.map((result) => (
                    <div
                      key={result.path}
                      onClick={() => {
                        navigate(result.path);
                        setSearchQuery("");
                        setSearchResults([]);
                        setIsSearchVisible(false);
                      }}
                      className="px-4 py-2 hover:bg-blue-50 cursor-pointer"
                    >
                      {result.label}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {isSidebarOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-40 flex">
            <div className="bg-white w-64 h-full shadow-lg flex flex-col space-y-4 p-4">
              <button
                className="self-end text-gray-500"
                onClick={() => setIsSidebarOpen(false)}
              >
                <X className="w-6 h-6" />
              </button>

              <nav className="flex flex-col space-y-4">
                {filteredRoutes.map((route) => (
                  <Link
                    key={route.path}
                    to={route.path}
                    onClick={() => setIsSidebarOpen(false)}
                    className="px-4 py-2 hover:bg-blue-50 rounded-lg"
                  >
                    {route.label}
                  </Link>
                ))}
              </nav>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TopNavbar;
