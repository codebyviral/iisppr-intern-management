import { useState } from "react";
import { Navbar, SideNav } from "@/Components/compIndex";
import { Mail, Lock, UserPlus } from "lucide-react"; // Adding icons for visual interest

const SignUp = ({ onSwitchToSignin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password || password !== confirmPassword) {
      setError("Please fill in all fields and make sure passwords match.");
    } else {
      setError("");
      console.log("Registered successfully");
      alert("Signup successful!");
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
              Create Your Account
            </h1>
            <p className="text-sm text-gray-500">
              Sign up and enjoy all the benefits.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name fields */}
            <div className="flex space-x-4">
              <div className="w-1/2">
                <label
                  htmlFor="firstName"
                  className="block text-sm text-gray-600 mb-1"
                >
                  First Name
                </label>
                <div className="relative">
                  <UserPlus
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                    size={20}
                  />
                  <input
                    type="text"
                    id="firstName"
                    required
                    className="pl-10 p-3 border border-gray-200 rounded-lg text-sm w-full focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all duration-300"
                    placeholder="Enter your first name"
                  />
                </div>
              </div>

              <div className="w-1/2">
                <label
                  htmlFor="lastName"
                  className="block text-sm text-gray-600 mb-1"
                >
                  Last Name
                </label>
                <div className="relative">
                  <UserPlus
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                    size={20}
                  />
                  <input
                    type="text"
                    id="lastName"
                    required
                    className="pl-10 p-3 border border-gray-200 rounded-lg text-sm w-full focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all duration-300"
                    placeholder="Enter your last name"
                  />
                </div>
              </div>
            </div>

            {/* Email */}
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

            {/* Password */}
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
            </div>

            {/* Confirm Password */}
            <div className="relative">
              <label
                htmlFor="confirmPassword"
                className="block text-sm text-gray-600 mb-1"
              >
                Confirm Password
              </label>
              <div className="relative">
                <Lock
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <input
                  type={showPassword ? "text" : "password"}
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  placeholder="Confirm your password"
                  className="pl-10 p-3 border border-gray-200 rounded-lg text-sm w-full focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all duration-300"
                />
              </div>
            </div>

            {/* Error message */}
            {error && (
              <p className="text-red-500 text-sm text-center bg-red-50 p-2 rounded-md">
                {error}
              </p>
            )}

            {/* Submit button */}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white p-3 rounded-lg text-sm font-semibold 
              hover:bg-blue-700 transition-all duration-300 flex items-center justify-center gap-2
              transform hover:-translate-y-1 hover:shadow-lg"
            >
              <UserPlus size={20} />
              Sign Up
            </button>
          </form>

          {/* Switch to Signin */}
          <div className="text-center mt-6">
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <a
                href="/login"
                onClick={onSwitchToSignin}
                className="text-blue-700 font-semibold hover:underline"
              >
                Log In
              </a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;