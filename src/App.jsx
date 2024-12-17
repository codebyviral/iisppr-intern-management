import { Routes, Route } from "react-router-dom";
import { Home, Notifications, Settings } from "./Pages/pageIndex";
import Logup from "./Pages/Logup";
import "./App.css";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signup" element={<Logup />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/notifications" element={<Notifications />} />
    </Routes>
  );
};

export default App;
