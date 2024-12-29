/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { TopNavbar, Footer } from "@/Components/compIndex";
import { Mail, Lock, LogIn } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useAuthContext } from "@/context/AuthContext";
import { useAppContext } from "@/context/AppContext";
import iispprLogo from "../assets/Images/iisprlogo.png";


const Signin = ({ onSwitchToSignup }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const {
    loggedIn,
    setIsLoggedIn,
    storeIsAdminState,
    storeTokenInLocalStorage,
    storeUserId,
  } = useAuthContext();
  const { storeUsername } = useAppContext();

  const Login = async () => {
    setIsLoading(true);
    const login = `${import.meta.env.VITE_BASE_URL}/api/auth/login`;
    try {
      const response = await axios.post(login, {
        email: email,
        password: password,
      });

      const { token, user } = response.data;

      if (!token || !user) {
        throw new Error("Invalid response format from server");
      }

      await storeTokenInLocalStorage(token);
      await storeUserId(user.id);
      await storeUsername(user.name);
      const isAdminValue = Boolean(user.isAdmin);
      console.log("Converting isAdmin to boolean:", isAdminValue);
      await storeIsAdminState(isAdminValue);
      setIsLoggedIn(true);
      setIsLoading(false);
      toast.success("Login successful");
      console.log(token);
      navigate("/");
    } catch (error) {
      console.error("Login error:", error);
      console.error("Error response:", error.response?.data);
      setIsLoading(false);

      if (error.response) {
        toast.error(error.response.data.message || "Login failed");
      } else {
        toast.error("Login failed. Please try again.");
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please fill in all fields.");
    } else {
      setError("");
      Login();
    }
    console.log(`LoggedIn: ${loggedIn}`);
  };

  return (
    <>
      <TopNavbar />
      <div className="flex items-center justify-center min-h-screen px-4 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="w-full max-w-md p-8 transition-all duration-300 bg-white border border-gray-100 shadow-2xl rounded-xl hover:shadow-3xl">
          <div className="mb-6 text-center">
          <div className="mx-auto mb-4 w-28 h-28">
            <img
              src={iispprLogo}
              alt="IISPPR Logo"
              className="object-contain w-full h-full"
            />
          </div>
            <h1 className="mb-2 text-3xl font-bold text-blue-800">
              Welcome Back
            </h1>
            <p className="text-sm text-gray-500">
              Log in to continue to your account
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <label
                htmlFor="email"
                className="block mb-1 text-sm text-gray-600"
              >
                Email Address
              </label>
              <div className="relative">
                <Mail
                  className="absolute text-gray-400 transform -translate-y-1/2 left-3 top-1/2"
                  size={20}
                />
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="Enter your email"
                  className="w-full p-3 pl-10 text-sm transition-all duration-300 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                />
              </div>
            </div>

            <div className="relative">
              <label
                htmlFor="password"
                className="block mb-1 text-sm text-gray-600"
              >
                Password
              </label>
              <div className="relative">
                <Lock
                  className="absolute text-gray-400 transform -translate-y-1/2 left-3 top-1/2"
                  size={20}
                />
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="Enter your password"
                  className="w-full p-3 pl-10 text-sm transition-all duration-300 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute text-gray-400 transition-colors transform -translate-y-1/2 right-3 top-1/2 hover:text-blue-500"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
              <a
                href="/reset-account-password"
                className="block mt-1 text-xs text-right text-blue-500 hover:underline"
              >
                Forgot Password?
              </a>
            </div>

            {error && (
              <p className="p-2 text-sm text-center text-red-500 rounded-md bg-red-50">
                {error}
              </p>
            )}

            {/* Submit button with loading state */}
            <button
              type="submit"
              disabled={isLoading}
              className="flex items-center justify-center w-full gap-2 p-3 text-sm font-semibold text-white transition-all duration-300 transform bg-blue-600 rounded-lg hover:bg-blue-700 hover:-translate-y-1 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <svg
                    className="w-5 h-5 mr-3 -ml-1 text-white animate-spin"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Logging In...
                </>
              ) : (
                <>
                  <LogIn size={20} />
                  Login
                </>
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              {`Don't`} have an account?{" "}
              <a
                href="/signup"
                onClick={onSwitchToSignup}
                className="font-semibold text-purple-700 hover:underline"
              >
                Sign Up
              </a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signin;
