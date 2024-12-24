import React, { useState, useEffect } from "react";
import CustomNavbar from "./CustomNavbar";
function AllUsers() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");

  // Fetch all users from the API
  const fetchUsers = async () => {
    try {
      const response = await fetch("https://iisppr-backend.vercel.app/api/get/allusers");
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      console.log(response)
      const result  = await response.json();
     console.log(result.data)
      setUsers(result.data);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <>
    <CustomNavbar></CustomNavbar>
      <div className="UsersContainer p-8 bg-white shadow-md rounded-md">
        {/* Heading */}
        <h1 className="text-2xl font-semibold text-blue-600 mb-4">All Interns/Users</h1>

        
        <div className="grid grid-cols-6 font-semibold border-b-2 pb-2 mb-4 text-gray-700">
          <div>ID</div>
          <div>Name</div>
          <div>Phone</div>
          <div>Password</div>
          <div>Role</div>
          <div>Start Date</div>
        </div>

        {/* User List */}
        {error ? (
          <p className="text-red-500">{error}</p>
        ) : users.length > 0 ? (
          users.map((user) => (
            <div key={user._id}>
              <div className="grid grid-cols-6 py-2 text-gray-800">
                <div className="truncate">{user._id}</div>
                <div>{user.name}</div>
                <div>{user.mnumber}</div>
                <div className="truncate">{user.password}</div>
                <div>{user.role}</div>
                <div>{new Date(user.startDate).toLocaleDateString()}</div>
              </div>
              <hr className="border-gray-300" />
            </div>
          ))
        ) : (
          <p className="text-gray-500">Loading users...</p>
        )}
      </div>
    </>
  );
}

export default AllUsers;
