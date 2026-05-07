import React, { useMemo, useEffect, useState } from "react";
import TableComponent from "../../../components/ui/TableComponent";
import { getMyDirectTeams } from "../../../apis/user/users.api";
import { useAuth } from "../../../context/AuthContext";
import { toast } from "react-toastify";

const DirectTeam = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const { showLoader, hideLoader } = useAuth();

  // ✅ FETCH API
  const fetchTeams = async () => {
    showLoader();

    try {
      setLoading(true);

      const res = await getMyDirectTeams();

      if (res?.success) {
        setData(res?.data || []);
      } else {
        toast.error(res?.message || "Failed to fetch direct team");
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
    fetchTeams();
  }, []);

  // 🔥 SAME FORMAT AS YOUR REFERRAL INCOME
  const columns = useMemo(
    () => [
      {
        header: "S.No",
        render: (_, i) => i + 1,
      },

      {
        header: "User",
        render: (row) => (
          <div className="flex flex-col">
            <span className="text-white text-sm font-medium">
              {row?.name || "N/A"}
            </span>
          </div>
        ),
      },

      {
        header: "User ID",
        render: (row) => (
          <span className="text-purple-400 text-xs font-mono">
            {row?.userId?.slice(0, 4)}.....
            {row?.userId?.slice(-4)}
          </span>
        ),
      },

      {
        header: "Total Investment",
        render: (row) => (
          <span className="text-blue-400 text-xs font-semibold">
            $
            {Number(
              row?.totalInvestment || 0
            ).toLocaleString("en-IN")}
          </span>
        ),
      },

      {
        header: "Status",
        render: (row) => (
          <span
            className={`text-[10px] px-2 py-1 rounded-full font-semibold ${
              row?.isActive
                ? "bg-green-500/20 text-green-400"
                : "bg-red-500/20 text-red-400"
            }`}
          >
            {row?.isActive ? "Active" : "Inactive"}
          </span>
        ),
      },

      {
        header: "Join Date",
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
    <div className="dashboard-bg min-h-full md:p-6 text-white space-y-4">

      {/* HEADER */}
      <div>
        <h2 className="text-sm md:text-base font-medium tracking-wide">
          Direct Team
        </h2>

        <p className="text-xs text-gray-400">
          List of your directly referred users
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
          emptyMessage="No team members found"
        />
      </div>

    </div>
  );
};

export default DirectTeam;