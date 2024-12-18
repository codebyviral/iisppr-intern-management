import React, { useState } from "react";
import { FilterOption } from "./compIndex";
import {
  ChevronDownIcon,
  FilterIcon,
  CheckCircleIcon,
  XCircleIcon,
} from "lucide-react";

const FilterSidebar = () => {
  const [showFilters, setShowFilters] = useState(true);
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
    const currentFilters = { ...filters };
    currentFilters[filter] = !currentFilters[filter];
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

  // Calculate active filter count
  const activeFilterCount = Object.values(filters).filter(Boolean).length;

  return (
    <div className="relative w-full">
      {/* Filter Header with Toggle and Quick Actions */}
      <div className="bg-white rounded-lg shadow-md p-4">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center space-x-2">
            <FilterIcon className="w-6 h-6 text-blue-600" />
            <h3 className="text-xl font-semibold text-gray-800">Filters</h3>
            <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
              {activeFilterCount} Active
            </span>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex space-x-2">
            <button
              onClick={markAllFilters}
              className="text-green-600 hover:bg-green-50 p-2 rounded-full transition"
              title="Mark All Filters"
            >
              <CheckCircleIcon className="w-5 h-5" />
            </button>
            <button
              onClick={clearAllFilters}
              className="text-red-600 hover:bg-red-50 p-2 rounded-full transition"
              title="Clear All Filters"
            >
              <XCircleIcon className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Filter Options Container */}
        <div className="max-h-[400px] overflow-y-auto">
          <FilterOption
            filters={filters}
            onToggle={handleFilterToggle}
            onMarkAll={markAllFilters}
            onClearAll={clearAllFilters}
          />
        </div>
      </div>
    </div>
  );
};

export default FilterSidebar;
