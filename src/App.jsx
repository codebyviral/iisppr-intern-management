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
  AdminHelpPage,
  UserAttendance,
  SettingsPage,
  ResetPassword,
} from "./Pages/pageIndex";
import {
  AdminTask,
  CoreDashboard,
  Footer,
  Navbar,
} from "./Components/compIndex";
import "./App.css";
import { NotFound } from "./Components/Notfound";

const App = () => {
  return (
    <Routes>
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

      <Route path="/Adminhomepage" element={<AdminHomePage />}></Route>
      <Route path="/Projectmanagement" element={<AdminProject />}></Route>
      <Route path="/Admintask" element={<AdminTask />}></Route>
      <Route path="/Weeklyreport" element={<AdminReport />}></Route>
      <Route path="/Taskassignment" element={<AdminTask />}></Route>
      <Route path="/allusers" element={<AllUsers />}></Route>
      <Route path="/adminhelppage" element={<AdminHelpPage />}></Route>
    </Routes>
  );
};
export default App;
