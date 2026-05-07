import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  getAllUsers,
  toggleUserWithdrawalStatus,
} from "../../../apis/admin/admin.api";
import { useAuth } from "../../../context/AuthContext";
import TableComponent from "../../../components/ui/TableComponent";

const BlockWithdrawalPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const { showLoader, hideLoader } = useAuth();

  const fetchUsers = async () => {
    try {
      setLoading(true);
      showLoader();
      const res = await getAllUsers();
      if (res?.success) {
        setUsers(res?.data || []);
      } else {
        toast.error(res?.message || "Failed to fetch users");
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          error?.message ||
          "Something went wrong",
      );
    } finally {
      setLoading(false);
      hideLoader();
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleToggle = async (row) => {
    showLoader();
    try {
      const res = await toggleUserWithdrawalStatus(row._id);

      if (res?.success) {
        toast.success(res.message);
        setUsers((prev) =>
          prev.map((p) =>
            p._id === row._id
              ? { ...p, isWithdrawalBlocked: !p.isWithdrawalBlocked }
              : p,
          ),
        );
      }
    } catch (err) {
      toast.error(err?.message || "Toggle failed");
    } finally {
      hideLoader();
    }
  };

  const columns = [
    { header: "S.No", render: (_, i) => i + 1 },
    { header: "User ID", accessor: "userId" },
    {
      header: "Active",
      accessor: "activationDetails.isActive",
      render: (row) =>
        row?.activationDetails?.isActive ? (
          <span className="inline-flex items-center px-2.5 py-1 text-xs font-semibold rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            Active
          </span>
        ) : (
          <span className="inline-flex items-center px-2.5 py-1 text-xs font-semibold rounded-full bg-rose-500/10 text-rose-400 border border-rose-500/20">
            Inactive
          </span>
        ),
    },
    {
      header: "Action",
      accessor: "isBlock",
      render: (row) => (
        <div className="flex gap-2">
          <button
            onClick={() => handleToggle(row)}
            disabled={loading}
            className={`px-3 py-1 text-xs rounded 
    ${
      row?.isWithdrawalBlocked
        ? "bg-red-600 hover:bg-red-700"
        : "bg-green-600 hover:bg-green-700"
    } text-white disabled:opacity-50 cursor-pointer`}
          >
            {loading
              ? "..."
              : row?.isWithdrawalBlocked
                ? "Unblock Withdrawal"
                : "Block Withdrawal"}
          </button>
        </div>
      ),
    },
  ];

  return (
    <>
      <div className="min-h-screen">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-white">Users List</h1>
          <p className="text-gray-400 text-sm">
            Manage and monitor all registered users
          </p>
        </div>

        <TableComponent
          columns={columns}
          data={users}
          loading={loading}
          emptyMessage="No users found"
        />
      </div>
    </>
  );
};

export default BlockWithdrawalPage;
