import React from "react";

const DashboardFooter = () => {
  return (
    <footer className="py-4 text-xs text-slate-500 text-center bg-white border-t border-slate-200">
      © {new Date().getFullYear()} Finor Fintech Investment Platform. All Rights Reserved.
    </footer>
  );
};

export default DashboardFooter;