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

      {/* Main Content - Added responsive classes carefully */}
      <div className="relative bg-gray-50 min-h-screen ml-0 md:ml-32">
        {/* Top Section */}
        <div className="p-4 bg-white shadow-md flex justify-between items-center">
          <h3 className="text-xl font-bold">Notifications</h3>
        </div>

        {/* Flex Layout - Responsive with minimal changes */}
        <div className="flex flex-col md:flex-row mt-4 px-4 space-y-4 md:space-y-0 md:space-x-4">
          {/* Left Section - Recent Updates */}
          <div className="w-full md:flex-1 bg-white rounded-lg shadow-lg p-6 overflow-y-auto">
            <div className="flex flex-col md:flex-row justify-between items-center mb-6">
              <h3 className="text-2xl font-bold mb-2 md:mb-0">
                Recent Updates
              </h3>
             
            </div>

            {/* Updates List */}
            <div className="space-y-4">
              {updates.map((update, index) => (
                <div
                  className="flex flex-col md:flex-row items-start justify-between border-b pb-4 relative"
                  key={index}
                >
                  {/* Avatar - Adjusted for mobile */}
                  <img
                    src={update.avatar}
                    alt={`${update.owner}'s avatar`}
                    className="w-12 h-12 rounded-full md:mr-4 self-center md:self-start mb-2 md:mb-0"
                  />
                  {/* Update Details */}
                  <div className="flex-1 text-center md:text-left w-full">
                    <strong className="block text-lg font-semibold">
                      {update.title}
                    </strong>
                    {/* <p className="text-gray-600">{update.dueDate}</p>  */}
                    
                  </div>
                  {/* Time/Owner - Hidden on mobile */}
                  <div className="hidden md:block text-gray-500">
                    {update.owner}
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
// Fixed