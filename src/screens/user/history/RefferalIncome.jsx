import React, { useEffect, useMemo, useState } from "react";
import TableComponent from "../../../components/ui/TableComponent";
import { getReferralHistory } from "../../../apis/user/users.api";
import { toast } from "react-toastify";
import { useAuth } from "../../../context/AuthContext";

const RefferalIncome = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const { showLoader, hideLoader } = useAuth();

  // 🔥 FETCH API
  const fetchReferral = async () => {
    showLoader();
    try {
      setLoading(true);

      const res = await getReferralHistory();
      // console.log("REFERRAL:", res);
      if (res?.success) {
        setData(res?.data || []);
      } else {
        toast.error(res?.message || "Failed to fetch referral income");
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
    fetchReferral();
  }, []);

  // 🔥 CORRECT COLUMNS (render use karo)
  const columns = useMemo(() => [
    {
      header: "From User",
      render: (row) => (
        <div className="flex flex-col">
          <span className="text-white text-sm font-medium">
            {row?.fromUser?.userId?.slice(0, 35)}...
          </span>
          {/* <span className="text-xs text-gray-400">
            Sender
          </span> */}
        </div>
      ),
    },
    {
      header: "To User",
      render: (row) => (
        <span className="text-purple-400 text-xs font-mono">
          {row?.user?.userId?.slice(0, 35)}...
        </span>
      ),
    },
    {
      header: "Level",
      render: (row) => (
        <span className="text-purple-400 text-xs font-semibold">
          Level {row?.level}
        </span>
      ),
    },
    {
      header: "Investment Ref",
      render: (row) => (
        <span className="text-gray-400 text-xs font-mono">
          {row?.investment?.slice(0, 8)}...
        </span>
      ),
    },
    {
      header: "Income",
      render: (row) => (
        <span className="text-green-400 text-sm font-bold">
          ${Number(row?.income || 0).toLocaleString("en-IN")}
        </span>
      ),
    },
    {
      header: "Percentage %",
      render: (row) => (
        <span className="text-teal-400 text-sm font-bold">
         {row?.percentage || 0}%  
        </span>
      ),
    },
    {
      header: "Amount",
      render: (row) => (
        <span className="text-blue-400 text-xs font-semibold">
          ${Number(row?.amount || 0).toLocaleString("en-IN")}
        </span>
      ),
    },
    {
      header: "Note",
      render: (row) => (
        <span className="text-gray-300 text-xs">
          {row?.note || "N/A"}
        </span>
      ),
    },
    {
      header: "Date",
      render: (row) => (
        <span className="text-gray-400 text-xs">
          {row?.createdAt
            ? new Date(row.createdAt).toLocaleString("en-IN")
            : "N/A"}
        </span>
      ),
    },
  ], []);

  return (
    <div className="dashboard-bg min-h-full p-4 md:p-6 text-white space-y-4">

      {/* HEADER */}
      <div>
        <h2 className="text-sm md:text-base font-medium tracking-wide">
          Referral Income
        </h2>
        <p className="text-xs text-gray-400">
          Earnings from your referral network
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
          emptyMessage="No referral income records"
        />
      </div>

    </div>
  );
};

export default RefferalIncome;