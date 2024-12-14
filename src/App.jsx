import React from "react";
import { Routes, Route } from "react-router-dom";
import { Home } from "./Pages/pageIndex";
import Sidebar from "./components/Sidebar";
import "./Sidebar.css"; // Import the sidebar styling

function App() {
  return (
    <div style={{ display: "flex" }}>
      {/* Sidebar Component */}
      <Sidebar />

      {/* Main Content */}
      <div style={{ flex: 1, padding: "20px" }}>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
