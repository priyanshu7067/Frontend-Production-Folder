import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { header } from "framer-motion/client";
import { useAuth } from "../../../context/AuthContext";
import { getAllRejectedKyc} from "../../../apis/admin/admin.api";
import TableComponent from "../../../components/ui/TableComponent";
import KycDetailsModal from "../../../components/ui/KycDetailsModal";

const UserRejectedKyc = () => {
  const [userKycRequests, setUserKycRequests] = useState([]);
  const [selectedKyc, setSelectedKyc] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const { showLoader, hideLoader } = useAuth();

  const fetchAllApprovedUserKyc = async () => {
    showLoader();
    try {
      const response = await getAllRejectedKyc();
      if (response?.success) {
        setUserKycRequests(response?.data || []);
      } else {
        toast.error(response?.message || "Failed to fetch kyc requests");
      }
    } catch (error) {
      toast.error(error?.message || "Something went wrong");
    } finally {
      hideLoader();
    }
  };

  useEffect(() => {
    fetchAllApprovedUserKyc();
  }, []);

  /* -------------------- TABLE COLUMNS -------------------- */
  const columns = [
    {
      header: "S. No.",
      render: (row, rowIndex) => rowIndex + 1,
    },
    {
      header: "UserId",
      accessor: "userId.userId",
      render: (row) => row?.userId?.userId || "-",
    },
    {
      header: "Email",
      render: (row) => row?.email || "-",
    },
    {
      header: "Mobile",
      render: (row) => row?.phoneNo || "-",
    },
    {
      header: "Aadhaar",
      render: (row) => row?.aadhaar?.number || "-",
    },
    {
      header: "PAN",
      render: (row) => row?.pan?.number || "-",
    },
    {
      header: "Status",
      render: (row) => (
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium capitalize
          ${
            row.status === "pending"
              ? "bg-yellow-500/20 text-yellow-400"
              : row.status === "approved"
                ? "bg-green-500/20 text-green-400"
                : "bg-red-500/20 text-red-400"
          }`}
        >
          {row.status}
        </span>
      ),
    },
    {
      header: "Action",
      render: (row) => (
        <button
          onClick={() => {
            setSelectedKyc(row);
            setOpenModal(true);
          }}
          className="px-3 py-1 rounded-lg text-sm 
          bg-gradient-to-r from-purple-600 to-indigo-600 
          hover:scale-105 transition text-white"
        >
          View Details
        </button>
      ),
    },
  ];

  return (
    <>
      <TableComponent columns={columns} data={userKycRequests} />
      <KycDetailsModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        data={selectedKyc}
        fetchData={fetchAllApprovedUserKyc}
      />
    </>
  );
};

export default UserRejectedKyc;
