import React from "react";
import { Routes, Route } from "react-router-dom";
import { Home } from "./Pages/pageIndex";
import Logup from './Pages/Logup';

function App() {
  return (

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Logup />} />
        </Routes>
  );
}

export default App;
