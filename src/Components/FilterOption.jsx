// src/components/FilterOption.jsx
import React from "react";

const FilterOption = ({ filters, onToggle, onMarkAll, onClearAll }) => {
  return (
    <div className="bg-gray-200 border border-gray-300 rounded-lg shadow-md p-6 w-full max-w-md">
      <h3 className="text-2xl font-bold mb-4">Filter Options</h3>
      <div>
        {Object.keys(filters).map((filter) => (
          <div
            key={filter}
            className="flex justify-between items-center mb-3"
          >
            <label className="font-medium capitalize">{filter}</label>
            <input
              type="checkbox"
              className="h-5 w-5 text-purple-600"
              checked={filters[filter]}
              onChange={() => onToggle(filter)}
            />
          </div>
        ))}
      </div>
      <div className="flex justify-end mt-4 space-x-2">
        <button
          onClick={onMarkAll}
          className="bg-purple-600 text-white font-medium py-2 px-4 rounded hover:bg-purple-700"
        >
          Mark all
        </button>
        <button
          onClick={onClearAll}
          className="bg-gray-400 text-white font-medium py-2 px-4 rounded hover:bg-gray-500"
        >
          Clear all
        </button>
      </div>
    </div>
  );
};

export default FilterOption;
