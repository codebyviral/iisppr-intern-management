import React, { useState } from "react";
import { Navbar, SideNav } from "@/Components/compIndex";
import { Mail, Lock, LogIn } from "lucide-react"; // Adding icons for visual interest

const Signin = ({ onSwitchToSignup }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Oops! All fields are mandatory and you missed out something!");
    } else {
      setError("");
      console.log("Logged in successfully");
      alert("Login was successful!");
    }
  };

  return (
    <>
      <Navbar />
      <SideNav />
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 px-4">
        <div className="bg-white p-8 rounded-xl w-full max-w-md shadow-2xl border border-gray-100 transition-all duration-300 hover:shadow-3xl">
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold text-blue-800 mb-2">
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
                className="block text-sm text-gray-600 mb-1"
              >
                Email Address
              </label>
              <div className="relative">
                <Mail
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="Enter your email"
                  className="pl-10 p-3 border border-gray-200 rounded-lg text-sm w-full focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all duration-300"
                />
              </div>
            </div>

            <div className="relative">
              <label
                htmlFor="password"
                className="block text-sm text-gray-600 mb-1"
              >
                Password
              </label>
              <div className="relative">
                <Lock
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="Enter your password"
                  className="pl-10 p-3 border border-gray-200 rounded-lg text-sm w-full focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all duration-300"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-blue-500 transition-colors"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
              <a
                href="#"
                className="text-xs text-blue-500 hover:underline mt-1 block text-right"
              >
                Forgot Password?
              </a>
            </div>

            {error && (
              <p className="text-red-500 text-sm text-center bg-red-50 p-2 rounded-md">
                {error}
              </p>
            )}

            <button
              type="submit"
              className="w-full bg-blue-600 text-white p-3 rounded-lg text-sm font-semibold 
              hover:bg-blue-700 transition-all duration-300 flex items-center justify-center gap-2
              transform hover:-translate-y-1 hover:shadow-lg"
            >
              <LogIn size={20} />
              Log In
            </button>
          </form>

          <div className="text-center mt-6">
            <p className="text-sm text-gray-600">
              {`Don't`} have an account?{" "}
              <a
                href="/signup"
                onClick={onSwitchToSignup}
                className="text-purple-700 font-semibold hover:underline"
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
