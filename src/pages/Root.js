import React from "react";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import { AuthContextProvider } from "../context/AuthContext";
import Layout from "../components/Layout";

export default function Root() {
  return (
    <AuthContextProvider>
      <Layout>
        <Navbar />
        <Outlet />
      </Layout>
    </AuthContextProvider>
  );
}
