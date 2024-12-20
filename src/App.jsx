import { Routes, Route } from "react-router-dom";
import {
  Home,
  Notifications,
  Projects,
  Reports,
  Settings,
  Categories,
  Stores,
  Signin,
  SignUp,
  Logout,
} from "./Pages/pageIndex";
import "./App.css";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/Home" element={<Home />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/login" element={<Signin />} />
      <Route path="/logout" element={<Logout />} />
      <Route path="/user-profile" element={<Settings />} />
      <Route path="/notifications" element={<Notifications />} />
      <Route path="/reports" element={<Reports />} />
      <Route path="/projects" element={<Projects />} />
      <Route path="/categories" element={<Categories />} />
      <Route path="/stores" element={<Stores />} />
    </Routes>
  );
};

export default App;
