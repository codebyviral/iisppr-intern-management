import { Routes, Route } from "react-router-dom";
import {
  Home,
  Notifications,
  Projects,
  Reports,
  Settings,
  Categories,
  Stores,
} from "./Pages/pageIndex";
import Logup from "./Pages/Logup";
import "./App.css";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/Home" element={<Home />} />
      <Route path="/signup" element={<Logup />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/notifications" element={<Notifications />} />
      <Route path="/reports" element={<Reports />} />
      <Route path="/projects" element={<Projects />} />
      <Route path="/categories" element={<Categories />} />
      <Route path="/stores" element={<Stores />} />
    </Routes>
  );
};

export default App;
