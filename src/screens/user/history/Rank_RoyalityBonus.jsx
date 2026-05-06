import React, { useEffect, useMemo, useState } from "react";
import TableComponent from "../../../components/ui/TableComponent";
import { getRankRoyalityHistory } from "../../../apis/user/users.api";
import { toast } from "react-toastify";
import { useAuth } from "../../../context/AuthContext";

const Rank_RoyalityBonus = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const { showLoader, hideLoader } = useAuth();

  // 🔥 FETCH API
  const fetchRoyaltyHistory = async () => {
    showLoader();

    try {
      setLoading(true);

      const res = await getRankRoyalityHistory();

      // console.log("ROYALTY BONUS:", res);

      if (res?.success) {
        setData(res?.data || []);
      } else {
        toast.error(
          res?.message || "Failed to fetch royalty bonus history"
        );
      }
    } catch (err) {
      console.error(err);

      toast.error(
        err?.response?.data?.message ||
          err?.message ||
          "Something went wrong"
      );
    } finally {
      setLoading(false);
      hideLoader();
    }
  };

  useEffect(() => {
    fetchRoyaltyHistory();
  }, []);

  // 🔥 TABLE COLUMNS
  const columns = useMemo(
    () => [
      {
        header: "S.No",
        render: (_, i) => i + 1,
      },

      {
        header: "User ID",
        render: (row) => (
          <div className="flex flex-col">
            <span className="text-cyan-300 text-xs font-semibold">
              {row?.user?.userId?.slice(0, 4)}.........
              {row?.user?.userId?.slice(38, 43)}
            </span>

            <span className="text-[10px] text-gray-500">
              Rank Holder
            </span>
          </div>
        ),
      },

      {
        header: "Rank",
        render: (row) => (
          <div className="flex items-center">
            <span
              className="
                px-2 py-1 rounded-full
                text-[11px] font-bold
                bg-gradient-to-r
                from-yellow-500/20
                to-orange-500/20
                text-yellow-300
                border border-yellow-400/20
              "
            >
              👑 {row?.currentRank || "N/A"}
            </span>
          </div>
        ),
      },

      {
        header: "Income",
        render: (row) => (
          <span className="text-green-400 text-sm font-bold">
            $
            {Number(row?.income || 0).toLocaleString(
              "en-IN"
            )}
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
    ],
    []
  );

  return (
    <div className="dashboard-bg min-h-full p-4 md:p-6 text-white space-y-4">
      {/* 🔥 HEADER */}
      <div>
        <h2 className="text-sm md:text-base font-medium tracking-wide">
          Rank Royalty Bonus
        </h2>

        <p className="text-xs text-gray-400">
          Earn passive income based on your rank performance
        </p>
      </div>
      {/* 🔥 TABLE */}
      <div className="glow-card p-1">
        <TableComponent
          columns={columns}
          data={data}
          loading={loading}
          rowsPerPage={5}
          searchable={true}
          emptyMessage="No royalty bonus records found"
        />
      </div>
    </div>
  );
};

export default Rank_RoyalityBonus;