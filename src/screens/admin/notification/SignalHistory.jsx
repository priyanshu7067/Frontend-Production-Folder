import React from "react";
import { toast } from "react-toastify";
import { useAuth } from "../../../context/AuthContext";
import { getSignalHistory } from "../../../apis/admin/admin.api";
import TableComponent from "../../../components/ui/TableComponent";

const SignalHistory = () => {
  const [signalHistory, setSignalHistory] = React.useState([]);
  const { showLoader, hideLoader } = useAuth();

  const fetchSignalHistory = async () => {
    showLoader();

    try {
      const response = await getSignalHistory();

      if (response?.success) {
        setSignalHistory(response?.data || []);
      } else {
        toast.error(response?.message || "Failed to fetch signal history");
      }
    } catch (error) {
      console.error("Error fetching signal history:", error);
      toast.error(error?.message || "Something went wrong");
    } finally {
      hideLoader();
    }
  };

  React.useEffect(() => {
    fetchSignalHistory();
  }, []);

  const columns = [
    {
      header: "#",
      render: (_, index) => index + 1,
    },

    {
      header: "Signal Type",
      accessor: "type",
      render: (row) => (
        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold ${
            row?.type === "Buy"
              ? "bg-green-500/20 text-green-400 border border-green-500/30"
              : "bg-red-500/20 text-red-400 border border-red-500/30"
          }`}
        >
          {row?.type}
        </span>
      ),
    },

    {
      header: "Slot",
      render: (row) => `Slot ${row?.slot || "-"}`,
    },

    {
      header: "Slot Time",
      accessor: "slotTime",
    },

    {
      header: "Signal Date",
      render: (row) =>
        row?.signalDate
          ? new Date(row.signalDate).toLocaleDateString("en-IN", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            })
          : "-",
    },

    {
      header: "Created At",
      render: (row) =>
        row?.createdAt
          ? new Date(row.createdAt).toLocaleString("en-IN")
          : "-",
    },

    {
      header: "Expires At",
      render: (row) =>
        row?.expiresAt
          ? new Date(row.expiresAt).toLocaleString("en-IN")
          : "-",
    },

    {
      header: "Status",
      render: (row) => {
        const isExpired = new Date(row?.expiresAt) < new Date();

        return (
          <span
            className={`px-3 py-1 rounded-full text-xs font-semibold ${
              isExpired
                ? "bg-red-500/20 text-red-400 border border-red-500/30"
                : "bg-cyan-500/20 text-cyan-400 border border-cyan-500/30"
            }`}
          >
            {isExpired ? "Expired" : "Active"}
          </span>
        );
      },
    },
  ];

  return (
    <div className="p-4">
      <div className="mb-5">
        <h2 className="text-2xl font-bold text-white">
          Signal History
        </h2>

        <p className="text-sm text-gray-400 mt-1">
          View all broadcasted trading signals
        </p>
      </div>

      <TableComponent
        columns={columns}
        data={signalHistory}
        rowsPerPage={10}
        searchable={true}
        emptyMessage="No signal history found"
      />
    </div>
  );
};

export default SignalHistory;