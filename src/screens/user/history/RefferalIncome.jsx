import React, { useMemo } from "react";
import TableComponent from "../../../components/ui/TableComponent";

const RefferalIncome = () => {

  // 🔥 COLUMNS
  const columns = useMemo(() => [
    {
      Header: "User",
      accessor: "user",
    },
    {
      Header: "Level",
      accessor: "level",
      Cell: ({ value }) => (
        <span className="text-purple-400 text-xs font-medium">
          {value}
        </span>
      ),
    },
    {
      Header: "Commission %",
      accessor: "commission",
      Cell: ({ value }) => (
        <span className="text-blue-400 text-xs">
          {value}%
        </span>
      ),
    },
    {
      Header: "Amount",
      accessor: "amount",
      Cell: ({ value }) => (
        <span className="text-green-400 text-sm font-semibold">
          ₹{value.toLocaleString()}
        </span>
      ),
    },
    {
      Header: "Status",
      accessor: "status",
      Cell: ({ value }) => (
        <span
          className={`text-[10px] px-2 py-0.5 rounded-full ${
            value === "Paid"
              ? "bg-green-500/20 text-green-400"
              : "bg-yellow-500/20 text-yellow-400"
          }`}
        >
          {value}
        </span>
      ),
    },
    {
      Header: "Date",
      accessor: "date",
    },
  ], []);

  // 🔥 SAMPLE DATA
  const data = useMemo(() => [
    {
      user: "Rahul Sharma",
      level: "Level 1",
      commission: 10,
      amount: 500,
      status: "Paid",
      date: "12 Jan 2024",
    },
    {
      user: "Amit Verma",
      level: "Level 2",
      commission: 5,
      amount: 300,
      status: "Pending",
      date: "15 Jan 2024",
    },
    {
      user: "Neha Singh",
      level: "Level 1",
      commission: 10,
      amount: 700,
      status: "Paid",
      date: "18 Jan 2024",
    },
  ], []);

  return (
    <div className="dashboard-bg min-h-full p-4 md:p-6 text-white space-y-4">

      {/* 🔥 HEADER */}
      <div>
        <h2 className="text-sm md:text-base font-medium tracking-wide">
          Referral Income
        </h2>
        <p className="text-xs text-gray-400">
          Earnings from your direct and indirect referrals
        </p>
      </div>

      {/* 🔥 TABLE */}
      <div className="glow-card p-3">
        <TableComponent
          columns={columns}
          data={data}
          rowsPerPage={5}
          searchable={true}
          emptyMessage="No referral income records"
        />
      </div>

    </div>
  );
};

export default RefferalIncome;