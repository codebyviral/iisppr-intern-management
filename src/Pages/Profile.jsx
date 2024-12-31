import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { Avatar } from "@/Components/ui/avatar";
import { Button } from "@/Components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/Components/ui/select";
import { SideNav, Navbar } from "../Components/compIndex";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AccountDetails() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saveStatus, setSaveStatus] = useState("");
  const [profilePicture, setProfilePicture] = useState(null);
  const [formDetails, setFormDetails] = useState({
    fullName: "",
    email: "",
    studying: "",
    currentRole: "",
    linkedinLink: "",
    phoneNumber: "",
    countryCode: "+91",
    profilePicture: "",
    bio: "studying btech 2nd year",
  });
  const [profilePreview, setProfilePreview] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/api/auth/user/${localStorage.getItem("userId")}`
        );
        const data = response.data;

        setUser(data);
        setFormDetails({
          fullName: data.name || "",
          email: data.email || "",
          studying: "",
          currentRole: data.role || "",
          linkedinLink: data.linkedinLink || "",
          phoneNumber: data.mnumber ? `+91 ${data.mnumber.toString()}` : "+91 ",
        });
        if (data.profilePicture) {
          setProfilePicture(data.profilePicture);
        }
      } catch (error) {
        console.error(`Error fetching user details: ${error}`);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  const navigate = useNavigate();

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
    setSaveStatus("");
    try {
      const formData = new FormData();
      Object.keys(formDetails).forEach(key => {
        formData.append(key, formDetails[key]);
      });
      if (profilePicture instanceof File) {
        formData.append('profilePicture', profilePicture);
      }

      const response = await axios.post("/api/save-account-details", formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      if (response.status === 200) {
        setSaveStatus("Details saved successfully!");
      } else {
        setSaveStatus("Failed to save changes. Please try again.");
      }
    } catch (error) {
      setSaveStatus("Error saving account details.");
      console.error("Error saving account details:", error);
    }
  };

  const handleUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setProfilePicture(file);
    }
  };

  const handleRemove = () => {
    setProfilePicture(null);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="flex flex-col items-center text-center space-y-4">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-600 border-opacity-75"></div>
          <p className="text-lg font-medium text-gray-700">Loading account details...</p>
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
            <CardTitle className="text-3xl font-bold text-gray-800">Account Details</CardTitle>
            <p className="text-gray-500">Manage your account information below.</p>
          </CardHeader>
          <CardContent className="space-y-8">
            <div className="flex flex-col items-center">
              <Avatar className="w-32 h-32 bg-gray-200 text-gray-600 flex items-center justify-center font-bold text-3xl rounded-full overflow-hidden">
                {profilePicture ? (
                  <img
                    src={profilePicture instanceof File ? URL.createObjectURL(profilePicture) : profilePicture}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  getInitials(formDetails.fullName)
                )}
              </Avatar>
              <div className="mt-4 space-x-2">
                <Button
                  onClick={() => document.getElementById('fileInput').click()}
                  className="bg-green-500 text-white hover:bg-green-600"
                >
                  Upload Picture
                </Button>
                <input
                  id="fileInput"
                  type="file"
                  accept="image/*"
                  onChange={handleUpload}
                  style={{ display: 'none' }}
                />
                <Button
                  onClick={handleRemove}
                  className="bg-red-500 text-white hover:bg-red-600"
                  disabled={!profilePicture}
                >
                  Remove Picture
                </Button>
              </div>
              <p className="mt-4 text-xl font-semibold text-gray-800">
                {formDetails.fullName || "Your Name"}
              </p>
              <p className="text-gray-600">{formDetails.email}</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="flex flex-col">
                <Label className="text-sm font-medium text-gray-700">Full Name</Label>
                <Input
                  type="text"
                  value={formDetails.fullName}
                  onChange={(e) => handleInputChange("fullName", e.target.value)}
                  className="mt-2 bg-gray-50 border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 rounded-md"
                />
              </div>

              {["currentRole", "linkedinLink", "phoneNumber"].map(
                (key) => (
                  key === "phoneNumber" ? (
                    <div key={key} className="flex flex-col">
                      <Label className="text-sm font-medium text-gray-700">
                        Phone Number
                      </Label>
                      <Input
                        type="tel"
                        value={formDetails.phoneNumber}
                        placeholder="Enter your phone number"
                        onChange={(e) => {
                          let value = e.target.value;
                          if (!value.startsWith('+91 ')) {
                            value = '+91 ' + value.replace('+91 ', '');
                          }
                          handleInputChange('phoneNumber', value);
                        }}
                        className="mt-2 bg-gray-50 border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 rounded-md"
                      />
                    </div>
                  ) : (
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
                )
              )}
            </div>

            <div className="flex justify-center mt-4">
              <Button
                onClick={() => navigate("/reset-account-password")}
                className="bg-yellow-500 text-white hover:bg-yellow-600"
              >
                Change Password
              </Button>
            </div>

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
                    saveStatus.includes("successfully") ? "text-green-600" : "text-red-600"
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

