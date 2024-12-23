import { useState, useEffect } from "react";
import { Wrapper  } from "@/Components/compIndex";
import CustomNavbar from "./CustomNavbar";
const AdminReport = () => {
  // Hardcoded reports data to simulate API fetch
  const [reports, setReports] = useState([]);

  useEffect(() => {
    // Simulating an API call with hardcoded data
    const fetchedReports = [
      {
        employee: "John Doe",
        department: "Marketing",
        date: "2024-12-20",
        tasksCompleted: "Completed social media campaign.",
        tasksToBegin: "Prepare for next month's email marketing.",
        comments: "Successful campaign, looking forward to the next phase.",
      },
      {
        employee: "Jane Smith",
        department: "Engineering",
        date: "2024-12-19",
        tasksCompleted: "Completed code review for version 2.0.",
        tasksToBegin: "Work on bug fixes for version 2.1.",
        comments: "Reviewed all PRs, need to focus on fixing reported bugs.",
      },
      {
        employee: "Alice Johnson",
        department: "Sales",
        date: "2024-12-18",
        tasksCompleted: "Closed 5 deals this week.",
        tasksToBegin: "Follow up with potential leads next week.",
        comments: "Looking forward to hitting next week's target.",
      },
    ];

    // Simulate setting fetched data after an API call
    setReports(fetchedReports);
  }, []);

  return (
    <>
      <CustomNavbar/>
      <Wrapper>
        <div className="min-h-screen bg-white p-4 md:p-8">
          <h2 className="text-center text-3xl font-bold text-[#007bff] mb-6">
            Employee Weekly Reports
          </h2>

          {/* Display the list of reports */}
          {reports.length === 0 ? (
            <p className="text-center text-gray-500">No reports available.</p>
          ) : (
            <div className="space-y-6">
              {reports.map((report, index) => (
                <div
                  key={index}
                  className="border border-gray-300 rounded-md p-6 shadow-md hover:bg-gray-100"
                >
                  <h3 className="text-xl font-semibold text-[#007bff]">{report.employee}</h3>
                  <p className="text-sm text-gray-700">
                    <strong>Department:</strong> {report.department}
                  </p>
                  <p className="text-sm text-gray-500">
                    <strong>Date:</strong> {new Date(report.date).toLocaleDateString()}
                  </p>
                  <div className="mt-4">
                    <p className="text-sm text-gray-700">
                      <strong>Tasks Completed:</strong> {report.tasksCompleted}
                    </p>
                    <p className="text-sm text-gray-700">
                      <strong>Tasks to Begin Next Week:</strong> {report.tasksToBegin}
                    </p>
                    <p className="text-sm text-gray-700">
                      <strong>Self-Assessment & Comments:</strong> {report.comments}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </Wrapper>

      
    </>
  );
};

export default AdminReport;
