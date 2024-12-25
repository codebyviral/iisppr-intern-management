import { useState } from "react";
import { Card, CardContent } from "@/Components/ui/card";
import { Navbar } from "@/Components/compIndex";
import { Switch } from "@/Components/ui/switch";
import { Settings, User, HelpCircle, ExternalLink, Bell } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "@/context/AppContext";
import toast from "react-hot-toast";

const SettingsPage = () => {
  const navigate = useNavigate();
  const { setDashboard } = useAppContext();
  const [notifications, setNotifications] = useState(true);

  const menuItems = [
    {
      icon: <Bell size={24} />,
      label: "Notifications",
      description: "Manage your notification preferences",
      isToggle: true,
    },
    {
      icon: <User size={24} />,
      label: "Your Profile",
      path: "/your-profile",
      description: "Manage your personal information and preferences",
    },
    // ... rest of the menuItems array stays the same
  ];

  const handleClick = (path) => {
    setDashboard(path.slice(1));
    navigate(path);
  };

  return (
    <>
      <Navbar />
      <div className="p-6 max-w-7xl mx-auto taskContainer sm:pl-8 md:pl-10 lg:pl-[10rem]">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold mb-2">Dashboard Settings</h1>
            <p className="text-gray-600">
              Manage your account preferences and settings
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="hover:shadow-xl transition-all duration-300 bg-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="p-3 rounded-lg bg-blue-50 text-blue-600">
                    <Bell size={24} />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-gray-800">
                      Notifications
                    </h3>
                    <p className="text-sm text-gray-500 mt-1">
                      {notifications
                        ? "Notifications are enabled"
                        : "Notifications are disabled"}
                    </p>
                  </div>
                </div>
                <div
                  onClick={() =>
                    toast.error(
                      `Kindly contact the Admin to disable notifications.`
                    )
                  }
                >
                  <Switch
                    checked={notifications}
                    className="data-[state=checked]:bg-blue-600"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {menuItems.slice(1).map((item) => (
            <Card
              key={item.path}
              className="hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer bg-white"
              onClick={() => handleClick(item.path)}
            >
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="p-3 rounded-lg bg-blue-50 text-blue-600">
                    {item.icon}
                  </div>
                  <div className="ml-4 flex-1">
                    <h3 className="text-lg font-semibold text-gray-800">
                      {item.label}
                    </h3>
                    <p className="text-sm text-gray-500 mt-1">
                      {item.description}
                    </p>
                  </div>
                  <ExternalLink className="h-5 w-5 text-blue-600" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          <Card
            className="bg-blue-500 text-white cursor-pointer"
            onClick={() => navigate("/frequently-asked-questions")}
          >
            <CardContent className="p-6 flex items-center justify-center">
              <Settings className="h-8 w-8 mr-4" />
              <p className="text-xl font-semibold">FAQs</p>
            </CardContent>
          </Card>
          <Card
            className="bg-blue-500 text-white cursor-pointer"
            onClick={() => navigate("/help")}
          >
            <CardContent className="p-6 flex items-center justify-center">
              <HelpCircle className="h-8 w-8 mr-4" />
              <p className="text-xl font-semibold">Contact Us</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default SettingsPage;
