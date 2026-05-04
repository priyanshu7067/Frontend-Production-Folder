import React, { useState } from "react";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { verifyKycApi } from "../../apis/admin/admin.api";

const KycDetailsModal = ({
  open,
  onClose,
  data,
  fetchData,
  onlyClose = true,
}) => {
  const [loading, setLoading] = useState(false);

  if (!open || !data) return null;

  const handleApprove = async () => {
    const confirm = await Swal.fire({
      title: "Approve KYC?",
      text: "Are you sure you want to approve this KYC?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#16a34a",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, Approve",
      background: "#020617",
      color: "#fff",
    });

    if (!confirm.isConfirmed) return;

    setLoading(true);
    try {
      const res = await verifyKycApi(data._id, {
        status: "approved",
      });

      if (res?.success) {
        toast.success(res?.message || "Approved successfully");
        onClose();
        fetchData();
      }
    } catch (err) {
      toast.error(err?.message || "Failed");
    } finally {
      setLoading(false);
    }
  };

  /* -------------------- REJECT -------------------- */
  const handleReject = async () => {
    const { value: reason } = await Swal.fire({
      title: "Reject KYC",
      input: "textarea",
      inputLabel: "Rejection Reason",
      inputPlaceholder: "Enter reason...",
      inputAttributes: {
        "aria-label": "Enter rejection reason",
      },
      showCancelButton: true,
      confirmButtonText: "Reject",
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#6b7280",
      background: "#020617",
      color: "#fff",
      inputValidator: (value) => {
        if (!value) {
          return "Rejection reason is required!";
        }
      },
    });

    if (!reason) return;

    setLoading(true);
    try {
      const res = await verifyKycApi(data._id, {
        status: "rejected",
        rejectionReason: reason,
      });

      if (res?.success) {
        toast.success(res?.message || "Rejected successfully");
        onClose();
        fetchData();
      }
    } catch (err) {
      toast.error(err?.message || "Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[1201] flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div className="w-full max-w-4xl sm:p-6 p-4 rounded-2xl glass overflow-y-auto max-h-[90vh]">
        {/* HEADER */}
        <h2 className="text-xl font-semibold text-gradient mb-4">
          KYC Details
        </h2>

        {data?.status === "rejected" && data?.rejectionReason && (
          <div
            className="
    mb-4 p-4 rounded-xl
    bg-red-500/10 border border-red-500/20
    backdrop-blur-md
    shadow-[0_0_15px_rgba(239,68,68,0.15)]
  "
          >
            <p className="text-sm font-semibold text-red-400 mb-1">
              KYC Rejected
            </p>
            <p className="text-xs text-red-300">{data?.rejectionReason}</p>
          </div>
        )}

        {/* USER INFO */}
        <div className="grid sm:grid-cols-2 grid-cols-1 gap-4 text-sm text-gray-300 mb-6">
          <p>
            <span className="text-[#22d3ee]">User ID:</span>{" "}
            {data?.userId?.userId}
          </p>
          <p>
            <span className="text-[#22d3ee]">Email:</span> {data?.email}
          </p>
          <p>
            <span className="text-[#22d3ee]">Name:</span> {data?.name}
          </p>
          <p>
            <span className="text-[#22d3ee]">Phone:</span> {data?.phoneNo}
          </p>
          <p>
            <span className="text-[#22d3ee]">Status:</span> {data?.status}
          </p>
        </div>

        {/* IMAGES */}
        <div className="space-y-6">
          {/* Aadhaar */}
          <div className="card col-span-2">
            <p className="text-[#22d3ee] mb-2">Aadhaar</p>
            <p className="text-sm mb-2">{data?.aadhaar?.number}</p>
            <div className="flex items-center justify-center sm:flex-row flex-col gap-3">
              <img
                onClick={() =>
                  window.open(data?.aadhaar?.frontImage?.imageUrl, "_blank")
                }
                src={data?.aadhaar?.frontImage?.imageUrl}
                className="aspect-4/3 sm:w-[48%] object-cover rounded"
              />
              <img
                onClick={() =>
                  window.open(data?.aadhaar?.backImage?.imageUrl, "_blank")
                }
                src={data?.aadhaar?.backImage?.imageUrl}
                className="aspect-4/3 sm:w-[48%] object-cover rounded"
              />
            </div>
          </div>

          <div className="flex items-center sm:flex-row flex-col gap-6">
            {/* PAN */}
            <div className="card sm:w-1/2">
              <p className="text-[#22d3ee] mb-2">PAN</p>
              <p className="text-sm mb-2">{data?.pan?.number}</p>
              <img
                onClick={() =>
                  window.open(data?.pan?.panImage?.imageUrl, "_blank")
                }
                src={data?.pan?.panImage?.imageUrl}
                className="aspect-4/3 object-cover rounded"
              />
            </div>

            {/* Member Photo */}
            <div className="flex items-center justify-center sm:w-1/2">
              <div className="card">
                <p className="text-[#22d3ee] mb-2">Member Photo</p>
                <img
                  onClick={() =>
                    window.open(data?.memberPhoto?.imageUrl, "_blank")
                  }
                  src={data?.memberPhoto?.imageUrl}
                  className="w-40 h-40 object-cover rounded"
                />
              </div>
            </div>
          </div>
        </div>

        {/* ACTIONS */}
        <div className="flex sm:justify-end justify-center gap-3 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg border border-white/10 text-gray-300 hover:bg-white/10 cursor-pointer"
          >
            Close
          </button>

          {!onlyClose && (
            <>
              <button
                onClick={handleReject}
                disabled={loading}
                className="px-4 py-2 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/30 cursor-pointer"
              >
                Reject
              </button>

              <button
                onClick={handleApprove}
                disabled={loading}
                className="px-4 py-2 rounded-lg bg-[#22d3ee]/20 text-[#22d3ee] hover:bg-[#22d3ee]/30 cursor-pointer"
              >
                Approve
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default KycDetailsModal;
