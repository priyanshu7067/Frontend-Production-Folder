import React, { useEffect, useMemo, useState } from "react";
import TableComponent from "../../../components/ui/TableComponent";
import { getWithdrawalHistory } from "../../../apis/user/users.api";
import { useAuth } from "../../../context/AuthContext";
import { toast } from "react-toastify";

const WithdrawalHistory = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    const { showLoader, hideLoader } = useAuth();

    // ✅ FETCH WITHDRAWAL HISTORY
    const fetchWithdrawalHistory = async () => {
        showLoader();
        try {
            setLoading(true);

            const res = await getWithdrawalHistory();

            // console.log("WITHDRAWAL HISTORY:", res);

            if (res?.success) {
                setData(res?.data || []);
            } else {
                toast.error(
                    res?.message || "Failed to fetch withdrawal history"
                );
            }
        } catch (err) {
            toast.error(
                err?.response?.data?.message || "Something went wrong"
            );
        } finally {
            setLoading(false);
            hideLoader();
        }
    };

    useEffect(() => {
        fetchWithdrawalHistory();
    }, []);

    // ✅ TABLE COLUMNS
    const columns = useMemo(
        () => [
            {
                header: "S.No",
                render: (_, i) => i + 1,
            },

            {
                header: "Request ID",
                render: (row) => (
                    <span className="text-purple-400 text-xs font-mono">
                        {row?._id?.slice(0, 6)}.....
                        {row?._id?.slice(-4)}
                    </span>
                ),
            },

            {
                header: "Amount",
                render: (row) => (
                    <span className="text-green-400 text-sm font-bold">
                        $
                        {Number(row?.amount || 0).toLocaleString("en-IN")}
                    </span>
                ),
            },
            {
                header: "Net Amount Sent",
                render: (row) => (
                    <span className="text-green-400 text-sm font-bold">
                        ${Number(row?.netAmountSent || 0).toLocaleString("en-IN")}
                    </span>
                ),
            },

            {
                header: "Charge %",
                render: (row) => (
                    <span className="text-red-400 text-xs font-semibold">
                        {Number(row?.adminChargePercentage || 0).toLocaleString("en-IN")}%
                    </span>
                ),
            },
            {
                header: "Wallet Address",
                render: (row) => (
                    <span className="text-gray-300 text-xs font-mono">
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
                        className={`text-[10px] px-2 py-1 rounded-full font-semibold ${row?.status === "approved"
                                ? "bg-green-500/20 text-green-400"
                                : row?.status === "pending"
                                    ? "bg-yellow-500/20 text-yellow-400"
                                    : "bg-red-500/20 text-red-400"
                            }`}
                    >
                        {row?.status?.toUpperCase() || "Pending"}
                    </span>
                ),
            },

            {
                header: "Date",
                render: (row) => (
                    <span className="text-gray-400 text-xs">
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
        <div className="dashboard-bg  md:p-6 text-white space-y-4">

            {/* HEADER */}
            <div>
                <h2 className="text-sm md:text-base font-medium tracking-wide">
                    Withdrawal History
                </h2>

                <p className="text-xs text-gray-400">
                    Track all your withdrawal requests and status
                </p>
            </div>

            {/* TABLE */}
            <div className="glow-card p-1">
                <TableComponent
                    columns={columns}
                    data={data}
                    loading={loading}
                    rowsPerPage={5}
                    searchable={true}
                    emptyMessage="No withdrawal records found"
                />
            </div>

        </div>
    );
};

export default WithdrawalHistory;