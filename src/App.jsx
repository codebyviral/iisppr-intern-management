import { Routes, Route, useActionData } from "react-router-dom";
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
  IntroPage,
  AdminNotify,
} from "./Pages/pageIndex";
import {
  AdminTask,
  CoreDashboard,
  Footer,
  Navbar,
} from "./Components/compIndex";
import "./App.css";
import { NotFound } from "./Components/Notfound";
import { useAuthContext } from "./context/AuthContext";
import AllAttendance from "./Admin/AllAttendance";

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
    <Routes>
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
      <Route
        path="/Projectmanagement"
        element={
          <AdminRoute>
            <AdminProject />
          </AdminRoute>
        }
      />
      <Route
        path="/Admintask"
        element={
          <AdminRoute>
            <AdminTask />
          </AdminRoute>
        }
      />
      <Route
        path="/Weeklyreport"
        element={
          <AdminRoute>
            <AdminReport />
          </AdminRoute>
        }
      />
      <Route
        path="/Taskassignment"
        element={
          <AdminRoute>
            <AdminTask />
          </AdminRoute>
        }
      />
      <Route
        path="/allusers"
        element={
          <AdminRoute>
            <AllUsers />
          </AdminRoute>
        }
      />
      <Route
        path="/adminhelppage"
        element={
          <AdminRoute>
            <AdminHelpPage />
          </AdminRoute>
        }
      />
      <Route
        path="/intern-attendance"
        element={
          <AdminRoute>
            <InternAttendance />
          </AdminRoute>
        }
      />
      <Route
        path="/interntasksubmissions"
        element={
          <AdminRoute>
            <InternTasksSubmissions />
          </AdminRoute>
        }
      />
      <Route
        path="view-attendance-all"
        element={
          <AdminRoute>
            <AllAttendance />
          </AdminRoute>
        }
      />

      {/* Protected User Routes */}
      <Route
        path="/"
        element={
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        }
      />
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        }
      />
      <Route
        path="/your-profile"
        element={
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        }
      />
      <Route
        path="/notifications"
        element={
          <PrivateRoute>
            <Notifications />
          </PrivateRoute>
        }
      />
      <Route
        path="/reports"
        element={
          <PrivateRoute>
            <Reports />
          </PrivateRoute>
        }
      />
      <Route
        path="/projects"
        element={
          <PrivateRoute>
            <Projects />
          </PrivateRoute>
        }
      />
      <Route
        path="/help"
        element={
          <PrivateRoute>
            <Help />
          </PrivateRoute>
        }
      />
      <Route
        path="/my-attendance"
        element={
          <PrivateRoute>
            <UserAttendance />
          </PrivateRoute>
        }
      />
      <Route
        path="/stores"
        element={
          <PrivateRoute>
            <Stores />
          </PrivateRoute>
        }
      />
      <Route
        path="/leave-application"
        element={
          <PrivateRoute>
            <LeaveApplication />
          </PrivateRoute>
        }
      />
      <Route
        path="/setting"
        element={
          <PrivateRoute>
            <SettingsPage />
          </PrivateRoute>
        }
      />
      <Route
        path="/Internleaveapplication"
        element={
          <PrivateRoute>
            <Internleaveapplication />
          </PrivateRoute>
        }
      />
      <Route
        path="/logout"
        element={
          <PrivateRoute>
            <Logout />
          </PrivateRoute>
        }
      />
      <Route
        path="/notify-all"
        element={
          <PrivateRoute>
            <AdminNotify />
          </PrivateRoute>
        }
      />
    </Routes>
  );
};

export default App;
