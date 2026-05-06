import React, { useMemo } from "react";
import TableComponent from "../../../components/ui/TableComponent";
import { getRankRoyalityHistory } from "../../../apis/user/users.api";
const Rank_RoyalityBonus = () => {
  // 🔥 COLUMNS
  const columns = useMemo(
    () => [
      {
        header: "S.No",
        render: (_, i) => i + 1,
      },
      {
        header: "Rank",
        accessor: "rank",
        Cell: ({ value }) => (
          <span className="text-purple-400 text-xs font-semibold">{value}</span>
        ),
      },
      {
        header: "Royalty %",
        accessor: "royalty",
        Cell: ({ value }) => (
          <span className="text-blue-400 text-xs font-medium">{value}%</span>
        ),
      },
      {
        header: "Turnover",
        accessor: "turnover",
        Cell: ({ value }) => (
          <span className="text-gray-300 text-xs">
            ${value.toLocaleString()}
          </span>
        ),
      },
      {
        header: "Bonus Earned",
        accessor: "bonus",
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
            className={`text-[10px] px-2 py-0.5 rounded-full ${value === "Active"
                ? "bg-green-500/20 text-green-400"
                : "bg-gray-500/20 text-gray-400"
              }`}
          >
            {value}
          </span>
        ),
      },
      {
        header: "Updated On",
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
        royalty: 2,
        turnover: 100000,
        bonus: 2000,
        status: "Active",
        date: "10 Jan 2024",
      },
      {
        rank: "Gold",
        royalty: 4,
        turnover: 250000,
        bonus: 10000,
        status: "Active",
        date: "15 Jan 2024",
      },
      {
        rank: "Platinum",
        royalty: 6,
        turnover: 500000,
        bonus: 30000,
        status: "Inactive",
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
          Rank Royalty Bonus
        </h2>
        <p className="text-xs text-gray-400">
          Earn passive income based on your rank performance
        </p>
      </div>

      {/* 🔥 TABLE */}
      <div className="glow-card p-3">
        <TableComponent
          columns={columns}
          data={data}
          rowsPerPage={5}
          searchable={false}
          emptyMessage="No royalty bonus records found"
        />
      </div>
    </div>
  );
};

export default Rank_RoyalityBonus;
