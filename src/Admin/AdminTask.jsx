import React, { useState, useEffect } from "react";
import CustomNavbar from "./CustomNavbar";
import axios from "axios";
import toast from "react-hot-toast";
import {  getTasks } from "../Components/URIs";

import { useAppContext } from "@/context/AppContext";
export default function AdminTask() {
  
  const [loading, setLoading] = useState(true);
  const [task, setTask] = useState({
    assignedTo: "",
    title: "",
    description: "",
    startDate: "",
    endDate: "",
    status: "pending", // Default status
  });

  const [tasks, setTasks] = useState([]); // List of tasks assigned to the user
  const [successMessage, setSuccessMessage] = useState(""); 
  const [isLoading, setIsLoading] = useState(false);
  const {  setNotiCounter} =
  useAppContext();


  const fetchTasks = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${getTasks}/${localStorage.getItem("userId")}`
      );
      console.log(response.data.tasksData)
      const fetchedTasks = response.data.tasksData;
      setTasks(fetchedTasks);
      setNotiCounter(fetchedTasks.length);
    } catch (error) {
      toast.error(`Error Fetching Tasks`);
    } finally {
      setLoading(false);
    }
  };



  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask((prevTask) => ({
      ...prevTask,
      [name]: value,
    }));
  };

 
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

      console.log(task.assignedTo)
      // Fetch the updated task list (you can pass the appropriate user ID)
      fetchTasks(task.assignedTo); 

    } catch (error) {
      console.error("Error while assigning task:", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle Task Update
  const handleUpdate = async (taskId) => {
    const updatedTask = { ...task, status: "completed" }; // Example of updating task's status
    try {
      const response = await fetch(`https://iisppr-backend.vercel.app/task/update-task/${taskId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedTask),
      });

      if (response.ok) {
        const updatedData = await response.json();
        console.log("Task updated:", updatedData);
        fetchTasks(task.assignedTo); 
      } else {
        console.error("Error updating task");
      }
    } catch (error) {
      console.error("Error updating task:", error.message);
    }
  };

  const handleDelete = async (taskId) => {
    try {
      const response = await fetch(`https://iisppr-backend.vercel.app/task/delete-task/${taskId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        console.log("Task deleted successfully");
        fetchTasks(task.assignedTo); // Refresh task list after deletion
      } else {
        console.error("Error deleting task");
      }
    } catch (error) {
      console.error("Error deleting task:", error.message);
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
              {isLoading ? "Assigning..." : "Assign Task"}
            </button>
          </form>
        </div>

        {/* Right side: Assigned Tasks */}
        <div className="w-1/2 bg-white p-8 shadow-md flex flex-col justify-between border-2">
          <h2 className="text-2xl font-semibold text-blue-600">Assigned Tasks</h2>
          {tasks.length === 0 ? (
            <p>No tasks assigned.</p>
          ) : (
            tasks.map((task) => (
              <div key={task.id} className="task-card mb-4">
                <h3 className="font-semibold text-lg">{task.title}</h3>
                <p>{task.description}</p>
                <p>Status: {task.status}</p>
                <div className="flex space-x-4">
                  <button
                    onClick={() => handleUpdate(task.id)}
                    className="bg-yellow-500 text-white py-1 px-3 rounded-md"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => handleDelete(task.id)}
                    className="bg-red-500 text-white py-1 px-3 rounded-md"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}
