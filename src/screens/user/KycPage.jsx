import React, { useState, useEffect } from "react";
import ReusableInput from "../../components/global/ReusableInput";
import { addKyc, getKyc } from "../../apis/user/users.api";
import { toast } from "react-toastify";
import { useAuth } from "../../context/AuthContext";
import ReusableImageUpload from "../../components/global/ReusableImageUpload";
import ButtonComponent from "../../components/ui/ButtonComponent";

/* ─── KYC PAGE STYLES ──────────────────────────────────────────────────────── */
const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');

  .kyc-page {
    font-family: 'Sora', sans-serif;
    position: relative;
    z-index: 1;
  }

  /* Subtle dot-grid overlay on the page background */
  .kyc-page::before {
    content: '';
    position: fixed;
    inset: 0;
    background-image:
      linear-gradient(rgba(34,211,238,0.03) 1px, transparent 1px),
      linear-gradient(90deg, rgba(34,211,238,0.03) 1px, transparent 1px);
    background-size: 40px 40px;
    pointer-events: none;
    z-index: -1;
  }

  /* ── Top bar ── */
  .kyc-top-bar {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    margin-bottom: 28px;
    flex-wrap: wrap;
    gap: 12px;
  }

  .kyc-title-group { display: flex; flex-direction: column; gap: 4px; }

  .kyc-eyebrow {
    font-family: 'JetBrains Mono', monospace;
    font-size: 10px;
    letter-spacing: 3px;
    text-transform: uppercase;
    color: #22d3ee;
    opacity: 0.8;
  }

  .kyc-page-title {
    font-size: 24px;
    font-weight: 700;
    color: #e6faff;
    letter-spacing: -0.5px;
    margin: 0;
  }

  /* ── Status badge ── */
  .kyc-status-badge {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 8px 16px;
    border-radius: 6px;
    font-size: 11px;
    font-family: 'JetBrains Mono', monospace;
    letter-spacing: 1px;
    text-transform: uppercase;
    white-space: nowrap;
    background: rgba(234,179,8,0.08);
    border: 1px solid rgba(234,179,8,0.2);
    color: #fbbf24;
  }
  .kyc-status-badge.approved {
    background: rgba(34,197,94,0.08);
    border-color: rgba(34,197,94,0.2);
    color: #4ade80;
  }
  .kyc-status-badge.rejected {
    background: rgba(239,68,68,0.08);
    border-color: rgba(239,68,68,0.2);
    color: #f87171;
  }
  .kyc-status-dot {
    width: 6px; height: 6px; border-radius: 50%;
    background: currentColor;
    box-shadow: 0 0 6px currentColor;
    animation: kyc-pulse 2s infinite;
    flex-shrink: 0;
  }
  @keyframes kyc-pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }

  /* ── Rejection banner ── */
  .kyc-rejection-banner {
    display: flex;
    align-items: flex-start;
    gap: 12px;
    padding: 14px 20px;
    border-radius: 8px;
    background: rgba(239,68,68,0.06);
    border: 1px solid rgba(239,68,68,0.2);
    border-left: 3px solid #f87171;
    margin-bottom: 20px;
  }
  .kyc-rejection-label {
    font-family: 'JetBrains Mono', monospace;
    font-size: 10px;
    letter-spacing: 2px;
    text-transform: uppercase;
    color: #f87171;
    margin-bottom: 4px;
  }
  .kyc-rejection-text {
    font-size: 13px;
    color: #fca5a5;
    line-height: 1.6;
  }

  /* ── Section card ── */
  .kyc-section-card {
    background: rgba(6, 20, 40, 0.6);
    border: 1px solid rgba(34, 211, 238, 0.12);
    border-radius: 12px;
    margin-bottom: 20px;
    overflow: hidden;
    backdrop-filter: blur(12px);
  }

  .kyc-section-header {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 14px 24px;
    border-bottom: 1px solid rgba(34, 211, 238, 0.1);
    background: rgba(34, 211, 238, 0.03);
  }

  .kyc-section-icon {
    width: 30px; height: 30px;
    border-radius: 6px;
    background: rgba(34, 211, 238, 0.1);
    border: 1px solid rgba(34, 211, 238, 0.2);
    display: flex; align-items: center; justify-content: center;
    font-size: 13px;
    flex-shrink: 0;
  }

  .kyc-section-title {
    font-size: 13px;
    font-weight: 600;
    color: #e6faff;
    letter-spacing: 0.3px;
    flex: 1;
  }

  .kyc-section-step {
    font-family: 'JetBrains Mono', monospace;
    font-size: 10px;
    color: #22d3ee;
    background: rgba(34, 211, 238, 0.08);
    border: 1px solid rgba(34, 211, 238, 0.15);
    border-radius: 4px;
    padding: 3px 8px;
    letter-spacing: 1px;
  }

  .kyc-section-body { padding: 24px; }

  /* ── Input grid ── */
  .kyc-form-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
  }

  /* ── Image upload grid ── */
  .kyc-docs-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 16px;
  }

  @media (max-width: 768px) {
    .kyc-form-grid { grid-template-columns: 1fr; }
    .kyc-docs-grid { grid-template-columns: repeat(2, 1fr); }
  }

  /* ── Security strip ── */
  .kyc-security-strip {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 10px 16px;
    border-radius: 6px;
    background: rgba(34, 211, 238, 0.04);
    border: 1px solid rgba(34, 211, 238, 0.1);
    margin-top: 16px;
  }
  .kyc-security-icon { font-size: 14px; flex-shrink: 0; }
  .kyc-security-text {
    font-size: 11px;
    color: #94a3b8;
    line-height: 1.5;
  }

  /* ── Submit area ── */
  .kyc-submit-area {
    display: flex;
    justify-content: center;
    padding-top: 4px;
  }
