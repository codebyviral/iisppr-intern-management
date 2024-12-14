import React from 'react';
import './App.css';

function App() {
  // Sample data for updates
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
  ];

  return (
    <div className="card">
      {/* Header */}
      <div className="header">
        <h3>Recent Updates</h3>
        <select>
          <option>This month</option>
          <option>Last month</option>
        </select>
      </div>

      {/* Updates */}
      {updates.map((update) => (
        <div className="update" key={update.id}>
          <div className="user-img"></div>
          <div className="content">
            <strong>{update.title}</strong>
            <p>{update.description1}</p>
            <p>{update.description2}</p>
            <span>Appr</span>
            <span>Feedb</span>
          </div>
          <div className="time">{update.time}</div>
        </div>
      ))}
    </div>
  );
}

export default App;
