import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import DashboardFooter from "../components/dashbaord/DashboardFooter";
import DashboardHeader from "../components/dashbaord/DashboardHeader";
import Sidebar from "../components/dashbaord/Sidebar";
const DashboardLayout = () => {
  const [open, setOpen] = useState(true);

  return (
    <div className="flex h-screen bg-gray-100">
      
      {/* Sidebar */}
      <Sidebar open={open} setOpen={setOpen} />

      {/* Right Section */}
      <div className="flex-1 flex flex-col">
        
        {/* Header */}
        <DashboardHeader open={open} setOpen={setOpen} />

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-4">
          <Outlet />
        </main>

        {/* Footer */}
        <DashboardFooter />
      </div>
    </div>
  );
};

export default DashboardLayout;