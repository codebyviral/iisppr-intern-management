import React, { useState } from "react";
import CustomNavbar from "./CustomNavbar";
export default function AdminTask() {
  const [task, setTask] = useState({
    name: "",
    email: "",
    taskDescription: "",
    image: "",
    note: "",
  });

  // Handle input change and update the state
  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask((prevTask) => ({
      ...prevTask,
      [name]: value,
    }));
  };

  // Handle form submission (for now, we just log the data)
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Assigned Task:", task);
  };

  return (
    <>
    <CustomNavbar></CustomNavbar>
    <div className="min-h-screen flex">
      {/* Left side: Task Assignment Form */}
      <div className="w-1/2 bg-white p-8 shadow-md flex flex-col justify-between border-2">
        <h2 className="text-2xl font-semibold text-blue-600 ">Task Assigning</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col">
            <label className="text-gray-700" htmlFor="name">
              Whom to assign
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={task.name}
              onChange={handleChange}
              placeholder="Enter the name of the person"
              className="mt-2 p-2 border border-gray-300 rounded-md"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-gray-700" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={task.email}
              onChange={handleChange}
              placeholder="Enter email"
              className="mt-2 p-2 border border-gray-300 rounded-md"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-gray-700" htmlFor="taskDescription">
              Task Description
            </label>
            <input
              type="text"
              id="taskDescription"
              name="taskDescription"
              value={task.taskDescription}
              onChange={handleChange}
              placeholder="Enter task description"
              className="mt-2 p-2 border border-gray-300 rounded-md"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-gray-700" htmlFor="image">
              Image URL
            </label>
            <input
              type="text"
              id="image"
              name="image"
              value={task.image}
              onChange={handleChange}
              placeholder="Enter image URL"
              className="mt-2 p-2 border border-gray-300 rounded-md"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-gray-700" htmlFor="note">
              Note
            </label>
            <input
              type="text"
              id="note"
              name="note"
              value={task.note}
              onChange={handleChange}
              placeholder="Enter any additional note"
              className="mt-2 p-2 border border-gray-300 rounded-md"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-300 mt-4"
          >
            Assign Task
          </button>
        </form>
      </div>

      {/* Right side: Assigned Tasks (for now, display a simple message) */}
      <div className="w-1/2 bg-white p-8 border-2">
        <h2 className="text-2xl font-semibold text-blue-600 mb-6">Assigned Tasks</h2>
        <p className="text-gray-600">Here, you can see the assigned tasks listed for the users.</p>
        {/* You can replace this section with dynamic content once tasks are assigned */}
      </div>
    </div>
    </>
  );
}
