import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Upload, X } from "lucide-react";
//components
export default function AccountDetails() {
  const [userDetails, setUserDetails] = useState({
    fullName: "John",
    email: "abc@gmail.com",
    studying: "Computer Science",
    currentRole: "Manager",
    gender: "Male",
    githubLink: "https://github.com/johndoe",
    linkedinLink: "https://linkedin.com/in/johndoe",
    phoneNumber: "+1234567890",
    profilePhoto: "/placeholder.svg?height=150&width=150", // Default placeholder
  });

  const [tempDetails, setTempDetails] = useState({ ...userDetails });
  const [unsavedChanges, setUnsavedChanges] = useState(false);
  const [errors, setErrors] = useState({});

  const handleInputChange = (field, value) => {
    setTempDetails((prev) => ({ ...prev, [field]: value }));
    setUnsavedChanges(true); // Indicate unsaved changes
    setErrors((prev) => ({ ...prev, [field]: value.trim() === "" }));
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setTempDetails((prev) => ({
          ...prev,
          profilePhoto: reader.result, // Update tempDetails with new photo
        }));
        setUnsavedChanges(true); // Indicate unsaved changes
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemovePhoto = () => {
    setTempDetails((prev) => ({
      ...prev,
      profilePhoto: "/placeholder.svg?height=150&width=150", // Reset to default
    }));
    setUnsavedChanges(true); // Indicate unsaved changes
  };

  const handleSaveAll = () => {
    const emptyFields = Object.entries(tempDetails).filter(
      ([key, value]) => value.trim() === "" && key !== "profilePhoto"
    );

    if (emptyFields.length > 0) {
      const newErrors = {};
      emptyFields.forEach(([key]) => {
        newErrors[key] = true;
      });
      setErrors(newErrors);
      alert("Please fill out all required fields before saving.");
      return;
    }

    setUserDetails(tempDetails); // Save all changes
    setUnsavedChanges(false); // Reset unsaved changes
    setErrors({});
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-3xl bg-white shadow-md p-6">
        <CardHeader className="text-center mb-4">
          <CardTitle className="text-2xl font-semibold text-gray-900">
            Account Details
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Profile Photo Section */}
          <div className="flex justify-center relative">
            <Avatar className="w-32 h-32 border-4 border-purple-200">
              <AvatarImage src={tempDetails.profilePhoto} alt="Profile" />
            </Avatar>
            <div className="absolute bottom-0 flex gap-2">
              {/* Upload Button */}
              <input
                type="file"
                accept="image/*"
                id="photo-upload"
                className="hidden"
                onChange={handlePhotoChange}
              />
              <label
                htmlFor="photo-upload"
                className="bg-purple-600 text-white px-3 py-1 rounded-full text-sm cursor-pointer hover:bg-purple-700 flex items-center gap-1"
              >
                <Upload className="h-4 w-4" />
                Upload
              </label>
              {/* Remove Button */}
              <Button
                size="sm"
                variant="destructive"
                className="rounded-full"
                onClick={handleRemovePhoto}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Input Fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {Object.entries(tempDetails).map(([key, value]) => {
              if (key === "profilePhoto") return null;

              return (
                <div key={key}>
                  <Label className="text-sm font-medium text-gray-700 capitalize">
                    {key.replace(/([A-Z])/g, " $1").trim()}*
                  </Label>
                  <Input
                    type="text"
                    value={value}
                    onChange={(e) => handleInputChange(key, e.target.value)}
                    className={`mt-1 bg-white ${
                      errors[key] ? "border-red-500" : ""
                    }`}
                  />
                  {errors[key] && (
                    <p className="text-red-500 text-xs mt-1">
                      This field cannot be empty.
                    </p>
                  )}
                </div>
              );
            })}
          </div>

          {/* Save All Changes Button */}
          <div className="flex justify-center mt-6">
            <Button
              onClick={handleSaveAll}
              className={`w-full max-w-sm ${
                unsavedChanges ? "animate-pulse" : ""
              }`}
              variant="primary"
              disabled={!unsavedChanges}
            >
              Save All Changes
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
