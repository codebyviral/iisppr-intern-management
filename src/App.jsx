// src/App.jsx
import React, { useState } from "react";
import "./App.css";
import FilterOption from "./components/FilterOption";
import Notification from "./components/Notification";

const App = () => {
  const [filters, setFilters] = useState({
    tasks: true,
    progress: true,
    feedback: true,
    attendance: true,
    leaveRequests: true,
    adminAlerts: true,
  });

  const handleFilterToggle = (filter) => {
    setFilters((prev) => ({
      ...prev,
      [filter]: !prev[filter],
    }));
  };

  const markAllFilters = () => {
    setFilters({
      tasks: true,
      progress: true,
      feedback: true,
      attendance: true,
      leaveRequests: true,
      adminAlerts: true,
    });
  };

  const clearAllFilters = () => {
    setFilters({
      tasks: false,
      progress: false,
      feedback: false,
      attendance: false,
      leaveRequests: false,
      adminAlerts: false,
    });
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <Notification />
      <FilterOption
        filters={filters}
        onToggle={handleFilterToggle}
        onMarkAll={markAllFilters}
        onClearAll={clearAllFilters}
      />
    </div>
  );
};

export default App;
