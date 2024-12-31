import React, { useEffect, useState } from "react";
import CustomNavbar from "./CustomNavbar";
import axios from "axios";
import toast from "react-hot-toast";
import { Alert, AlertDescription } from "@/Components/ui/alert";
import { Loader } from "@/Components/compIndex";
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
import { InfoIcon, CheckCircle2, XCircle, X } from "lucide-react";
import Swal from "sweetalert2";

const InternTasksSubmissions = () => {
  const [taskSubmissions, setTaskSubmissions] = useState([]);
  const [tasksMap, setTasksMap] = useState({}); // Map to store task ID -> task title
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modal, setModal] = useState(false);

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const submissionsResponse = await fetch(
          `${import.meta.env.VITE_BASE_URL}/getsubmitedtasks`
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
                `${import.meta.env.VITE_BASE_URL}/task/get-tasks/${userId}`
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
    axios.post(`${import.meta.env.VITE_BASE_URL}/send/notification`, {
      userId: userId,
      taskId: taskId,
      message: message,
      status: status,
    });
  };

  const markAsComplete = async (taskId, userId) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "Do you want to mark this task as complete?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#2A6AED",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, mark it!",
      });

      if (result.isConfirmed) {
        await sendAcceptNotification(
          userId,
          taskId,
          "Submission Approved",
          "Accepted"
        );

        toast.success("Task marked as complete successfully");
        await Swal.fire(
          "Marked!",
          "The task has been marked as complete.",
          "success"
        );
      }
    } catch (error) {
      console.error("Error marking task as complete: ", error);
      toast.error("Error marking task as complete");
      await Swal.fire(
        "Error!",
        "There was an issue marking the task as complete.",
        "error"
      );
    }
  };

  const markAsIncomplete = async (taskId, userId) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "Do you want to mark this task as incomplete?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#2A6AED",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, mark it!",
      });

      if (result.isConfirmed) {
        const res = await axios.post(
          `${import.meta.env.VITE_BASE_URL}/send/notification`,
          {
            userId: userId,
            taskId: taskId,
            message: "Submission Rejected",
            status: "Rejected",
          }
        );

        if (res.status === 200 || res.status === 201) {
          await Swal.fire(
            "Marked!",
            "The task has been marked as incomplete.",
            "success"
          );
        }
      }
    } catch (error) {
      console.error("Error marking task as incomplete: ", error);
      toast.error("Error marking task as incomplete");
      await Swal.fire(
        "Error!",
        "There was an issue marking the task as incomplete.",
        "error"
      );
    }
  };

  const deleteTask = async (taskId) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      confirmButtonColor: "#2A6AED",
    });

    if (result.isConfirmed) {
      try {
        const res = await axios.delete(
          `${import.meta.env.VITE_BASE_URL}/task/delete-task/${taskId}`
        );

        if (res.status === 200 || res.status === 204 || res.status === 201) {
          Swal.fire("Deleted!", "Your item has been deleted.", "success");
        }
      } catch (error) {
        console.error("Error deleting task: ", error);
        Swal.fire("Error!", "There was an issue deleting the task.", "error");
      }
    }
  };

  return (
    <>
      <CustomNavbar />
      <div className="container mx-auto my-6 p-6">
        <h2
          onClick={() => {
            Swal.fire({
              title:
                '<div class="text-xl font-semibold text-gray-800 mb-2">Task Acceptance and Rejection Process</div>',
              html: `
              <div class="space-y-4 text-left p-2">
                <!-- Accept Section -->
                <div class="flex items-start gap-3 bg-green-50 p-4 rounded-lg border border-green-200">
                  <div class="mt-1">
                    <svg class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                  </div>
                  <div>
                    <h4 class="font-semibold text-green-700 text-lg mb-1">Accept</h4>
                    <p class="text-green-600 leading-relaxed">
                      Task is approved, and the user is notified. The task will be 
                      <span class="font-semibold text-red-600">deleted</span> 
                      from the database, but all submission details, files, and links will be archived in the admin panel for reference.
                    </p>
                  </div>
                </div>
        
                <!-- Reject Section -->
                <div class="flex items-start gap-3 bg-red-50 p-4 rounded-lg border border-red-200">
                  <div class="mt-1">
                    <svg class="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                  </div>
                  <div>
                    <h4 class="font-semibold text-red-700 text-lg mb-1">Reject</h4>
                    <p class="text-red-600 leading-relaxed">
                      User is notified for revision with an option to resubmit the task.
                    </p>
                  </div>
                </div>
        
                <!-- Important Note -->
                <div class="flex items-start gap-3 bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <div class="mt-1">
                    <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                  </div>
                  <div>
                    <span class="font-semibold text-blue-700">Important:</span>
                    <p class="text-blue-600 leading-relaxed">
                      No need to worry, as all task submissions will be securely saved in the admin panel for future reference.
                    </p>
                  </div>
                </div>
              </div>
            `,
              showCancelButton: true,
              cancelButtonText: "Close",
              showConfirmButton: false,
              width: "600px",
              padding: "2rem",
              showCloseButton: true,
              customClass: {
                popup: "rounded-xl",
                cancelButton:
                  "px-6 py-2.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200",
                actions: "mt-4",
                container: "font-sans",
              },
              buttonsStyling: false,
            });
          }}
          className="text-3xl underline cursor-pointer font-semibold text-center mb-6"
        >
          Intern Task Submissions
        </h2>
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
                <th className="border-b p-3 text-left text-sm sm:text-base">
                  Delete
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
                      {tasksMap[submission.task] ? (
                        tasksMap[submission.task]
                      ) : (
                        <p className="text-red-500 uppercase">approved</p>
                      )}
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

                    {/* Delete */}
                    <td className="border-b p-3 text-sm sm:text-base">
                      <button
                        onClick={() => deleteTask(submission.task)}
                        className="bg-blue-500 text-white px-2 py-1 rounded"
                      >
                        Delete
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
