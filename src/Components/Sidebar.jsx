import React, { useState, useEffect } from 'react';
import { Home, Users, Clipboard, Calendar, Settings, ChevronDown, Bell, LogOut, User, Search, Moon, Sun, Briefcase, BarChart, Star, Plus } from 'lucide-react';
import './Sidebar.css';

export default function Sidebar() {
  const [isTasksOpen, setIsTasksOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  const recentActivity = [
    { id: 1, text: "John completed Project Alpha", time: "2 hours ago" },
    { id: 2, text: "Sarah updated Q3 Projections", time: "4 hours ago" },
    { id: 3, text: "New partnership with TechCorp", time: "1 day ago" },
  ];

  const quickStats = [
    { label: "Projects", value: 12, icon: Briefcase },
    { label: "Revenue", value: "$2.4M", icon: BarChart },
    { label: "Team", value: 24, icon: Users },
  ];

  return (
    <div className={`sidebar ${isDarkMode ? 'dark' : 'light'}`}>
      <div className="sidebar-header">
        <div className="logo">
          <span>U</span>
        </div>
        <h1>UltraDash</h1>
      </div>

      <div className="search-bar">
        <Search size={18} />
        <input 
          type="text" 
          placeholder="Search..." 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="quick-stats">
        {quickStats.map((stat, index) => (
          <div key={index} className="stat-item">
            <stat.icon size={24} />
            <div>
              <h3>{stat.value}</h3>
              <p>{stat.label}</p>
            </div>
          </div>
        ))}
      </div>

      <nav className="sidebar-nav">
        <ul>
          <li>
            <a href="/" className="nav-item">
              <Home size={20} />
              <span>Dashboard</span>
            </a>
          </li>
          <li>
            <a href="/team" className="nav-item">
              <Users size={20} />
              <span>Team</span>
            </a>
          </li>
          <li>
            <button 
              onClick={() => setIsTasksOpen(!isTasksOpen)}
              className="nav-item tasks-button"
            >
              <div>
                <Clipboard size={20} />
                <span>Projects</span>
              </div>
              <ChevronDown 
                size={16} 
                className={`chevron ${isTasksOpen ? 'rotate' : ''}`}
              />
            </button>
            {isTasksOpen && (
              <ul className="subtasks">
                <li>
                  <a href="/projects/active" className="nav-item">
                    <Star size={16} />
                    <span>Active Projects</span>
                  </a>
                </li>
                <li>
                  <a href="/projects/completed" className="nav-item">
                    <Clipboard size={16} />
                    <span>Completed Projects</span>
                  </a>
                </li>
                <li>
                  <a href="/projects/new" className="nav-item">
                    <Plus size={16} />
                    <span>New Project</span>
                  </a>
                </li>
              </ul>
            )}
          </li>
          <li>
            <a href="/schedule" className="nav-item">
              <Calendar size={20} />
              <span>Schedule</span>
            </a>
          </li>
          <li>
            <a href="/settings" className="nav-item">
              <Settings size={20} />
              <span>Settings</span>
            </a>
          </li>
        </ul>
      </nav>

      <div className="recent-activity">
        <h2>Recent Activity</h2>
        <ul>
          {recentActivity.map((activity) => (
            <li key={activity.id} className="activity-item">
              <p>{activity.text}</p>
              <span>{activity.time}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="sidebar-footer">
        <div className="notifications nav-item">
          <Bell size={20} />
          <span>Notifications</span>
          <span className="notification-badge">3</span>
        </div>
        <div className="divider"></div>
        <div className="user-profile">
          <div className="user-avatar">
            <img src="/placeholder.svg?height=60&width=60" alt="User Avatar" />
          </div>
          <div className="user-info">
            <p className="user-name">Alexis Laurent</p>
            <p className="user-role">Chief Executive Officer</p>
          </div>
        </div>
        <button className="logout-button nav-item">
          <LogOut size={20} />
          <span>Logout</span>
        </button>
        <div className="footer-actions">
          <button className="theme-toggle" onClick={toggleDarkMode}>
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <div className="current-time">{currentTime.toLocaleTimeString()}</div>
        </div>
      </div>
    </div>
  );
}
