import React, { useEffect, useMemo, useState } from "react";
import { getTransactionHistory } from "../../apis/user/users.api";
import TableComponent from "../../components/ui/TableComponent";
import { toast } from "react-toastify";
import { useAuth } from "../../context/AuthContext";
import { formatINR } from "../../utils/helper";

const TransactionTable = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const { showLoader, hideLoader } = useAuth();

    const fetchTransactions = async () => {
        showLoader();
        try {
            setLoading(true);
            const res = await getTransactionHistory();
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

    const columns = useMemo(() => [
        {
            header: "S.No.",
            render: (_, i) => <span className="font-semibold text-slate-600">{i + 1}</span>,
        },
        {
            header: "Amount (INR)",
            render: (row) => (
                <span className="text-sm font-bold text-sky-600">
                    {formatINR(row?.amount || 0)}
                </span>
            ),
        },
        {
            header: "Transaction Type",
            render: (row) => (
                <span className="text-slate-800 font-semibold text-xs bg-slate-100 px-2.5 py-1 rounded-md border border-slate-200">
                    {row?.type || "N/A"}
                </span>
            ),
        },
        {
            header: "Transaction ID",
            render: (row) => (
                <span className="text-slate-700 font-mono text-xs">
                    {row?.transactionId || "N/A"}
                </span>
            ),
        },
        {
            header: "Date",
            render: (row) => (
                <span className="text-slate-500 text-xs">
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
                    className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full ${
                        row?.status === "Completed" || row?.status === "Success"
                            ? "bg-emerald-100 text-emerald-700 border border-emerald-200"
                            : row?.status === "Pending"
                            ? "bg-amber-100 text-amber-700 border border-amber-200"
                            : "bg-emerald-100 text-emerald-700 border border-emerald-200"
                    }`}
                >
                    {row?.status || "Success"}
                </span>
            ),
        },
    ], []);

    return (
        <div className="bg-white border border-slate-200 rounded-2xl shadow-xs mt-6 overflow-hidden">
            <div className="p-4 border-b border-slate-200 font-bold text-sm text-slate-900 bg-slate-50/50">
                RECENT TRANSACTIONS
            </div>

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