import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, ArrowUpDown } from "lucide-react";
import CustomNavbar from "./CustomNavbar";

const AllAttendance = () => {
  const [users, setUsers] = useState([]);
  const [attendanceData, setAttendanceData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortConfig, setSortConfig] = useState({
    key: "name",
    direction: "asc",
  });
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const usersResponse = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/allusers`
        );
        const usersData = usersResponse.data.data;
        setUsers(usersData);

        // Fetch attendance data for each user
        const attendancePromises = usersData.map(async (user) => {
          try {
            const response = await axios.get(
              `${import.meta.env.VITE_BASE_URL}/attendance/${user._id}`
            );
            return {
              userId: user._id,
              attendance: response.data.data || [], // Access the data property
            };
          } catch (error) {
            console.error(
              `Error fetching attendance for user ${user._id}:`,
              error
            );
            return {
              userId: user._id,
              attendance: [],
            };
          }
        });

        const allAttendance = await Promise.all(attendancePromises);
        const attendanceMap = {};
        allAttendance.forEach(({ userId, attendance }) => {
          attendanceMap[userId] = attendance;
        });

        setAttendanceData(attendanceMap);
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch data:", err);
        setError("Failed to fetch data. Please try again later.");
        setLoading(false);
      }
    };

    fetchAllData();
  }, []);

  const calculateAttendancePercentage = (userId) => {
    const user = users.find((u) => u._id === userId);
    if (!user || !user.startDate) return 0;

    const userStartDate = new Date(user.startDate);
    const today = new Date();

    // Calculate working days (excluding weekends)
    let totalWorkingDays = 0;
    let currentDate = new Date(userStartDate);

    while (currentDate <= today) {
      // Check if it's not a weekend (0 = Sunday, 6 = Saturday)
      if (currentDate.getDay() !== 0 && currentDate.getDay() !== 6) {
        totalWorkingDays++;
      }
      currentDate.setDate(currentDate.getDate() + 1);
    }

    const userAttendance = attendanceData[userId] || [];
    const presentDays = userAttendance.filter(
      (record) => record.status?.toLowerCase() === "present"
    ).length;

    return totalWorkingDays === 0
      ? 0
      : ((presentDays / totalWorkingDays) * 100).toFixed(1);
  };

  const sortData = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const getSortedData = () => {
    const filteredUsers = users.filter((user) => {
      const searchLower = searchTerm.toLowerCase();
      return (
        user.name?.toLowerCase().includes(searchLower) ||
        user.department?.toLowerCase().includes(searchLower) ||
        user.role?.toLowerCase().includes(searchLower)
      );
    });

    return [...filteredUsers].sort((a, b) => {
      if (sortConfig.key === "attendance") {
        const aValue = parseFloat(calculateAttendancePercentage(a._id));
        const bValue = parseFloat(calculateAttendancePercentage(b._id));
        return sortConfig.direction === "asc"
          ? aValue - bValue
          : bValue - aValue;
      }

      const aValue = a[sortConfig.key] || "";
      const bValue = b[sortConfig.key] || "";

      return sortConfig.direction === "asc"
        ? aValue.toString().localeCompare(bValue.toString())
        : bValue.toString().localeCompare(aValue.toString());
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 text-center p-4">
        <p>{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <>
      <CustomNavbar />
      <div className="p-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>IISPPR Attendance Record</CardTitle>
            <input
              type="text"
              placeholder="Search users..."
              className="px-4 py-2 border rounded-md"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th
                      className="p-2 text-left cursor-pointer hover:bg-gray-50"
                      onClick={() => sortData("name")}
                    >
                      <div className="flex items-center">
                        Name
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                      </div>
                    </th>
                    <th
                      className="p-2 text-left cursor-pointer hover:bg-gray-50"
                      onClick={() => sortData("department")}
                    >
                      <div className="flex items-center">
                        Department
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                      </div>
                    </th>
                    <th
                      className="p-2 text-left cursor-pointer hover:bg-gray-50"
                      onClick={() => sortData("role")}
                    >
                      <div className="flex items-center">
                        Role
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                      </div>
                    </th>
                    <th
                      className="p-2 text-left cursor-pointer hover:bg-gray-50"
                      onClick={() => sortData("attendance")}
                    >
                      <div className="flex items-center">
                        Attendance
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                      </div>
                    </th>
                    <th className="p-2 text-left">Present Days</th>
                  </tr>
                </thead>
                <tbody>
                  {getSortedData().map((user) => {
                    const attendancePercentage = calculateAttendancePercentage(
                      user._id
                    );
                    const presentDays = (attendanceData[user._id] || []).filter(
                      (record) => record.status?.toLowerCase() === "present"
                    ).length;

                    return (
                      <tr key={user._id} className="border-b hover:bg-gray-50">
                        <td className="p-2">{user.name || "N/A"}</td>
                        <td className="p-2">
                          {user.department || "Not Assigned"}
                        </td>
                        <td className="p-2">{user.role || "N/A"}</td>
                        <td className="p-2">
                          <div className="flex items-center space-x-2">
                            <div className="w-24 bg-gray-200 rounded-full h-2">
                              <div
                                className={`h-2 rounded-full ${
                                  parseFloat(attendancePercentage) >= 75
                                    ? "bg-green-600"
                                    : "bg-red-600"
                                }`}
                                style={{
                                  width: `${attendancePercentage}%`,
                                }}
                              />
                            </div>
                            <span
                              className={
                                parseFloat(attendancePercentage) >= 75
                                  ? "text-green-600"
                                  : "text-red-600"
                              }
                            >
                              {attendancePercentage}%
                            </span>
                          </div>
                        </td>
                        <td className="p-2">{presentDays}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default AllAttendance;
