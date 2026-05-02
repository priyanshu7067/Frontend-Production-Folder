import React, { useMemo } from "react";
import TableComponent from "../../../components/ui/TableComponent";

const DirectTeam = () => {

  // 🔥 COLUMNS (compact header style)
  const columns = useMemo(() => [
    {
      header: "User",
      accessor: "user",
    },
    {
      header: "User ID",
      accessor: "userId",
    },
    {
      header: "Join Date",
      accessor: "joinDate",
    },
    {
      header: "Status",
      accessor: "status",
      Cell: ({ value }) => (
        <span
          className={`text-[10px] px-2 py-0.5 rounded-full ${
            value === "Active"
              ? "bg-green-500/20 text-green-400"
              : "bg-red-500/20 text-red-400"
          }`}
        >
          {value}
        </span>
      ),
    },
    {
      header: "Business",
      accessor: "business",
      Cell: ({ value }) => (
        <span className="text-blue-400 text-xs font-medium">
          ₹{value.toLocaleString()}
        </span>
      ),
    },
  ], []);

  // 🔥 SAMPLE DATA
  const data = useMemo(() => [
    {
      user: "Rahul Sharma",
      userId: "USR001",
      joinDate: "12 Jan 2024",
      status: "Active",
      business: 1200,
    },
    {
      user: "Amit Verma",
      userId: "USR002",
      joinDate: "15 Jan 2024",
      status: "Inactive",
      business: 800,
    },
    {
      user: "Neha Singh",
      userId: "USR003",
      joinDate: "18 Jan 2024",
      status: "Active",
      business: 1500,
    },
  ], []);

  return (
    <div className="dashboard-bg min-h-full p-4 md:p-6 text-white space-y-4">

      {/* 🔥 SMALL HEADER (as you wanted) */}
      <div>
        <h2 className="text-sm md:text-base font-medium tracking-wide">
          Direct Team
        </h2>
        <p className="text-xs text-gray-400">
          List of your directly referred users
        </p>
      </div>

      {/* 🔥 TABLE */}
      <div className="glow-card p-3">
        <TableComponent
          columns={columns}
          data={data}
          rowsPerPage={5}
          searchable={true}
          emptyMessage="No team members found"
        />
      </div>

    </div>
  );
};

export default DirectTeam;