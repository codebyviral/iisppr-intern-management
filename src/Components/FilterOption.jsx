import React from "react";

const FilterOption = ({ filters, onToggle, onMarkAll, onClearAll }) => {
  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      {/* Title */}
      <h3 className="text-lg font-semibold mb-4 text-gray-800">
        Filter Options
      </h3>
      {/* Filters List */}
      <div className="space-y-3">
        {Object.keys(filters).map((filter) => (
          <div key={filter} className="flex justify-between items-center">
            <span className="text-gray-700 capitalize">{filter}</span>
            <input
              type="checkbox"
              className="h-4 w-4 text-blue-600 rounded focus:ring-blue-500"
              checked={filters[filter]}
              onChange={() => onToggle(filter)}
            />
          </div>
        ))}
      </div>
      {/* Buttons */}
      <div className="flex justify-end space-x-3 mt-6">
        <button
          onClick={onMarkAll}
          className="bg-blue-600 text-white text-sm font-medium py-2 px-4 rounded hover:bg-blue-700"
        >
          Mark all
        </button>
        <button
          onClick={onClearAll}
          className="bg-gray-300 text-gray-700 text-sm font-medium py-2 px-4 rounded hover:bg-gray-400"
        >
          Clear all
        </button>
      </div>
    </div>
  );
};

export default FilterOption;
