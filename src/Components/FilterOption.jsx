// src/FilterOption.jsx
import React from 'react';

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

export default FilterOption;
