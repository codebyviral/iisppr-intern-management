import React, { useState, useEffect } from "react";
import CustomNavbar from "./CustomNavbar";

function AllUsers() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch all users from the API
  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await fetch("https://iisppr-backend.vercel.app/allusers");
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      const result = await response.json();
      setUsers(result.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Delete user by ID
  const deleteUser = async (userId) => {
    try {
      const response = await fetch(`https://iisppr-backend.vercel.app/delete/${userId}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error(`Error deleting user: ${response.status}`);
      }
      // Remove the deleted user from the list
      setUsers((prevUsers) => prevUsers.filter((user) => user._id !== userId));
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <>
      <CustomNavbar />
      <div className="UsersContainer p-4 md:p-8 bg-white shadow-md rounded-md ">
        {/* Heading */}
        <h1 className="text-xl md:text-2xl font-semibold text-blue-600 mb-4 text-center">
          All Interns/Users
        </h1>

        {/* Table Header */}
        <div className="hidden md:grid md:grid-cols-7 font-semibold border-b-2 pb-2 mb-4 text-gray-700">
          <div>ID</div>
          <div>Name</div>
          <div>Phone</div>
          <div>Password</div>
          <div>Role</div>
          <div>Start Date</div>
          <div>Action</div>
        </div>

        {/* User List */}
        {error ? (
          <p className="text-red-500">{error}</p>
        ) : loading ? (
          <p className="text-gray-500">Loading users...</p>
        ) : users.length > 0 ? (
          users.map((user) => (
            <div key={user._id} className="mb-4">
              {/* Card View for Small Screens */}
              <div className="md:hidden bg-gray-50 p-4 rounded shadow-md">
                <p>
                  <span className="font-semibold">ID:</span> {user._id}
                </p>
                <p>
                  <span className="font-semibold">Name:</span> {user.name}
                </p>
                <p>
                  <span className="font-semibold">Phone:</span> {user.mnumber}
                </p>
                <p>
                  <span className="font-semibold">Password:</span> {user.password}
                </p>
                <p>
                  <span className="font-semibold">Role:</span> {user.role}
                </p>
                <p>
                  <span className="font-semibold">Start Date:</span>{" "}
                  {new Date(user.startDate).toLocaleDateString()}
                </p>
                <button
                  onClick={() => deleteUser(user._id)}
                  className="mt-4 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700 w-full"
                >
                  Delete
                </button>
              </div>

              {/* Grid View for Larger Screens */}
              <div className="hidden md:grid grid-cols-7 py-2 text-gray-800">
                <div className="truncate">{user._id}</div>
                <div>{user.name}</div>
                <div>{user.mnumber}</div>
                <div className="truncate">{user.password}</div>
                <div>{user.role}</div>
                <div>{new Date(user.startDate).toLocaleDateString()}</div>
                <div>
                  <button
                    onClick={() => deleteUser(user._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700"
                  >
                    Delete
                  </button>
                </div>
              </div>
              <hr className="border-gray-300" />
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center">No users found.</p>
        )}
      </div>
    </>
  );
}

export default AllUsers;
