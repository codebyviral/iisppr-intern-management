import React, { useState } from "react";
import Signup from "../Components/Signup";
import Signin from "../Components/Signin";
import { useAuthContext } from "../context/AuthContext";

const Logup = () => {
  const { loggedIn, setIsLoggedIn } = useAuthContext();
  const [isSignup, setIsSignup] = useState(loggedIn);
  const handleToggle = () => {
    setIsSignup(!isSignup);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#69385C] via-[#C08497] to-[#F3EEC3] bg-[length:300%_300%] animate-bg-ease">
      {isSignup ? (
        <Signup onSwitchToSignin={handleToggle} />
      ) : (
        <Signin onSwitchToSignup={handleToggle} />
      )}
    </div>
  );
};

export default Logup;
