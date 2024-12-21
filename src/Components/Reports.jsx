import { useState } from "react";
import { Navbar, SideNav, Wrapper, Footer } from "@/Components/compIndex";
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
import { Label } from "@/Components/ui/label";
import { Textarea } from "@/Components/ui/textarea";

const Reports = () => {
  // State to manage the editable fields
  const [employee, setEmployee] = useState("Patricia Collins");
  const [department, setDepartment] = useState("Marketing");
  const [week, setWeek] = useState("08-12 Jul 2019");
  const [tasksCompleted, setTasksCompleted] = useState("");
  const [tasksToBegin, setTasksToBegin] = useState("");
  const [comments, setComments] = useState("");

  // Temporary handleSave function
  const handleSave = () => {
    // Temporary log statement to simulate saving
    console.log("Saving report...");
    console.log("Employee:", employee);
    console.log("Department:", department);
    console.log("Week:", week);
    console.log("Tasks Completed:", tasksCompleted);
    console.log("Tasks To Begin Next Week:", tasksToBegin);
    console.log("Self-Assessment & Comments:", comments);

    // Placeholder for backend integration (this is where backend team can add their logic)
    alert("Report Saved!");
  };

  return (
    <>
      <SideNav />
      <Navbar />

      <Wrapper>
        <div className="min-h-screen bg-white p-4 md:p-8">
          <Card className="mx-auto max-w-4xl border-none shadow-none">
            {/* Added border around the report section */}
            <CardHeader className="space-y-2 border-2 border-[#0056b3] rounded-lg p-6">
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>SPARKS & CO. PUBLISHING</span>
                <span>WEEKLY REPORT</span>
              </div>
              <CardTitle className="text-center text-3xl font-bold tracking-tight text-[#007bff]">
                EMPLOYEE WEEKLY STATUS REPORT
              </CardTitle>
              <div className="grid grid-cols-1 gap-4 pt-4 md:grid-cols-3">
                <div className="space-y-2">
                  <Label className="text-muted-foreground">EMPLOYEE : </Label>
                  <input
                    type="text"
                    value={employee}
                    onChange={(e) => setEmployee(e.target.value)}
                    className="text-[#007bff] border-none focus:outline-none"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-muted-foreground">DEPARTMENT : </Label>
                  <input
                    type="text"
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    className="text-[#007bff] border-none focus:outline-none"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-muted-foreground">WEEK : </Label>
                  <br />
                  <input
                    type="text"
                    value={week}
                    onChange={(e) => setWeek(e.target.value)}
                    className="text-[#007bff] border-none focus:outline-none"
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                {/* Task Completed section with added padding */}
                <div className="rounded-lg bg-[#007bff] p-4">
                  <h2 className="text-lg font-semibold text-white">
                    TASKS COMPLETED
                  </h2>
                </div>
                <Textarea
                  value={tasksCompleted}
                  onChange={(e) => setTasksCompleted(e.target.value)}
                  className="min-h-[150px] resize-none border-2 border-[#0056b3] focus:outline-none p-4"
                  placeholder="Enter completed tasks..."
                />
              </div>
              <div className="space-y-4">
                <div className="rounded-lg bg-[#007bff] p-4">
                  <h2 className="text-lg font-semibold text-white">
                    TASKS COMPLETED
                  </h2>
                </div>
                <Textarea
                  value={tasksToBegin}
                  onChange={(e) => setTasksToBegin(e.target.value)}
                  className="min-h-[150px] resize-none border-2 border-[#0056b3] focus:outline-none p-4"
                  placeholder="Enter upcoming tasks..."
                />
              </div>
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-4">
                  <div className="rounded-lg bg-[#007bff] p-4">
                    <h2 className="text-lg font-semibold text-white">
                      TASKS TO BEGIN NEXT WEEK
                    </h2>
                  </div>
                  <Textarea
                    className="min-h-[150px] resize-none border-2 border-[#0056b3] focus:outline-none p-4"
                    placeholder="Enter upcoming tasks..."
                  />
                </div>
                <div className="space-y-4">
                  <div className="rounded-lg bg-[#007bff] p-4">
                    <h2 className="text-lg font-semibold text-white">
                      SELF ASSESSMENT & COMMENTS
                    </h2>
                  </div>
                  <Textarea
                    value={comments}
                    onChange={(e) => setComments(e.target.value)}
                    className="min-h-[150px] resize-none border-2 border-[#0056b3] focus:outline-none p-4"
                    placeholder="Enter your comments..."
                  />
                </div>
              </div>
            </CardContent>

            {/* Save Button */}
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
