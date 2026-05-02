import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { editUserApi, getAllUsers, toggleUserStatus } from "../../apis/admin/admin.api";
import { useAuth } from "../../context/AuthContext";
import TableComponent from "../../components/ui/TableComponent";

const AllUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const { showLoader, hideLoader } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [formData, setFormData] = useState({});

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
    setLoading(true);
    try {
      const res = await toggleUserStatus(row._id);

      if (res?.success) {
        toast.success(res.message);
        setUsers((prev) =>
          prev.map((p) =>
            p._id === row._id ? { ...p, isBlock: !p.isBlock } : p,
          ),
        );
      }
    } catch (err) {
      toast.error(err?.message || "Toggle failed");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEdit = (user) => {
    setSelectedUser(user);
    setFormData({
      name: user.name || "",
      email: user.email || "",
      mobile: user.mobile || "",
      showPassword: user.showPassword || "",
      transactionPassword: "",
    });
    setIsModalOpen(true);
  };

  const handleSubmit = async () => {
    if (!selectedUser) return;

    const updatedData = {};

    Object.keys(formData).forEach((key) => {
      if (formData[key] !== selectedUser[key] && formData[key] !== "") {
        updatedData[key] = formData[key];
      }
    });
    try {
      const res = await editUserApi(selectedUser._id, updatedData);
      if (res?.success) {
        toast.success(res.message);
        fetchUsers();
      } else {
        toast.error(res?.message || "Failed to update user");
      }
    } catch (error) {
      console.error(error);
      toast.error(error?.message || "Something went wrong");
    }

    setIsModalOpen(false);
  };

  const columns = [
    { header: "S.No", render: (_, i) => i + 1 },
    // { header: "Name", accessor: "name" },
    { header: "User ID", accessor: "userId" },
    // { header: "Email", accessor: "email" },
    // { header: "Mobile", accessor: "mobile" },
    // { header: "Password", accessor: "showPassword" },
    // { header: "Rank", accessor: "currentRank" },
    // { header: "Package Name", accessor: "activationDetails.package.title", render: (row)=> row?.activationDetails?.package?.title || "N/A" },
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
            onClick={() => handleEdit(row)}
            className="px-3 py-1 text-xs rounded bg-blue-600 hover:bg-blue-700 text-white"
          >
            Edit
          </button>
          <button
            onClick={() => handleToggle(row)}
            disabled={loading}
            className={`px-3 py-1 text-xs rounded 
              ${
                row?.isBlock
                  ? "bg-red-600 hover:bg-red-700"
                  : "bg-green-600 hover:bg-red-700"
              } text-white disabled:opacity-50 cursor-pointer`}
          >
            {loading ? "..." : row?.isBlock ? "Blocked" : "Block"}
          </button>
        </div>
      ),
    },
  ];

  return (
    <>
      <div className="min-h-screen">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-white">All Users</h1>
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
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
          <div className="bg-[#1a1a1a] p-6 rounded-xl w-[90%] max-w-md space-y-4">
            <h2 className="text-white text-lg font-semibold">Edit User</h2>

            {/* INPUTS */}
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Name"
              className="w-full p-2 rounded bg-black text-white border border-gray-600"
            />

            <input
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              className="w-full p-2 rounded bg-black text-white border border-gray-600"
            />

            <input
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              placeholder="Mobile"
              className="w-full p-2 rounded bg-black text-white border border-gray-600"
            />

            <input
              name="showPassword"
              value={formData.showPassword}
              onChange={handleChange}
              placeholder="Password"
              className="w-full p-2 rounded bg-black text-white border border-gray-600"
            />

            <input
              name="transactionPassword"
              value={formData.transactionPassword}
              onChange={handleChange}
              placeholder="Transaction Password"
              className="w-full p-2 rounded bg-black text-white border border-gray-600"
            />

            {/* BUTTONS */}
            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-gray-600 rounded text-white"
              >
                Cancel
              </button>

              <button
                onClick={handleSubmit}
                className="px-4 py-2 bg-purple-600 rounded text-white"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AllUsers;