import React, { useMemo } from "react";
import TableComponent from "../../../components/ui/TableComponent";

const TradeHistory = () => {

  // 🔥 COLUMNS
  const columns = useMemo(() => [
    {
      Header: "Pair",
      accessor: "pair",
      Cell: ({ value }) => (
        <span className="text-blue-400 text-xs font-semibold">
          {value}
        </span>
      ),
    },
    {
      Header: "Type",
      accessor: "type",
      Cell: ({ value }) => (
        <span
          className={`text-[10px] px-2 py-0.5 rounded-full ${
            value === "BUY"
              ? "bg-green-500/20 text-green-400"
              : "bg-red-500/20 text-red-400"
          }`}
        >
          {value}
        </span>
      ),
    },
    {
      Header: "Amount",
      accessor: "amount",
    },
    {
      Header: "Price",
      accessor: "price",
      Cell: ({ value }) => (
        <span className="text-gray-300 text-xs">
          ${value.toLocaleString()}
        </span>
      ),
    },
    {
      Header: "P/L",
      accessor: "pl",
      Cell: ({ value }) => (
        <span
          className={`text-xs font-semibold ${
            value >= 0 ? "text-green-400" : "text-red-400"
          }`}
        >
          {value >= 0 ? "+" : ""}${value}
        </span>
      ),
    },
    {
      Header: "Status",
      accessor: "status",
      Cell: ({ value }) => (
        <span
          className={`text-[10px] px-2 py-0.5 rounded-full ${
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
      Header: "Date",
      accessor: "date",
    },
  ], []);

  // 🔥 SAMPLE DATA
  const data = useMemo(() => [
    {
      pair: "BTC/USDT",
      type: "BUY",
      amount: "0.005 BTC",
      price: 62000,
      pl: 120,
      status: "Completed",
      date: "12 Jan 2024",
    },
    {
      pair: "ETH/USDT",
      type: "SELL",
      amount: "0.2 ETH",
      price: 3200,
      pl: -45,
      status: "Completed",
      date: "13 Jan 2024",
    },
    {
      pair: "ADA/USDT",
      type: "BUY",
      amount: "500 ADA",
      price: 0.52,
      pl: 30,
      status: "Pending",
      date: "14 Jan 2024",
    },
  ], []);

  return (
    <div className="dashboard-bg min-h-full p-4 md:p-6 text-white space-y-4">

      {/* 🔥 HEADER */}
      <div>
        <h2 className="text-sm md:text-base font-medium tracking-wide">
          Trade History
        </h2>
        <p className="text-xs text-gray-400">
          Monitor all your trading activity and performance
        </p>
      </div>

      {/* 🔥 TABLE */}
      <div className="glow-card p-3">
        <TableComponent
          columns={columns}
          data={data}
          rowsPerPage={5}
          searchable={true}
          emptyMessage="No trade history found"
        />
      </div>

    </div>
  );
};

export default TradeHistory;