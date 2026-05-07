import React, { useEffect, useMemo, useState } from "react";
import TableComponent from "../../../components/ui/TableComponent";
import { getAllPromotionBonusIncome } from "../../../apis/admin/investment.api";
import { toast } from "react-toastify";
import { useAuth } from "../../../context/AuthContext";
import { maskWalletAddress } from "../../../utils/helper";

const AdminPromotionBonusIncome = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { showLoader, hideLoader } = useAuth();

  const fetchHistory = async () => {
    showLoader();
    try {
      setLoading(true);

      const res = await getAllPromotionBonusIncome();

      if (res?.success) {
        setData(res?.data?.investments || res?.data || []);
      } else {
        toast.error(res?.message || "Failed to fetch");
      }
    } catch (err) {
      toast.error(err?.message || "Something went wrong");
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
        header: "User Wallet",
        render: (row) => (
          <span className="text-gray-300 text-sm font-mono">
            {maskWalletAddress(row?.user?.userId) || "N/A"}
          </span>
        ),
      },
      {
        header: "Level",
        render: (row) => (
          <span className="text-blue-400 text-sm">
            {row?.levelName || "N/A"}
          </span>
        ),
      },
      {
        header: "Type",
        render: (row) => (
          <span className="text-purple-400 text-sm">{row?.type || "N/A"}</span>
        ),
      },
      {
        header: "Amount",
        render: (row) => (
          <span className="text-green-400 text-sm font-semibold">
            ${Number(row?.amount || 0).toLocaleString("en-IN")}
          </span>
        ),
      },
      {
        header: "Directs",
        render: (row) => (
          <span className="text-yellow-400 text-sm">
            {row?.qualifiedDirects || 0}
          </span>
        ),
      },
      {
        header: "Team",
        render: (row) => (
          <span className="text-pink-400 text-sm">
            {row?.qualifiedTeam || 0}
          </span>
        ),
      },
      {
        header: "Team Business",
        render: (row) => (
          <span className="text-indigo-400 text-sm">
            ${Number(row?.teamBusiness || 0).toLocaleString("en-IN")}
          </span>
        ),
      },
      {
        header: "Date",
        render: (row) => (
          <span className="text-gray-400 text-xs">
            {row?.createdAt
              ? new Date(row?.createdAt).toLocaleDateString("en-IN")
              : "N/A"}
          </span>
        ),
      },
    ],
    [],
  );

  return (
    <div className="dashboard-bg min-h-full md:p-6 text-white space-y-4">
      <div>
        <h2 className="text-sm md:text-base font-medium tracking-wide">
          Promotion Bonus Income History
        </h2>
        <p className="text-xs text-gray-400">
          Track all user promotion bonus income history
        </p>
      </div>

      <div className="glow-card p-3">
        <TableComponent
          columns={columns}
          data={data}
          loading={loading}
          rowsPerPage={10}
          searchable={true}
          emptyMessage="No promotion bonus history found"
        />
      </div>
    </div>
  );
};

export default AdminPromotionBonusIncome;
