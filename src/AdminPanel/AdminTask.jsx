import React, { useState, useEffect } from "react";
import CustomNavbar from "./CustomNavbar";

export default function AdminTask() {
 
  const [task, setTask] = useState({
    assignedTo: "",
    title: "",
    description: "",
    startDate: "",
    endDate: "",
    status: "pending", // Default status
  });
  // const [tasks, setTasks] = useState([]); // State to store the list of tasks
  const [successMessage, setSuccessMessage] = useState(""); 
 const  [isLoading,setIsLoading] =useState(false);

  // Handle input change and update the state
  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask((prevTask) => ({
      ...prevTask,
      [name]: value,
    }));
  };

  // Handle form submission and send the data to the API
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch("https://iisppr-backend.vercel.app/task/add-task", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(task),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();
      console.log("Task successfully assigned:", data);

      // Display success message
      setSuccessMessage("Task successfully assigned!");

      // Reset the form after successful submission
      setTask({
        assignedTo: "",
        title: "",
        description: "",
        startDate: "",
        endDate: "",
        status: "pending",
      });

      // Clear success message after 5 seconds
      setTimeout(() => {
        setSuccessMessage("");
      }, 5000);
    } catch (error) {
      console.error("Error while assigning task:", error.message);
    }
    finally{
      setIsLoading(false);
    }
  };

  return (
    <>
      <CustomNavbar />
      <div className="min-h-screen flex">
        {/* Left side: Task Assignment Form */}
        <div className="w-1/2 bg-white p-8 shadow-md flex flex-col justify-between border-2">
          <h2 className="text-2xl font-semibold text-blue-600">Task Assigning</h2>
          {successMessage && (
            <div className="bg-green-100 text-green-800 p-4 rounded-md mb-4">
              {successMessage}
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex flex-col">
              <label className="text-gray-700" htmlFor="assignedTo">
                Assign to (User ID)
              </label>
              <input
                type="text"
                id="assignedTo"
                name="assignedTo"
                value={task.assignedTo}
                onChange={handleChange}
                placeholder="Enter User ID"
                className="mt-2 p-2 border border-gray-300 rounded-md"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-gray-700" htmlFor="title">
                Task Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={task.title}
                onChange={handleChange}
                placeholder="Enter task title"
                className="mt-2 p-2 border border-gray-300 rounded-md"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-gray-700" htmlFor="description">
                Task Description
              </label>
              <textarea
                id="description"
                name="description"
                value={task.description}
                onChange={handleChange}
                placeholder="Enter task description"
                className="mt-2 p-2 border border-gray-300 rounded-md"
              ></textarea>
            </div>

            <div className="flex flex-col">
              <label className="text-gray-700" htmlFor="startDate">
                Start Date
              </label>
              <input
                type="datetime-local"
                id="startDate"
                name="startDate"
                value={task.startDate}
                onChange={handleChange}
                className="mt-2 p-2 border border-gray-300 rounded-md"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-gray-700" htmlFor="endDate">
                End Date
              </label>
              <input
                type="datetime-local"
                id="endDate"
                name="endDate"
                value={task.endDate}
                onChange={handleChange}
                className="mt-2 p-2 border border-gray-300 rounded-md"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-300 mt-4"
            >
              {isLoading ? "Assigning..." :"Assign Task"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
