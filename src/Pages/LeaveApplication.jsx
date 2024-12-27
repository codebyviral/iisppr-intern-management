/* eslint-disable no-unused-vars */
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
import { Button } from "@/Components/ui/button";
import { Calendar, Clock, FileText, Loader2 } from "lucide-react";
import { Navbar, SideNav, Footer } from "@/Components/compIndex";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/Components/ui/select";
import { Textarea } from "@/Components/ui/textarea";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";

const LeaveApplication = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

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
      const token = localStorage.getItem("token"); // Assuming you store the JWT token

      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/leave`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.dismiss(loadingToast);
      toast.success("Leave application submitted successfully!");

      // Clear form
      setFormData({
        leaveType: "",
        startDate: "",
        endDate: "",
        reason: "",
      });
    } catch (error) {
      toast.dismiss(loadingToast);
      const errorMessage =
        error.response?.data?.message || "Error submitting leave application";
      toast.error(errorMessage);
      console.error("Leave application error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <SideNav />
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 5000,
          style: {
            background: "#363636",
            color: "#fff",
          },
          success: {
            duration: 3000,
            style: {
              background: "#22c55e",
            },
          },
          error: {
            duration: 4000,
            style: {
              background: "#ef4444",
            },
          },
        }}
      />

      <div className="relative bg-gray-50 min-h-screen ml-0 md:ml-32">
        <div className="p-6">
          <div className="max-w-2xl mx-auto">
            <Card className="shadow-lg">
              <CardHeader className="border-b bg-white">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <FileText className="h-6 w-6 text-blue-600" />
                  </div>
                  <CardTitle className="text-2xl font-bold">
                    Leave Application
                  </CardTitle>
                </div>
              </CardHeader>

              <CardContent className="p-6">
                <form onSubmit={handleSubmit} className="space-y-6">
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
                      <SelectTrigger className="w-full">
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

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">
                        Start Date *
                      </label>
                      <div className="relative">
                        <div className="absolute left-3 top-3 text-gray-400">
                          <Calendar className="h-5 w-5" />
                        </div>
                        <input
                          type="date"
                          value={formData.startDate}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              startDate: e.target.value,
                            })
                          }
                          className="pl-10 w-full h-11 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">
                        End Date *
                      </label>
                      <div className="relative">
                        <div className="absolute left-3 top-3 text-gray-400">
                          <Calendar className="h-5 w-5" />
                        </div>
                        <input
                          type="date"
                          value={formData.endDate}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              endDate: e.target.value,
                            })
                          }
                          className="pl-10 w-full h-11 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
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

                  <div className="flex items-center justify-end gap-4 pt-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => navigate(-1)}
                      className="w-full md:w-auto"
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      className="w-full md:w-auto bg-blue-600 hover:bg-blue-700"
                      disabled={loading}
                    >
                      {loading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
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

            <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <Clock className="h-5 w-5 text-blue-500 mt-0.5" />
                <div>
                  <h3 className="font-medium text-blue-900">Processing Time</h3>
                  <p className="text-sm text-blue-700 mt-1">
                    Leave applications are typically processed within 24-48
                    hours. You will receive a notification once your application
                    has been reviewed.
                  </p>
                </div>
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
