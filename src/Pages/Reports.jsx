import { useState, useEffect } from "react";
import { FileText, Menu, X } from "lucide-react"; // Added Menu and X for mobile menu
import { FaFileExcel } from "react-icons/fa";
import { saveAs } from "file-saver";
import { jsPDF } from "jspdf";
import * as XLSX from "xlsx";
import { Navbar } from "@/Components/compIndex";
import { reportData } from "@/APIs";

const Reports = () => {
  const [data, setData] = useState([]);
  const [selectedData, setSelectedData] = useState(new Set());
  const [selectAll, setSelectAll] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileTableView, setIsMobileTableView] = useState(false);

  // Dummy data for intern management
  useEffect(() => {
    setData(reportData);

    // Check screen width and set mobile view
    const handleResize = () => {
      setIsMobileTableView(window.innerWidth <= 768);
    };

    handleResize(); // Initial check
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Existing checkbox and download handlers remain the same

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
    const doc = new jsPDF({ orientation: "landscape" }); // Landscape for better readability
    doc.setFontSize(10); // Smaller font for more content

    // Title
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
      styles: { fontSize: 8 }, // Smaller font in PDF
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

  // Mobile Table View Component
  const MobileTableView = () => (
    <div className="space-y-4">
      {data.map((item) => (
        <div
          key={item.id}
          className={`bg-white border rounded-lg p-4 shadow-sm ${
            selectedData.has(item.id) ? "bg-blue-50 border-blue-200" : ""
          }`}
          onClick={() => handleCheckboxChange(item.id)}
        >
          <div className="flex items-center justify-between mb-2">
            <input
              type="checkbox"
              checked={selectedData.has(item.id)}
              onChange={() => handleCheckboxChange(item.id)}
              className="mr-2"
            />
            <span className="font-bold text-blue-800">{item.name}</span>
          </div>
          <div className="grid grid-cols-2 gap-2 text-sm text-gray-700">
            <div>
              ID: <span className="font-medium">{item.id}</span>
            </div>
            <div>
              Department: <span className="font-medium">{item.department}</span>
            </div>
            <div>
              Attendance:{" "}
              <span className="font-medium">{item.attendance}%</span>
            </div>
            <div>
              Task Completion:{" "}
              <span className="font-medium">{item.taskCompletion}%</span>
            </div>
            <div>
              Performance:{" "}
              <span className="font-medium">{item.performance}%</span>
            </div>
            <div>
              Task Status:{" "}
              <span className="font-medium">{item.taskStatus}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-blue-100 to-blue-200 px-4 py-6">
        <div className="max-w-full mx-auto px-4 sm:px-8 py-6 sm:ml-36">
          {/* Mobile Header with Hamburger Menu */}
          <div className="sm:hidden flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold text-blue-800">Intern Report</h1>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-blue-800"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Dropdown Menu */}
          {isMobileMenuOpen && (
            <div className="sm:hidden bg-white rounded-lg shadow-md p-4 mb-4">
              <div className="flex flex-col space-y-2">
                <button
                  onClick={handleDownloadPDF}
                  className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all"
                >
                  <FileText size={20} />
                  Download PDF
                </button>
                <button
                  onClick={handleDownloadExcel}
                  className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all"
                >
                  <FaFileExcel size={20} />
                  Download Excel
                </button>
              </div>
            </div>
          )}

          {/* Desktop Header with Download Buttons */}
          <div className="hidden sm:flex justify-between items-center mb-6">
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

          {/* Responsive Table View */}
          <div className="bg-white p-6 rounded-xl shadow-lg overflow-x-auto">
            {isMobileTableView ? (
              <MobileTableView />
            ) : (
              <table className="w-full text-sm text-left text-gray-600">
                <thead className="bg-blue-200">
                  <tr>
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
                      onClick={() => handleCheckboxChange(item.id)}
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
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Reports;
