import React, { useState, useEffect } from "react";
import ReusableInput from "../../components/global/ReusableInput";
import { addKyc, getKyc } from "../../apis/user/users.api";
import { toast } from "react-toastify";
import { useAuth } from "../../context/AuthContext";
import ReusableImageUpload from "../../components/global/ReusableImageUpload";
import ButtonComponent from "../../components/ui/ButtonComponent";

export default function KycPage() {

  const initialData = {
    pan: "",
    aadhaar: "",
    email: "",
    phoneNo: ""
  };
  const { showLoader, hideLoader } = useAuth();
  const [form, setForm] = useState(initialData);
  const [documents, setDocuments] = useState({
    panImage: null,
    aadhaarFront: null,
    aadhaarBack: null,
    memberPhoto: null,
  });

  const [kycData, setKycData] = useState(null);

  // ================= HANDLE CHANGE =================

  const status = kycData?.status?.toLowerCase();

  const isDisabled =
    status === "approved" || status === "pending";

  const canSubmit = !status || status === "rejected";

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // ================= FETCH KYC =================

  const fetchKyc = async () => {
    try {
      const res = await getKyc();
      if (res?.success) {
        const data = res?.data;
        setKycData(data);
        // ✅ FORM SET
        setForm({
          pan: data?.pan?.number ?? "",
          aadhaar: data?.aadhaar?.number ?? "",
          email: data?.email ?? "",
          phoneNo: data?.phoneNo ?? "",
        });

        // ✅ DOCUMENTS SET

        setDocuments({
          panImage: data?.pan?.panImage ?? null,
          aadhaarFront: data?.aadhaar?.frontImage ?? null,
          aadhaarBack: data?.aadhaar?.backImage ?? null,
          // memberPhoto: data?.memberPhoto ?? null,
        });

      } else {
        toast.error(res?.message || "Failed to fetch KYC");
      }

    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
        error?.message ||
        "Something went wrong"
      );
    }
  };

  useEffect(() => {
    fetchKyc();
  }, []);

  // ================= SUBMIT =================

  const handleSubmit = async () => {

    if (
      !form.pan ||
      !form.aadhaar ||
      !documents.panImage ||
      !documents.aadhaarFront ||
      !documents.aadhaarBack
    ) {
      return toast.error("Please fill all required fields");
    }
    try {
      showLoader();
      const res = await addKyc({
        aadhaar: {
          number: form.aadhaar,
          frontImage: documents.aadhaarFront,
          backImage: documents.aadhaarBack,
        },
        pan: {
          number: form.pan.toUpperCase(),
          panImage: documents.panImage,
        },
        memberPhoto: documents.memberPhoto,
      });

      if (res?.success) {
        toast.success(res?.message || "KYC submitted successfully");
        fetchKyc(); // 🔥 refresh data
      } else {
        toast.error(res?.message || "KYC submission failed");
      }

    } catch (err) {
      toast.error(
        err?.response?.data?.message ||
        err?.message ||
        "Something went wrong"
      );
    }
    finally {
      hideLoader();
    }
  };

  return (
    <div className="fade-in">
      <div className="max-w-6xl mx-auto space-y-6">

        {/* HEADER */}
        {status === "rejected" && kycData?.rejectionReason && (
          <div className="glass-card p-4 border border-red-500/30">
            <p className="text-red-400 text-sm">
              Reason: {kycData?.rejectionReason}
            </p>
          </div>
        )}

        <div className="flex justify-between">
          <h1 className="text-2xl font-bold text-white">
            KYC Verification
          </h1>

          <span
            className={`px-3 py-1 rounded text-sm capitalize
                         ${status === "approved"
                ? "bg-green-500/20 text-green-400"
                : status === "rejected"
                  ? "bg-red-500/20 text-red-400"
                  : "bg-yellow-500/20 text-yellow-400"
              }
                `}
          >
            <span className="text-gray-400">Your KYC status is</span> :  {status || "not submitted"}
          </span>
        </div>

        {/* FORM */}

        <div className="premium-card">
          <div className="premium-card-inner grid md:grid-cols-2 gap-4">

            <ReusableInput
              label="PAN"
              name="pan"
              value={form.pan}
              placeholder="ABCD1234E"
              onChange={handleChange}
              disabled={isDisabled}
            />

            <ReusableInput
              label="Aadhaar"
              name="aadhaar"
              placeholder="123412341234"
              value={form.aadhaar}
              onChange={handleChange}
              disabled={isDisabled}
            />

            <ReusableInput
              label="Email"
              name="email"
              value={form.email}
              placeholder="oqB0x@example.com"
              onChange={handleChange}
              disabled={isDisabled}
            />

            <ReusableInput
              label="Phone Number"
              name="phoneNo"
              placeholder="1234567890"
              value={form.phoneNo}
              onChange={handleChange}
              disabled={isDisabled}
            />
          </div>
        </div>

        {/* DOCUMENTS */}

        <div className="premium-card">
          <div className="premium-card-inner grid grid-cols-2 md:grid-cols-3 gap-5">

            <ReusableImageUpload
              value={documents.panImage}
              title="PAN"
              disabled={isDisabled}
              onChange={(val) =>
                !isDisabled &&
                setDocuments((prev) => ({ ...prev, panImage: val }))
              }
            />

            <ReusableImageUpload
              value={documents.aadhaarFront}
              title="Aadhaar Front"
              disabled={isDisabled}
              onChange={(val) =>
                !isDisabled &&
                setDocuments((prev) => ({ ...prev, aadhaarFront: val }))
              }
            />

            <ReusableImageUpload
              value={documents.aadhaarBack}
              title="Aadhaar Back"
              disabled={isDisabled}
              onChange={(val) =>
                !isDisabled &&
                setDocuments((prev) => ({ ...prev, aadhaarBack: val }))
              }
            />

            <ReusableImageUpload
              value={documents.memberPhoto}
              title="Profile"
              disabled={isDisabled}
              onChange={(val) =>
                !isDisabled &&
                setDocuments((prev) => ({ ...prev, memberPhoto: val }))
              }

            />

          </div>
        </div>

        {/* SUBMIT */}

        {canSubmit && (
          <div className="text-center">
            <ButtonComponent
              onClick={handleSubmit}
              variant="neon"
              // className="btn-primary px-10 py-3"
            >
              Submit KYC
            </ButtonComponent>
          </div>
        )}

      </div>
    </div>
  );
}