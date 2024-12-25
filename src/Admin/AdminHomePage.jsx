import CustomNavbar from "./CustomNavbar";
import { Link } from "react-router-dom";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement, 
  Title,
  Tooltip,
  Legend
);



function AdminHomePage() {
  const chartData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "interns",
        data: [65, 59, 80, 81, 56, 55],
        borderColor: "rgba(75,192,192,1)",
        backgroundColor: "rgba(75,192,192,0.2)",
        fill: true,
      },
    ],
  };

  return (
    <>
      <CustomNavbar />
      <div className="main-container ">
      <div className="container mx-auto p-4 overflow-x-hidden "> 
        <div className="flex flex-col" style={{ paddingLeft: "1rem" }}> 
          <div className="mb-2">
            <h1 className="text-3xl font-semibold text-center">Welcome Admin</h1>
          </div>

          <div className="grid grid-cols-4 gap-6">
            <div className="space-y-6">
              <Link to="/allusers">
                <div className="bg-blue-950 text-white p-12 rounded-lg shadow-lg hover:bg-blue-900 transition w-80 h-32 text-center ">
                  All users
                </div>
              </Link>

              <Link to="/internattendance">
              <div className="bg-blue-950 text-white p-12 rounded-lg shadow-lg hover:bg-blue-900 transition w-80 h-32 mt-5 text-center">
                Intern Attendance
              </div>
              </Link>
              <Link to="/leaveapplication">
              <div className="bg-blue-950 text-white p-12 rounded-lg shadow-lg hover:bg-blue-900 transition w-80 h-32 mt-5 text-center">
               Leave Applications
              </div>
              </Link>
            </div>

            <div className="space-y-6 col-span-2 hidden sm:hidden md:block">
              <div className="bg-white p-12 rounded-lg shadow-lg h-[400px] w-[680px] ml-6">
                <h2 className="text-xl font-semibold mb-2">Interns Chart</h2>
                <Line data={chartData} options={{ maintainAspectRatio: false }} />
              </div>
            </div>
          </div>

          <div className="mt-6 flex flex-col sm:flex-row gap-y-8 sm:gap-x-8">
  <Link
    to="/adminhelppage"
    className="bg-blue-950 text-white p-12 rounded-lg shadow-lg hover:bg-blue-900 transition block w-80 h-32 text-center"
  >
   Help
  </Link>
  <Link
    to="/interntasksubmissions"
    className="bg-blue-950 text-white p-12 rounded-lg shadow-lg hover:bg-blue-900 transition block w-80 h-32 text-center"
  >
    Task Submissions
  </Link>
  <Link
    to="/Projectmanagement"
    className="bg-blue-950 text-white p-12 rounded-lg shadow-lg hover:bg-blue-900 transition block w-80 h-32 text-center"
  >
    Projects
  </Link>
</div>
        </div>
      </div>
      </div>
    </>
  );
}

export default AdminHomePage;
