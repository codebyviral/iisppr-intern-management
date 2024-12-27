import { useEffect, useState } from "react";
import axios from "axios";
import { Navbar } from "@/Components/compIndex";
import { SideNav } from "@/Components/compIndex";

const UserAttendance = () => {
  const [attendanceData, setAttendanceData] = useState([]);
  const [attendancePercentage, setAttendancePercentage] = useState(0);

  useEffect(() => {
    // Fetch userId from localStorage
    const userId = localStorage.getItem("userId");

    if (userId) {
      // Fetch the attendance data
      axios
        .get(`${import.meta.env.VITE_BASE_URL}/attendance/${userId}`)
        .then((response) => {
          const data = response.data;
          setAttendanceData(data);

          // Calculate attendance percentage
          const totalDays = data.length;
          const presentDays = data.filter(
            (record) => record.status === "Present"
          ).length;
          const percentage = ((presentDays / totalDays) * 100).toFixed(2);
          setAttendancePercentage(percentage);
        })
        .catch((error) => {
          console.error("Error fetching attendance data:", error);
        });
    }
  }, []);

  const getDayOfWeek = (date) => {
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const dayIndex = new Date(date).getDay();
    return days[dayIndex];
  };

  // Function to format date to DD/MM/YYYY
  const formatDate = (date) => {
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, "0"); // Pad day with leading zero if needed
    const month = String(d.getMonth() + 1).padStart(2, "0"); // Pad month with leading zero if needed
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
  };

  return (
    <div className="flex bg-gray-100 min-h-screen">
      {/* Sidebar */}
      <SideNav />

      <div className="flex-1">
        {/* Navbar */}
        <Navbar />

        {/* Page Content */}
        <div className="p-6 max-w-6xl mx-auto space-y-8">
          {/* Title Section */}
          <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg shadow-lg p-8">
            <h1 className="text-3xl font-bold mb-2">
              IISPPR Attendance Tracker
            </h1>
            <p className="text-lg">
              Stay on top of your attendance and make sure you're always hitting
              your targets.
              <span className="font-semibold"> Attendance really matters!</span>
            </p>
          </div>

          {/* Attendance Overview */}
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Attendance Overview
            </h2>
            <p className="text-lg text-gray-700 mb-4">
              Your Attendance Percentage:{" "}
              <span
                className={`font-semibold ${
                  attendancePercentage >= 75 ? "text-green-600" : "text-red-600"
                }`}
              >
                {attendancePercentage}%
              </span>
            </p>
            {attendancePercentage >= 75 ? (
              <p className="text-sm text-green-600 font-medium">
                Great job! Keep up the awesome work and maintain your streak. 🎉
              </p>
            ) : (
              <p className="text-sm text-red-600 font-medium">
                You’ve got this! Keep pushing to improve your attendance. 💪
              </p>
            )}
          </div>

          {/* Attendance Table */}
          <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            <table className="table-auto w-full border-collapse border border-gray-200">
              <thead>
                <tr className="bg-gray-200 text-gray-700 uppercase text-sm">
                  <th className="px-4 py-3 border-b">Date</th>
                  <th className="px-4 py-3 border-b">Day</th>
                  <th className="px-4 py-3 border-b">Status</th>
                </tr>
              </thead>
              <tbody>
                {attendanceData.map((record, index) => (
                  <tr
                    key={index}
                    className={`${
                      index % 2 === 0 ? "bg-gray-50" : "bg-white"
                    } hover:bg-gray-100`}
                  >
                    <td className="px-4 py-3 text-center border-b">
                      {formatDate(record.date)}{" "}
                      {/* Updated to DD/MM/YYYY format */}
                    </td>
                    <td className="px-4 py-3 text-center border-b">
                      {getDayOfWeek(record.date)}
                    </td>
                    <td
                      className={`px-4 py-3 text-center border-b font-semibold ${
                        record.status === "Present"
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {record.status}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Attendance Stats */}
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">
              Total Attendance:
              <span className="font-semibold">
                {
                  attendanceData.filter((record) => record.status === "Present")
                    .length
                }{" "}
                /{attendanceData.length} Days
              </span>
            </h3>
            <p className="text-lg text-gray-700 mb-4">
              Keep up the good work and aim for that 100% attendance!
            </p>
          </div>

          {/* Motivational Footer */}
          <div className="bg-blue-100 text-blue-800 rounded-lg p-6">
            <h3 className="text-xl font-semibold">Why Attendance Matters?</h3>
            <p className="text-sm mt-2">
              Consistent attendance {`isn't`} just about showing up – {`it's`}{" "}
              about building habits, gaining knowledge, and setting yourself up
              for success.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserAttendance;
