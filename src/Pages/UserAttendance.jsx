import { Navbar } from "@/Components/compIndex";
import { SideNav } from "@/Components/compIndex";

const UserAttendance = () => {
  // Static attendance data
  const attendance = [
    { date: "2024-12-24", status: "Present" },
    { date: "2024-12-23", status: "Absent" },
    { date: "2024-12-22", status: "Present" },
    { date: "2024-12-21", status: "Present" },
  ];

  // Calculate the attendance percentage
  const totalDays = attendance.length;
  const presentDays = attendance.filter(
    (record) => record.status === "Present"
  ).length;
  const attendancePercentage = ((presentDays / totalDays) * 100).toFixed(2);

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
              Keep track of your progress and ensure {`you're`} always on top of
              your goals.
              <span className="font-semibold"> Attendance matters!</span>
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
                Great job! Keep it up and maintain this excellent streak. 🎉
              </p>
            ) : (
              <p className="text-sm text-red-600 font-medium">
                Don’t worry! You can still catch up and improve your attendance.
                💪
              </p>
            )}
          </div>

          {/* Attendance Table */}
          <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            <table className="table-auto w-full border-collapse border border-gray-200">
              <thead>
                <tr className="bg-gray-200 text-gray-700 uppercase text-sm">
                  <th className="px-4 py-3 border-b">Date</th>
                  <th className="px-4 py-3 border-b">Status</th>
                </tr>
              </thead>
              <tbody>
                {attendance.map((record, index) => (
                  <tr
                    key={index}
                    className={`${
                      index % 2 === 0 ? "bg-gray-50" : "bg-white"
                    } hover:bg-gray-100`}
                  >
                    <td className="px-4 py-3 text-center border-b">
                      {record.date}
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

          {/* Motivational Footer */}
          <div className="bg-blue-100 text-blue-800 rounded-lg p-6">
            <h3 className="text-xl font-semibold">Why Attendance Matters?</h3>
            <p className="text-sm mt-2">
              Being consistent in attendance not only boosts your knowledge but
              also builds discipline. Stay committed and achieve greatness in
              every step of your journey.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserAttendance;
