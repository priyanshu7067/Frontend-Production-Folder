import React, { useMemo } from "react";
import TableComponent from "../../../components/ui/TableComponent";

const LevelIncome = () => {

  // 🔥 TABLE COLUMNS
  const columns = useMemo(() => [
    {
      header: "Level",
      accessor: "level",
    },
    {
      header: "User",
      accessor: "user",
    },
    {
      header: "Amount",
      accessor: "amount",
      Cell: ({ value }) => (
        <span className="text-green-400 font-medium">
          ₹{value.toLocaleString()}
        </span>
      ),
    },
    {
      header: "Status",
      accessor: "status",
      Cell: ({ value }) => (
        <span
          className={`text-xs px-2 py-1 rounded-full ${
            value === "Completed"
              ? "bg-green-500/20 text-green-400"
              : "bg-yellow-500/20 text-yellow-400"
          }`}
        >
          {value}
        </span>
      ),
    },
    {
      header: "Date",
      accessor: "date",
    },
  ], []);

  // 🔥 SAMPLE DATA (replace with API later)
  const data = useMemo(() => [
    {
      level: "Level 1",
      user: "Rahul Sharma",
      amount: 500,
      status: "Completed",
      date: "12 Jan 2024",
    },
    {
      level: "Level 2",
      user: "Amit Verma",
      amount: 300,
      status: "Pending",
      date: "14 Jan 2024",
    },
    {
      level: "Level 3",
      user: "Neha Singh",
      amount: 700,
      status: "Completed",
      date: "16 Jan 2024",
    },
    {
      level: "Level 4",
      user: "Karan Patel",
      amount: 250,
      status: "Completed",
      date: "18 Jan 2024",
    },
  ], []);

  return (
    <div className="dashboard-bg min-h-full p-4 md:p-6 text-white space-y-5">

      {/* 🔥 HEADER */}
      <div>
        <h2 className="text-lg md:text-xl font-semibold tracking-wide">
          Level Income History
        </h2>
        <p className="text-sm text-gray-400 mt-1">
          Track your earnings from referral levels
        </p>
      </div>

      {/* 🔥 TABLE CARD */}
      <div className="glow-card p-4">
        <TableComponent
          columns={columns}
          data={data}
          rowsPerPage={5}
          searchable={true}
          emptyMessage="No income records found"
        />
      </div>

    </div>
  );
};

export default LevelIncome;