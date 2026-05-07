import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import DashboardFooter from "../components/dashbaord/DashboardFooter";
import DashboardHeader from "../components/dashbaord/DashboardHeader";
import Sidebar from "../components/dashbaord/Sidebar";
import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";

const DashboardLayout = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [open, setOpen] = useState(isMobile ? false : true);

  return (
    <div className="flex w-full min-h-screen bg-main overflow-hidden">

      {/* 🔥 SIDEBAR */}
      <Sidebar open={open} setOpen={setOpen} />

      {/* 🔥 RIGHT SECTION */}
      <div className="flex flex-col flex-1 min-w-0">

        {/* HEADER */}
        <DashboardHeader open={open} setOpen={setOpen} />

        {/* MAIN CONTENT */}
        <main className="
          flex-1 
          overflow-y-auto 
          overflow-x-hidden 
          p-3 sm:p-4 md:p-6
        ">
          <div className="w-full max-w-full">
            <Outlet />
          </div>
        </main>

        {/* FOOTER */}
        <DashboardFooter />
      </div>

    </div>
  );
};

export default DashboardLayout;