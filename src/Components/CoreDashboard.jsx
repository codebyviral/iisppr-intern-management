/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
import { Button } from "@/Components/ui/button";
import { useNavigate } from "react-router-dom";
import { Settings, ExternalLink, Headset } from "lucide-react";
import axios from "axios";
import { deleteTaskUri, getTasks } from "./URIs";
import { useAppContext } from "@/context/AppContext";
import toast from "react-hot-toast";
import TaskModal from "./TaskModal";

const CoreDashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { setDashboard } = useAppContext();
  const currentDate = new Date();
  const currentDay = currentDate.getDate();
  const currentYear = currentDate.getFullYear();
  const weekStart = currentDate.getDate() - currentDate.getDay();

  // Generate the 7 dates based on the start of the week
  const dates = Array.from({ length: 7 }, (_, index) => weekStart + index);
  console.log(localStorage.getItem('userId'))
  const { notiCounter, setNotiCounter, modalView, setModalView } =
    useAppContext();

  // Fetch current Tasks
  // Fetch current Tasks
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${getTasks}/${localStorage.getItem("userId")}`
        );
        const fetchedTasks = response.data.tasksData;
        setTasks(fetchedTasks);
        setNotiCounter(fetchedTasks.length);
      } catch (error) {
        toast.error(`Error Fetching Tasks`);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  // const delete particular task
  const deleteTask = async (taskId) => {
    try {
      const response = await axios.delete(`${deleteTaskUri}/${taskId}`);
      toast.success("Marked as Done");
      setTasks(tasks.filter((task) => task._id !== taskId));
    } catch (error) {
      toast.error(`Error deleting task: ${error.message}`);
    }
  };

  return (
    <>
      {modalView ? <TaskModal /> : ""}
      <div className="p-6 max-w-7xl mx-auto taskContainer sm:pl-8 md:pl-10 lg:pl-[10rem]">
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
          <div className="capitalize">
            <h2 className="text-xl font-bold mb-4">My tasks</h2>
            <Card>
              <CardContent className="p-6">
                <p className="text-sm text-gray-600 mb-4">
                  {tasks.length} active tasks
                </p>
                {loading ? (
                  <>
                    {" "}
                    <div className="flex justify-center items-center py-4">
                      <p className="text-gray-600">
                        Loading tasks, please wait...
                      </p>
                    </div>
                  </>
                ) : (
                  <>
                    <div>
                      {tasks.slice(0, 3).map((task, index) => (
                        <div
                          key={task._id || index}
                          className="flex flex-col lg:flex-row items-start lg:items-center gap-4 mb-4 border-b pb-4 last:border-b-0"
                        >
                          <div className="flex-1">
                            <p className="font-medium text-lg">{task.title}</p>
                            <p className="text-sm text-gray-600 mt-2">
                              {task.description}
                            </p>
                            <p className="text-xs text-gray-400 mt-1">
                              Start Date:{" "}
                              <span className="text-blue-500">
                                {new Date(task.startDate).toLocaleDateString()}{" "}
                                <br />
                              </span>
                              End Date:{" "}
                              <span className="text-blue-500">
                                {new Date(task.endDate).toLocaleDateString()}
                              </span>
                            </p>
                          </div>
                          <div className="flex flex-col items-start lg:items-center gap-2 mt-4 lg:mt-0">
                            <Button
                              onClick={() => setModalView(true)}
                              variant="outline"
                              className="w-full lg:w-auto text-sm"
                            >
                              View
                              <ExternalLink color="#3B81F6" />
                            </Button>
                            <span className="text-sm text-red-600 mt-2">
                              {`${task.status}`}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                )}
                <Button variant="outline" className="w-full mt-4">
                  View all tasks
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Calendar Section */}
          <div>
            <h2 className="text-xl font-bold mb-4">December {currentYear}</h2>
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
                          ? "bg-gray-200 font-bold text-black"
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
                    <Settings className="h-12 w-12" />
                  </div>
                  <p className="text-center">FAQs</p>
                </CardContent>
              </Card>
              <Card
                className="bg-blue-500 text-white cursor-pointer"
                onClick={() => navigate("/help")}
              >
                <CardContent className="p-6 flex flex-col items-center">
                  <div className="w-24 h-24 flex items-center justify-center mb-4">
                    <Headset className="h-12 w-12" />
                  </div>
                  <p className="text-center">Contact Us</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CoreDashboard;
