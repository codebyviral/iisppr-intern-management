import React, { useState } from "react";
import {AdminSideNav, AdminTopNav} from "@/Components/compIndex";


const Main_DashB = () => {
  const [interns, setInterns] = useState(["John Smith", "Jane Doe"]);
  const [newIntern, setNewIntern] = useState("");
  const [roles, setRoles] = useState(["Admin", "Editor"]);
  const [newRole, setNewRole] = useState("");
  const [showInternInput, setShowInternInput] = useState(false);
  const [showRoleInput, setShowRoleInput] = useState(false);

  const addNewIntern = () => {
    if (newIntern.trim() !== "") {
      setInterns([...interns, newIntern]);
      setNewIntern("");
      setShowInternInput(false);
    }
  };

  const addNewRole = () => {
    if (newRole.trim() !== "") {
      setRoles([...roles, newRole]);
      setNewRole("");
      setShowRoleInput(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row">
      {/* Sidebar */}
      <AdminSideNav />

      {/* Main Content */}
      <div className="flex-1 bg-gray-200 min-h-screen">
        <AdminTopNav />
        <div className="p-6">
          {/* Manage User Roles Section */}
          <div className="bg-white shadow-md rounded-lg p-4 mb-6">
            <h2 className="text-lg font-semibold mb-4">Manage User Roles</h2>
            <div className="flex flex-col md:flex-row items-start">
              <input
                type="text"
                placeholder="Search user roles"
                className="flex-1 p-2 border rounded-md md:mr-4 mb-2 md:mb-0"
              />
              <button
                onClick={() => setShowRoleInput(true)}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
              >
                Add New Role
              </button>
            </div>
            {showRoleInput && (
              <div className="flex gap-2 mt-2">
                <input
                  type="text"
                  placeholder="Enter role name"
                  value={newRole}
                  onChange={(e) => setNewRole(e.target.value)}
                  className="flex-1 p-2 border rounded-md"
                />
                <button
                  onClick={addNewRole}
                  className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md"
                >
                  Add
                </button>
              </div>
            )}
            <div className="mt-4 space-y-2">
              {roles.map((role, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center border-b py-2"
                >
                  <span>{role}</span>
                  <a href="#" className="text-blue-500 hover:underline">
                    Edit
                  </a>
                </div>
              ))}
            </div>
          </div>

          {/* Other Cards */}
          {[
            {
              title: "Access CRM Data",
              description:
                "View and manage CRM data, ensuring efficient tracking of customer interactions and information.",
            },
            {
              title: "Generate Reports",
              description:
                "Easily generate detailed reports on various metrics and performance indicators.",
            },
            {
              title: "View Attendance Records",
              description:
                "Monitor and manage attendance records with intuitive tools for tracking and reporting.",
            },
            {
              title: "Manage Leave Requests",
              description:
                "Efficiently handle leave requests, ensuring proper management of staff absences and availability.",
            },
          ].map((section, index) => (
            <div
              key={index}
              className="bg-white shadow-md rounded-lg p-4 mb-6 hover:shadow-lg"
            >
              <h3 className="text-md font-semibold mb-2">{section.title}</h3>
              <p className="text-gray-600 text-sm">{section.description}</p>
            </div>
          ))}

          {/* Intern Management */}
          <div className="bg-white shadow-md rounded-lg p-4">
            <h2 className="text-lg font-semibold mb-4">Intern Management</h2>
            <button
              onClick={() => setShowInternInput(true)}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md mb-4"
            >
              Add New Intern
            </button>
            {showInternInput && (
              <div className="flex gap-2 mb-4">
                <input
                  type="text"
                  placeholder="Enter Intern Name"
                  value={newIntern}
                  onChange={(e) => setNewIntern(e.target.value)}
                  className="flex-1 p-2 border rounded-md"
                />
                <button
                  onClick={addNewIntern}
                  className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md"
                >
                  Add
                </button>
              </div>
            )}
            <div className="space-y-2">
              {interns.map((intern, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center border-b py-2"
                >
                  <span>{intern}</span>
                  <a href="#" className="text-blue-500 hover:underline">
                    Update Info
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main_DashB;
