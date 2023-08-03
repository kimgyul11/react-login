import React from "react";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";

export default function Root({ userObj }) {
  return (
    <div>
      <Navbar userObj={userObj} />
      <Outlet />
      <Footer />
    </div>
  );
}
