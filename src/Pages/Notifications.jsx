import { Navbar } from "@/Components/compIndex";
import { X } from "lucide-react";
function Notifications() {
  const updates = [
    {
      id: 1,
      title: "New intern assigned",
      description1: "Project deadline approaching",
      description2: "Intern submitted report",
      time: "1 day ago",
    },
    {
      id: 2,
      title: "Task completed",
      description1: "Project evaluation received",
      description2: "Feedback provided",
      time: "2 hours ago",
    },
    {
      id: 3,
      title: "Project update",
      description1: "New feature release",
      description2: "Bug fixes applied",
      time: "3 days ago",
    },
    {
      id: 4,
      title: "New message received",
      description1: "Intern has some queries",
      description2: "Follow up on task progress",
      time: "5 minutes ago",
    },
    {
      id: 5,
      title: "Meeting scheduled",
      description1: "Team discussion on progress",
      description2: "Meeting link sent",
      time: "10 minutes ago",
    },
    {
      id: 6,
      title: "Report submitted",
      description1: "Intern submitted the final report",
      description2: "All tasks completed",
      time: "2 days ago",
    },
    {
      id: 7,
      title: "Feedback received",
      description1: "Client feedback on the project",
      description2: "Areas to improve",
      time: "1 hour ago",
    },
    {
      id: 8,
      title: "New task assigned",
      description1: "Intern assigned a new task",
      description2: "Task details sent to email",
      time: "3 hours ago",
    },
  ];

  return (
    <>
      <Navbar />
      <div className="notifications-wrapper">
        <div className="card cursor-pointer">
          <div className="header">
            <h3>Recent Updates</h3>
            <select>
              <option>This month</option>
              <option>Last month</option>
            </select>
          </div>

          {updates.map((update) => (
            <div className="update" key={update.id}>
              <div className="user-img">
                {/* <img src={""} alt="user" /> */}
              </div>
              <div className="content">
                <strong>{update.title}</strong>
                <p>{update.description1}</p>
                <p>{update.description2}</p>
                <span className="notification-tag lg:mx-3">Approve</span>
                <span className="feedback-tag lg:mx-3">Feedback </span>
              </div>
              <div className="time">{update.time}</div>
              <X className="absolute adjustCross m-2" color="#ef233c" />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Notifications;
