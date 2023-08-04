import React from "react";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import { AuthContextProvider } from "../context/AuthContext";

export default function Root() {
  return (
    <AuthContextProvider>
      <Navbar />
      <Outlet />
      <Footer />
    </AuthContextProvider>
  );
}
