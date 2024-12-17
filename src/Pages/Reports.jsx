import { useState, useEffect } from "react";
import { FileText } from "lucide-react"; // Correct import for PDF
import { FaFileExcel } from "react-icons/fa"; // Importing Excel icon from react-icons
import { saveAs } from "file-saver";
import { jsPDF } from "jspdf";
import * as XLSX from "xlsx";
import { Navbar } from "@/Components/compIndex";
import { reportData } from "@/APIs";

const Reports = () => {
  const [data, setData] = useState([]);
  const [selectedData, setSelectedData] = useState(new Set()); // Set to track selected rows
  const [selectAll, setSelectAll] = useState(false); // To handle the Select All checkbox state

  // Dummy data for intern management (Large data set)
  useEffect(() => {
    setData(reportData);
  }, []);

  // Handle row checkbox click
  const handleCheckboxChange = (id) => {
    const updatedSelectedData = new Set(selectedData);
    if (updatedSelectedData.has(id)) {
      updatedSelectedData.delete(id); // Deselect if already selected
    } else {
      updatedSelectedData.add(id); // Select if not selected
    }
    setSelectedData(updatedSelectedData);
  };

  // Handle select all checkbox change
  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedData(new Set()); // Deselect all if currently selected
    } else {
      const allDataIds = data.map((item) => item.id);
      setSelectedData(new Set(allDataIds)); // Select all rows
    }
    setSelectAll(!selectAll);
  };

  // Handle download PDF for selected data
  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(12);

    // Title
    doc.text("Intern Report", 14, 10);
    doc.autoTable({
      head: [
        [
          "ID",
          "Name",
          "Attendance (%)",
          "Task Update",
          "Task Completion (%)",
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
        .filter((item) => selectedData.has(item.id)) // Filter only selected data
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
    });

    doc.save("intern_report.pdf");
  };

  // Handle download Excel for selected data
  const handleDownloadExcel = () => {
    const selectedRows = data.filter((item) => selectedData.has(item.id)); // Filter selected data
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
      <div className="min-h-screen bg-gradient-to-br from-blue-100 to-blue-200 px-4 py-6">
        <div className="max-w-full mx-auto px-8 py-6 ml-36">
          {/* Header Section with Download Buttons */}
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-blue-800">Intern Report</h1>
            <div className="flex gap-4">
              <button
                onClick={handleDownloadPDF}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-300"
              >
                <FileText size={20} />
                Download PDF
              </button>
              <button
                onClick={handleDownloadExcel}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-300"
              >
                <FaFileExcel size={20} />
                Download Excel
              </button>
            </div>
          </div>

          {/* Table of Data */}
          <div className="overflow-x-auto bg-white p-6 rounded-xl shadow-lg">
            <table className="w-full text-sm text-left text-gray-600">
              <thead className="bg-blue-200">
                <tr>
                  {/* Select All Checkbox */}
                  <th className="px-4 py-2">
                    <input
                      type="checkbox"
                      checked={selectAll}
                      onChange={handleSelectAll}
                      className="cursor-pointer"
                    />
                  </th>
                  <th className="px-4 py-2">ID</th>
                  <th className="px-4 py-2">Name</th>
                  <th className="px-4 py-2">Attendance (%)</th>
                  <th className="px-4 py-2">Task Update</th>
                  <th className="px-4 py-2">Task Completion (%)</th>
                  <th className="px-4 py-2">Department</th>
                  <th className="px-4 py-2">Joining Date</th>
                  <th className="px-4 py-2">Email</th>
                  <th className="px-4 py-2">Phone</th>
                  <th className="px-4 py-2">Task Status</th>
                  <th className="px-4 py-2">Performance (%)</th>
                  <th className="px-4 py-2">Comments</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item) => (
                  <tr
                    key={item.id}
                    className="border-b hover:bg-blue-50 cursor-pointer"
                    onClick={() => handleCheckboxChange(item.id)} // Select row on click
                  >
                    <td className="px-4 py-2">
                      <input
                        type="checkbox"
                        checked={selectedData.has(item.id)}
                        onChange={() => handleCheckboxChange(item.id)}
                        className="cursor-pointer"
                      />
                    </td>
                    <td className="px-4 py-2">{item.id}</td>
                    <td className="px-4 py-2">{item.name}</td>
                    <td className="px-4 py-2">{item.attendance}%</td>
                    <td className="px-4 py-2">{item.taskUpdate}</td>
                    <td className="px-4 py-2">{item.taskCompletion}%</td>
                    <td className="px-4 py-2">{item.department}</td>
                    <td className="px-4 py-2">{item.joiningDate}</td>
                    <td className="px-4 py-2">{item.email}</td>
                    <td className="px-4 py-2">{item.phone}</td>
                    <td className="px-4 py-2">{item.taskStatus}</td>
                    <td className="px-4 py-2">{item.performance}%</td>
                    <td className="px-4 py-2">{item.comments}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Reports;
