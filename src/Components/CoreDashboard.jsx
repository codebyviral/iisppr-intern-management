import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import {
  Calendar,
  Settings,
  HelpCircle,
  ChevronRight,
  Clock,
} from "lucide-react";
import { tasks, calendarItems } from "@/APIs/index.js";
const CoreDashboard = () => {
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
        <div className="hide-mobile">
          <Button variant="outline" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            Settings
          </Button>
        </div>
      </div>

      {/* Sprint Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <Card className="bg-gray-100">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full bg-blue-400 border-2 border-white"
                  />
                ))}
              </div>
              <div>
                <p className="font-medium">Next retrospective</p>
                <p className="text-sm text-gray-600">Week 12 progress</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-100">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full bg-blue-400 border-2 border-white"
                  />
                ))}
              </div>
              <div>
                <p className="font-medium">Next sprint</p>
                <p className="text-sm text-gray-600">Week 12 progress</p>
              </div>
            </div>
          </CardContent>
        </Card>
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
              {tasks.map((task) => (
                <div key={task.id} className="flex items-center gap-4 mb-4">
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

          {/* Working Hours Chart */}
          <div className="mt-8">
            <h2 className="text-xl font-bold mb-4">Total working hours</h2>
            <Card>
              <CardContent className="p-6">
                <div className="grid grid-cols-7 gap-2 h-48">
                  {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
                    (day, i) => (
                      <div key={day} className="flex flex-col justify-end">
                        <div className="bg-blue-500 h-32 rounded-t-lg opacity-80" />
                        <div className="bg-blue-300 h-16 rounded-b-lg" />
                        <span className="text-xs text-center mt-2">{day}</span>
                      </div>
                    )
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
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
            <Card className="bg-blue-500 text-white">
              <CardContent className="p-6 flex flex-col items-center">
                <div className="w-24 h-24 rounded-full bg-white/20 flex items-center justify-center mb-4">
                  <span className="text-2xl font-bold">82%</span>
                </div>
                <p className="text-center">Your daily progress</p>
              </CardContent>
            </Card>

            <Card className="bg-blue-500 text-white">
              <CardContent className="p-6 flex flex-col items-center">
                <div className="w-24 h-24 flex items-center justify-center mb-4">
                  {[1, 2, 3].map((i) => (
                    <HelpCircle key={i} className="h-8 w-8 opacity-80" />
                  ))}
                </div>
                <p className="text-center">Task-related questions</p>
              </CardContent>
            </Card>

            <Card className="bg-blue-500 text-white">
              <CardContent className="p-6 flex flex-col items-center">
                <div className="w-24 h-24 flex items-center justify-center mb-4">
                  {[1, 2].map((i) => (
                    <HelpCircle key={i} className="h-8 w-8 opacity-80" />
                  ))}
                </div>
                <p className="text-center">FAQs</p>
              </CardContent>
            </Card>
          </div>

          <h2 className="text-xl font-bold mb-4">Upcoming calendar items</h2>

          <Card>
            <CardContent className="p-6">
              {calendarItems.map((item) => (
                <div key={item.id} className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-blue-500 text-white rounded flex items-center justify-center">
                    {item.id}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">{item.title}</p>
                    <p className="text-sm text-gray-600">{item.subtitle}</p>
                  </div>
                  <span className="text-sm text-gray-600">{item.time}</span>
                </div>
              ))}
              <Button variant="outline" className="w-full">
                View entire schedule
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CoreDashboard;
