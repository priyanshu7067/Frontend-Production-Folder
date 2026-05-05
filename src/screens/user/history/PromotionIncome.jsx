import React, { useMemo } from "react";
import TableComponent from "../../../components/ui/TableComponent";
import { getPromotionHistory } from "../../../apis/user/users.api";
const PromotionIncome = () => {
  // 🔥 COLUMNS
  const columns = useMemo(
    () => [
      {
        header: "Rank",
        accessor: "rank",
        Cell: ({ value }) => (
          <span className="text-purple-400 text-xs font-semibold">{value}</span>
        ),
      },
      {
        header: "Target",
        accessor: "target",
        Cell: ({ value }) => (
          <span className="text-gray-300 text-xs">
            ${value.toLocaleString()}
          </span>
        ),
      },
      {
        header: "Achieved",
        accessor: "achieved",
        Cell: ({ value }) => (
          <span className="text-blue-400 text-xs font-medium">
            ${value.toLocaleString()}
          </span>
        ),
      },
      {
        header: "Income",
        accessor: "income",
        Cell: ({ value }) => (
          <span className="text-green-400 text-sm font-semibold">
            ${value.toLocaleString()}
          </span>
        ),
      },
      {
        header: "Status",
        accessor: "status",
        Cell: ({ value }) => (
          <span
            className={`text-[10px] px-2 py-0.5 rounded-full ${
              value === "Achieved"
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
    ],
    [],
  );

  // 🔥 SAMPLE DATA
  const data = useMemo(
    () => [
      {
        rank: "Silver",
        target: 50000,
        achieved: 52000,
        income: 2000,
        status: "Achieved",
        date: "12 Jan 2024",
      },
      {
        rank: "Gold",
        target: 100000,
        achieved: 80000,
        income: 0,
        status: "In Progress",
        date: "15 Jan 2024",
      },
      {
        rank: "Platinum",
        target: 200000,
        achieved: 210000,
        income: 5000,
        status: "Achieved",
        date: "20 Jan 2024",
      },
    ],
    [],
  );

  return (
    <div className="dashboard-bg min-h-full p-4 md:p-6 text-white space-y-4">
      {/* 🔥 HEADER */}
      <div>
        <h2 className="text-sm md:text-base font-medium tracking-wide">
          Promotion Income
        </h2>
        <p className="text-xs text-gray-400">
          Track your rank-based rewards and achievements
        </p>
      </div>

      {/* 🔥 TABLE */}
      <div className="glow-card p-3">
        <TableComponent
          columns={columns}
          data={data}
          rowsPerPage={5}
          searchable={false}
          emptyMessage="No promotion income records"
        />
      </div>
    </div>
  );
};

export default PromotionIncome;
