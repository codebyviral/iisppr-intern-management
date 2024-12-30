import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SideNav, Navbar } from "../Components/compIndex";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AccountDetails() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saveStatus, setSaveStatus] = useState("");
  const [formDetails, setFormDetails] = useState({
    fullName: "",
    email: "",
    studying: "",
    currentRole: "",
    linkedinLink: "",
    phoneNumber: "",

    countryCode: "+91",
    profilePicture: "",
    bio: "",

    countryCode: "+1", // Default country code
    profilePicture: "",
    bio: "", // New field for user bio

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
          studying: data.studying || "",
          currentRole: data.role || "",
          linkedinLink: data.linkedinLink || "",
          phoneNumber: data.mnumber?.toString() || "",
          countryCode: data.countryCode || "+1",
          profilePicture: data.profilePicture || "",
          bio: data.bio || "",
        });
        setProfilePreview(data.profilePicture || null);
      } catch (error) {
        console.error(`Error fetching user details: ${error}`);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  const navigate = useNavigate();

  const handleInputChange = (field, value) => {
    setFormDetails((prev) => ({ ...prev, [field]: value }));
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setProfilePreview(URL.createObjectURL(file));
      setFormDetails((prev) => ({ ...prev, profilePicture: file }));
    }
  };

  const handleSave = async () => {
    setSaveStatus("");
    const formData = new FormData();
    for (const [key, value] of Object.entries(formDetails)) {
      formData.append(key, value);
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/save-account-details`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

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
            {/* Profile Photo Section */}
            <div className="flex flex-col items-center">
              <Avatar className="w-32 h-32 bg-gray-200 text-gray-600 flex items-center justify-center font-bold text-3xl rounded-full overflow-hidden">
                {profilePreview ? (
                  <img src={profilePreview} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  formDetails.fullName
                    .split(" ")
                    .map((name) => name[0])
                    .join("")
                )}
              </Avatar>
              <label htmlFor="profile-upload" className="mt-4 cursor-pointer">
                <span className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors">
                  Upload Profile Picture
                </span>
                <input
                  id="profile-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>
            </div>

            {/* Input Fields */}
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

              <div className="flex flex-col">
                <Label className="text-sm font-medium text-gray-700">Email</Label>
                <Input
                  type="email"
                  value={formDetails.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className="mt-2 bg-gray-50 border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 rounded-md"
                />
              </div>

              <div className="flex flex-col">
                <Label className="text-sm font-medium text-gray-700">College Study Year</Label>
                <Input
                  type="text"
                  value={formDetails.studying}
                  placeholder="E.g., 2nd Year"
                  onChange={(e) => handleInputChange("studying", e.target.value)}
                  className="mt-2 bg-gray-50 border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 rounded-md"
                />
              </div>

              <div className="flex flex-col">
                <Label className="text-sm font-medium text-gray-700">Current Role</Label>
                <Input
                  type="text"
                  value={formDetails.currentRole}
                  onChange={(e) => handleInputChange("currentRole", e.target.value)}
                  className="mt-2 bg-gray-50 border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 rounded-md"
                />
              </div>

              <div className="flex flex-col">
                <Label className="text-sm font-medium text-gray-700">LinkedIn Profile</Label>
                <Input
                  type="text"
                  value={formDetails.linkedinLink}
                  onChange={(e) => handleInputChange("linkedinLink", e.target.value)}
                  className="mt-2 bg-gray-50 border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 rounded-md"
                />
              </div>

              <div className="flex flex-col">
                <Label className="text-sm font-medium text-gray-700">Phone Number</Label>
                <div className="flex mt-2">
                  <Select
                    value={formDetails.countryCode}
                    onValueChange={(value) => handleInputChange("countryCode", value)}
                  >
                    <SelectTrigger className="w-[100px]">
                      <SelectValue placeholder="Code" />
                    </SelectTrigger>
                    <SelectContent>

                    
                    <SelectItem value="+1">+1 (US)</SelectItem>
                    <SelectItem value="+91">+91 (IN)</SelectItem>
                    <SelectItem value="+44">+44 (UK)</SelectItem>
                    <SelectItem value="+61">+61 (Australia)</SelectItem>
                    <SelectItem value="+81">+81 (Japan)</SelectItem>
                    <SelectItem value="+49">+49 (Germany)</SelectItem>
                    <SelectItem value="+33">+33 (France)</SelectItem>
                    <SelectItem value="+39">+39 (Italy)</SelectItem>
                    <SelectItem value="+34">+34 (Spain)</SelectItem>
                    <SelectItem value="+86">+86 (China)</SelectItem>
                    <SelectItem value="+7">+7 (Russia)</SelectItem>
                    <SelectItem value="+55">+55 (Brazil)</SelectItem>
                    <SelectItem value="+27">+27 (South Africa)</SelectItem>
                    <SelectItem value="+82">+82 (South Korea)</SelectItem>
  

                      <SelectItem value="+1">+1 (US)</SelectItem>
                      <SelectItem value="+44">+44 (UK)</SelectItem>
                      <SelectItem value="+91">+91 (IN)</SelectItem>
                      {/* Add more country codes as needed */}

                    </SelectContent>
                  </Select>
                  <Input
                    type="tel"
                    value={formDetails.phoneNumber}
                    onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
                    className="flex-1 ml-2 bg-gray-50 border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 rounded-md"
                  />
                </div>
              </div>

              <div className="flex flex-col col-span-2">
                <Label className="text-sm font-medium text-gray-700">Bio</Label>
                <textarea
                  value={formDetails.bio}
                  onChange={(e) => handleInputChange("bio", e.target.value)}
                  className="mt-2 bg-gray-50 border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 rounded-md h-24"
                  placeholder="Tell us about yourself..."
                />
              </div>
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

