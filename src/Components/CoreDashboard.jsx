import { useEffect, useState } from "react";
import { Card, CardContent } from "@/Components/ui/card";
import { Button } from "@/Components/ui/button";
import { useNavigate } from "react-router-dom";
import { Settings, ExternalLink, Headset, Loader } from "lucide-react";
import axios from "axios";
import { getTasks } from "./URIs";
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
          `${getTasks}/${localStorage.getItem("userId")}`
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

  // eslint-disable-next-line react/prop-types
  const TaskList = ({ tasks, limit = null }) => {
    // eslint-disable-next-line react/prop-types
    const displayTasks = limit ? tasks.slice(0, limit) : tasks;

    return (
      <div>
        {displayTasks
          .slice()
          .reverse()
          .map((task, index) => (
            <div
              key={task._id || index}
              className="flex flex-col lg:flex-row items-start lg:items-center gap-4 mb-4 border-b pb-4 last:border-b-0"
            >
              <div className="flex-1">
                <p className="font-medium text-lg">{task.title}</p>
                <p className="text-sm text-gray-600 mt-2">{task.description}</p>
                <p className="text-xs text-gray-400 mt-1">
                  Start Date:{" "}
                  <span className="text-blue-500">
                    {new Date(task.startDate).toLocaleDateString()} <br />
                  </span>
                  End Date:{" "}
                  <span className="text-blue-500">
                    {new Date(task.endDate).toLocaleDateString()}
                  </span>
                </p>
              </div>
              <div className="flex flex-col items-start lg:items-center gap-2 mt-4 lg:mt-0">
                <Button
                  onClick={() => {
                    setSelectedTaskId(task._id);
                    setModalView(true);
                    setShowAllTasks(false);
                  }}
                  variant="outline"
                  className="w-full lg:w-auto text-sm"
                >
                  {task.status === "completed" ? "Resubmit" : "Submit"}
                </Button>
                <span
                  className={`text-sm capitalize mt-2 ${
                    task.status === "completed"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {task.status}
                </span>
              </div>
            </div>
          ))}
      </div>
    );
  };

  return (
    <>
      {modalView && selectedTaskId && <TaskModal taskId={selectedTaskId} />}

      <Dialog open={showAllTasks} onOpenChange={setShowAllTasks}>
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <div className="flex justify-between items-center">
              <DialogTitle className="text-xl font-semibold">
                All Tasks ({tasks.length})
              </DialogTitle>
              <DialogClose className="rounded-full hover:bg-gray-100 p-2"></DialogClose>
            </div>
          </DialogHeader>
          <div className="mt-4 max-h-[60vh] overflow-y-auto">
            {loading ? (
              <div className="flex justify-center items-center py-4">
                <p className="text-gray-600 mr-2">Loading tasks...</p>
                <Loader className="animate-spin h-5 w-5 text-blue-500" />
              </div>
            ) : (
              <TaskList tasks={tasks} />
            )}
          </div>
        </DialogContent>
      </Dialog>

      <div className="p-6 max-w-7xl mx-auto taskContainer sm:pl-8 md:pl-10 lg:pl-[10rem]">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold mb-2">
              Welcome, {localStorage.getItem("userName") || `Login to Continue`}!
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
                  <div className="flex justify-center items-center py-4">
                    <p className="text-gray-600 mr-2">Loading tasks...</p>
                    <Loader className="animate-spin h-5 w-5 text-blue-500" />
                  </div>
                ) : (
                  <TaskList tasks={tasks} limit={3} />
                )}
                <Button
                  variant="outline"
                  className="w-full mt-4"
                  onClick={() => setShowAllTasks(true)}
                >
                  View all tasks
                  <ExternalLink className="h-4 w-4 ml-2" />
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
                onClick={() => navigate("/frequently-asked-questions")}
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
