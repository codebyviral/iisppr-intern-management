import React, { useEffect } from "react";
import { Navbar, Footer } from "../Components/compIndex";
import { Dashboard } from "./pageIndex";
import { useAuthContext } from "@/context/AuthContext";
import { useAppContext } from "@/context/AppContext";

const Home = () => {
  return (
    <>
      <Navbar />
      <Dashboard />
      <Footer />
    </>
  );
};

export default Home;
