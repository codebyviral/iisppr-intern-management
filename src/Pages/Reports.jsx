import { useState } from "react";
import { Navbar, SideNav, Wrapper, Footer } from "@/Components/compIndex";
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
import { Label } from "@/Components/ui/label";
import { Textarea } from "@/Components/ui/textarea";
import { AlertCircle, CheckCircle2, Loader2 } from "lucide-react";

const Reports = () => {
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    employee: "",
    department: "",
    date: "",
    tasksCompleted: "",
    tasksToBeginNextWeek: "",
    selfAssessmentComments: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/weeklystatus/submit`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        const data = await response.json();
        setMessage({ type: "success", text: data.message });
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
        setMessage({ type: "error", text: errorData.error });
      }
    } catch (error) {
      setMessage({
        type: "error",
        text: "An error occurred while saving the report.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <SideNav />
      <Navbar />

      <Wrapper>
        <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-4 md:p-8">
          <Card className="mx-auto max-w-4xl border shadow-xl transition-all duration-300 hover:shadow-2xl">
            <CardHeader className="space-y-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-t-lg">
              <CardTitle className="text-center text-3xl font-bold tracking-tight">
                Employee Weekly Status Report
              </CardTitle>
              <p className="text-center text-blue-100">
                Track your progress and plan ahead
              </p>
            </CardHeader>

            <div className="mb-6 space-y-6 p-6">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                {[
                  { name: "employee", label: "Employee Name", type: "text" },
                  { name: "department", label: "Department", type: "text" },
                  { name: "date", label: "Report Date", type: "date" },
                ].map(({ name, label, type }) => (
                  <div key={name} className="group space-y-2">
                    <Label className="text-sm font-medium text-gray-700">
                      {label}
                    </Label>
                    <input
                      type={type}
                      name={name}
                      value={formData[name]}
                      onChange={handleInputChange}
                      className="w-full rounded-md border-2 border-gray-200 p-2 transition-all duration-200 
                               focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200
                               group-hover:border-blue-300"
                    />
                  </div>
                ))}
              </div>
            </div>

            <CardContent className="space-y-8">
              {[
                { label: "Tasks Completed This Week", name: "tasksCompleted" },
                {
                  label: "Tasks Planned for Next Week",
                  name: "tasksToBeginNextWeek",
                },
                {
                  label: "Self Assessment & Comments",
                  name: "selfAssessmentComments",
                },
              ].map((section) => (
                <div key={section.name} className="space-y-4 group">
                  <div
                    className="rounded-lg bg-gradient-to-r from-blue-600 to-blue-700 p-4 transition-all duration-200
                                group-hover:from-blue-700 group-hover:to-blue-800"
                  >
                    <h2 className="text-lg font-semibold text-white">
                      {section.label}
                    </h2>
                  </div>
                  <Textarea
                    name={section.name}
                    value={formData[section.name]}
                    onChange={handleInputChange}
                    className="min-h-[150px] w-full rounded-md border-2 border-gray-200 p-4 transition-all duration-200
                             focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200
                             group-hover:border-blue-300"
                    placeholder={`Enter your ${section.label.toLowerCase()}...`}
                  />
                </div>
              ))}
            </CardContent>

            {message && (
              <div
                className={`mx-6 mb-4 flex items-center justify-center gap-2 rounded-lg p-4 text-center transition-all duration-300
                              ${
                                message.type === "success"
                                  ? "bg-green-100 text-green-700"
                                  : "bg-red-100 text-red-700"
                              }`}
              >
                {message.type === "success" ? (
                  <CheckCircle2 className="h-5 w-5" />
                ) : (
                  <AlertCircle className="h-5 w-5" />
                )}
                {message.text}
              </div>
            )}

            <div className="flex justify-center p-6">
              <button
                onClick={handleSave}
                disabled={loading}
                className="group relative inline-flex items-center gap-2 rounded-lg bg-blue-600 px-8 py-3 
                         text-lg font-semibold text-white transition-all duration-300
                         hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                         disabled:cursor-not-allowed disabled:opacity-70"
              >
                {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : null}
                {loading ? "Saving..." : "Save Report"}
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
