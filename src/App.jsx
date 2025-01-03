import React from 'react';
import { Routes, Route } from "react-router-dom";
import {
  Aboutus,
  FAQ,
  Help,
  Home,
  Notifications,
  PrivacyPolicy,
  Profile,
  Projects,
  Reports,
  Signin,
  SignUp,
  Logout,
  Stores,
  AdminHomePage,
  AdminProject,
  AdminReport,
  AllUsers,
  LeaveApplication,
  AdminHelpPage,
  NotAuthorized,
  UserAttendance,
  SettingsPage,
  ResetPassword,
  InternAttendance,
  AdminHelp,
  InternTasksSubmissions,
  Internleaveapplication,
  AdminNotify,
} from "./Pages/pageIndex";
import {
  AdminTask,
  CoreDashboard,
  Footer,
  Navbar as AppNavbar,
} from "./Components/compIndex";
import "./App.css";
import { NotFound } from "./Components/Notfound";
import { useAuthContext } from "./context/AuthContext";
import AllAttendance from "./Admin/AllAttendance";
import Navbar from './Pages/Navbar';
import Hero from './Components/Hero';
import Features from './Components/Features';
import TechStack from './Components/TechStack';
import Stats from './Components/Stats';
import Testimonials from './Components/Testimonials';
import FloatingIcons from './Components/FloatingIcons';
import ScrollingLogos from './Components/ScrollingLogos';
import SuccessStories from './Components/SuccessStories';
import CompanyMetrics from './Components/CompanyMetrics';
import GradientBackground from './Components/GradientBackground';

const AdminRoute = ({ children }) => {
  const isAdmin = localStorage.getItem("isAdmin") === "true";
  return isAdmin ? children : <NotAuthorized />;
};

const PrivateRoute = ({ children }) => {
  const { loggedIn } = useAuthContext();
  return loggedIn ? children : <IntroPage />;
};

const App = () => {
  return (
    <div className="min-h-screen relative overflow-hidden">
      <GradientBackground />
      <FloatingIcons />
      <Routes>
        {/* Public Landing Page */}
        <Route
          path="/"
          element={
            <>
              <Navbar />
              <Hero />
              <ScrollingLogos />
              <TechStack />
              <Features />
              <CompanyMetrics />
              <SuccessStories />
              <Stats />
              <Testimonials />
            </>
          }
        />

        {/* Public Routes */}
        <Route path="/login" element={<Signin />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/reset-account-password" element={<ResetPassword />} />
        <Route path="/aboutus" element={<Aboutus />} />
        <Route path="/privacypolicy" element={<PrivacyPolicy />} />
        <Route path="/frequently-asked-questions" element={<FAQ />} />
        <Route path="*" element={<NotFound />} />

        {/* Admin Routes - Already Protected */}
        <Route
          path="/Adminhomepage"
          element={
            <AdminRoute>
              <AdminHomePage />
            </AdminRoute>
          }
        />
        {/* Admin routes continued as in your original code */}

        {/* Protected User Routes */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
        {/* Other protected routes continued as in your original code */}
      </Routes>
    </div>
  );
};

export default App;
