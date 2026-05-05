import React, { useEffect, useMemo, useState } from "react";
import { getTransactionHistory } from "../../apis/user/users.api";
import TableComponent from "../../components/ui/TableComponent";
import { toast } from "react-toastify";
import { useAuth } from "../../context/AuthContext";

const TransactionTable = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const {showLoader, hideLoader} = useAuth();

    // 🔥 FETCH API
    const fetchTransactions = async () => {
        showLoader();
        try {
            setLoading(true);

            const res = await getTransactionHistory();
            //   console.log("TXN:", res);

            if (res?.success) {
                setData(res?.data || []);
            } else {
                toast.error(res?.message || "Failed to fetch transactions");
            }
        } catch (err) {
            toast.error("Something went wrong");
        } finally {
            setLoading(false);
            hideLoader();
        }
    };

    useEffect(() => {
        fetchTransactions();
    }, []);

    // 🔥 COLUMNS (TableComponent ke hisaab se render use karo)
    const columns = useMemo(() => [
        {
            header: "S.No.",
            render: (_, i) => i + 1,

        },
        {
            header: "Amount",
            render: (row) => (
                <span className="text-right text-sm font-semibold text-purple-400">
                    ₹{Number(row?.amount || 0).toLocaleString("en-IN")}
                </span>
            ),
        },
        {
            header: "Type",
            render: (row) => (
                <span className="text-blue-400 font-medium">
                    {row?.type || "N/A"}
                </span>
            ),
        },
        {
            header: "Transaction Id",
            render: (row) => (
                <span className="text-white text-sm">
                    {row?.transactionId || "N/A"}
                </span>
            ),
        },
        {
            header: "TransactionDate",
            render: (row) => (
                <span className="text-gray-300 text-xs">
                    {row?.transactionDate
                        ? new Date(row.transactionDate).toLocaleDateString("en-IN")
                        : "N/A"}
                </span>
            ),
        },


        {
            header: "Status",
            render: (row) => (
                <span
                    className={`text-[10px] px-2 py-0.5 rounded-full ${row?.status === "Completed"
                        ? "bg-green-500/20 text-green-400"
                        : row?.status === "Pending"
                            ? "bg-yellow-500/20 text-yellow-400"
                            : "bg-green-500/20 text-green-400"            // dummy
                        }`}
                >
                    {row?.status || "Active"}
                </span>
            ),
        },

    ], []);

    return (
        <div className="glow-card mt-6">

            {/* HEADER */}
            <div className="p-4 border-b font-bold border-white/5 text-sm text-[var(--primary)]">
                TRANSACTION HISTORY
            </div>

            {/* TABLE */}
            <div className="p-3">
                <TableComponent
                    columns={columns}
                    data={data}
                    loading={loading}
                    rowsPerPage={5}
                    searchable={true}
                    emptyMessage="No transactions found"
                />
            </div>

        </div>
    );
};

export default TransactionTable;