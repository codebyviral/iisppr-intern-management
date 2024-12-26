import React, { useEffect, useState } from "react";
import CustomNavbar from "./CustomNavbar";
import axios from "axios";
import toast from "react-hot-toast";
import { Alert, AlertDescription, AlertTitle } from "@/Components/ui/alert";
import { Loader } from "@/Components/compIndex";

const InternTasksSubmissions = () => {
  const [taskSubmissions, setTaskSubmissions] = useState([]);
  const [tasksMap, setTasksMap] = useState({}); // Map to store task ID -> task title
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const submissionsResponse = await fetch(
          "https://iisppr-backend.vercel.app/getsubmitedtasks"
        );
        if (!submissionsResponse.ok) {
          throw new Error("Failed to fetch task submissions");
        }
        const submissionsData = await submissionsResponse.json();

        const userIds = [
          ...new Set(
            submissionsData.map((sub) => sub.user?._id).filter(Boolean)
          ),
        ];

        const tasksMapping = {};
        await Promise.all(
          userIds.map(async (userId) => {
            try {
              const tasksResponse = await axios.get(
                `https://iisppr-backend.vercel.app/task/get-tasks/${userId}`
              );
              const tasksData = tasksResponse.data.tasksData;
              tasksData.forEach((task) => {
                tasksMapping[task._id] = task.title;
              });
            } catch (error) {
              console.error(`Error fetching tasks for user ${userId}:`, error);
            }
          })
        );

        setTasksMap(tasksMapping);
        setTaskSubmissions(submissionsData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, []);

  const redirectToImage = (image) => {
    window.open(image, "_blank");
  };

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const sendAcceptNotification = async (userId, taskId, message, status) => {
    axios.post("https://iisppr-backend.vercel.app/send/notification", {
      userId: userId,
      taskId: taskId,
      message: message,
      status: status,
    });
  };

  const markAsComplete = async (taskId, userId) => {
    try {
      const reponse = await axios.delete(
        `https://iisppr-backend.vercel.app/task/delete-task/${taskId}`
      );
      if (
        reponse.status === 200 ||
        reponse.status === 204 ||
        reponse.status === 201
      ) {
        sendAcceptNotification(
          userId,
          taskId,
          "Submission Approved",
          "Accepted"
        );
        toast.success("Task marked as complete successfully");
      }
    } catch (error) {
      toast.error("Error marking task as complete");
      console.error("Error marking task as complete: ", error);
    }
  };

  const markAsIncomplete = async (taskId, userId) => {
    try {
      axios.post("https://iisppr-backend.vercel.app/send/notification", {
        userId: userId,
        taskId: taskId,
        message: "Submission Rejected",
        status: "Rejected",
      });
      toast.success("Task marked as incomplete successfully");
    } catch (error) {
      toast.error("Error marking task as incomplete");
      console.error("Error marking task as incomplete: ", error);
    }
  };

  return (
    <>
      <CustomNavbar />
      <div className="container mx-auto my-6 p-6">
        <h2 className="text-3xl font-semibold text-center mb-6">
          Intern Task Submissions
        </h2>
        <div className="space-y-4">
          <Alert className="border-blue-200 bg-blue-50">
            <AlertTitle className="text-blue-800 font-semibold text-lg">
              Task Review Process
            </AlertTitle>
            <AlertDescription className="text-blue-700 mt-2">
              <div className="space-y-3">
                <p>
                  Upon task approval, the submitter will be automatically
                  notified and the task will be removed from their dashboard. In
                  case of rejection, they will receive a notification to revise
                  and resubmit their work. All submissions are permanently
                  archived in the administrative panel for reference.
                </p>
                <p className="border-t border-blue-200 pt-3">
                  The presence of a Task ID signifies that the submission has
                  been validated, received administrative approval, and has been
                  successfully processed from the {`user's`} perspective.
                </p>
              </div>
            </AlertDescription>
          </Alert>
        </div>

        <div className="overflow-x-auto mt-10 sm:hidden">
          {/* Mobile View: Vertical Layout */}
          {taskSubmissions.length > 0 ? (
            taskSubmissions.map((submission) => (
              <div
                key={submission._id}
                className="mb-4 p-4 border border-gray-300 rounded-lg"
              >
                <h3 className="font-semibold text-lg">
                  {submission.user?.name}
                </h3>
                <p>
                  <strong>Task:</strong>{" "}
                  {tasksMap[submission.task] || submission.task || "N/A"}
                </p>
                <p>
                  <strong>Comments:</strong>{" "}
                  {submission.comments || "No Comments"}
                </p>
                <p>
                  <strong>Created At:</strong>{" "}
                  {new Date(submission.createdAt).toLocaleString()}
                </p>
                {submission.file && (
                  <a
                    href={submission.file}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline"
                  >
                    View File
                  </a>
                )}
                {submission.image && (
                  <div
                    className="mt-2"
                    onClick={() => redirectToImage(submission.image)}
                  >
                    <img
                      src={submission.image}
                      alt="Task Submission"
                      className="w-16 h-16 cursor-pointer object-cover rounded"
                    />
                  </div>
                )}
                <div className="mt-2 space-x-2">
                  <button
                    onClick={() =>
                      markAsComplete(submission.task, submission.user?._id)
                    }
                    className="bg-green-500 text-white px-2 py-1 rounded"
                  >
                    Accept
                  </button>
                  <button
                    onClick={() =>
                      markAsIncomplete(submission.task, submission.user?._id)
                    }
                    className="bg-red-500 text-white px-2 py-1 rounded"
                  >
                    Reject
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div>No task submissions available.</div>
          )}
        </div>

        <div className="overflow-x-auto mt-10 hidden sm:block">
          {/* Desktop View: Horizontal Table Layout */}
          <table className="min-w-full table-auto border-collapse border border-gray-300">
            <thead>
              <tr>
                <th className="border-b p-3 text-left text-sm sm:text-base">
                  Intern Name
                </th>
                <th className="border-b p-3 text-left text-sm sm:text-base">
                  Task
                </th>
                <th className="border-b p-3 text-left text-sm sm:text-base">
                  Comments
                </th>
                <th className="border-b p-3 text-left text-sm sm:text-base">
                  File
                </th>
                <th className="border-b p-3 text-left text-sm sm:text-base">
                  Image
                </th>
                <th className="border-b p-3 text-left text-sm sm:text-base">
                  Created At
                </th>
                <th className="border-b p-3 text-left text-sm sm:text-base">
                  Approve
                </th>
                <th className="border-b p-3 text-left text-sm sm:text-base">
                  Resubmit
                </th>
              </tr>
            </thead>
            <tbody>
              {taskSubmissions.length > 0 ? (
                taskSubmissions.map((submission) => (
                  <tr key={submission._id}>
                    {/* Intern Name */}
                    <td className="border-b p-3 text-sm sm:text-base">
                      {submission.user?.name || "N/A"}
                    </td>

                    {/* Task Title */}
                    <td className="border-b p-3 text-sm sm:text-base">
                      {tasksMap[submission.task] || submission.task || "N/A"}
                    </td>

                    {/* Comments */}
                    <td className="border-b capitalize p-3 text-sm sm:text-base">
                      {submission.comments || "No Comments"}
                    </td>

                    {/* File */}
                    <td className="border-b p-3 text-sm sm:text-base">
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
                    <td className="border-b p-3 text-sm sm:text-base">
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
                    <td className="border-b p-3 text-sm sm:text-base">
                      {new Date(submission.createdAt).toLocaleString()}
                    </td>

                    {/* Approve */}
                    <td className="border-b p-3 text-sm sm:text-base">
                      <button
                        onClick={() =>
                          markAsComplete(submission.task, submission.user?._id)
                        }
                        className="bg-green-500 text-white px-2 py-1 rounded"
                      >
                        Accept
                      </button>
                    </td>

                    {/* Reject */}
                    <td className="border-b p-3 text-sm sm:text-base">
                      <button
                        onClick={() =>
                          markAsIncomplete(
                            submission.task,
                            submission.user?._id
                          )
                        }
                        className="bg-red-500 text-white px-2 py-1 rounded"
                      >
                        Reject
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="p-3 text-center">
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
