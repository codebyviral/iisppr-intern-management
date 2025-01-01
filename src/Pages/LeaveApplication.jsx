import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Calendar,
  Clock,
  FileText,
  Loader2,
  CheckCircle,
  XCircle,
  Clock3,
} from "lucide-react";
import { Navbar, SideNav, Footer } from "@/Components/compIndex";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";

const LeaveApplication = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [leaveHistory, setLeaveHistory] = useState([]);
  const [formData, setFormData] = useState({
    leaveType: "",
    startDate: "",
    endDate: "",
    reason: "",
  });

  const leaveTypes = [
    { value: "Sick Leave", label: "Sick Leave" },
    { value: "Personal Leave", label: "Personal Leave" },
    { value: "Vacation", label: "Vacation" },
    { value: "Other", label: "Other" },
  ];

  useEffect(() => {
    fetchLeaveHistory();
  }, []);

  const fetchLeaveHistory = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/leave/history`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setLeaveHistory(response.data);
    } catch (error) {
      console.error("Error fetching leave history:", error);
    }
  };

  const validateForm = () => {
    if (!formData.leaveType) {
      toast.error("Please select a leave type");
      return false;
    }
    if (!formData.startDate) {
      toast.error("Please select a start date");
      return false;
    }
    if (!formData.endDate) {
      toast.error("Please select an end date");
      return false;
    }
    if (!formData.reason) {
      toast.error("Please provide a reason for leave");
      return false;
    }

    const start = new Date(formData.startDate);
    const end = new Date(formData.endDate);

    if (end < start) {
      toast.error("End date cannot be before start date");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const loadingToast = toast.loading("Submitting leave application...");
    setLoading(true);

    try {
      const token = localStorage.getItem("token");
      await axios.post(`${import.meta.env.VITE_BASE_URL}/leave`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.dismiss(loadingToast);
      toast.success("Leave application submitted successfully!");
      setFormData({
        leaveType: "",
        startDate: "",
        endDate: "",
        reason: "",
      });
      fetchLeaveHistory();
    } catch (error) {
      toast.dismiss(loadingToast);
      toast.error(
        error.response?.data?.message || "Error submitting application"
      );
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status) => {
    const styles = {
      Approved: "bg-green-100 text-green-800",
      Pending: "bg-yellow-100 text-yellow-800",
      Rejected: "bg-red-100 text-red-800",
    };

    const icons = {
      Approved: <CheckCircle className="w-4 h-4 mr-1" />,
      Pending: <Clock3 className="w-4 h-4 mr-1" />,
      Rejected: <XCircle className="w-4 h-4 mr-1" />,
    };

    return (
      <div
        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium ${styles[status]}`}
      >
        {icons[status]}
        {status}
      </div>
    );
  };

  return (
    <>
      <Navbar />
      <SideNav />
      <Toaster position="top-center" />

      <div className="relative min-h-screen ml-0 bg-gray-50 md:ml-32">
        <div className="p-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Leave Application Form */}
              <div className="lg:col-span-2">
                <Card className="shadow-lg">
                  <CardHeader className="border-b bg-white">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <FileText className="w-6 h-6 text-blue-600" />
                      </div>
                      <CardTitle className="text-2xl font-bold">
                        Leave Application
                      </CardTitle>
                    </div>
                  </CardHeader>

                  <CardContent className="p-6">
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-gray-700">
                            Leave Type *
                          </label>
                          <Select
                            value={formData.leaveType}
                            onValueChange={(value) =>
                              setFormData({ ...formData, leaveType: value })
                            }
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select leave type" />
                            </SelectTrigger>
                            <SelectContent>
                              {leaveTypes.map((type) => (
                                <SelectItem key={type.value} value={type.value}>
                                  {type.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <label className="text-sm font-medium text-gray-700">
                            Duration *
                          </label>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="relative">
                              <Calendar className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                              <input
                                type="date"
                                value={formData.startDate}
                                onChange={(e) =>
                                  setFormData({
                                    ...formData,
                                    startDate: e.target.value,
                                  })
                                }
                                className="w-full pl-10 border rounded-md h-11"
                              />
                            </div>
                            <div className="relative">
                              <Calendar className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                              <input
                                type="date"
                                value={formData.endDate}
                                onChange={(e) =>
                                  setFormData({
                                    ...formData,
                                    endDate: e.target.value,
                                  })
                                }
                                className="w-full pl-10 border rounded-md h-11"
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">
                          Reason for Leave *
                        </label>
                        <Textarea
                          value={formData.reason}
                          onChange={(e) =>
                            setFormData({ ...formData, reason: e.target.value })
                          }
                          placeholder="Please provide a detailed reason for your leave request..."
                          className="min-h-[120px]"
                        />
                      </div>

                      <div className="flex justify-end gap-4">
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => navigate(-1)}
                        >
                          Cancel
                        </Button>
                        <Button
                          type="submit"
                          className="bg-blue-600 hover:bg-blue-700"
                          disabled={loading}
                        >
                          {loading ? (
                            <>
                              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                              Submitting...
                            </>
                          ) : (
                            "Submit Application"
                          )}
                        </Button>
                      </div>
                    </form>
                  </CardContent>
                </Card>
              </div>

              {/* Leave Status Section */}
              <div className="lg:col-span-1">
                <Card className="shadow-lg">
                  <CardHeader className="border-b">
                    <CardTitle className="text-xl font-semibold">
                      Leave Status
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="space-y-6">
                      {leaveHistory.map((leave) => (
                        <div
                          key={leave.id}
                          className="p-4 border rounded-lg space-y-3"
                        >
                          <div className="flex justify-between items-start">
                            <div className="space-y-1">
                              <h3 className="font-medium">{leave.type}</h3>
                              <p className="text-sm text-gray-500">
                                {new Date(leave.startDate).toLocaleDateString()}{" "}
                                - {new Date(leave.endDate).toLocaleDateString()}
                              </p>
                            </div>
                            {getStatusBadge(leave.status)}
                          </div>

                          {leave.status === "Approved" && leave.approvedBy && (
                            <div className="pt-2 border-t">
                              <p className="text-sm text-gray-600">
                                Approved by{" "}
                                <span className="font-medium">
                                  {leave.approvedBy}
                                </span>
                                <br />
                                <span className="text-gray-500">
                                  {leave.approverRole}
                                </span>
                              </p>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="mt-6 shadow-lg bg-blue-50 border-blue-200">
                  <CardContent className="p-4">
                    <div className="flex gap-3">
                      <Clock className="w-5 h-5 text-blue-500 mt-0.5" />
                      <div>
                        <h3 className="font-medium text-blue-900">
                          Processing Time
                        </h3>
                        <p className="mt-1 text-sm text-blue-700">
                          Leave applications are typically processed within
                          24-48 hours.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default LeaveApplication;
