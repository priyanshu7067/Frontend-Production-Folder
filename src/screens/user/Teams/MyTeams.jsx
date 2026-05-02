import React, { useMemo } from "react";
import TableComponent from "../../../components/ui/TableComponent";

const MyTeams = () => {

  // 🔥 COLUMNS
  const columns = useMemo(() => [
    {
      header: "Level",
      accessor: "level",
      Cell: ({ value }) => (
        <span className="text-xs font-medium text-purple-400">
          {value}
        </span>
      ),
    },
    {
      header: "Members",
      accessor: "members",
      Cell: ({ value }) => (
        <span className="text-white text-sm font-medium">
          {value}
        </span>
      ),
    },
    {
      header: "Active Users",
      accessor: "active",
      Cell: ({ value }) => (
        <span className="text-green-400 text-sm font-medium">
          {value}
        </span>
      ),
    },
    {
      header: "Total Business",
      accessor: "business",
      Cell: ({ value }) => (
        <span className="text-blue-400 text-xs font-semibold">
          ₹{value.toLocaleString()}
        </span>
      ),
    },
    {
      header: "Status",
      accessor: "status",
      Cell: ({ value }) => (
        <span
          className={`text-[10px] px-2 py-0.5 rounded-full ${
            value === "Growing"
              ? "bg-green-500/20 text-green-400"
              : "bg-yellow-500/20 text-yellow-400"
          }`}
        >
          {value}
        </span>
      ),
    },
  ], []);

  // 🔥 SAMPLE DATA
  const data = useMemo(() => [
    {
      level: "Level 1",
      members: 12,
      active: 9,
      business: 12500,
      status: "Growing",
    },
    {
      level: "Level 2",
      members: 25,
      active: 18,
      business: 22000,
      status: "Growing",
    },
    {
      level: "Level 3",
      members: 40,
      active: 30,
      business: 41000,
      status: "Stable",
    },
    {
      level: "Level 4",
      members: 60,
      active: 45,
      business: 60000,
      status: "Growing",
    },
  ], []);

  return (
    <div className="dashboard-bg min-h-full p-4 md:p-6 text-white space-y-4">

      {/* 🔥 HEADER */}
      <div>
        <h2 className="text-sm md:text-base font-medium tracking-wide">
          My Teams Overview
        </h2>
        <p className="text-xs text-gray-400">
          View your team structure and performance
        </p>
      </div>

      {/* 🔥 TABLE */}
      <div className="glow-card p-3">
        <TableComponent
          columns={columns}
          data={data}
          rowsPerPage={5}
          searchable={false}
          emptyMessage="No team data available"
        />
      </div>

    </div>
  );
};

export default MyTeams;