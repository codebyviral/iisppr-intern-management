import { useState } from "react";
import { TopNavbar, Footer } from "@/Components/compIndex";
import { Mail, Lock, UserPlus, Phone } from "lucide-react";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import iispprLogo from "../assets/Images/iisprlogo.png";

const SignUp = ({ onSwitchToSignin }) => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const signUpUser = async () => {
    const signupURL = `${import.meta.env.VITE_BASE_URL}/api/auth/signup`;
    setIsLoading(true);
    const num = parseInt(phone);
    try {
      const response = await axios.post(signupURL, {
        name: fullName,
        email: email,
        password: password,
        rpassword: confirmPassword,
        mnumber: num,
        role: "intern",
        startDate: new Date().toISOString().split("T")[0],
      });
      toast.success("Account created successfully");
      navigate("/login");
    } catch (error) {
      if (error.response) {
        const { message } = error.response.data;
        if (message === "Email already exists.") {
          toast.error("This email is already registered. Try logging in.");
        } else if (message === "Password must be at least 6 characters.") {
          toast.error("Password must be at least 6 characters long.");
        } else if (message === "Passwords do not match.") {
          toast.error("Your passwords do not match. Please try again.");
        } else {
          toast.error(message || "Something went wrong.");
        }
      } else {
        // Generic error fallback
        toast.error("Network error. Please try again later.");
      }
    } finally {
      setIsLoading(false);
      window.scrollTo(0, 0);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!fullName || !email || !phone || !password || !confirmPassword) {
      toast.error("Please fill in all fields.");
      return;
    }

    if (phone.trim().length < 10 || isNaN(phone)) {
      toast.error("Please enter a valid phone number.");
      return;
    }
    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long.");
      return;
    }

    setError("");
    signUpUser();
  };

  // verify redirect issue
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
              Create Your Account
            </h1>
            <p className="text-sm text-gray-500">
              Sign up and enjoy all the benefits.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Full Name */}
            <div className="relative">
              <label
                htmlFor="fullName"
                className="block mb-1 text-sm text-gray-600"
              >
                Full Name
              </label>
              <div className="relative">
                <UserPlus
                  className="absolute text-gray-400 transform -translate-y-1/2 left-3 top-1/2"
                  size={20}
                />
                <input
                  type="text"
                  id="fullName"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Enter your full name"
                  className="w-full p-3 pl-10 text-sm transition-all duration-300 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                />
              </div>
            </div>

            {/* Email */}
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
                  placeholder="Enter your email"
                  className="w-full p-3 pl-10 text-sm transition-all duration-300 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                />
              </div>
            </div>

            {/* Phone */}
            <div className="relative">
              <label
                htmlFor="phone"
                className="block mb-1 text-sm text-gray-600"
              >
                Phone
              </label>
              <div className="relative">
                <Phone
                  className="absolute text-gray-400 transform -translate-y-1/2 left-3 top-1/2"
                  size={20}
                />
                <input
                  type="number"
                  id="phone"
                  value={phone}
                  onChange={(e) => {
                    setPhone(e.target.value);
                  }}
                  placeholder="Enter your Phone"
                  className="w-full p-3 pl-10 text-sm transition-all duration-300 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                />
              </div>
            </div>

            {/* Password */}
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
            </div>

            {/* Confirm Password */}
            <div className="relative">
              <label
                htmlFor="confirmPassword"
                className="block mb-1 text-sm text-gray-600"
              >
                Confirm Password
              </label>
              <div className="relative">
                <Lock
                  className="absolute text-gray-400 transform -translate-y-1/2 left-3 top-1/2"
                  size={20}
                />
                <input
                  type={showPassword ? "text" : "password"}
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm your password"
                  className="w-full p-3 pl-10 text-sm transition-all duration-300 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                />
              </div>
            </div>

            {/* Error message */}
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
                  Signing Up...
                </>
              ) : (
                <>
                  <UserPlus size={20} />
                  Sign Up
                </>
              )}
            </button>
          </form>

          {/* Switch to Signin */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <a
                href="/login"
                onClick={onSwitchToSignin}
                className="font-semibold text-blue-700 hover:underline"
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
