import React from "react";

const AdminTopNav = () => {
  return (
    <div className="bg-white shadow-md w-full px-6 py-4 flex items-center justify-between">
      <div className="flex space-x-6">
        <a href="#" className="text-gray-700 hover:text-blue-500 font-medium">
          Dashboard
        </a>
        <a href="#" className="text-gray-700 hover:text-blue-500 font-medium">
          Admin Panel
        </a>
        <a href="#" className="text-gray-700 hover:text-blue-500 font-medium">
          Task Management
        </a>
      </div>
      <div className="flex items-center space-x-4">
        <span className="text-gray-700">Profile</span>
        <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md">
          Logout
        </button>
      </div>
    </div>
  );
};

export default AdminTopNav;
