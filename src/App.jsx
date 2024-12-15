import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { Home } from "./Pages/pageIndex";
import Logup from "./Pages/Logup";
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
    <div className="flex flex-col items-center h-screen">
      <Notification />
      <FilterOption
        filters={filters}
        onToggle={handleFilterToggle}
        onMarkAll={markAllFilters}
        onClearAll={clearAllFilters}
      />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Logup />} />
      </Routes>
    </div>
  );
};

export default App;
