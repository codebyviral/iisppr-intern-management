import { useState } from "react";
import { Navbar, SideNav } from "@/Components/compIndex";
import { Mail, Lock, UserPlus, Phone } from "lucide-react";
import toast from "react-hot-toast";
import axios from "axios";
import { signupURL, localSignupUrl } from "@/Components/URIs";
import { useNavigate } from "react-router-dom";


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
    setIsLoading(true);
    try {
      const response = await axios.post(localSignupUrl, {
        name: fullName,
        mnumber: phone,
        email: email,
        password: password,
        rpassword: confirmPassword,
      });
      toast.success("Account created successfully");
      navigate("/login");
    } catch (error) {
      console.log(`Error: ${error}`);
      toast.error(`Something went wrong.`);
    } finally {
      setIsLoading(false);
      window.scrollTo(0, 0);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!fullName || !email || !password || password !== confirmPassword) {

      toast.error("Please fill in all fields.");
    } else {
      setError("");
      signUpUser();

    }
  };
  // verify redirect issue
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
            {/* Full Name */}
            <div className="relative">
              <label
                htmlFor="fullName"
                className="block text-sm text-gray-600 mb-1"
              >
                Full Name
              </label>
              <div className="relative">
                <UserPlus
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <input
                  type="text"
                  id="fullName"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Enter your full name"
                  className="pl-10 p-3 border border-gray-200 rounded-lg text-sm w-full focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all duration-300"
                />
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
                  placeholder="Enter your email"
                  className="pl-10 p-3 border border-gray-200 rounded-lg text-sm w-full focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all duration-300"
                />
              </div>
            </div>

            {/* Phone */}
            <div className="relative">
              <label
                htmlFor="phone"
                className="block text-sm text-gray-600 mb-1"
              >
                Phone
              </label>
              <div className="relative">
                <Phone
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <input
                  type="number"
                  id="phone"
                  value={phone}
                  onChange={(e) => {
                    setPhone(parseInt(e.target.value));
                  }}
                  placeholder="Enter your Phone"
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

            {/* Submit button with loading state */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 text-white p-3 rounded-lg text-sm font-semibold 
              hover:bg-blue-700 transition-all duration-300 flex items-center justify-center gap-2
              transform hover:-translate-y-1 hover:shadow-lg
              disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
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
