import React, { useState, useEffect } from "react";
import axios from "axios";
import CustomNavbar from "./CustomNavbar";

const AdminLeavePage = () => {
  const [leaves, setLeaves] = useState([]);
  const [selectedLeave, setSelectedLeave] = useState(null);
  const [status, setStatus] = useState("");
  const [adminName, setAdminName] = useState("");
  const [message,setMessage] = useState({text:"",type:""})

  // Fetch Leaves from API
  useEffect(() => {
    const fetchLeaves = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/leave`);
        setLeaves(response.data.leaves);
      } catch (error) {
        console.log("Error fetching leaves:", error);
      }
    };
    fetchLeaves();
  }, []);

  const handleUpdateStatus = async () => {
    if (!selectedLeave || !status || !adminName) {
      alert("Please fill out all fields before submitting.");
      setMessage({text:"please fill out all the fields before submitting.",type:"error"})
      return;
    }

    try {
      await axios.put(
        `${import.meta.env.VITE_BASE_URL}/leave/${selectedLeave._id}`,
        { status, updatedBy: adminName }
      );
      setMessage({text:"Status updated successfully",type:"success"})
      setSelectedLeave(null);
      setStatus("");
      setAdminName("");
    } catch (error) {
      console.log("Error updating status:", error);
      setMessage({text:"Failed to update status. Please try again",type:'error'})
    }
  };

  
  return (
    <>
    <CustomNavbar/>
    
    <div className="p-6 bg-white min-h-screen">
      <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">Intern Leave Applications</h1>
      <div className="overflow-x-auto lg:block">
        {/* Large Screen Table */}
        <table className="hidden sm:table w-full border-collapse border border-gray-300 bg-white shadow-md">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 px-4 py-2 text-left">Name</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Leave Type</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Start Date</th>
              <th className="border border-gray-300 px-4 py-2 text-left">End Date</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Reason</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Status</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Updated By</th>
              <th className="border border-gray-300 px-4 py-2 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {leaves.map((leave) => (
              <tr key={leave._id} className="hover:bg-gray-100">
                <td className="border border-gray-300 px-4 py-2">{leave.internid.name}</td>
                <td className="border border-gray-300 px-4 py-2">{leave.leaveType}</td>
                <td className="border border-gray-300 px-4 py-2">{new Date(leave.startDate).toLocaleDateString()}</td>
                <td className="border border-gray-300 px-4 py-2">{new Date(leave.endDate).toLocaleDateString()}</td>
                <td className="border border-gray-300 px-4 py-2">{leave.reason}</td>
                <td className="border border-gray-300 px-4 py-2">{leave.status}</td>
                <td className="border border-gray-300 px-4 py-2">{leave.updatedBy || "Not Updated"}</td>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  <button
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    onClick={() => setSelectedLeave(leave)}
                  >
                    Update Status
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

      

        {/* Mobile View Cards */}
        <div className="sm:hidden">
          {leaves.map((leave) => (
            <div
              key={leave._id}
              className="mb-4 p-4 bg-white rounded shadow-md border border-gray-300"
            >
              <p><strong>Name:</strong> {leave.internid.name}</p>
              <p><strong>Leave Type:</strong> {leave.leaveType}</p>
              <p><strong>Start Date:</strong> {new Date(leave.startDate).toLocaleDateString()}</p>
              <p><strong>End Date:</strong> {new Date(leave.endDate).toLocaleDateString()}</p>
              <p><strong>Reason:</strong> {leave.reason}</p>
              <p><strong>Status:</strong> {leave.status}</p>
              <p><strong>Updated By:</strong> {leave.updatedBy || "Not Updated"}</p>
              <button
                className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                onClick={() => setSelectedLeave(leave)}
              >
                Update Status
              </button>
            </div>
          ))}
        </div>
      </div>

      {selectedLeave && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">Update Leave Status</h2>
            <p className="mb-4">
              <strong>Name:</strong> {selectedLeave.internid.name}
            </p>
            <div className="mb-4">
              <label className="block mb-2">Status:</label>
              <select
                className="w-full border border-gray-300 rounded px-3 py-2"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="">Select Status</option>
                <option value="Approved">Accepted</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block mb-2">Your Name:</label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded px-3 py-2"
                value={adminName}
                onChange={(e) => setAdminName(e.target.value)}
                placeholder="Enter your name"
              />
            </div>
            <button
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
              onClick={handleUpdateStatus}
            >
              Update Status
            </button>
            <button
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded ml-2 hover:bg-gray-400"
              onClick={() => {
                setSelectedLeave(null);
                setAdminName("");
                setStatus("");
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
    </>
  );
};

export default AdminLeavePage;
