import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { AlertCircle, X, Bell } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Navbar, SideNav, Footer } from "@/Components/compIndex";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedNotification, setSelectedNotification] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchNotifications = async () => {
      const userId = localStorage.getItem("userId");
      try {
        const response = await fetch(
          `https://iisppr-backend.vercel.app/get-notifications?userId=${userId}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch notifications");
        }

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

    fetchNotifications();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));

    if (diffInHours < 24) {
      if (diffInHours < 1) {
        const diffInMinutes = Math.floor((now - date) / (1000 * 60));
        return `${diffInMinutes} minutes ago`;
      }
      return `${diffInHours} hours ago`;
    }
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    });
  };

  const handleNotificationClick = (notification) => {
    setSelectedNotification(notification);
    setIsModalOpen(true);
  };

  const getNotificationTypeColor = (type) => {
    const types = {
      info: "bg-blue-100 text-blue-800",
      warning: "bg-yellow-100 text-yellow-800",
      success: "bg-green-100 text-green-800",
      error: "bg-red-100 text-red-800",
      default: "bg-gray-100 text-gray-800",
    };
    return types[type] || types.default;
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

  return (
    <>
      <Navbar />
      <SideNav />
      <div className="relative capitalize bg-gray-50 min-h-screen ml-0 md:ml-32">
        <div className="p-4">
          <Card>
            <CardHeader className="flex justify-between items-center">
              <CardTitle className="text-2xl font-bold flex items-center gap-2">
                <Bell className="h-6 w-6" />
                Your Notifications
              </CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                renderNotificationSkeleton()
              ) : error ? (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              ) : notifications.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <p>No notifications available at the moment</p>
                </div>
              ) : (
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
                            <Badge variant={notification.type || "default"}>
                              {notification.type || "Update"}
                            </Badge>
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
        {selectedNotification && (
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <div className="flex justify-between items-center">
                <DialogTitle className="text-xl font-semibold">
                  Notification Details
                </DialogTitle>
              </div>
            </DialogHeader>
            <div className="mt-4">
              <div className="space-y-4">
                <div>
                  <Badge
                    variant={selectedNotification.type || "default"}
                    className="mb-2"
                  >
                    {selectedNotification.type || "Update"}
                  </Badge>
                  <h3 className="text-lg font-semibold">
                    {selectedNotification.message}
                  </h3>
                </div>
                {selectedNotification.description && (
                  <p className="text-gray-600">
                    {selectedNotification.description}
                  </p>
                )}
                {selectedNotification.link && (
                  <a
                    href={selectedNotification.link}
                    className="text-blue-600 hover:underline block"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View More Details
                  </a>
                )}
                <div className="text-sm text-gray-500">
                  <p>Received: {formatDate(selectedNotification.createdAt)}</p>
                  {selectedNotification.sender && (
                    <p className="mt-1">From: {selectedNotification.sender}</p>
                  )}
                  {selectedNotification.category && (
                    <p className="mt-1">
                      Category: {selectedNotification.category}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </DialogContent>
        )}
      </Dialog>

      <Footer />
    </>
  );
};

export default Notifications;
