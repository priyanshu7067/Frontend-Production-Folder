import React, { useEffect, useMemo, useState } from "react";
import TableComponent from "../../../components/ui/TableComponent";
import { getAllLevelIncome } from "../../../apis/admin/investment.api";
import { toast } from "react-toastify";
import { useAuth } from "../../../context/AuthContext";
import { maskWalletAddress } from "../../../utils/helper";

const AdminLevelIncome = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { showLoader, hideLoader } = useAuth();

  const fetchHistory = async () => {
    showLoader();
    try {
      setLoading(true);

      const res = await getAllLevelIncome();

      if (res?.success) {
        setData(res?.data || []);
      } else {
        toast.error(res?.message || "Failed to fetch");
      }
    } catch (err) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
      hideLoader();
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  const columns = useMemo(
    () => [
      {
        header: "S.No",
        render: (_, i) => i + 1,
      },
      {
        header: "Level",
        render: (row) => (
          <span className="text-purple-400 text-xs font-semibold">
            Level {row?.level || 0}
          </span>
        ),
      },
      {
        header: "From User",
        render: (row) => (
          <span className="text-white text-sm font-mono">
            {maskWalletAddress(row?.fromUser?.userId) || "N/A"}
          </span>
        ),
      },
      {
        header: "To User",
        render: (row) => (
          <span className="text-gray-400 text-sm font-mono">
            {maskWalletAddress(row?.user?.userId) || "N/A"}
          </span>
        ),
      },
      {
        header: "Income",
        render: (row) => (
          <span className="text-green-400 font-semibold">
            ₹{Number(row?.income || 0).toLocaleString("en-IN")}
          </span>
        ),
      },
      {
        header: "Amount",
        render: (row) => (
          <span className="text-blue-400 text-sm">
            ₹{Number(row?.amount || 0).toLocaleString("en-IN")}
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
              ? new Date(row.createdAt).toLocaleDateString("en-IN")
              : "N/A"}
          </span>
        ),
      },
    ],
    [],
  );

  return (
    <div className="dashboard-bg min-h-full p-4 md:p-6 text-white space-y-4">
      <div>
        <h2 className="text-sm md:text-base font-medium tracking-wide">
          Level Income History
        </h2>
        <p className="text-xs text-gray-400">Track all level income</p>
      </div>

      <div className="glow-card p-3">
        <TableComponent
          columns={columns}
          data={data}
          loading={loading}
          rowsPerPage={10}
          searchable={true}
          emptyMessage="No level income found"
        />
      </div>
    </div>
  );
};

export default AdminLevelIncome;
