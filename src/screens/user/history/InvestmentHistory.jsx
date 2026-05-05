import React, { useEffect, useMemo, useState } from "react";
import TableComponent from "../../../components/ui/TableComponent";
import { getInvestmentHistory } from "../../../apis/user/users.api";
import { toast } from "react-toastify";
import { useAuth } from "../../../context/AuthContext";

const InvestmentHistory = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { showLoader, hideLoader } = useAuth();

  const fetchHistory = async () => {
    showLoader();
    try {
      setLoading(true);

      const res = await getInvestmentHistory();
      //   console.log("API:", res);

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

  // ✅ CORRECT COLUMNS (render use karo)
  const columns = useMemo(
    () => [
      {
        header: "S.No",
        render: (_, i) => i + 1,
      },
      {
        header: "Transaction Hash",
        render: (row) => (
          <span className="text-gray-300 text-xs font-mono">
            {row?.transactionHash}
          </span>
        ),
      },
      {
        header: "Investment",
        render: (row) => (
          <span className="text-blue-400 text-sm font-semibold">
            ₹{Number(row?.investment || 0).toLocaleString("en-IN")}
          </span>
        ),
      },
      {
        header: "Date",
        render: (row) => (
          <span className="text-gray-400 text-xs">
            {row?.investmentDate
              ? new Date(row.investmentDate).toLocaleDateString("en-IN")
              : "N/A"}
          </span>
        ),
      },
      {
        header: "Return",
        render: (row) => (
          <span className="text-green-400 text-xs font-semibold">
            ₹{Number(row?.returnInvestment || 0).toLocaleString("en-IN")}
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
          Investment History
        </h2>
        <p className="text-xs text-gray-400">Track all your investments</p>
      </div>

      <div className="glow-card p-3">
        <TableComponent
          columns={columns}
          data={data}
          loading={loading}
          rowsPerPage={5}
          searchable={true}
          emptyMessage="No investment history found"
        />
      </div>
    </div>
  );
};

export default InvestmentHistory;
