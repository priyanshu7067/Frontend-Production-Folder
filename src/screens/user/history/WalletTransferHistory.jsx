import React, { useEffect, useMemo, useState } from "react";
import TableComponent from "../../../components/ui/TableComponent";
import { getWalletTransferHistory } from "../../../apis/user/users.api";
import { useAuth } from "../../../context/AuthContext";
import { toast } from "react-toastify";

const WalletTransferHistory = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    const { showLoader, hideLoader } = useAuth();

    // ✅ FETCH WALLET TRANSFER HISTORY
    const fetchWalletTransferHistory = async () => {
        showLoader();

        try {
            setLoading(true);

            const res = await getWalletTransferHistory();

            // console.log("WALLET TRANSFER:", res);

            if (res?.success) {
                setData(res?.data || []);
            } else {
                toast.error(
                    res?.message || "Failed to fetch wallet transfer history"
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
        fetchWalletTransferHistory();
    }, []);

    // ✅ TABLE COLUMNS
    const columns = useMemo(
        () => [
            {
                header: "S.No",
                render: (_, i) => i + 1,
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
                header: "Credited Amount",
                render: (row) => (
                    <span className="text-blue-500 text-xs font-semibold">
                        $
                        {Number(row?.creditedAmount || 0).toLocaleString("en-IN")}
                    </span>
                ),
            },
            {
                header: "Deduction Amount",
                render: (row) => (
                    <span className="text-white text-xs font-semibold">
                        $
                        {Number(row?.deduction || 0).toLocaleString("en-IN")}
                    </span>
                ),
            },
            {
                header: "ROI Used",
                render: (row) => (
                    <span className="text-blue-500 text-xs font-semibold">
                        $
                        {Number(row?.roiUsed || 0).toLocaleString("en-IN")}
                    </span>
                ),
            },
             {
                header: "Principal Used",
                render: (row) => (
                    <span className="text-blue-500 text-xs font-semibold">
                        $
                        {Number(row?.principalUsed || 0).toLocaleString("en-IN")}
                    </span>
                ),
            },

            {
                header: "Transfer Type",
                render: (row) => (
                    <span className="text-cyan-400 text-xs font-semibold">
                        {row?.type || "Wallet Transfer"}
                    </span>
                ),
            },

            // {
            //     header: "Status",
            //     render: (row) => (
            //         <span
            //             className={`text-[10px] px-2 py-1 rounded-full font-semibold ${row?.status === "completed"
            //                 ? "bg-green-500/20 text-green-400"
            //                 : row?.status === "pending"
            //                     ? "bg-yellow-500/20 text-yellow-400"
            //                     : "bg-red-500/20 text-red-400"
            //                 }`}
            //         >
            //             {row?.status || "Completed"}
            //         </span>
            //     ),
            // },

            {
                header: "Remark",
                render: (row) => (
                    <span className="text-gray-300 text-xs">
                        {row?.remark || row?.note || "N/A"}
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
        <div className="dashboard-bg md:p-6 text-white space-y-4">

            {/* HEADER */}
            <div>
                <h2 className="text-sm md:text-base font-medium tracking-wide">
                    Wallet Transfer History
                </h2>

                <p className="text-xs text-gray-400">
                    Track all wallet transfer transactions
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
                    emptyMessage="No wallet transfer records found"
                />
            </div>

        </div>
    );
};

export default WalletTransferHistory;