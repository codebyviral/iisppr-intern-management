import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
import { Skeleton } from "@/Components/ui/skeleton";
import { AlertCircle, Bell, Calendar, Loader } from "lucide-react";
import { Alert, AlertDescription } from "@/Components/ui/alert";
import { Navbar, SideNav, Footer } from "@/Components/compIndex";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/Components/ui/dialog";
import { Badge } from "@/Components/ui/badge";
import { useAuthContext } from "@/context/AuthContext";

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedNotification, setSelectedNotification] = useState(null);
  const [taskDetails, setTaskDetails] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { loggedIn } = useAuthContext();

  useEffect(() => {
    const fetchNotifications = async () => {
      const userId = localStorage.getItem("userId");
      try {
        const response = await fetch(
          `https://iisppr-backend.vercel.app/get-notifications?userId=${userId}`
        );
        if (!response.ok) throw new Error("Failed to fetch notifications");
        const data = await response.json();
        if (data?.notifications?.notifications) {
          const sortedNotifications = data.notifications.notifications.sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
          );
          setNotifications(sortedNotifications);
        } else {
          setError("No notifications found");
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (loggedIn) fetchNotifications();
    else setLoading(false);
  }, [loggedIn]);

  const fetchTaskDetails = async (taskId) => {
    try {
      const response = await fetch(
        `https://iisppr-backend.vercel.app/task/get-task/${taskId}`
      );
      if (!response.ok) throw new Error("Failed to fetch task details");
      const data = await response.json();
      if (data.taskDetails) {
        setTaskDetails(data.taskDetails);
      }
    } catch (error) {
      console.error("Error fetching task details:", error);
      setError("Failed to load task details");
      setTaskDetails(null);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    }).format(date);
  };

  const handleNotificationClick = async (notification) => {
    setSelectedNotification(notification);
    setTaskDetails(null);
    setIsModalOpen(true);
    await fetchTaskDetails(notification.task);
  };

  return (
    <>
      <Navbar />
      <SideNav />
      <div className="relative capitalize bg-gray-50 min-h-screen ml-0 md:ml-32">
        <div className="p-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-bold flex items-center gap-2">
                <Bell className="h-6 w-6" />
                Your Notifications
              </CardTitle>
            </CardHeader>
            <CardContent>
              {!loggedIn && (
                <Alert className="bg-yellow-50 border-yellow-200">
                  <AlertCircle className="h-4 w-4 text-yellow-600" />
                  <AlertDescription className="text-yellow-700">
                    Please log in to view your notifications
                  </AlertDescription>
                </Alert>
              )}

              {loading && renderNotificationSkeleton()}

              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              {!loading && !error && notifications.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  <p>No notifications available</p>
                </div>
              )}

              {!loading && !error && notifications.length > 0 && (
                <div className="space-y-4">
                  {notifications.map((notification) => (
                    <div
                      key={notification._id}
                      onClick={() => handleNotificationClick(notification)}
                      className="group p-4 border-b last:border-0 hover:bg-gray-50 transition-colors duration-200 rounded-lg cursor-pointer"
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <Badge>{notification.type || "Update"}</Badge>
                            <p className="text-sm text-gray-500">
                              {formatDate(notification.createdAt)}
                            </p>
                          </div>
                          <p className="text-gray-800 group-hover:text-blue-600 transition-colors duration-200 mt-2">
                            {notification.message}
                          </p>
                          {notification.description && (
                            <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                              {notification.description}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold">
              {taskDetails ? "Task Details" : "Notification Details"}
            </DialogTitle>
          </DialogHeader>

          <div className="mt-4 space-y-4">
            {taskDetails ? (
              <>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-2xl font-semibold text-gray-800">
                      {taskDetails.title}
                    </h3>
                    <Badge className="text-sm capitalize px-3 py-1 rounded-md">
                      {taskDetails.status}
                    </Badge>
                  </div>

                  <p className="text-gray-600 text-sm">
                    {taskDetails.description || "No description available."}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-gray-100 p-4 rounded-lg">
                    <div className="flex items-center gap-2 text-sm text-gray-700">
                      <Calendar className="h-4 w-4 text-blue-500" />
                      <span>
                        <strong>Start:</strong>{" "}
                        {formatDate(taskDetails.startDate)}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-700">
                      <Calendar className="h-4 w-4 text-red-500" />
                      <span>
                        <strong>End:</strong> {formatDate(taskDetails.endDate)}
                      </span>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="flex justify-center items-center py-4">
                  <Loader className="animate-spin h-5 w-5 text-blue-500" />
                </div>
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>

      <Footer />
    </>
  );
};

const renderNotificationSkeleton = () => (
  <div className="space-y-4">
    {[1, 2, 3].map((index) => (
      <div key={index} className="flex items-start space-x-4 p-4 border-b">
        <Skeleton className="h-12 w-12 rounded-full" />
        <div className="space-y-2 flex-1">
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-3 w-1/4" />
        </div>
      </div>
    ))}
  </div>
);

export default Notifications;
