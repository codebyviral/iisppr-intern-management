import React, { useEffect, useState } from "react";
import CustomNavbar from "./CustomNavbar";

const InternTasksSubmissions = () => {
  const [taskSubmissions, setTaskSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch submitted tasks from the API
  useEffect(() => {
    const fetchTaskSubmissions = async () => {
      try {
        const response = await fetch("https://iisppr-backend.vercel.app/getsubmitedtasks");
        if (!response.ok) {
          throw new Error("Failed to fetch task submissions");
        }
        const data = await response.json();
        setTaskSubmissions(data); // Store the fetched data
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTaskSubmissions();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <CustomNavbar />
      <div className="container mx-auto my-6 p-6">
        <h2 className="text-3xl font-semibold text-center mb-6">Intern Task Submissions</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border-collapse border border-gray-300">
            <thead>
              <tr>
                <th className="border-b p-3 text-left">Intern Name</th>
                <th className="border-b p-3 text-left">Task ID</th>
                <th className="border-b p-3 text-left">Comments</th>
                <th className="border-b p-3 text-left">File</th>
                <th className="border-b p-3 text-left">Image</th>
                <th className="border-b p-3 text-left">Created At</th>
              </tr>
            </thead>
            <tbody>
              {taskSubmissions.length > 0 ? (
                taskSubmissions.map((submission) => (
                  <tr key={submission._id}>
                    {/* Intern Name */}
                    <td className="border-b p-3">{submission.user?.name || "N/A"}</td>

                    {/* Task ID */}
                    <td className="border-b p-3">{submission.task || "N/A"}</td>

                    {/* Comments */}
                    <td className="border-b p-3">{submission.comments || "No Comments"}</td>

                    {/* File */}
                    <td className="border-b p-3">
                      {submission.file ? (
                        <a
                          href={submission.file}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-500 hover:underline"
                        >
                          View File
                        </a>
                      ) : (
                        "No File"
                      )}
                    </td>

                    {/* Image */}
                    <td className="border-b p-3">
                      {submission.image ? (
                        <img
                          src={submission.image}
                          alt="Task Submission"
                          className="w-16 h-16 object-cover rounded"
                        />
                      ) : (
                        "No Image"
                      )}
                    </td>

                    {/* Created At */}
                    <td className="border-b p-3">
                      {new Date(submission.createdAt).toLocaleString()}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="p-3 text-center">
                    No task submissions available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default InternTasksSubmissions;
