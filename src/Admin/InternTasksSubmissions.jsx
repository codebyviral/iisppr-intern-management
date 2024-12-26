import React, { useEffect, useState } from "react";
import CustomNavbar from "./CustomNavbar";
import axios from "axios";
import toast from "react-hot-toast";

const InternTasksSubmissions = () => {
  const [taskSubmissions, setTaskSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch submitted tasks from the API
  useEffect(() => {
    const fetchTaskSubmissions = async () => {
      try {
        const response = await fetch(
          "https://iisppr-backend.vercel.app/getsubmitedtasks"
        );
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

  const redirectToImage = (image) => {
    window.open(image, "_blank");
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 border-t-4 border-b-4 border-red-500 rounded-full animate-spin"></div>
          <p className="mt-4 text-lg font-semibold text-gray-700">
            Loading, please wait...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const markAsComplete = async (taskId) => {
    try {
      const reponse = await axios.delete(
        `https://iisppr-backend.vercel.app/task/delete-task/${taskId}`
      );
      if (
        reponse.status === 200 ||
        reponse.status === 204 ||
        reponse.status === 201
      ) {
        toast.success("Task marked as complete successfully");
        setTaskSubmissions((prevTasks) =>
          prevTasks.filter((task) => task.task !== taskId)
        );
      }
    } catch (error) {
      toast.error("Error marking task as complete");
      console.error("Error marking task as complete: ", error);
    }
  };

  return (
    <>
      <CustomNavbar />
      <div className="container mx-auto my-6 p-6">
        <h2 className="text-3xl font-semibold text-center mb-6">
          Intern Task Submissions
        </h2>
        <div className="bg-blue-100 border border-blue-300 text-blue-800 px-4 py-3 rounded relative mb-4">
          <span className="font-bold">Notice:</span> When you accept a task, the
          user will be notified that the task has been approved, and it will be
          removed from their side. If you reject a task, the user will be
          notified to re-submit their work. Task submissions will remain in the
          admin panel.
        </div>
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
                <th className="border-b p-3 text-left">Approve</th>
                <th className="border-b p-3 text-left">Resubmit</th>
              </tr>
            </thead>
            <tbody>
              {taskSubmissions.length > 0 ? (
                taskSubmissions.map((submission) => (
                  <tr key={submission._id}>
                    {/* Intern Name */}
                    <td className="border-b p-3">
                      {submission.user?.name || "N/A"}
                    </td>

                    {/* Task ID */}
                    <td className="border-b p-3">{submission.task || "N/A"}</td>

                    {/* Comments */}
                    <td className="border-b capitalize p-3">
                      {submission.comments || "No Comments"}
                    </td>

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
                          onClick={() => redirectToImage(submission.image)}
                          src={submission.image}
                          alt="Task Submission"
                          className="w-16 h-16 cursor-pointer object-cover rounded"
                        />
                      ) : (
                        "No Image"
                      )}
                    </td>

                    {/* Created At */}
                    <td className="border-b p-3">
                      {new Date(submission.createdAt).toLocaleString()}
                    </td>

                    {/* mark as complete */}
                    <td className="border-b p-3">
                      <button
                        onClick={() => markAsComplete(submission.task)}
                        className="bg-green-500 text-white px-2 py-1 rounded"
                      >
                        Accept
                      </button>{" "}
                    </td>

                    {/* Reject */}
                    <td className="border-b p-3">
                      <button
                        onClick={() => markAsComplete()}
                        className="bg-red-500 text-white px-2 py-1 rounded"
                      >
                        Reject
                      </button>{" "}
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