`;
/* ─────────────────────────────────────────────────────────────────────────── */

export default function KycPage() {
  const initialData = {
    pan: "",
    aadhaar: "",
    email: "",
    phoneNo: "",
    name: ""
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

  const isDisabled = status === "approved" || status === "pending";

  const canSubmit = !status || status === "rejected";

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // ================= FETCH KYC =================

  const fetchKyc = async () => {
    showLoader();
    try {
      const res = await getKyc();
      if (res?.success) {
        const data = res?.data;
        setKycData(data);
        setForm({
          pan: data?.pan?.number ?? "",
          aadhaar: data?.aadhaar?.number ?? "",
          email: data?.email ?? "",
          phoneNo: data?.phoneNo ?? "",
          name: data?.name ?? "",
        });
        setDocuments({
          panImage: data?.pan?.panImage ?? null,
          aadhaarFront: data?.aadhaar?.frontImage ?? null,
          aadhaarBack: data?.aadhaar?.backImage ?? null,
          memberPhoto: data?.memberPhoto ?? null,
        });
      } else {
        toast.error(res?.message || "Failed to fetch KYC");
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          error?.message ||
          "Something went wrong",
      );
    } finally {
      hideLoader();
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
      !documents.aadhaarBack ||
      !documents.memberPhoto ||
      !form.email ||
      !form.phoneNo ||
      !form.name
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
        email: form.email,
        phoneNo: form.phoneNo,
        name: form.name
      });

      if (res?.success) {
        toast.success(res?.message || "KYC submitted successfully");
        fetchKyc();
      } else {
        toast.error(res?.message || "KYC submission failed");
      }
    } catch (err) {
      toast.error(
        err?.response?.data?.message || err?.message || "Something went wrong",
      );
    } finally {
      hideLoader();
    }
  };

  return (
    <>
      {/* Inject scoped styles */}
      <style>{styles}</style>

      <div className="kyc-page fade-in">
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>

          {/* ── Rejection Banner ── */}
          {status === "rejected" && kycData?.rejectionReason && (
            <div className="kyc-rejection-banner">
              <span style={{ fontSize: 16, marginTop: 2 }}>⚠️</span>
              <div>
                <div className="kyc-rejection-label">Rejection Reason</div>
                <div className="kyc-rejection-text">{kycData.rejectionReason}</div>
              </div>
            </div>
          )}

          {/* ── Top Bar ── */}
          <div className="kyc-top-bar">
            <div className="kyc-title-group">
              <span className="kyc-eyebrow">// identity verification</span>
              <h1 className="kyc-page-title">KYC Verification</h1>
            </div>

            <span className={`kyc-status-badge ${status ?? ""}`}>
              <span className="kyc-status-dot" />
              {status ? `Status : ${status}` : "Status : Not Submitted"}
            </span>
          </div>

          {/* ── Personal Information ── */}
          <div className="kyc-section-card">
            <div className="kyc-section-header">
              <div className="kyc-section-icon">👤</div>
              <span className="kyc-section-title">Personal Information</span>
              <span className="kyc-section-step">STEP 01 / 02</span>
            </div>
            <div className="kyc-section-body">
              <div className="kyc-form-grid">
                <ReusableInput
                  label="Full Name"
                  name="name"
                  value={form.name}
                  placeholder="Enter your full name"
                  onChange={handleChange}
                  disabled={isDisabled}
                />
                <ReusableInput
                  label="Email Address"
                  name="email"
                  value={form.email}
                  placeholder="name@example.com"
                  onChange={handleChange}
                  disabled={isDisabled}
                />
                <ReusableInput
                  label="Phone Number"
                  name="phoneNo"
                  placeholder="10-digit mobile number"
                  value={form.phoneNo}
                  onChange={handleChange}
                  disabled={isDisabled}
                />
                <ReusableInput
                  label="PAN Number"
                  name="pan"
                  value={form.pan}
                  placeholder="ABCDE1234F"
                  onChange={handleChange}
                  disabled={isDisabled}
                />
                <ReusableInput
                  label="Aadhaar Number"
                  name="aadhaar"
                  placeholder="1234 5678 9012"
                  value={form.aadhaar}
                  onChange={handleChange}
                  disabled={isDisabled}
                />
              </div>
            </div>
          </div>

          {/* ── Document Upload ── */}
          <div className="kyc-section-card">
            <div className="kyc-section-header">
              <div className="kyc-section-icon">📄</div>
              <span className="kyc-section-title">Document Upload</span>
              <span className="kyc-section-step">STEP 02 / 02</span>
            </div>
            <div className="kyc-section-body">
              <div className="kyc-docs-grid">
                <ReusableImageUpload
                  value={documents.panImage}
                  title="PAN Card"
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
                  title="Profile Photo"
                  disabled={isDisabled}
                  onChange={(val) =>
                    !isDisabled &&
                    setDocuments((prev) => ({ ...prev, memberPhoto: val }))
                  }
                />
              </div>

              {/* Security note */}
              <div className="kyc-security-strip">
                <span className="kyc-security-icon">🔒</span>
                <p className="kyc-security-text">
                  All documents are encrypted end-to-end and stored on certified secure servers.
                  Your data is never shared with third parties.
                </p>
              </div>
            </div>
          </div>

          {/* ── Submit ── */}
          {canSubmit && (
            <div className="kyc-submit-area">
              <ButtonComponent onClick={handleSubmit} variant="neon">
                Submit for Verification
              </ButtonComponent>
            </div>
          )}

        </div>
      </div>
    </>
  );
}