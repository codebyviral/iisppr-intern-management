import React from "react";

const AdminSideNav = () => {
  return (
    <div className="w-full md:w-64 bg-white min-h-screen shadow-md">
      <div className="p-6 text-2xl font-bold text-blue-600">
        InternHub Admin
      </div>
      <ul className="mt-4">
        {/* Sidebar Links */}
        {[
          { name: "User Roles", icon: "👤" },
          { name: "CRM Data", icon: "📊" },
          { name: "Reports", icon: "📈" },
          { name: "Attendance", icon: "📅" },
          { name: "Leave Requests", icon: "📩" },
        ].map((item, index) => (
          <li key={index} className="mb-2">
            <a
              href="#"
              className="flex items-center space-x-3 text-gray-700 hover:bg-blue-100 rounded-lg p-2"
            >
              <span className="text-lg">{item.icon}</span>
              <span>{item.name}</span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminSideNav;
