import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { Avatar } from "@/Components/ui/avatar";
import { Button } from "@/Components/ui/button";
import { SideNav, Navbar } from "../Components/compIndex";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AccountDetails() {
  const [user, setUser] = useState(null); // Holds raw API response
  const [loading, setLoading] = useState(true); // Loading state for API call
  const [saveStatus, setSaveStatus] = useState(""); // Status after save attempt
  const [formDetails, setFormDetails] = useState({
    fullName: "",
    email: "",
    studying: "",
    currentRole: "",
    githubLink: "",
    linkedinLink: "",
    phoneNumber: "",
  });

  // Fetch user details and set form state
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/api/auth/user/${localStorage.getItem(
            "userId"
          )}`
        );
        const data = response.data;

        setUser(data); // Set raw user data
        setFormDetails({
          fullName: data.name || "",
          email: data.email || "",
          studying: "", // Field not in API response
          currentRole: data.role || "",
          githubLink: data.githubLink || "",
          linkedinLink: data.linkedinLink || "",
          phoneNumber: data.mnumber?.toString() || "",
        });
      } catch (error) {
        console.error(`Error fetching user details: ${error}`);
      } finally {
        setLoading(false); // Stop loading spinner
      }
    };

    fetchUserProfile();
  }, []);

  const navigate = useNavigate();

  // Function to generate initials
  const getInitials = (name) => {
    const words = name?.trim().split(" ") || [];
    if (words.length < 2) return words[0]?.[0]?.toUpperCase() || "";
    return `${words[0][0]?.toUpperCase() || ""}${
      words[1][0]?.toUpperCase() || ""
    }`;
  };

  const handleInputChange = (field, value) => {
    setFormDetails((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    setSaveStatus(""); // Reset save status
    try {
      const response = await fetch("/api/save-account-details", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formDetails),
      });

      if (response.ok) {
        setSaveStatus("Details saved successfully!");
      } else {
        setSaveStatus("Failed to save changes. Please try again.");
      }
    } catch (error) {
      setSaveStatus("Error saving account details.");
      console.error("Error saving account details:", error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="flex flex-col items-center text-center space-y-4">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-600 border-opacity-75"></div>
          <p className="text-lg font-medium text-gray-700">
            Loading account details...
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <SideNav />
      <Navbar />
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-8 px-4">
        <Card className="w-full max-w-4xl bg-white shadow-lg rounded-lg p-8">
          <CardHeader className="text-center mb-6">
            <CardTitle className="text-3xl font-bold text-gray-800">
              Account Details
            </CardTitle>
            <p className="text-gray-500">
              Manage your account information below.
            </p>
          </CardHeader>
          <CardContent className="space-y-8">
            {/* Profile Photo Section */}
            <div className="flex flex-col items-center">
              <Avatar className="w-32 h-32 bg-gray-200 text-gray-600 flex items-center justify-center font-bold text-3xl rounded-full">
                {getInitials(formDetails.fullName)}
              </Avatar>
              <p className="mt-4 text-xl font-semibold text-gray-800">
                {formDetails.fullName || "Your Name"}
              </p>
              <p className="text-gray-600">{formDetails.email}</p>
            </div>

            {/* Input Fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="flex flex-col">
                <Label className="text-sm font-medium text-gray-700">
                  College Study Year
                </Label>
                <Input
                  type="text"
                  value={formDetails.studying}
                  placeholder="E.g., 2nd Year"
                  onChange={(e) =>
                    handleInputChange("studying", e.target.value)
                  }
                  className="mt-2 bg-gray-50 border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 rounded-md"
                />
              </div>

              {/* Other Input Fields */}
              {["currentRole", "githubLink", "linkedinLink", "phoneNumber"].map(
                (key) => (
                  <div key={key} className="flex flex-col">
                    <Label className="text-sm font-medium text-gray-700 capitalize">
                      {key.replace(/([A-Z])/g, " $1").trim()}
                    </Label>
                    <Input
                      type="text"
                      value={formDetails[key]}
                      placeholder={`Enter your ${key
                        .replace(/([A-Z])/g, " $1")
                        .trim()}`}
                      onChange={(e) => handleInputChange(key, e.target.value)}
                      className="mt-2 bg-gray-50 border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 rounded-md"
                    />
                  </div>
                )
              )}
            </div>

            {/* Change Password Button */}
            <div className="flex justify-center mt-4">
              <Button
                onClick={() => navigate("/reset-account-password")}
                className="bg-yellow-500 text-white hover:bg-yellow-600"
              >
                Change Password
              </Button>
            </div>

            {/* Save All Changes Button */}
            <div className="flex flex-col items-center mt-8">
              <Button
                type="submit"
                onClick={handleSave}
                className="w-full max-w-md bg-blue-600 text-white hover:bg-blue-700 rounded-lg py-2 text-lg"
              >
                Save Changes
              </Button>
              {saveStatus && (
                <p
                  className={`mt-4 text-sm ${
                    saveStatus.includes("successfully")
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {saveStatus}
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
