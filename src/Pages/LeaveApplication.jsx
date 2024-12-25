import { useState } from "react";
import { Navbar } from "@/Components/compIndex";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/Components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/Components/ui/select";
import { Calendar, Clock, FileText, AlertCircle } from "lucide-react";
import { Label } from "@/Components/ui/label";
import { Input } from "@/Components/ui/input";
import { Textarea } from "@/Components/ui/textarea";
import { Button } from "@/Components/ui/button";
import { Checkbox } from "@/Components/ui/checkbox";
import { Alert, AlertDescription } from "@/Components/ui/alert";

const LeaveApplication = () => {
  const [leaveDetails, setLeaveDetails] = useState({
    leaveType: "",
    startDate: "",
    endDate: "",
    reason: "",
    userId: localStorage.getItem("userId") || "",
  });

  const [acknowledgement, setAcknowledgement] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLeaveDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleLeaveTypeChange = (value) => {
    setLeaveDetails((prevDetails) => ({
      ...prevDetails,
      leaveType: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!acknowledgement) {
      alert("You must acknowledge the leave policy.");
      return;
    }

    try {
      const response = await fetch("/api/leaves", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(leaveDetails),
      });

      const data = await response.json();
      if (data.success) {
        alert("Leave application submitted successfully!");
      } else {
        alert("Error submitting leave application.");
      }
    } catch (err) {
      alert("Error submitting leave application.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto py-8 px-4">
        <Card className="max-w-2xl mx-auto shadow-lg">
          <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
            <div className="bg-gray-800 text-white px-6 py-2 rounded-full text-sm font-medium">
              New Request
            </div>
          </div>

          <CardHeader className="space-y-1 pb-8">
            <CardTitle className="text-3xl font-bold text-center text-blue-600">
              Leave Application
            </CardTitle>
            <CardDescription className="text-center text-gray-600">
              Submit your leave request for approval
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label
                  htmlFor="leaveType"
                  className="flex items-center gap-2 text-gray-700"
                >
                  <FileText className="w-4 h-4" />
                  Leave Type
                </Label>
                <Select onValueChange={handleLeaveTypeChange}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select leave type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sick">Sick Leave</SelectItem>
                    <SelectItem value="vacation">Vacation</SelectItem>
                    <SelectItem value="personal">Personal Leave</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label
                    htmlFor="startDate"
                    className="flex items-center gap-2 text-gray-700"
                  >
                    <Calendar className="w-4 h-4" />
                    Start Date
                  </Label>
                  <Input
                    type="date"
                    id="startDate"
                    name="startDate"
                    value={leaveDetails.startDate}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="endDate"
                    className="flex items-center gap-2 text-gray-700"
                  >
                    <Clock className="w-4 h-4" />
                    End Date
                  </Label>
                  <Input
                    type="date"
                    id="endDate"
                    name="endDate"
                    value={leaveDetails.endDate}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="reason"
                  className="flex items-center gap-2 text-gray-700"
                >
                  <FileText className="w-4 h-4" />
                  Reason for Leave
                </Label>
                <Textarea
                  id="reason"
                  name="reason"
                  value={leaveDetails.reason}
                  onChange={handleChange}
                  required
                  className="min-h-[120px]"
                  placeholder="Please provide detailed reason for your leave request..."
                />
              </div>

              <Alert className="bg-gray-50 border-gray-200">
                <AlertCircle className="h-4 w-4 text-gray-600" />
                <AlertDescription className="text-gray-600">
                  Please ensure all details are accurate before submission.
                </AlertDescription>
              </Alert>

              <div className="flex items-center space-x-2 bg-gray-50 p-4 rounded-lg">
                <Checkbox
                  id="acknowledgement"
                  checked={acknowledgement}
                  onCheckedChange={setAcknowledgement}
                />
                <Label
                  htmlFor="acknowledgement"
                  className="text-sm text-gray-600"
                >
                  I acknowledge that I can take a maximum of 5 days leave during
                  the internship.
                </Label>
              </div>
            </form>
          </CardContent>

          <CardFooter className="flex flex-col gap-4">
            <Button
              type="submit"
              onClick={handleSubmit}
              className="w-full bg-blue-600 hover:bg-gray-700 text-white font-medium py-3 rounded-lg transition-all duration-200 transform hover:scale-[1.02]"
            >
              Submit Application
            </Button>
            <p className="text-center text-sm text-gray-600">
              Your request will be reviewed within 24-48 hours
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default LeaveApplication;
