import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
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

        const attendancePromises = usersData.map((user) =>
          axios
            .get(`${import.meta.env.VITE_BASE_URL}/attendance/${user._id}`)
            .then((response) => ({
              userId: user._id,
              attendance: response.data,
            }))
            .catch(() => ({
              userId: user._id,
              attendance: [],
            }))
        );

        const allAttendance = await Promise.all(attendancePromises);
        const attendanceMap = {};
        allAttendance.forEach(({ userId, attendance }) => {
          attendanceMap[userId] = attendance;
        });

        setAttendanceData(attendanceMap);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch data");
        setLoading(false);
      }
    };

    fetchAllData();
  }, []);

  const calculateAttendancePercentage = (userId) => {
    const userStartDate = new Date(
      users.find((user) => user._id === userId)?.startDate
    );
    const today = new Date();
    const totalDays = Math.max(
      1,
      Math.floor((today - userStartDate) / (1000 * 60 * 60 * 24)) + 1
    );
    const presentDays =
      attendanceData[userId]?.filter(
        (record) => record.status.toLowerCase() === "present"
      ).length || 0;
    return ((presentDays / totalDays) * 100).toFixed(1);
  };

  const sortData = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const getSortedData = () => {
    const filteredUsers = users.filter(
      (user) =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.department?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.role.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return [...filteredUsers].sort((a, b) => {
      if (sortConfig.key === "attendance") {
        return sortConfig.direction === "asc"
          ? calculateAttendancePercentage(a._id) -
              calculateAttendancePercentage(b._id)
          : calculateAttendancePercentage(b._id) -
              calculateAttendancePercentage(a._id);
      }

      if (sortConfig.direction === "asc") {
        return a[sortConfig.key] > b[sortConfig.key] ? 1 : -1;
      }
      return a[sortConfig.key] < b[sortConfig.key] ? 1 : -1;
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
    return <div className="text-red-500 text-center p-4">{error}</div>;
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
                  {getSortedData().map((user) => (
                    <tr key={user._id} className="border-b hover:bg-gray-50">
                      <td className="p-2">{user.name}</td>
                      <td className="p-2">
                        {user.department || "Not Assigned"}
                      </td>
                      <td className="p-2">{user.role}</td>
                      <td className="p-2">
                        <div className="flex items-center space-x-2">
                          <div className="w-24 bg-gray-200 rounded-full h-2">
                            <div
                              className={`h-2 rounded-full ${
                                parseFloat(
                                  calculateAttendancePercentage(user._id)
                                ) >= 75
                                  ? "bg-green-600"
                                  : "bg-red-600"
                              }`}
                              style={{
                                width: `${calculateAttendancePercentage(
                                  user._id
                                )}%`,
                              }}
                            />
                          </div>
                          <span
                            className={
                              parseFloat(
                                calculateAttendancePercentage(user._id)
                              ) >= 75
                                ? "text-green-600"
                                : "text-red-600"
                            }
                          >
                            {calculateAttendancePercentage(user._id)}%
                          </span>
                        </div>
                      </td>
                      <td className="p-2">
                        {attendanceData[user._id]?.filter(
                          (record) => record.status.toLowerCase() === "present"
                        ).length || 0}
                      </td>
                    </tr>
                  ))}
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
