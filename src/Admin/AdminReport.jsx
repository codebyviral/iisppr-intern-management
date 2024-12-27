import { useState, useEffect } from "react";
import { Loader, Wrapper } from "@/Components/compIndex";
import CustomNavbar from "./CustomNavbar";

const AdminReport = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Function to fetch reports from API
    const fetchReports = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BASE_URL}/weeklystatus/reports`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch reports");
        }
        const data = await response.json();

        const formattedData = data.map((report) => ({
          employee: report.employee,
          department: report.department,
          date: report.date,
          tasksCompleted: report.tasksCompleted,
          tasksToBegin: report.tasksToBeginNextWeek,
          comments: report.selfAssessmentComments,
        }));
        setReports(formattedData);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchReports();
  }, []);



  return (
    <>
      <CustomNavbar />
      <Wrapper>
        <div className="min-h-screen bg-white p-4 md:p-8 flex justify-center lg:mr-44">
          <div className="w-full max-w-4xl space-y-6">
            <h2 className="text-center text-2xl md:text-3xl font-bold text-[#007bff] mb-6">
              Employee Weekly Reports
            </h2>

            {loading ? (
              <Loader />
            ) : error ? (
              <p className="text-center text-red-500">Error: {error}</p>
            ) : reports.length === 0 ? (
              <p className="text-center text-gray-500">No reports available.</p>
            ) : (
              <div>
                {reports.map((report, index) => (
                  <div
                    key={index}
                    className="border border-gray-300 rounded-md p-4 sm:p-6 md:p-8 shadow-md hover:bg-gray-100 mb-4"
                  >
                    <h3 className="text-xl sm:text-2xl font-semibold text-[#007bff]">
                      {report.employee}
                    </h3>
                    <p className="text-sm sm:text-base text-gray-700">
                      <strong>Department:</strong> {report.department}
                    </p>
                    <p className="text-sm sm:text-base text-gray-500">
                      <strong>Date:</strong>{" "}
                      {new Date(report.date).toLocaleDateString()}
                    </p>
                    <div className="mt-4">
                      <p className="text-sm sm:text-base text-gray-700">
                        <strong>Tasks Completed:</strong>{" "}
                        {report.tasksCompleted}
                      </p>
                      <p className="text-sm sm:text-base text-gray-700">
                        <strong>Tasks to Begin Next Week:</strong>{" "}
                        {report.tasksToBegin}
                      </p>
                      <p className="text-sm sm:text-base text-gray-700">
                        <strong>Self-Assessment & Comments:</strong>{" "}
                        {report.comments}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </Wrapper>
    </>
  );
};

export default AdminReport;
