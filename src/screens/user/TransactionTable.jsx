import React from "react";

const TransactionTable = () => {
    const data = [
        { type: "BUY", date: "12 JAN 2023", asset: "BTC", status: "PROCESS", amount: "0.223 BTC" },
        { type: "SELL", date: "13 JAN 2023", asset: "ETH", status: "PROCESS", amount: "0.123 ETH" },
        { type: "BUY", date: "14 JAN 2023", asset: "ADA", status: "PROCESS", amount: "320 ADA" },
        { type: "SELL", date: "15 JAN 2023", asset: "BNB", status: "PROCESS", amount: "2.1 BNB" },
    ];

    return (
        <div className="glow-card mt-6 overflow-hidden">

            <div className="p-4 border-b border-white/5 text-xs text-green-500">
                TRANSACTION HISTORY
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-sm">
                    <thead className="text-gray-500 text-[11px] uppercase">
                        <tr>
                            <th className="px-4 py-3">Type</th>
                            <th>Date</th>
                            <th>Asset</th>
                            <th>Status</th>
                            <th className="text-right px-4">Amount</th>
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-white/5">
                        {data.map((row, i) => (
                            <tr key={i} className="hover:bg-white/[0.03]">
                                <td className="px-4 py-3 text-blue-400">{row.type}</td>
                                <td>{row.date}</td>
                                <td>{row.asset}</td>
                                <td className="text-gray-400">{row.status}</td>
                                <td className="text-right px-4">{row.amount}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
     
           
        </div>
    );
};

export default TransactionTable;