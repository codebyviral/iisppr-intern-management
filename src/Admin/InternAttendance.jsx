import React, { useEffect, useState } from "react";
import CustomNavbar from "./CustomNavbar";

const InternAttendance = () => {
  const [attendanceData, setAttendanceData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch attendance data from the API
  useEffect(() => {
    const fetchAttendanceData = async () => {
      try {
        const response = await fetch("https://iisppr-backend.vercel.app/attendance");
        
        if (!response.ok) {
          throw new Error("Failed to fetch attendance data");
        }
        
        const data = await response.json();
        setAttendanceData(data); // Store the data in the state
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAttendanceData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <CustomNavbar />
      <div className="container mx-auto my-6 p-6">
        <h2 className="text-3xl font-semibold text-center mb-6">Attendance Records</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border-collapse border border-gray-300">
            <thead>
              <tr>
                <th className="border-b p-3 text-left">User ID</th>
                <th className="border-b p-3 text-left">Date</th>
                <th className="border-b p-3 text-left">Status</th>
                <th className="border-b p-3 text-left">Check-in Time</th>
              </tr>
            </thead>
            <tbody>
              {attendanceData.length > 0 ? (
                attendanceData.map((attendance) => (
                  <tr key={attendance._id}>
                    <td className="border-b p-3">{attendance.userId}</td>
                    <td className="border-b p-3">
                      {new Date(attendance.date).toLocaleDateString()}
                    </td>
                    <td className="border-b p-3">{attendance.status}</td>
                    <td className="border-b p-3">
                      {new Date(attendance.CheckInTime).toLocaleTimeString()}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="p-3 text-center">
                    No attendance records available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default InternAttendance;
