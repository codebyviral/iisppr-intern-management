import { Bell } from "lucide-react";
import { useNavigate } from "react-router-dom";

const NotiBadge = ({ count }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => {
        navigate("/notifications");
      }}
      className="relative text-gray-500 mr-5 cursor-pointer"
    >
      <Bell className="w-6 h-6" />
      {/* Notification Badge */}
      {count > 0 && (
        <>
          <span
            className="absolute -top-1 left-7 bg-red-500 text-white text-xs 
            rounded-full w-4 h-4 flex items-center justify-center"
          >
            {count}
          </span>
          <span
            className="absolute -top-1 left-7 bg-red-500 text-white text-xs 
            rounded-full w-4 h-4 animate-ping opacity-75"
          ></span>
        </>
      )}
    </div>
  );
};

export default NotiBadge;
