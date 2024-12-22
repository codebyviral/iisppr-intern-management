/* eslint-disable no-unused-vars */
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
import { Progress } from "@/Components/ui/progress";
import { Button } from "@/Components/ui/button";
import { useNavigate } from "react-router-dom";
import {
  Calendar,
  Settings,
  HelpCircle,
  ChevronRight,
  Clock,
} from "lucide-react";
import { tasks, calendarItems } from "@/APIs/index.js";
import { useAppContext } from "@/context/AppContext";
const CoreDashboard = () => {
  const navigate = useNavigate();
  const { setDashboard } = useAppContext();
  const currentDate = new Date();
  const currentDay = currentDate.getDate();
  const currentYear = currentDate.getFullYear();
  const weekStart = currentDate.getDate() - currentDate.getDay();

  // Generate the 7 dates based on the start of the week
  const dates = Array.from({ length: 7 }, (_, index) => weekStart + index);

  return (
    <div className="p-6 max-w-7xl mx-auto taskContainer">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold mb-2">
            Welcome, to IISPPR Dashboard!
          </h1>
          <p className="text-gray-600">
            Open the panel and watch your progress and growth in knowledge.
          </p>
        </div>
        <div
          onClick={() => {
            setDashboard("Settings");
            navigate("/setting");
          }}
          className="hide-mobile"
        >
          <Button variant="outline" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            Settings
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Tasks Section */}
        <div>
          <h2 className="text-xl font-bold mb-4">My tasks</h2>
          <Card>
            <CardContent className="p-6">
              <p className="text-sm text-gray-600 mb-4">
                {tasks.length} active tasks
              </p>
              {tasks.slice(0, 5).map((task, index) => (
                <div
                  key={task.id || index}
                  className="flex items-center gap-4 mb-4"
                >
                  <div className="w-8 h-8 rounded-full bg-gray-200" />
                  <div className="flex-1">
                    <p className="font-medium">{task.title}</p>
                    <p className="text-sm text-gray-600">{task.owner}</p>
                  </div>
                  <span className="text-sm text-gray-600">{task.dueType}</span>
                </div>
              ))}
              <Button variant="outline" className="w-full mt-4">
                View all tasks
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Calendar Section */}
        <div>
          <h2 className="text-xl font-bold mb-4">
            December {currentYear} progress report
          </h2>
          <Card className="mb-8">
            <CardContent className="p-4">
              <div className="grid grid-cols-7 gap-2 text-center">
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
                  (day) => (
                    <div key={day} className="text-sm text-gray-600">
                      {day}
                    </div>
                  )
                )}
                {dates.map((date) => (
                  <div
                    key={date}
                    className={`p-2 rounded cursor-pointer ${
                      date === currentDay
                        ? "bg-gray-200 fw-bold text-black"
                        : ""
                    }`}
                  >
                    {date}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Metrics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <Card
          className="bg-blue-500 text-white cursor-pointer"
          onClick={() => navigate("/faqs")}
        >
          <CardContent className="p-6 flex flex-col items-center">
            <div className="w-24 h-24 flex items-center justify-center mb-4">
              <HelpCircle className="h-12 w-12" />
            </div>
            <p className="text-center">FAQs</p>
          </CardContent>
        </Card>
      </div>

        </div>
      </div>
    </div>
  );
};

export default CoreDashboard;
