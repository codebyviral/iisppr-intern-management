import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";

const DynamicCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [calendarDays, setCalendarDays] = useState([]);

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDay = firstDay.getDay();

    const calendarArray = [];

    // Add empty spaces for days before the first day of the month
    for (let i = 0; i < startingDay; i++) {
      calendarArray.push(null);
    }

    // Add all days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      calendarArray.push(i);
    }

    return calendarArray;
  };

  useEffect(() => {
    setCalendarDays(getDaysInMonth(currentDate));
  }, [currentDate]);

  const getMonthName = (date) => {
    return date.toLocaleString("default", { month: "long" });
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        {getMonthName(currentDate)} {currentDate.getFullYear()}
      </h2>
      <Card className="overflow-hidden">
        <CardContent className="p-6">
          <div className="grid grid-cols-7 gap-2 text-center">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
              <div key={day} className="font-medium text-gray-500 py-2">
                {day}
              </div>
            ))}
            {calendarDays.map((date, index) => (
              <div
                key={`${date}-${index}`}
                className={`p-3 rounded-lg transition-colors ${
                  date === null
                    ? "bg-transparent"
                    : date === currentDate.getDate() &&
                      new Date().getMonth() === currentDate.getMonth() &&
                      new Date().getFullYear() === currentDate.getFullYear()
                    ? "bg-blue-500 text-white font-semibold"
                    : "hover:bg-gray-100 cursor-pointer"
                }`}
              >
                {date}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DynamicCalendar;
