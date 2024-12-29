import React, { useState, useEffect } from "react";
import { Navbar, SideNav } from "@/Components/compIndex";
import axios from "axios";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Calendar,
  Clock,
  CheckCircle,
  XCircle,
  Users,
  Percent,
} from "lucide-react";

const UserAttendance = () => {
  const [attendanceData, setAttendanceData] = useState([]);
  const [attendancePercentage, setAttendancePercentage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const userId = localStorage.getItem("userId");
      if (!userId) {
        setError("User ID not found");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(
          `https://iisppr-backend.vercel.app/attendance/${userId}`
        );
        setAttendanceData(response.data);

        const totalDays = response.data.length;
        const presentDays = response.data.filter(
          (record) => record.status.toLowerCase() === "present"
        ).length;
        const percentage =
          totalDays > 0 ? ((presentDays / totalDays) * 100).toFixed(2) : 0;
        setAttendancePercentage(percentage);
        setLoading(false);
      } catch (err) {
        setError("Error fetching attendance data");
        setLoading(false);
      }
    };

    fetchData();
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

  const formatDate = (date) => {
    const d = new Date(date);
    return d.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  if (loading) {
    return (
      <div className="flex min-h-screen">
        <SideNav />
        <div className="flex-1">
          <Navbar />
          <div className="flex items-center justify-center min-h-screen">
            <div className="text-xl text-gray-600">
              Loading attendance data...
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen">
        <SideNav />
        <div className="flex-1">
          <Navbar />
          <div className="flex items-center justify-center min-h-screen">
            <div className="text-xl text-red-600">{error}</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <SideNav />
      <div className="flex-1">
        <Navbar />
        <div className="max-w-6xl mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
            Attendance Dashboard
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg text-gray-600 flex items-center gap-2">
                  <Percent className="w-5 h-5" />
                  Attendance Rate
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold text-blue-600">
                  {attendancePercentage}%
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg text-gray-600 flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  Total Records
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold text-blue-600">
                  {attendanceData.length}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-white shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl text-gray-800">
                Attendance History
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
                        Date
                      </th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
                        Day
                      </th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
                        Check-in Time
                      </th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {attendanceData.map((record) => (
                      <tr
                        key={record._id}
                        className="border-b hover:bg-gray-50 transition-colors"
                      >
                        <td className="px-6 py-4 flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-gray-400" />
                          {formatDate(record.date)}
                        </td>
                        <td className="px-6 py-4 text-gray-600">
                          {getDayOfWeek(record.date)}
                        </td>
                        <td className="px-6 py-4 flex items-center gap-2">
                          <Clock className="w-4 h-4 text-gray-400" />
                          {formatTime(record.CheckInTime)}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            {record.status.toLowerCase() === "present" ? (
                              <>
                                <CheckCircle className="w-5 h-5 text-green-500" />
                                <span className="text-green-500 font-medium">
                                  Present
                                </span>
                              </>
                            ) : (
                              <>
                                <XCircle className="w-5 h-5 text-red-500" />
                                <span className="text-red-500 font-medium">
                                  Absent
                                </span>
                              </>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default UserAttendance;
