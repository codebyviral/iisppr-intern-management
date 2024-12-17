import React from "react";
import { Routes, Route } from "react-router-dom";
import { Home } from "./Pages/pageIndex";
import Logup from "./Pages/Logup";
import "./App.css";
import { Notification } from "./Components/compIndex";

const App = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      {/* Notification Component */}
      <Notification />
      
      {/* Routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Logup />} />
      </Routes>
    </div>
  );
};

export default App;
