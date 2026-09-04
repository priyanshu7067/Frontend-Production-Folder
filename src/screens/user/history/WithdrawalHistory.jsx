import React, { useEffect, useMemo, useState } from "react";
import TableComponent from "../../../components/ui/TableComponent";
import { getWithdrawalHistory } from "../../../apis/user/users.api";
import { useAuth } from "../../../context/AuthContext";
import { toast } from "react-toastify";
import { formatINR } from "../../../utils/helper";

const WithdrawalHistory = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    const { showLoader, hideLoader } = useAuth();

    const fetchWithdrawalHistory = async () => {
        showLoader();
        try {
            setLoading(true);
            const res = await getWithdrawalHistory();
            if (res?.success) {
                setData(res?.data || []);
            } else {
                toast.error(res?.message || "Failed to fetch withdrawal history");
            }
        } catch (err) {
            toast.error(err?.response?.data?.message || "Something went wrong");
        } finally {
            setLoading(false);
            hideLoader();
        }
    };

    useEffect(() => {
        fetchWithdrawalHistory();
    }, []);

    const columns = useMemo(
        () => [
            {
                header: "S.No",
                render: (_, i) => <span className="font-semibold text-slate-600">{i + 1}</span>,
            },
            {
                header: "Request ID",
                render: (row) => (
                    <span className="text-sky-600 text-xs font-mono">
                        {row?._id?.slice(0, 6)}.....{row?._id?.slice(-4)}
                    </span>
                ),
            },
            {
                header: "Requested Amount",
                render: (row) => (
                    <span className="text-slate-900 text-sm font-bold">
                        {formatINR(row?.amount || 0)}
                    </span>
                ),
            },
            {
                header: "Net Amount Sent",
                render: (row) => (
                    <span className="text-emerald-600 text-sm font-bold">
                        {formatINR(row?.netAmountSent || 0)}
                    </span>
                ),
            },
            {
                header: "Deduction Fee",
                render: (row) => (
                    <span className="text-rose-500 text-xs font-semibold">
                        {Number(row?.adminChargePercentage || 0)}%
                    </span>
                ),
            },
            {
                header: "Wallet / Account",
                render: (row) => (
                    <span className="text-slate-600 text-xs font-mono">
                        {row?.userWalletAddress
                            ? `${row?.userWalletAddress?.slice(0, 6)}.....${row.userWalletAddress.slice(-4)}`
                            : "N/A"}
                    </span>
                ),
            },
            {
                header: "Status",
                render: (row) => (
                    <span
                        className={`text-[11px] px-2.5 py-0.5 rounded-full font-bold uppercase ${
                            row?.status === "approved"
                                ? "bg-emerald-100 text-emerald-700 border border-emerald-200"
                                : row?.status === "pending"
                                ? "bg-amber-100 text-amber-700 border border-amber-200"
                                : "bg-rose-100 text-rose-700 border border-rose-200"
                        }`}
                    >
                        {row?.status || "Pending"}
                    </span>
                ),
            },
            {
                header: "Date",
                render: (row) => (
                    <span className="text-slate-500 text-xs">
                        {row?.createdAt
                            ? new Date(row.createdAt).toLocaleDateString("en-IN")
                            : "N/A"}
                    </span>
                ),
            },
        ],
        []
    );

    return (
        <div className="space-y-6 pb-12">
            <div>
                <h1 className="text-2xl font-bold tracking-tight text-slate-900">
                    Withdrawal History
                </h1>
                <p className="text-xs text-slate-500 mt-1">
                    Track your payout requests and net received INR amounts.
                </p>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl shadow-xs p-3">
                <TableComponent
                    columns={columns}
                    data={data}
                    loading={loading}
                    rowsPerPage={8}
                    searchable={true}
                    emptyMessage="No withdrawal records found"
                />
            </div>
        </div>
    );
};

export default WithdrawalHistory;