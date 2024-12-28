import React, { useState, useEffect } from "react";
import CustomNavbar from "./CustomNavbar";
import { Loader } from "@/Components/compIndex";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/Components/ui/alert";

function AllUsers() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: "ascending",
  });

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError("");
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/allusers`);
      if (!response.ok) {
        throw new Error(`Failed to fetch users (Status: ${response.status})`);
      }
      const result = await response.json();
      setUsers(result.data || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const deleteUser = async (userId, userName) => {
    const message = `Are you sure you want to delete ${userName}?`;
    if (window.confirm(message)) {
      try {
        setLoading(true);
        const response = await fetch(
          `${import.meta.env.VITE_BASE_URL}/delete/${userId}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(
            errorData.message ||
              `Failed to delete user (Status: ${response.status})`
          );
        }

        setUsers((prevUsers) =>
          prevUsers.filter((user) => user._id !== userId)
        );
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
  };

  const requestSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const getSortedUsers = () => {
    let filteredUsers = [...users];

    if (searchTerm) {
      filteredUsers = filteredUsers.filter(
        (user) =>
          user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.role?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.department?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (sortConfig.key) {
      filteredUsers.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }
        return 0;
      });
    }

    return filteredUsers;
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <CustomNavbar />
      <div className="max-w-full mx-auto p-4">
        <div className="bg-white shadow-md rounded-lg p-6">
          {/* Header Section */}
          <div className="flex flex-col md:flex-row justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-blue-600 mb-4 md:mb-0">
              IISPPR InternHub User Directory
            </h1>
            <div className="w-full md:w-64">
              <input
                type="text"
                placeholder="Search users..."
                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {loading ? (
            <div className="flex justify-center items-center h-32">
              <Loader />
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      ID
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Phone
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Role
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Admin
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Department
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      GitHub
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      LinkedIn
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Start Date
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {getSortedUsers().map((user) => (
                    <tr key={user._id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm text-gray-900">
                        {user._id}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-900">
                        {user.name}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-900">
                        {user.mnumber}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-900">
                        {user.email}
                      </td>
                      <td className="px-4 capitalize py-3 text-sm text-gray-900">
                        {user.role}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-900">
                        {user.isAdmin ? (
                          <span className="px-2 py-1 text-xs font-semibold text-green-800 bg-green-100 rounded-full">
                            Yes
                          </span>
                        ) : (
                          <span className="px-2 py-1 text-xs font-semibold text-red-800 bg-red-100 rounded-full">
                            No
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-900">
                        {user.department}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-900">
                        {user.githubURL ? (
                          <a
                            href={user.githubURL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-800"
                          >
                            Link
                          </a>
                        ) : (
                          "-"
                        )}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-900">
                        {user.linkedInURL ? (
                          <a
                            href={user.linkedInURL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-800"
                          >
                            Link
                          </a>
                        ) : (
                          "-"
                        )}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-900">
                        {formatDate(user.startDate)}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-900">
                        <button
                          onClick={() => deleteUser(user._id, user.name)}
                          className="text-white bg-red-500 hover:bg-red-600 px-3 py-1 rounded-md transition-colors duration-200"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {getSortedUsers().length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  No users found.
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AllUsers;
