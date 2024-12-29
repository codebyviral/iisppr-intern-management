import React from "react";

import { SideNav, TopNavbar , Footer } from "../Components/compIndex";
import { Dashboard } from "./pageIndex";
import { useAuthContext } from "@/context/AuthContext";
import LandingPage from "./Landingpage";

const Home = () => {
  const { loggedIn } = useAuthContext(); // Get the logged-in status from AuthContext

  return (
    <>
      <TopNavbar />
      
      {loggedIn ? (
        <div className="flex">
          {/* Sidebar */}
          <SideNav />
          {/* Dashboard */}
          <div className="flex-1">
            <Dashboard />
          </div>
        </div>
      ) : (
        // Landing Page for non-logged-in users
        <LandingPage />
      )}
      <Footer />
    </>
  );
};

export default Home;
