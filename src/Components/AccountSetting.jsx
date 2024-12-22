/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import ResetpassGif from "../assets/Images/Resetpassword.gif";
import { SideNav ,Navbar} from "./compIndex";

const AccountSetting = () => {
  const [isLoading, SetisLoading] = useState(false);
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });
  const [message, setMessage] = useState("");

  // Store the API URL in a variable
  const API_URL = import.meta.env.VITE_API_URL;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    SetisLoading(true);
    e.preventDefault();

    if (formData.newPassword !== formData.confirmNewPassword) {
      setMessage("New password do not match");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_URL}/api/user/change-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (response.status === 200) {
        setMessage("Password changed successfully");
      } else {
        const data = await response.json();
        setMessage(data.message || "Error changing password");
      }
    } catch (error) {
      console.error("Error changing password:", error);
      setMessage("Error changing password");
    } finally {
      SetisLoading(false);
    }
  };

  return (
    <>
    <SideNav/>
    <Navbar/>
    <div className="AccountSetting-Container">
    <div className="flex items-center justify-center min-h-[90vh] bg-white p-4 border-gray-700" style={{border:1 }}>
      <div className="flex flex-col md:flex-row items-center bg-white shadow-lg rounded-lg overflow-hidden max-w-4xl w-full ">
        {/* Image Section */}
        <div className="md:w-1/2 w-full bg-gray-200 ">
          <img
            src={ResetpassGif}
            alt="Account Settings"
            className="w-full h-auto"
          />
        </div>

        {/* Form Section */}
        <div className="md:w-1/2 w-full p-6">
          <h3 className="text-2xl font-semibold mb-4 text-center text-gray-800">
            Account Settings
          </h3>
          <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
            <div>
              <input
                className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                type="password"
                name="currentPassword"
                placeholder="Current password"
                value={formData.currentPassword}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <input
                className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                type="password"
                name="newPassword"
                placeholder="New Password"
                value={formData.newPassword}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <input
                className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                type="password"
                name="confirmNewPassword"
                placeholder="Confirm New Password"
                value={formData.confirmNewPassword}
                onChange={handleChange}
                required
              />
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors"
              disabled={isLoading}
            >
              {isLoading ? "Loading..." : "Change Password"}
            </button>
          </form>
          {message && (
            <p className="mt-4 text-center text-red-600 font-medium">{message}</p>
          )}
        </div>
      </div>
    </div>
    </div>
    </>
  );
};

export default AccountSetting;
