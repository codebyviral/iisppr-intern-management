import React, { useState } from "react";

const Roles = () => {
  const [roles, setRoles] = useState([
    { name: "Manager", actions: ["Edit", "Remove"] },
    { name: "Admin", actions: ["Edit", "Remove"] },
    { name: "Add Supplier", actions: ["Edit", "Remove"] },
    { name: "Add Employer", actions: ["Edit", "Remove"] },
    { name: "Admin Tasks", actions: ["Edit", "Remove"] },
    { name: "Finance Tasks", actions: ["Edit", "Remove"] },
  ]);

  const [editingIndex, setEditingIndex] = useState(null);
  const [editedName, setEditedName] = useState("");
  const [newRoleName, setNewRoleName] = useState("");
  const [isAddingRole, setIsAddingRole] = useState(false);

  const handleRemove = (index) => {
    setRoles((prevRoles) => prevRoles.filter((_, i) => i !== index));
  };

  const handleEdit = (index) => {
    setEditingIndex(index);
    setEditedName(roles[index].name);
  };

  const handleSaveEdit = (index) => {
    setRoles((prevRoles) =>
      prevRoles.map((role, i) => (i === index ? { ...role, name: editedName } : role))
    );
    setEditingIndex(null);
  };

  const handleAddRole = () => {
    if (newRoleName.trim()) {
      setRoles((prevRoles) => [
        ...prevRoles,
        { name: newRoleName, actions: ["Edit", "Remove"] },
      ]);
      setNewRoleName("");
      setIsAddingRole(false);
    }
  };

  return (
    <div className="bg-gray-200 p-3 sm:p-6 rounded-lg shadow-md w-full max-w-md mx-auto">
      {/* Title */}
      <div className="flex flex-row items-center justify-between mb-4">
        <h2 className="text-lg sm:text-xl font-semibold">Roles</h2>
        <button type="button" aria-label="Add Role" className="text-gray-600 hover:text-gray-800 cursor-pointer" onClick={() => setIsAddingRole(true)} >
          ➕ Add Role
        </button>
      </div>

      {/* Add New Role Input */}
      {isAddingRole && (
        <div className="mb-4">
          <input type="text" value={newRoleName} onChange={(e) => setNewRoleName(e.target.value)} className="border p-2 rounded w-full mb-2" placeholder="Enter new role name"/>
          <div className="flex gap-4">
            <button onClick={handleAddRole} className="bg-blue-500 text-white px-4 py-2 rounded" >
              Add
            </button>
            <button onClick={() => setIsAddingRole(false)} className="bg-red-500 text-white px-4 py-2 rounded" >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Roles List */}
      <ul>
        {roles.map((role, index) => (
          <li key={index} className="flex items-center justify-between mb-2 p-2 rounded-md hover:bg-gray-100" >
            {/* Role Name */}
            <div className="flex items-center gap-2">
              <input type="checkbox" 
                defaultChecked
                id={`role-${index}`}
                className="w-4 h-4"
              />
              {editingIndex === index ? (
                <input type="text"
                  value={editedName}
                  onChange={(e) => setEditedName(e.target.value)}
                  onBlur={() => handleSaveEdit(index)}
                  onKeyDown={(e) => e.key === "Enter" && handleSaveEdit(index)}
                  className="border rounded px-2 py-1 w-40 sm:w-52"
                  autoFocus
                />
              ) : (
                <label htmlFor={`role-${index}`} className="font-medium text-sm sm:text-base">
                  {role.name}
                </label>
              )}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-4 text-gray-600">
              <button type="button" className="flex items-center gap-1 hover:text-gray-800" onClick={() => handleEdit(index)} >
                📝 Edit
              </button>
              <button type="button" className="flex items-center gap-1 hover:text-gray-800" onClick={() => handleRemove(index)}>
                🗑️ Remove
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Roles;

