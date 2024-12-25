import { useState } from "react";
import { Navbar, SideNav, Wrapper, Footer } from "@/Components/compIndex";
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
import { Label } from "@/Components/ui/label";
import { Textarea } from "@/Components/ui/textarea";

const Reports = () => {
  const [message, setMesage] = useState(null);
  const [formData, setFormData] = useState({
    employee: "",
    department: "",
    date: "",
    tasksCompleted: "",
    tasksToBeginNextWeek: "", // Corrected key
    selfAssessmentComments: "", // Corrected key
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    try {
      const response = await fetch(
        "https://iisppr-backend.vercel.app/weeklystatus/submit",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        setFormData({
          employee: "",
          department: "",
          date: "",
          tasksCompleted: "",
          tasksToBeginNextWeek: "",
          selfAssessmentComments: "",
        });
      } else {
        const errorData = await response.json();
        console.error("API Error:", errorData);
        alert("Failed to save report. Please check your input.");
      }
    } catch (error) {
      console.error("Error saving report:", error);
      alert("An error occurred while saving the report.");
    }
  };

  return (
    <>
      <SideNav />
      <Navbar />

      <Wrapper>
        <div className="min-h-screen bg-white p-4 md:p-8">
          <Card className="mx-auto max-w-4xl border-none shadow-none">
            <CardHeader className="mb-7">
              <CardTitle className="text-center text-3xl font-bold tracking-tight text-[#007bff]">
                EMPLOYEE WEEKLY STATUS REPORT
              </CardTitle>
            </CardHeader>

            <div className="mb-6 space-y-6 rounded-lg border-[#0056b3] p-6">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                {["employee", "department", "date"].map((field) => (
                  <div key={field} className="flex flex-col space-y-2">
                    <Label className="text-muted-foreground">
                      {field.charAt(0).toUpperCase() + field.slice(1)}
                    </Label>
                    <input
                      type={field === "date" ? "date" : "text"}
                      name={field}
                      value={formData[field]}
                      onChange={handleInputChange}
                      className="w-full rounded-md border-2 border-[#0056b3] p-2 text-[#007bff] focus:outline-none"
                    />
                  </div>
                ))}
              </div>
            </div>

            <CardContent className="space-y-6">
              {[
                { label: "TASKS COMPLETED", name: "tasksCompleted" },
                {
                  label: "TASKS TO BEGIN NEXT WEEK",
                  name: "tasksToBeginNextWeek",
                }, // Corrected name
                {
                  label: "SELF ASSESSMENT & COMMENTS",
                  name: "selfAssessmentComments",
                }, // Corrected name
              ].map((section) => (
                <div key={section.name} className="space-y-4">
                  <div className="rounded-lg bg-[#007bff] p-4">
                    <h2 className="text-lg font-semibold text-white">
                      {section.label}
                    </h2>
                  </div>
                  <Textarea
                    name={section.name}
                    value={formData[section.name]}
                    onChange={handleInputChange}
                    className="min-h-[150px] resize-none border-2 border-[#0056b3] focus:outline-none p-4"
                    placeholder={`Enter ${section.label.toLowerCase()}...`}
                  />
                </div>
              ))}
            </CardContent>

            {message && (
              <div
                className={`mb-4 rounded-lg p-4 text-center ${
                  message.type === "sucess"
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {message.text}
              </div>
            )}

            <div className="flex justify-center mt-6">
              <button
                onClick={handleSave}
                className="bg-blue-500 text-white px-6 py-3 text-lg font-bold uppercase tracking-wide rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
              >
                Save
              </button>
            </div>
          </Card>
        </div>
      </Wrapper>
      <Footer />
    </>
  );
};

export default Reports;
