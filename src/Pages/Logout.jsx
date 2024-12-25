import { Navigate } from "react-router-dom";
import { useEffect } from "react";
import { useAuthContext } from "@/context/AuthContext";
import { useAppContext } from "@/context/AppContext";
import { toast } from "react-hot-toast";

const Logout = () => {
  const { LogoutUser } = useAuthContext();
  const {setNotiCounter} = useAppContext();
  useEffect(() => {
    setNotiCounter(0);
    LogoutUser();
    toast.success(`Logged out`);
  }, []);
  return <Navigate to="/login" />;
};

export default Logout;
