import React, { useState, useEffect } from "react";
import "./Sidebar.css";

function Sidebar() {
  const [activeItem, setActiveItem] = useState("Home");
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false); // Track Settings submenu state

  const menuItems = [
    { name: "Home", icon: "🏠" },
    { name: "Interns", icon: "👥" },
    { name: "Tasks", icon: "📋" },
    { name: "Schedule", icon: "📅" },
    { name: "Reports", icon: "📊" },
    { name: "Settings", icon: "⚙️" },
    { name: "Notification", icon: "🔔" },
  ];

  const settingsOptions = [
    "Support Options",
    "Contact",
    "Issues",
    "Help",
    "Delete Account",
    "Complaint",
  ];

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("dark-mode", isDarkMode);
  }, [isDarkMode]);

  const formatTime = (date) =>
    date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  const handleMenuClick = (item) => {
    setActiveItem(item.name);
    if (item.name === "Settings") {
      setIsSettingsOpen(!isSettingsOpen);
    } else {
      setIsSettingsOpen(false); // Close Settings submenu if another menu is clicked
    }
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className={`app-container ${isSidebarOpen ? "sidebar-open" : "sidebar-closed"}`}>
      {/* Hamburger Menu */}
      <button className="hamburger-menu" onClick={toggleSidebar}>
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
      </button>

      {/* Sidebar */}
      <div className={`sidebar ${isSidebarOpen ? "" : "hidden"}`}>
        <div className="sidebar-header">
          <div className="time-display">{formatTime(currentTime)}</div>
        </div>
        <nav className="sidebar-nav">
          <ul>
            {menuItems.map((item) => (
              <li key={item.name}>
                <button
                  className={`menu-item ${activeItem === item.name ? "active" : ""}`}
                  onClick={() => handleMenuClick(item)}
                >
                  <span className="icon">{item.icon}</span>
                  <span className="menu-text">{item.name}</span>
                </button>
                {item.name === "Settings" && isSettingsOpen && (
                  <ul className="sub-menu">
                    {settingsOptions.map((option) => (
                      <li key={option}>
                        <button className="sub-item">{option}</button>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </nav>
        <div className="sidebar-footer">
          <button
            className="theme-toggle"
            onClick={() => setIsDarkMode(!isDarkMode)}
          >
            {isDarkMode ? "☀️" : "🌙"}
          </button>
          <div className="user-section">
            <div className="user-info">
              <div className="user-avatar">
                <img src="https://i.pravatar.cc/100" alt="User Avatar" />
              </div>
              <div className="user-details">
                <p className="user-name">John Doe</p>
                <p className="user-role">Admin</p>
              </div>
            </div>
          </div>
          <button className="logout-button">
            <span className="icon">🚪</span>
            <span className="btn-text">Logout</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
