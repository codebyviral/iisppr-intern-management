import React, { useState } from "react";
import {
  Eye,
  EyeOff,
  Lock,
  ArrowRight,
  Mail,
  KeyRound,
  Key,
} from "lucide-react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import iispprLogo from "../assets/Images/iisprlogo.png";
import { useNavigate } from "react-router-dom";

const PasswordResetPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    oldPassword: "",
    newPassword: "",
    cnewPassword: "",
  });
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (
      !formData.email ||
      !formData.oldPassword ||
      !formData.newPassword ||
      !formData.cnewPassword
    ) {
      toast.error("All fields are required");
      setIsLoading(false);
      return;
    }

    if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      toast.error("Please enter a valid email address");
      setIsLoading(false);
      return;
    }

    if (formData.newPassword !== formData.cnewPassword) {
      toast.error("New passwords do not match");
      setIsLoading(false);
      return;
    }

    if (formData.newPassword.length < 8) {
      toast.error("Password must be at least 8 characters long");
      setIsLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/user/updatepassword`,
        {
          email: formData.email,
          oldPassword: formData.oldPassword,
          newPassword: formData.newPassword,
          cnewPassword: formData.cnewPassword,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        toast.success("Password updated successfully!");
        setFormData({
          email: "",
          oldPassword: "",
          newPassword: "",
          cnewPassword: "",
        });
        navigate("/login");
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to update password. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg">
        {/* Logo and Header */}
        <div className="text-center">
          <div className="mx-auto w-28 h-28 mb-4">
            <img
              src={iispprLogo}
              alt="IISPPR Logo"
              className="w-full h-full object-contain"
            />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Reset Password
          </h2>
          <p className="text-gray-600">
            Change your IISPPR InternHub account password
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          {/* Email Field */}
          <div className="relative">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email Address
            </label>
            <div className="relative">
              <input
                type="email"
                id="email"
                className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                placeholder="Enter your registered email"
              />
              <Mail className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          {/* Old Password Field */}
          <div className="relative">
            <label
              htmlFor="oldPassword"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Current Password
            </label>
            <div className="relative">
              <input
                type={showOldPassword ? "text" : "password"}
                id="oldPassword"
                className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={formData.oldPassword}
                onChange={(e) =>
                  setFormData({ ...formData, oldPassword: e.target.value })
                }
                placeholder="Enter your current password"
              />
              <KeyRound className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                onClick={() => setShowOldPassword(!showOldPassword)}
              >
                {showOldPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>

          {/* New Password Field */}
          <div>
            <label
              htmlFor="newPassword"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              New Password
            </label>
            <div className="relative">
              <input
                type={showNewPassword ? "text" : "password"}
                id="newPassword"
                className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={formData.newPassword}
                onChange={(e) =>
                  setFormData({ ...formData, newPassword: e.target.value })
                }
                placeholder="Enter new password"
              />
              <Key className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                onClick={() => setShowNewPassword(!showNewPassword)}
              >
                {showNewPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>

          {/* Confirm Password Field */}
          <div>
            <label
              htmlFor="cnewPassword"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Confirm New Password
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="cnewPassword"
                className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={formData.cnewPassword}
                onChange={(e) =>
                  setFormData({ ...formData, cnewPassword: e.target.value })
                }
                placeholder="Confirm your new password"
              />
              <Key className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition duration-200 flex items-center justify-center gap-2 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <span>Updating...</span>
            ) : (
              <>
                Update Password
                <ArrowRight className="w-5 h-5" />
              </>
            )}
          </button>
        </form>

        {/* Password Requirements */}
        <div className="mt-4 p-4 bg-blue-50 rounded-lg">
          <h3 className="text-sm font-medium text-blue-800 mb-2">
            Password Requirements:
          </h3>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>• Minimum 8 characters long</li>
            <li>• Include at least one uppercase letter</li>
            <li>• Include at least one number</li>
            <li>• Include at least one special character</li>
          </ul>
        </div>
      </div>
      <Toaster
        toastOptions={{
          duration: 3000,
          style: {
            background: "#333",
            color: "#fff",
          },
          success: {
            style: {
              background: "green",
            },
          },
          error: {
            style: {
              background: "red",
            },
          },
        }}
      />
    </div>
  );
};

export default PasswordResetPage;
