import React, { useEffect, useMemo, useState } from "react";
import TableComponent from "../../../components/ui/TableComponent";
import { getApprovedWithdrawalHistory } from "../../../apis/admin/investment.api";
import { toast } from "react-toastify";
import { useAuth } from "../../../context/AuthContext";
import { maskWalletAddress } from "../../../utils/helper";
import Swal from "sweetalert2";
import { approveWithdrawal } from "../../../apis/admin/admin.api";
import { QRCodeSVG } from "qrcode.react";
import Decimal from "decimal.js";

const AdminApprovedWithdrawalHistory = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { showLoader, hideLoader } = useAuth();
  const [selectedRow, setSelectedRow] = useState(null);
  const [viewModalVisible, setViewModalVisible] = useState(false);

  const fetchHistory = async () => {
    showLoader();
    try {
      setLoading(true);

      const res = await getApprovedWithdrawalHistory();

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
        header: "Name",
        render: (row) => (
          <span className="text-white text-sm">
            {row?.userId?.name || "N/A"}
          </span>
        ),
      },
      {
        header: "Email",
        render: (row) => (
          <span className="text-gray-300 text-sm">
            {row?.userId?.email || "N/A"}
          </span>
        ),
      },
      {
        header: "Wallet",
        render: (row) => (
          <span className="text-gray-300 text-sm font-mono">
            {maskWalletAddress(row?.userWalletAddress) || "N/A"}
          </span>
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
        header: "Net Amount",
        render: (row) => (
          <span className="text-cyan-400 text-sm font-semibold">
            ${Number(row?.netAmountSent || 0).toLocaleString("en-IN")}
          </span>
        ),
      },
      {
        header: "Status",
        render: (row) => (
          <span
            className={`text-sm font-medium capitalize ${
              row?.status === "pending"
                ? "text-yellow-400"
                : row?.status === "approved"
                  ? "text-green-400"
                  : "text-red-400"
            }`}
          >
            {row?.status || "N/A"}
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
      {
        header: "Action",
        render: (rowData) => (
          <div className="flex gap-2 flex-wrap">
            <button
              onClick={() => {
                setSelectedRow(rowData);
                setViewModalVisible(true);
              }}
              className="cursor-pointer bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-200 shadow-md"
            >
              View
            </button>
          </div>
        ),
      },
    ],
    [],
  );

  return (
    <>
      <div className="dashboard-bg min-h-full md:p-6 text-white space-y-4">
        <div>
          <h2 className="text-sm md:text-base font-medium tracking-wide">
            Pending Withdrawal
          </h2>
          <p className="text-xs text-gray-400">
            Track all user pending withdrawal
          </p>
        </div>

        <div className="glow-card p-3">
          <TableComponent
            columns={columns}
            data={data}
            loading={loading}
            rowsPerPage={10}
            searchable={true}
            emptyMessage="No pending withdrawal found"
          />
        </div>
      </div>
      {viewModalVisible && selectedRow && (
        <div className="fixed inset-0 z-[1201] bg-black/50 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg relative">
            <button
              onClick={() => setViewModalVisible(false)}
              className="absolute top-2 right-3 text-gray-500 hover:text-red-500 text-2xl font-bold"
            >
              &times;
            </button>
            <h2 className="text-xl font-semibold mb-4 text-black">
              Withdrawal Details
            </h2>
            <div className="flex justify-center mb-4">
              <QRCodeSVG
                value={selectedRow?.userWalletAddress || "NA"}
                size={128}
              />
            </div>
            <div className="text-sm text-black space-y-2">
              {/* <p>
                <strong>Username:</strong> {selectedRow?.userId?.username}
              </p> */}
              <p>
                <strong>Full Name:</strong> {selectedRow?.userId?.name}
              </p>
              <p>
                <strong>Email:</strong> {selectedRow?.userId?.email}
              </p>
              <p>
                <strong>Wallet Address:</strong>{" "}
                {selectedRow?.userWalletAddress}
              </p>
              <p>
                <strong>Amount:</strong> ${selectedRow?.amount?.toFixed(2)}
              </p>
              <p>
                <strong>Fee Amount:</strong> $
                {new Decimal(selectedRow?.amount)
                  .sub(selectedRow?.netAmountSent)
                  .toFixed(2)}
              </p>
              <p>
                <strong>Net Amount Sent:</strong> $
                {selectedRow?.netAmountSent?.toFixed(2)}
              </p>
              <p>
                <strong>Status:</strong> {selectedRow?.status}
              </p>
              <p>
                <strong>Date:</strong>{" "}
                {new Date(selectedRow?.createdAt)?.toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AdminApprovedWithdrawalHistory;
