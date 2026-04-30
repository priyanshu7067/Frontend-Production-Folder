import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

const MainLayout = () => {
  return (
    <>
      <Header />

      <main className="max-w-7xl mx-auto">
        <Outlet />   {/* yaha page change hoga */}
      </main>

      <Footer />
    </>
  );
};

export default MainLayout;