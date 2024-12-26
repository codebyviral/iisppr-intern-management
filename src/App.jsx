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
} from "./Pages/pageIndex";
import {
  AdminTask,
  CoreDashboard,
  Footer,
  Navbar,
} from "./Components/compIndex";
import "./App.css";
import { NotFound } from "./Components/Notfound";

const AdminRoute = ({ children }) => {
  const isAdmin = localStorage.getItem("isAdmin") === "true";
  console.log(`Admin route state ${isAdmin}`);
  return isAdmin ? children : <NotAuthorized />;
};

const App = () => {
  return (
    <Routes>
      {/* Admin Routes */}
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
        path="/internattendance"
        element={
          <AdminRoute>
            <InternAttendance />
          </AdminRoute>
        }
      />
      <Route
        path="/adminhelppage"
        element={
          <AdminRoute>
            <AdminHelp />
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

      {/* User Routes */}
      <Route path="*" element={<NotFound />} />
      <Route path="/" element={<Home />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/login" element={<Signin />} />
      <Route path="/logout" element={<Logout />} />
      <Route path="/reset-account-password" element={<ResetPassword />} />
      <Route
        path="/your-profile"
        element={
          <>
            <Profile />
          </>
        }
      />
      <Route path="/notifications" element={<Notifications />} />
      <Route path="/reports" element={<Reports />} />
      <Route path="/projects" element={<Projects />} />
      <Route
        path="/aboutus"
        element={
          <>
            <Aboutus />
            <Footer />
          </>
        }
      />
      <Route
        path="/privacypolicy"
        element={
          <>
            <PrivacyPolicy />
            <Footer />{" "}
          </>
        }
      ></Route>
      <Route path="/help" element={<Help />}></Route>
      <Route path="/my-attendance" element={<UserAttendance />} />
      <Route path="/stores" element={<Stores />} />
      <Route path="/leave-application" element={<LeaveApplication />} />
      <Route
        path="/setting"
        element={
          <>
            <SettingsPage />
          </>
        }
      ></Route>
      <Route path="/" element={<CoreDashboard />} />
      <Route
        path="/frequently-asked-questions"
        element={
          <>
            <Navbar />
            <FAQ />
          </>
        }
      />
    </Routes>
  );
};

export default App;
