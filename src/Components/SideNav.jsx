/* eslint-disable no-unused-vars */
import "bootstrap-icons/font/bootstrap-icons.css";
import { useState, useEffect } from "react";
import { useAppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";
const SideNav = () => {
  const { dashboard, setDashboard } = useAppContext();
  const [activeItem, setActiveItem] = useState(dashboard);
  const [content, setContent] = useState("Content for Home");

  const navigate = useNavigate();

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
    { id: 0, name: "Home", icon: "bi-house" },
    { id: 1, name: "Projects", icon: "bi-people" },
    { id: 2, name: "Report", icon: "bi-bar-chart" },
    { id: 3, name: "Setting", icon: "bi-gear" },
    {id:4,name :"FAQ",icon:"bi-question-circle"},
    {id:5, name:"Help",icon:"bi-question-circle"}
  
  ];
  const redirectURLs = [
    "",
    "projects",
    "reports",
    "Setting",
    "faqs",
    "help"
  ];
  const footerItems = [
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
        className="bg-blue-500 h-screen fixed sidenav-container lg:w-32 w-10 duration-300 text-slate-100 flex flex-col justify-between"
      >
        {/* SideNav Items */}
        <div className="mt-4">
          <ul>
            {menuItems.map((item) => (
              <li
                key={item.name}
                onClick={() => {
                  handleMenuClick(item.name);
                  navigate(`/${redirectURLs[item.id]}`);
                }}
                className={`flex items-center py-4 px-2 cursor-pointer ${
                  activeItem === item.name ? "bg-blue-600" : "hover:bg-blue-500"
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
                className="flex items-center py-4 px-2 hover:bg-blue-600 cursor-pointer"
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
