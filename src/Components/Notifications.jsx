import React, { useState } from "react";
import { Navbar, SideNav } from "@/Components/compIndex";
import { tasks } from "@/APIs";

function Notifications() {
  const [showFilters, setShowFilters] = useState(true);

  // Sample updates data
  const updates = tasks;

  return (
    <>
      {/* Navbar */}
      <Navbar />

      {/* Side Navigation */}
      <SideNav />

      {/* Main Content */}
      <div className="relative bg-gray-50 min-h-screen ml-0 md:ml-32">
        {/* Top Section */}
        <div className="p-4 bg-white shadow-md flex justify-between items-center">
          <h3 className="text-xl font-bold">Notifications</h3>
        </div>

        {/* Flex Layout */}
        <div className="flex flex-col md:flex-row mt-4 px-4 space-y-4 md:space-y-0 md:space-x-4">
          {/* Left Section - Recent Updates */}
          <div className="w-full md:flex-1 bg-white rounded-lg shadow-lg p-6">
            <div className="flex flex-col md:flex-row justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-gray-800">
                Recent Updates
              </h3>
            </div>

            {/* Updates List */}
            <div className="space-y-4">
              {updates.map((update, index) => (
                <div
                  key={index}
                  className="flex flex-col md:flex-row items-start justify-between border-b pb-4"
                >

                  {/* Update Details */}
                  <div className="flex-1 md:ml-4 mt-2 md:mt-0">
                    <h4 className="text-lg font-semibold text-gray-800">
                      {update.title}
                    </h4>
                    <p className="text-gray-600 text-sm mt-1">
                      {update.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Notifications;
