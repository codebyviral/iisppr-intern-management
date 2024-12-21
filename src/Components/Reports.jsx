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

  return (
    <>
      <SideNav />
      <Navbar />

      <Wrapper>
        <div className="min-h-screen bg-white p-4 md:p-8">
          <Card className="mx-auto max-w-4xl border-none shadow-none">
            <CardHeader className="space-y-2">
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>SPARKS & CO. PUBLISHING</span>
                <span>WEEKLY REPORT</span>
              </div>
              <CardTitle className="text-center text-3xl font-bold tracking-tight text-[#ff7f7f]">
                EMPLOYEE WEEKLY STATUS REPORT
              </CardTitle>
              <div className="grid grid-cols-1 gap-4 pt-4 md:grid-cols-3">
                <div className="space-y-2">
                  <Label className="text-muted-foreground">EMPLOYEE : </Label>
                  <input
                    type="text"
                    value={employee}
                    onChange={(e) => setEmployee(e.target.value)}
                    className="text-[#ff7f7f] border-none focus:outline-none"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-muted-foreground">DEPARTMENT : </Label>
                  <input
                    type="text"
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    className="text-[#ff7f7f] border-none focus:outline-none"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-muted-foreground">WEEK : </Label>
                  <br />
                  <input
                    type="text"
                    value={week}
                    onChange={(e) => setWeek(e.target.value)}
                    className="text-[#ff7f7f] border-none focus:outline-none"
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="rounded-lg bg-[#ff7f7f] p-2">
                  <h2 className="text-lg font-semibold text-white">
                    TASKS COMPLETED
                  </h2>
                </div>
                <Textarea
                  className="min-h-[150px] resize-none"
                  placeholder="Enter completed tasks..."
                />
              </div>
              <div className="space-y-4">
                <div className="rounded-lg bg-[#ff7f7f] p-2">
                  <h2 className="text-lg font-semibold text-white">
                    TASKS COMPLETED
                  </h2>
                </div>
                <Textarea
                  className="min-h-[150px] resize-none"
                  placeholder="Enter completed tasks..."
                />
              </div>
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-4">
                  <div className="rounded-lg bg-[#ff7f7f] p-2">
                    <h2 className="text-lg font-semibold text-white">
                      TASKS TO BEGIN NEXT WEEK
                    </h2>
                  </div>
                  <Textarea
                    className="min-h-[150px] resize-none"
                    placeholder="Enter upcoming tasks..."
                  />
                </div>
                <div className="space-y-4">
                  <div className="rounded-lg bg-[#ff7f7f] p-2">
                    <h2 className="text-lg font-semibold text-white">
                      SELF ASSESSMENT & COMMENTS
                    </h2>
                  </div>
                  <Textarea
                    className="min-h-[150px] resize-none"
                    placeholder="Enter your comments..."
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </Wrapper>
      <Footer />
    </>
  );
};

export default Reports;
