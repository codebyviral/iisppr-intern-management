import React, { useState } from "react";

const SignUp = ({ onSwitchToSignin }) => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match!");
    } else {
      setError("");
      console.log("Form submitted successfully");
      alert("Signup successful!");

      e.target.reset();
      setPassword("");
      setConfirmPassword("");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-[#69385C] via-[#C08497] to-[#F7AF9D] bg-[length:300%_300%] animate-bg-ease px-4 sm:px-6 md:px-8">

      <div className="bg-white p-6 rounded-lg w-full max-w-lg shadow-lg">

        <h1 className="text-2xl font-semibold text-blue-800 text-center mb-1">REGISTER</h1>
        <i><h2 className="text-sm text-gray-600 text-center mb-5">Sign-up to get full access to our app!</h2></i>
        <form onSubmit={handleSubmit} className="flex flex-col gap-2">

          <div className="flex gap-2"> 

            <div className="flex flex-col gap-1 w-1/2 pr-2">
              <label htmlFor="firstName" className="text-sm text-gray-600">First Name</label>
              <input type="text" id="firstName" required className="p-2 border rounded-md text-sm border-gray-300" />
            </div>

            <div className="flex flex-col gap-1 w-1/2 pl-2 pr-2 sm:pr-0">
              <label htmlFor="lastName" className="text-sm text-gray-600">Last Name</label>
              <input type="text" id="lastName" required className="p-2 border rounded-md text-sm border-gray-300" />
            </div>

          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="email" className="text-sm text-gray-600">Email</label>
            <input type="email" id="email" required className="p-2 border rounded-md text-sm border-gray-300" />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="dob" className="text-sm text-gray-600">Date of Birth</label>
            <input type="date" id="dob" required className="p-2 border rounded-md text-sm border-gray-300" />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="password" className="text-sm text-gray-600">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="p-2 border rounded-md text-sm border-gray-300"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="confirmPassword" className="text-sm text-gray-600">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="p-2 border rounded-md text-sm border-gray-300"
            />
          </div>

          {error && <p className="text-red-500 text-xs text-center mt-2">{error}</p>}
          <input
            type="submit"
            value="Submit"
            className="mt-2 p-2 bg-blue-500 text-white rounded-lg cursor-pointer transition-all duration-300 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

        </form>

        <p className="text-xs text-gray-600 text-center mt-3">
          Already have an account?{" "}
          <a href="#" onClick={onSwitchToSignin} className="text-purple-700 hover:underline">
            Sign-in
          </a>
        </p>

      </div>
    </div>
  );
};

export default SignUp;
