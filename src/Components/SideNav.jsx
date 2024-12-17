import "bootstrap-icons/font/bootstrap-icons.css";
import { useState, useEffect } from "react";
import { useAppContext } from "../context/AppContext";

const SideNav = () => {
  const [activeItem, setActiveItem] = useState("Home");
  const [content, setContent] = useState("Content for Home");
  const { dashboard, setDashboard } = useAppContext();

  useEffect(() => {
    const mainContent = document.getElementById("mainContent");
    const sidebar = document.getElementById("sidebar");

    // Sidebar hover effect
    const handleMouseEnter = () => {
      mainContent.style.marginLeft = "16rem";
    };

    const handleMouseLeave = () => {
      mainContent.style.marginLeft = "4rem";
    };

    sidebar.addEventListener("mouseenter", handleMouseEnter);
    sidebar.addEventListener("mouseleave", handleMouseLeave);

    // Cleanup event listeners
    return () => {
      sidebar.removeEventListener("mouseenter", handleMouseEnter);
      sidebar.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  // Menu items
  const menuItems = [
    { name: "Home", icon: "bi-house" },
    { name: "Projects", icon: "bi-people" },
    { name: "Categories", icon: "bi-list-task" },
    { name: "Stores", icon: "bi-shop" },
    { name: "Reports", icon: "bi-bar-chart" },
    { name: "Settings", icon: "bi-gear" },
  ];

  const footerItems = [
    { name: "Add Task", icon: "bi-plus-circle" },
    { name: "Log Out", icon: "bi bi-box-arrow-left" },
  ];

  // Handle menu click
  const handleMenuClick = (item) => {
    setActiveItem(item);
    setDashboard(item);
    setContent(`Content for ${item}`);
  };

  return (
    <div className="flex sidenavbar">
      {/* SideNav */}
      <div
        id="sidebar"
        className="bg-slate-800 h-screen fixed sidenav-container lg:w-60 w-10 duration-300 text-slate-100 flex flex-col justify-between"
      >
        {/* SideNav Items */}
        <div className="mt-4">
          <ul>
            {menuItems.map((item) => (
              <li
                key={item.name}
                onClick={() => handleMenuClick(item.name)}
                className={`flex items-center py-4 px-2 cursor-pointer ${
                  activeItem === item.name
                    ? "bg-slate-700"
                    : "hover:bg-slate-600"
                }`}
              >
                <i className={`bi ${item.icon} text-lg`}></i>
                <span className="ml-4 text-sm whitespace-nowrap hidden md:inline">
                  {item.name}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Footer Items */}
        <div className="mb-20 ml-1">
          <ul>
            {footerItems.map((item) => (
              <li
                key={item.name}
                onClick={() => handleMenuClick(item.name)}
                className="flex items-center py-4 px-2 hover:bg-slate-600 cursor-pointer"
              >
                <i className={`bi ${item.icon} text-lg`}></i>
                <span className="ml-4 text-sm whitespace-nowrap hidden md:inline">
                  {item.name}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SideNav;
