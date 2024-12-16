import React, { useState } from "react";

const Signin = ({ onSwitchToSignup }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Both fields are required!");
    } else {
      setError("");
      console.log("Logged in successfully");
      alert("Login successful!");
    }
  };

  return (
    <div className="signup-page">
      <div className="signup-container">
        <h1 className="title">LOG-IN</h1>
        <i>
          <h2 className="message">Login to access your account</h2>
        </i>
        <form onSubmit={handleSubmit} className="flex">
          {/* Email Field */}
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password Field */}
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {error && <p className="error-message">{error}</p>}

          <input type="submit" value="Enter" className="submit" />
        </form>

        <p className="signin">
          {`Don't`} have an account?{" "}
          <a href="#" onClick={onSwitchToSignup}>
            Sign-up
          </a>
        </p>
      </div>
    </div>
  );
};

export default Signin;
