import React, { useState } from "react";
import "./App.css";

const FilterOption = ({ filters, onToggle, onMarkAll, onClearAll }) => {
  return (
    <div className="filter-option-container">
      <h3>Filter Options</h3>
      <div>
        {Object.keys(filters).map((filter) => (
          <div key={filter} className="filter-option">
            <label>{filter.charAt(0).toUpperCase() + filter.slice(1)}</label>
            <input
              type="checkbox"
              checked={filters[filter]}
              onChange={() => onToggle(filter)}
            />
          </div>
        ))}
      </div>
      <div className="actions">
        <button onClick={onMarkAll}>Mark all</button>
        <button onClick={onClearAll}>Clear all</button>
      </div>
    </div>
  );
};

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
    <div className="flex justify-center items-center h-screen">
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
