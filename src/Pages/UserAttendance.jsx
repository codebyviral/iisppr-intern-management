import { Navbar } from "@/Components/compIndex";
import { SideNav } from "@/Components/compIndex";

const UserAttendance = () => {
  // Commented out all the logic and state for now
  /*
  const [attendanceData, setAttendanceData] = useState([]);
  const [attendancePercentage, setAttendancePercentage] = useState(0);

  useEffect(() => {
    const userId = localStorage.getItem("userId");

    if (userId) {
      axios
        .get(`${import.meta.env.VITE_BASE_URL}/attendance/${userId}`)
        .then((response) => {
          const data = response.data;
          setAttendanceData(data);

          const totalDays = data.length;
          const presentDays = data.filter(
            (record) => record.status === "Present"
          ).length;
          const percentage = ((presentDays / totalDays) * 100).toFixed(2);
          setAttendancePercentage(percentage);
        })
        .catch((error) => {
          console.error("Error fetching attendance data:", error);
        });
    }
  }, []);

  const getDayOfWeek = (date) => {
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const dayIndex = new Date(date).getDay();
    return days[dayIndex];
  };

  const formatDate = (date) => {
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, "0");
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
  };
  */

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <SideNav />

      <div className="flex-1">
        {/* Navbar */}
        <Navbar />

        {/* Page Under Development */}
        <div className="flex flex-col items-center justify-center min-h-screen">
          <h1 className="text-4xl font-bold text-gray-700 mb-4">
            Page Under Development
          </h1>
          <p className="text-lg text-gray-500">
            {`We're`} working hard to bring this feature to you soon. Stay
            tuned!
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserAttendance;
