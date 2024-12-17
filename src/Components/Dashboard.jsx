import { useNavigate } from "react-router-dom";
import { CoreDashboard } from "./compIndex";

const Dashboard = () => {
  const navigate = useNavigate();
  return (
    <>
      <CoreDashboard />
    </>
  );
};

export default Dashboard;
