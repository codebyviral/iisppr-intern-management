import React, { useState } from "react";
import { Bell, Send } from "lucide-react";
import Swal from "sweetalert2";
import CustomNavbar from "./CustomNavbar";

const AdminNotify = () => {
  const [formData, setFormData] = useState({
    status: "",
    message: "",
  });

  const handleSendNotification = async () => {
    if (!formData.status || !formData.message) {
      Swal.fire({
        icon: "error",
        title: "Required Fields Missing",
        text: "Please fill in all fields",
      });
      return;
    }

    try {
      const response = await fetch("http://localhost:8000/send/notify-all", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: "Notification sent successfully",
          timer: 2000,
          showConfirmButton: false,
        });
        setFormData({ status: "", message: "" });
      } else {
        throw new Error("Failed to send notification");
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to send notification",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <CustomNavbar />

      <div className="container mx-auto px-4 py-10">
        <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-xl p-8">
          <div className="flex items-center justify-center mb-8 space-x-3">
            <Bell className="w-8 h-8 text-blue-600" />
            <h2 className="text-3xl font-bold text-blue-600">
              Send Notifications
            </h2>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-lg font-semibold text-gray-700 mb-2">
                Status
              </label>
              <input
                type="text"
                value={formData.status}
                onChange={(e) =>
                  setFormData({ ...formData, status: e.target.value })
                }
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 transition-shadow"
                placeholder="Enter status..."
              />
            </div>

            <div>
              <label className="block text-lg font-semibold text-gray-700 mb-2">
                Message
              </label>
              <textarea
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 transition-shadow"
                rows="6"
                placeholder="Enter message content..."
              />
            </div>

            <div className="flex justify-end">
              <button
                onClick={handleSendNotification}
                className="flex items-center space-x-2 bg-blue-600 text-white py-3 px-6 rounded-lg text-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 transition-colors"
              >
                <Send className="w-5 h-5" />
                <span>Send Notification</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminNotify;
