import React, { useState } from "react";
import { Navbar, SideNav, Filter } from "@/Components/compIndex";
import { X } from "lucide-react";

function Notifications() {
  const [showFilters, setShowFilters] = useState(true);

  const updates = [
    { id: 1, title: "New intern assigned", description1: "Project deadline approaching", description2: "Intern submitted report", time: "1 day ago" },
    { id: 2, title: "Task completed", description1: "Project evaluation received", description2: "Feedback provided", time: "2 hours ago" },
    { id: 3, title: "Project update", description1: "New feature release", description2: "Bug fixes applied", time: "3 days ago" },
    { id: 4, title: "New message received", description1: "Intern has some queries", description2: "Follow up on task progress", time: "5 minutes ago" },
    { id: 5, title: "Meeting scheduled", description1: "Team discussion on progress", description2: "Meeting link sent", time: "10 minutes ago" },
  ];

  return (
    <>
      {/* Navbar */}
      <Navbar />

      {/* Side Navigation */}
      <SideNav />

      {/* Main Content */}
      <div className="relative bg-gray-50 min-h-screen ml-32">
        {/* Top Section */}
        <div className="p-4 bg-white shadow-md flex justify-between items-center">
          <h3 className="text-xl font-bold">Notifications</h3>
        </div>

        {/* Flex Layout */}
        <div className="flex flex-row mt-4 px-4 space-x-4">
          {/* Left Section - Recent Updates */}
          <div className="flex-1 bg-white rounded-lg shadow-lg p-6 overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold">Recent Updates</h3>
              <select className="p-2 border border-gray-300 rounded">
                <option>This month</option>
                <option>Last month</option>
              </select>
            </div>

            {/* Updates List */}
            <div className="space-y-4">
              {updates.map((update) => (
                <div
                  className="flex items-start justify-between border-b pb-4 relative"
                  key={update.id}
                >
                  <div className="w-12 h-12 bg-gray-400 rounded-full mr-4"></div>
                  <div className="flex-1">
                    <strong className="block text-lg font-semibold">
                      {update.title}
                    </strong>
                    <p className="text-gray-600">{update.description1}</p>
                    <p className="text-gray-600">{update.description2}</p>
                    <div className="flex mt-2">
                      <span className="bg-blue-200 text-blue-700 px-3 py-1 rounded mr-2 cursor-pointer">
                        Approve
                      </span>
                      <span className="bg-green-200 text-green-700 px-3 py-1 rounded cursor-pointer">
                        Feedback
                      </span>
                    </div>
                  </div>
                  <div className="text-gray-500">{update.time}</div>
                  <X className="absolute top-2 right-2 cursor-pointer" color="#ef233c" />
                </div>
              ))}
            </div>
          </div>

          {/* Right Sidebar - Filter Options */}
          {showFilters && (
            <div className="w-1/4">
              <Filter />
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Notifications;
