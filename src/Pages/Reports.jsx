import React, { useState, useEffect } from "react";
import { FileText, Menu, X } from "lucide-react";
import { FaFileExcel } from "react-icons/fa";
import { saveAs } from "file-saver";
import { jsPDF } from "jspdf";
import * as XLSX from "xlsx";
import { Navbar } from "@/Components/compIndex";
import { reportData } from "@/APIs";

import { Button } from "@/Components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/Components/ui/table";
import { Checkbox } from "@/Components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu";
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";

const Reports = () => {
  const [data, setData] = useState([]);
  const [selectedData, setSelectedData] = useState(new Set());
  const [selectAll, setSelectAll] = useState(false);

  useEffect(() => {
    setData(reportData);
  }, []);

  const handleCheckboxChange = (id) => {
    const updatedSelectedData = new Set(selectedData);
    if (updatedSelectedData.has(id)) {
      updatedSelectedData.delete(id);
    } else {
      updatedSelectedData.add(id);
    }
    setSelectedData(updatedSelectedData);
  };

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedData(new Set());
    } else {
      const allDataIds = data.map((item) => item.id);
      setSelectedData(new Set(allDataIds));
    }
    setSelectAll(!selectAll);
  };

  const handleDownloadPDF = () => {
    const doc = new jsPDF({ orientation: "landscape" });
    doc.setFontSize(10);
    doc.text("Intern Report", 14, 10);
    doc.autoTable({
      head: [
        [
          "ID",
          "Name",
          "Attendance",
          "Task Update",
          "Task Completion",
          "Department",
          "Joining Date",
          "Email",
          "Phone",
          "Task Status",
          "Performance",
          "Comments",
        ],
      ],
      body: data
        .filter((item) => selectedData.has(item.id))
        .map((item) => [
          item.id,
          item.name,
          item.attendance,
          item.taskUpdate,
          item.taskCompletion,
          item.department,
          item.joiningDate,
          item.email,
          item.phone,
          item.taskStatus,
          item.performance,
          item.comments,
        ]),
      startY: 20,
      margin: { horizontal: 10 },
      styles: { fontSize: 8 },
    });

    doc.save("intern_report.pdf");
  };

  const handleDownloadExcel = () => {
    const selectedRows = data.filter((item) => selectedData.has(item.id));
    const ws = XLSX.utils.json_to_sheet(selectedRows);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Intern Report");
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });

    const file = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(file, "intern_report.xlsx");
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto py-10 lg:ml-36">
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Intern Report</CardTitle>
              <div className="flex gap-2">
                <Button onClick={handleDownloadPDF} variant="outline">
                  <FileText className="mr-2 h-4 w-4" /> PDF
                </Button>
                <Button onClick={handleDownloadExcel} variant="outline">
                  <FaFileExcel className="mr-2 h-4 w-4" /> Excel
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[50px]">
                    <Checkbox
                      checked={selectAll}
                      onCheckedChange={handleSelectAll}
                    />
                  </TableHead>
                  <TableHead>ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Attendance</TableHead>
                  <TableHead>Task Update</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Task Status</TableHead>
                  <TableHead>Performance</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>
                      <Checkbox
                        checked={selectedData.has(item.id)}
                        onCheckedChange={() => handleCheckboxChange(item.id)}
                      />
                    </TableCell>
                    <TableCell>{item.id}</TableCell>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{item.attendance}%</TableCell>
                    <TableCell>{item.taskUpdate}</TableCell>
                    <TableCell>{item.department}</TableCell>
                    <TableCell>{item.taskStatus}</TableCell>
                    <TableCell>{item.performance}%</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            Details
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            onClick={() => alert(`Details for ${item.name}`)}
                          >
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => alert(`Email: ${item.email}`)}
                          >
                            Contact
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default Reports;
