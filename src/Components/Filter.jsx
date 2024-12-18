import React, { useState } from "react";
import {FilterOption} from "./compIndex"; // Import the FilterOption component

const FilterSidebar = () => {
  const [showFilters, setShowFilters] = useState(false); // Toggle visibility
  const [filters, setFilters] = useState({
    tasks: true,
    progress: true,
    feedback: true,
    attendance: true,
    leaveRequests: true,
    adminAlerts: true,
  });

  // Functions to manage filter states
  const handleFilterToggle = (filter) => {
    // Get the current state of filters
    const currentFilters = { ...filters };
  
    // Toggle the specific filter value
    currentFilters[filter] = !currentFilters[filter];
  
    // Update the state with the new filters
    setFilters(currentFilters);
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
    <div className="relative">
      {/* Button to Toggle Filter Visibility */}
      <div
        className="bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded cursor-pointer mb-4"
        role="alert"
        onClick={() => setShowFilters((prev) => !prev)}
      >
        <span className="block sm:inline font-bold">Filter Options</span>
        <span className="ml-2 text-sm">Click to manage filters</span>
      </div>

      {/* Conditional Filter Option Rendering */}
      {showFilters && (
        <div className="absolute top-12 right-0 w-full z-10 bg-white rounded-lg shadow-lg">
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

export default FilterSidebar;
