import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/Components/ui/card";
import { Button } from "@/Components/ui/button";
import { Alert, AlertDescription } from "@/Components/ui/alert";
import CustomNavbar from "./CustomNavbar";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Loader } from "@/Components/compIndex";

const API_BASE_URL = "https://iisppr-backend.vercel.app";

const INITIAL_TASK_STATE = {
  assignedTo: "",
  title: "",
  description: "",
  startDate: "",
  endDate: "",
  status: "pending",
};

export default function AdminTask() {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [task, setTask] = useState(INITIAL_TASK_STATE);
  const [successMessage, setSuccessMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const initializeData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${API_BASE_URL}/allusers`);
        const usersList = response.data.data;

        if (!Array.isArray(usersList)) {
          throw new Error("Invalid users data format received");
        }

        setUsers(usersList);
      } catch (error) {
        toast.error("Failed to fetch data");
        console.error("Data fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    initializeData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!task.assignedTo) {
      toast.error("Please select a user");
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await axios.post(`${API_BASE_URL}/task/add-task`, task, {
        headers: { "Content-Type": "application/json" },
      });

      if (response.status === 201 || response.status === 200) {
        toast.success("Task assigned successfully!");
        setSuccessMessage("Task successfully assigned!");
        setTask(INITIAL_TASK_STATE);

        setTimeout(() => setSuccessMessage(""), 5000);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to assign task");
      console.error("Task assignment error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <>
        <CustomNavbar />
        <Loader />
      </>
    );
  }

  return (
    <>
      <CustomNavbar />
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-3xl mx-auto">
          {/* Task Assignment Form */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl text-blue-600">
                Task Assignment
              </CardTitle>
            </CardHeader>
            <CardContent>
              {successMessage && (
                <Alert className="mb-4 bg-green-100 border-green-400 text-green-700">
                  <AlertDescription>{successMessage}</AlertDescription>
                </Alert>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label
                    htmlFor="assignedTo"
                    className="text-gray-700 font-medium block"
                  >
                    Assign to
                  </label>
                  <select
                    id="assignedTo"
                    name="assignedTo"
                    value={task.assignedTo}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    <option value="">Select a user</option>
                    {users.map((user) => (
                      <option key={user._id} value={user._id}>
                        {user.name} ({user.email})
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="title"
                    className="text-gray-700 font-medium block"
                  >
                    Task Title
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={task.title}
                    onChange={handleChange}
                    placeholder="Enter task title"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="description"
                    className="text-gray-700 font-medium block"
                  >
                    Task Description
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={task.description}
                    onChange={handleChange}
                    placeholder="Enter task description"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 min-h-[100px]"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label
                      htmlFor="startDate"
                      className="text-gray-700 font-medium block"
                    >
                      Start Date
                    </label>
                    <input
                      type="datetime-local"
                      id="startDate"
                      name="startDate"
                      value={task.startDate}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor="endDate"
                      className="text-gray-700 font-medium block"
                    >
                      End Date
                    </label>
                    <input
                      type="datetime-local"
                      id="endDate"
                      name="endDate"
                      value={task.endDate}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Assigning..." : "Assign Task"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
