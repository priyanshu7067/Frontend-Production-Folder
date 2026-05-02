import React from "react";

const TableComponent = ({ data = [] }) => {
  return (
    <div className="glass rounded-xl p-4 border border-white/10">
      <table className="w-full text-sm text-gray-300">
        <thead className="text-gray-500 border-b border-white/10 text-xs uppercase">
          <tr>
            <th className="text-left py-2">Name</th>
            <th>Value</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {data.map((row, i) => (
            <tr
              key={i}
              className="border-b border-white/5 hover:bg-white/5 transition"
            >
              <td className="py-3">{row.name}</td>
              <td>{row.value}</td>
              <td
                className={
                  row.status === "active"
                    ? "text-green-400"
                    : "text-red-400"
                }
              >
                {row.status}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableComponent;