import React, { useState } from "react";
import FilterOption from "./FilterOption"; // Ensure correct path

const Notification = () => {
  const [showFilters, setShowFilters] = useState(false); // Manage visibility
  const [filters, setFilters] = useState({
    tasks: true,
    progress: true,
    feedback: true,
    attendance: true,
    leaveRequests: true,
    adminAlerts: true,
  });

  // Functions to manage filters
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
    <div className="relative p-4">
      {/* Notification Section */}
      <div
        className="bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded cursor-pointer"
        role="alert"
        onClick={() => setShowFilters((prev) => !prev)} // Toggle visibility
      >
        <span className="block sm:inline font-bold">Notifications</span>
        <span className="ml-2 text-sm">Click to manage filters</span>
      </div>

      {/* Conditional FilterOption Rendering */}
      {showFilters && (
        <div className="absolute top-12 left-0 w-full z-10">
          <FilterOption
            filters={filters}
            onToggle={handleFilterToggle}
            onMarkAll={markAllFilters}
            onClearAll={clearAllFilters}
          />
        </div>
      )}
    </div>
  );
};

export default Notification;
