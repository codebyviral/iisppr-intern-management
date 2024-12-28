import { useEffect, useState } from "react";
import axios from "axios";
import CustomNavbar from "./CustomNavbar";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/Components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
import { Button } from "@/Components/ui/button";
import { Badge } from "@/Components/ui/badge";
import { Alert, AlertDescription } from "@/Components/ui/alert";
import { Search, Calendar, Users } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/Components/ui/alert-dialog";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const InternAttendance = () => {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [bulkAction, setBulkAction] = useState(null);
  const [processing, setProcessing] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/allusers`
        );
        setUsers(response.data.data);
      } catch (error) {
        console.error("Error fetching users:", error);
        toast.error("Failed to fetch users");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const date = new Date();
  const formattedDate = date.toISOString().split(".")[0] + "Z";
  const displayDate = date.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const updateStatus = async (id, status) => {
    const attendanceStatus = {
      userId: id,
      date: formattedDate,
      status: status,
    };
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/attendance`,
        attendanceStatus
      );
      if (response.status == 409) toast.error(`Attendance already marked`);
      if (
        response.status == 201 ||
        response.status == 204 ||
        response.status == 205
      ) {
        toast.success("Attendance marked successfully");
        return "success";
      }
      return "error";
    } catch (error) {
      if (error.status == 409) {
        toast.error(`Attendance already marked`);
      }
      return "error";
    }
  };

  const handleBulkAction = async (status) => {
    setBulkAction(status);
    setShowConfirmDialog(true);
  };

  const executeBulkAction = async () => {
    setProcessing(true);
    let successCount = 0;
    let alreadyMarkedCount = 0;
    let errorCount = 0;

    for (const user of filteredUsers) {
      const result = await updateStatus(user._id, bulkAction);
      if (result === "success") successCount++;
      else if (result === "already_marked") alreadyMarkedCount++;
      else errorCount++;
    }

    let message = `Updated ${successCount} users successfully.`;
    if (alreadyMarkedCount > 0) {
      message += ` ${alreadyMarkedCount} users were already marked.`;
    }
    if (errorCount > 0) {
      message += ` Failed to update ${errorCount} users.`;
    }
    toast(message);

    setProcessing(false);
    setShowConfirmDialog(false);
  };

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <CustomNavbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid gap-6">
          {/* Header Section */}
          <Card>
            <CardHeader className="space-y-1">
              <div className="flex items-center justify-between">
                <CardTitle className="text-2xl font-bold">
                  IISPPR Attendance Management
                </CardTitle>
                <Badge variant="secondary" className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  {displayDate}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="relative flex-1">
                    <input
                      type="text"
                      placeholder="Search users..."
                      className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <Search className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
                  </div>
                  <Badge variant="outline" className="flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    Total Users: {users.length}
                  </Badge>
                </div>
                <div className="flex justify-end space-x-4">
                  <Button
                    variant="outline"
                    className="bg-green-500 hover:bg-green-600 text-white"
                    onClick={() => handleBulkAction("Present")}
                    disabled={processing || filteredUsers.length === 0}
                  >
                    Mark All Present
                  </Button>
                  <Button
                    variant="outline"
                    className="bg-red-500 hover:bg-red-600 text-white"
                    onClick={() => handleBulkAction("Absent")}
                    disabled={processing || filteredUsers.length === 0}
                  >
                    Mark All Absent
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-center">
            <div
              onClick={() =>
                toast("Page under development!", {
                  icon: " ⏳ ",
                })
              }
              className="flex text-blue-500 underline cursor-pointer items-center space-x-4"
            >
              Click here to view attendance of all users.
            </div>
          </div>

          <div className="flex justify-center items-center">
            <Alert className="w-full bg-blue-50 border-blue-200">
              <div className="flex flex-col items-center w-full">
                <AlertDescription className="text-blue-700 text-center">
                  <p>Present → User is marked present for current Date.</p>
                  <p>Absent → User is marked absent for current Date.</p>
                  <p>
                    Attendance once marked cannot be updated again for current
                    Date.{" "}
                  </p>
                </AlertDescription>
              </div>
            </Alert>
          </div>

          {/* Table Section */}
          <Card>
            <CardContent className="p-0">
              {loading ? (
                <div className="flex justify-center items-center h-64">
                  <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
                </div>
              ) : (
                <Table>
                  <TableCaption>
                    List of all users and their attendance status
                  </TableCaption>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredUsers.length > 0 ? (
                      filteredUsers.map((user) => (
                        <TableRow key={user._id}>
                          <TableCell className="font-medium">
                            {user.name}
                          </TableCell>
                          <TableCell>{user.email}</TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end space-x-2">
                              <Button
                                variant="outline"
                                className="bg-green-500 hover:bg-green-600 text-white"
                                onClick={() =>
                                  updateStatus(user._id, "Present")
                                }
                                disabled={processing}
                              >
                                Present
                              </Button>
                              <Button
                                variant="outline"
                                className="bg-red-500 hover:bg-red-600 text-white"
                                onClick={() => updateStatus(user._id, "Absent")}
                                disabled={processing}
                              >
                                Absent
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={3} className="text-center py-8">
                          No users found
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </div>
      </main>

      <AlertDialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Bulk Action</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to mark all {filteredUsers.length} users as{" "}
              {bulkAction}? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={processing}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={executeBulkAction}
              disabled={processing}
              className={
                bulkAction === "Present"
                  ? "bg-green-500 hover:bg-green-600"
                  : "bg-red-500 hover:bg-red-600"
              }
            >
              {processing ? "Processing..." : "Confirm"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default InternAttendance;
