import { useEffect, useState } from "react";
import { Card, CardContent } from "@/Components/ui/card";
import { Button } from "@/Components/ui/button";
import { useNavigate } from "react-router-dom";
import {
  Settings,
  ExternalLink,
  Headset,
  Loader,
  Calendar,
  CheckCircle,
  Clock,
  AlertCircle,
} from "lucide-react";
import axios from "axios";
import { useAppContext } from "@/context/AppContext";
import TaskModal from "./TaskModal";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/Components/ui/dialog";

const CoreDashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTaskId, setSelectedTaskId] = useState(null);
  const [showAllTasks, setShowAllTasks] = useState(false);
  const navigate = useNavigate();
  const { setDashboard } = useAppContext();
  const currentDate = new Date();
  const currentDay = currentDate.getDate();
  const currentYear = currentDate.getFullYear();
  const weekStart = currentDate.getDate() - currentDate.getDay();
  const dates = Array.from({ length: 7 }, (_, index) => weekStart + index);
  const { modalView, setModalView } = useAppContext();

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/${localStorage.getItem("userId")}`
        );
        const fetchedTasks = response.data.tasksData;
        setTasks(fetchedTasks);
      } catch (error) {
        console.error(`Error Fetching Tasks: ${error.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  const TaskStatusBadge = ({ status }) => {
    const statusConfig = {
      completed: {
        icon: CheckCircle,
        className: "bg-green-100 text-green-700",
      },
      pending: {
        icon: Clock,
        className: "bg-yellow-100 text-yellow-700",
      },
      overdue: {
        icon: AlertCircle,
        className: "bg-red-100 text-red-700",
      },
    };

    const config = statusConfig[status.toLowerCase()] || statusConfig.pending;
    const Icon = config.icon;

    return (
      <div
        className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm capitalize ${config.className}`}
      >
        <Icon className="w-4 h-4" />
        <span>{status}</span>
      </div>
    );
  };

  const TaskList = ({ tasks, limit = null }) => {
    const displayTasks = limit ? tasks.slice(0, limit) : tasks;

    return (
      <div className="space-y-6">
        {displayTasks
          .slice()
          .reverse()
          .map((task, index) => (
            <Card
              key={task._id || index}
              className="hover:shadow-md transition-shadow"
            >
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row items-start lg:items-center gap-6">
                  <div className="flex-1 space-y-3">
                    <div className="flex items-start justify-between">
                      <h3 className="font-semibold text-lg text-gray-900">
                        {task.title}
                      </h3>
                      <TaskStatusBadge status={task.status} />
                    </div>
                    <p className="text-gray-600">{task.description}</p>
                    <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span>
                          Start: {new Date(task.startDate).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span>
                          End: {new Date(task.endDate).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col gap-3 min-w-[120px]">
                    <Button
                      onClick={() => {
                        setSelectedTaskId(task._id);
                        setModalView(true);
                        setShowAllTasks(false);
                      }}
                      variant="outline"
                      className="w-full"
                    >
                      {task.status === "completed" ? "Resubmit" : "Submit"}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
      </div>
    );
  };

  return (
    <>
      {modalView && selectedTaskId && <TaskModal taskId={selectedTaskId} />}

      <Dialog open={showAllTasks} onOpenChange={setShowAllTasks}>
        <DialogContent className="sm:max-w-3xl">
          <DialogHeader>
            <div className="flex justify-between items-center">
              <DialogTitle className="text-2xl font-semibold">
                All Tasks ({tasks.length})
              </DialogTitle>
              <DialogClose className="rounded-full hover:bg-gray-100 p-2" />
            </div>
          </DialogHeader>
          <div className="mt-6 max-h-[70vh] overflow-y-auto pr-2">
            {loading ? (
              <div className="flex justify-center items-center py-8">
                <Loader className="animate-spin h-6 w-6 text-blue-500 mr-3" />
                <p className="text-gray-600">Loading tasks...</p>
              </div>
            ) : (
              <TaskList tasks={tasks} />
            )}
          </div>
        </DialogContent>
      </Dialog>

      <div className="p-6 max-w-7xl mx-auto space-y-8 sm:pl-8 md:pl-10 lg:pl-[10rem]">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg p-8 text-white">
          <div className="flex justify-between items-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold">
                Welcome,{" "}
                {localStorage.getItem("userName") || "Login to Continue"}!
              </h1>
              <p className="text-blue-100">
                Track your progress and expand your knowledge journey.
              </p>
            </div>
            <Button
              variant="outline"
              className="bg-white text-blue-600 hover:bg-blue-50 hidden lg:flex items-center gap-2"
              onClick={() => {
                setDashboard("Settings");
                navigate("/setting");
              }}
            >
              <Settings className="h-4 w-4" />
              Settings
            </Button>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Tasks Section */}
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">My Tasks</h2>
              <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm">
                {tasks.length} active
              </span>
            </div>
            {loading ? (
              <Card>
                <CardContent className="p-8 flex justify-center items-center">
                  <Loader className="animate-spin h-6 w-6 text-blue-500 mr-3" />
                  <p className="text-gray-600">Loading tasks...</p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                <TaskList tasks={tasks} limit={3} />
                <Button
                  variant="outline"
                  className="w-full mt-4 py-6 text-base hover:bg-gray-50"
                  onClick={() => setShowAllTasks(true)}
                >
                  View all tasks
                  <ExternalLink className="h-4 w-4 ml-2" />
                </Button>
              </div>
            )}
          </div>

          {/* Calendar and Quick Actions Section */}
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                December {currentYear}
              </h2>
              <Card className="overflow-hidden">
                <CardContent className="p-6">
                  <div className="grid grid-cols-7 gap-2 text-center">
                    {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
                      (day) => (
                        <div
                          key={day}
                          className="font-medium text-gray-500 py-2"
                        >
                          {day}
                        </div>
                      )
                    )}
                    {dates.map((date) => (
                      <div
                        key={date}
                        className={`p-3 rounded-lg transition-colors ${
                          date === currentDay
                            ? "bg-blue-500 text-white font-semibold"
                            : "hover:bg-gray-100 cursor-pointer"
                        }`}
                      >
                        {date}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Quick Actions
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card
                  className="group cursor-pointer overflow-hidden transition-all hover:shadow-lg"
                  onClick={() => navigate("/frequently-asked-questions")}
                >
                  <CardContent className="p-6 bg-gradient-to-br from-blue-500 to-blue-600 text-white h-full">
                    <div className="flex flex-col items-center text-center space-y-4">
                      <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Settings className="h-8 w-8" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">FAQs</h3>
                        <p className="text-blue-100 text-sm mt-1">
                          Find quick answers
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card
                  className="group cursor-pointer overflow-hidden transition-all hover:shadow-lg"
                  onClick={() => navigate("/help")}
                >
                  <CardContent className="p-6 bg-gradient-to-br from-blue-500 to-blue-600 text-white h-full">
                    <div className="flex flex-col items-center text-center space-y-4">
                      <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Headset className="h-8 w-8" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">Contact Us</h3>
                        <p className="text-blue-100 text-sm mt-1">
                          Get support
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CoreDashboard;
