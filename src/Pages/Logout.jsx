import { Navigate } from "react-router-dom";
import { useEffect } from "react";
import { useAuthContext } from "@/context/AuthContext";
import { toast } from "react-hot-toast";

const Logout = () => {
  const { LogoutUser } = useAuthContext();
  useEffect(() => {
    LogoutUser();
    toast.success(`Logged out`);
  }, []);
  return <Navigate to="/login" />;
};

export default Logout;
