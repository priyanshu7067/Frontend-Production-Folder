import React, { useMemo, useEffect, useState } from "react";
import TableComponent from "../../../components/ui/TableComponent";
import { getMyDirectTeams } from "../../../apis/user/users.api";
import { useAuth } from "../../../context/AuthContext";

const DirectTeam = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { showLoader, hideLoader } = useAuth();

  // ✅ API CALL
  const fetchTeams = async () => {
    showLoader();
    try {
      setLoading(true);
      setError("");

      const res = await getMyDirectTeams();

      // 🔥 adjust based on your API response
      const apiData = res?.data || [];

      // 🔥 map backend → frontend format
      const formatted = apiData.map((item) => ({
        user: item.name || "N/A",
        userId: item.userId || item._id,
        joinDate: new Date(item.createdAt).toLocaleDateString(),
        status: item.isActive ? "Active" : "Inactive",
        totalInvestment: item.totalInvestment || 0,
      }));
      console.log("formatted", formatted);

      setData(formatted);
    } catch (err) {
      console.error("Direct Team Error:", err);
      setError("Failed to load team data");
    } finally {
      setLoading(false);
      hideLoader();
    }
  };

  useEffect(() => {
    fetchTeams();
  }, []);

  // 🔥 TABLE COLUMNS
  const columns = useMemo(
    () => [
      { header: "User", accessor: "user" },
      { header: "User ID", accessor: "userId" },
      {
        header: "Total Investment",
        accessor: "totalInvestment",
        Cell: ({ value }) => (
          <span className="text-blue-400 text-xs font-semibold">
            ${Number(value || 0).toLocaleString("en-IN")}
          </span>
        ),
      },
      { header: "Join Date", accessor: "joinDate" },
      {
        header: "Status",
        accessor: "status",
        Cell: ({ value }) => (
          <span
            className={`text-[10px] px-2 py-0.5 rounded-full ${value === "Active"
              ? "bg-green-500/20 text-green-400"
              : "bg-red-500/20 text-red-400"
              }`}
          >
            {value}
          </span>
        ),
      },
      // {
      //   header: "Business",
      //   accessor: "business",
      //   Cell: ({ value }) => (
      //     <span className="text-blue-400 text-xs font-medium">
      //       ${value.toLocaleString()}
      //     </span>
      //   ),
      // },
    ],
    []
  );

  return (
    <div className="dashboard-bg min-h-full p-4 md:p-6 text-white space-y-4">

      {/* HEADER */}
      <div>
        <h2 className="text-sm md:text-base font-medium tracking-wide">
          Direct Team
        </h2>
        <p className="text-xs text-gray-400">
          List of your directly referred users
        </p>
      </div>

      {/* ERROR */}
      {error && (
        <div className="bg-red-500/10 text-red-400 p-2 rounded text-xs">
          {error}
        </div>
      )}

      {/* TABLE */}
      <div className="glow-card p-3">
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