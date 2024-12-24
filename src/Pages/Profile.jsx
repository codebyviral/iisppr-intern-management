import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { Avatar } from "@/Components/ui/avatar";
import { Button } from "@/Components/ui/button";
import { SideNav,Navbar } from "../Components/compIndex";
export default function AccountDetails() {
  const [formDetails, setFormDetails] = useState({
    fullName: "",
    email: "",
    studying: "",
    currentRole: "",
    gender: "",
    githubLink: "",
    linkedinLink: "",
    phoneNumber: "",
  });

  // Function to generate initials
  const getInitials = (name) => {
    const words = name.trim().split(" ");
    if (words.length < 2) {
      return words[0]?.[0]?.toUpperCase() || ""; // Return first letter or default "N"
    }
    const first = words[0]?.[0]?.toUpperCase() || "";
    const second = words[1]?.[0]?.toUpperCase() || "";
    return first + second;
  };
  

  const handleInputChange = (field, value) => {
    setFormDetails((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    try {
      const response = await fetch("/api/save-account-details", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formDetails),
      });

      if (response.ok) {
        // Optionally reset the form after saving
        setFormDetails({
          fullName: "",
          email: "",
          studying: "",
          currentRole: "",
          gender: "",
          githubLink: "",
          linkedinLink: "",
          phoneNumber: "",
        });
      }
    } catch (error) {
      console.error("Error saving account details:", error);
    }
  };

  return (
    <>
    <SideNav />
    <Navbar />
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-3xl bg-white shadow-md p-6">
        <CardHeader className="text-center mb-4">
          <CardTitle className="text-2xl font-semibold text-gray-900">
            Account Details
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Profile Photo Section (Replaced with Initials) */}
          <div className="flex justify-center">
            <Avatar className="w-32 h-32 bg-white text-black border-gray-500 text-2xl flex items-center justify-center font-bold">
              {getInitials(formDetails.fullName)}
            </Avatar>
          </div>

          {/* Input Fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {Object.entries(formDetails).map(([key, value]) => (
              <div key={key}>
                <Label className="text-sm font-medium text-black capitalize">
                  {key.replace(/([A-Z])/g, " $1").trim()}*
                </Label>
                <Input
                  type="text"
                  value={value}
                  required
                  onChange={(e) => handleInputChange(key, e.target.value)}
                  className="mt-1 bg-white border-2 border-black border-gray-500"
                />
              </div>
            ))}
          </div>

          {/* Save All Changes Button */}
          <div className="flex justify-center mt-6">
            <Button
              type="submit"
              onClick={handleSave}
              className="w-full max-w-sm bg-white text-black border-2 border-gray-500"
              style={{ boxShadow: "none" }} // Ensures no hover effect or shadow
            >
              Save Changes
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
    </>
  );
}
