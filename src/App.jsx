import { Routes, Route } from "react-router-dom";
import {
  Aboutus,
  AccountSetting,
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
<<<<<<< HEAD
  AdminHomePage,
  AdminProject,
  AdminReport,
  AllUsers,
  AdminHelpPage,
=======
  UserAttendance,
>>>>>>> 3e4b062b8f62bdb22f964292e4f7ec65b2ea6b0b
} from "./Pages/pageIndex";
import {
  AdminTask,
  CoreDashboard,
  Footer,
  Navbar,
  AdminPanelMain,
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
      <Route
        path="/userProfile"
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
            <AccountSetting /> <Footer />{" "}
          </>
        }
      ></Route>
      <Route path="/" element={<CoreDashboard />} />
      <Route
        path="/faqs"
        element={
          <>
            <Navbar />
            <FAQ />
          </>
        }
      />

      <Route path="/Adminhomepage" element={<AdminHomePage />}></Route>
      <Route path="/Projectmanagement" element={<AdminProject/>}></Route>
      <Route path="/Admintask" element={<AdminTask/>}></Route>
      <Route path="/Weeklyreport" element={<AdminReport />}></Route>
      <Route path="/Taskassignment" element={<AdminTask />}></Route>
      <Route path="/allusers" element={<AllUsers/>}></Route>
      <Route path="/adminhelppage" element={<AdminHelpPage />}></Route>
    </Routes>
  );
};
export default App;
