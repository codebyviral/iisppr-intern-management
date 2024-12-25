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
  UserAttendance,
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

      <Route path="/Adminhomepage" element={<AdminPanelMain />}></Route>
      <Route path="/Projectmanagement" element={<AdminTask />}></Route>
      <Route path="/Admintask" element={<AdminTask />}></Route>
      <Route path="/Weeklyreport" element={<Reports />}></Route>
      <Route path="/Taskassignment" element={<AdminTask />}></Route>
      <Route path="/allusers" element={<Profile />}></Route>
      <Route path="/adminhelppage" element={<Help />}></Route>
    </Routes>
  );
};
export default App;
