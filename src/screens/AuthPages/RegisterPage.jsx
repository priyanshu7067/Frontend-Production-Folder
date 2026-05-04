import React, { useEffect, useState } from "react";
import InputField from "../../components/ui/InputField";
import ButtonComponent from "../../components/ui/ButtonComponent";
import { AuthRoutes } from "../../constants/routes";
import { getUserInfo } from "../../apis/user/users.api";
import { Link, useLocation } from "react-router-dom";
import WalletModal from "../../components/ui/WalletModal";

const RegisterPage = () => {
  const [form, setForm] = useState({
    sponsor: "",
  });
  const [userInfo, setUserInfo] = useState(null);

  const [openWalletModal, setOpenWalletModal] = useState(false);
  const [isReferral, setIsReferral] = useState(false);

  const location = useLocation();

  const fetchSponsorInfo = async (id) => {
    try {
      setUserInfo(null);

      const res = await getUserInfo(id);

      // adjust based on your API
      const data = res?.data;

      setUserInfo(data);
    } catch (err) {
      console.error("Sponsor fetch error:", err);
      setUserInfo("error");
    }
  };
  // 🔥 REFERRAL AUTO FILL
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const ref = params.get("ref");

    if (ref) {
      setForm((prev) => ({
        ...prev,
        sponsor: ref,
      }));

      setIsReferral(true);

      // 🔥 CALL API
      fetchSponsorInfo(ref);
    }
  }, [location.search]);


  const handleConnectClick = () => {
    setOpenWalletModal(true);
  };

  return (
    <div className="min-h-screen dashboard-bg flex items-center justify-center px-4">
      <div className="w-full max-w-6xl flex justify-center items-center">

        {/* 🔥 FORM CARD */}
        <div className="glow-card p-6 md:p-8 w-full max-w-md mx-auto relative overflow-hidden">

          {/* background gradient */}
          <div className="absolute inset-0 opacity-10 bg-gradient-to-br from-[#b76e79] to-[#7f9ca8]" />

          <div className="relative z-10 space-y-6">

            {/* HEADER */}
            <div className="text-center">
              <h2 className="text-xl font-semibold text-white">
                Create Account
              </h2>
              <p className="text-xs text-gray-400">
                Start your AI journey
              </p>
            </div>

            {/* 🔥 FORM */}
            <div className="space-y-4">

              {/* 🔥 SPONSOR FIELD */}
              <div className="space-y-2">

                <div className="relative">
                  <InputField
                    label="Sponsor wallet address"
                    value={form.sponsor}
                    onChange={(e) =>
                      setForm({ ...form, sponsor: e.target.value })
                    }
                    disabled={isReferral}
                  />

                  {/* 🔒 LOCK OVERLAY */}
                  {isReferral && (
                    <div className="absolute inset-0 rounded-lg bg-black/20 cursor-not-allowed" />
                  )}
                </div>

                {/* 🔥 REFERRAL TAG UI */}
                {isReferral && (
                  <div className="
                    relative overflow-hidden
                    flex items-center justify-between
                    text-[11px] px-3 py-2
                    rounded-lg
                    bg-gradient-to-r from-green-500/10 to-emerald-500/10
                    border border-green-500/20
                    text-green-400
                  ">
                    <span className="flex items-center gap-1">
                      🔗 Referral Applied
                    </span>

                    <span className="text-[10px] bg-green-500/20 px-2 py-0.5 rounded">
                      LOCKED
                    </span>

                    {/* glow animation */}
                    <div className="absolute inset-0 opacity-30 bg-gradient-to-r from-transparent via-green-400/30 to-transparent animate-pulse" />
                  </div>
                )}

                {/* 🔥 SPONSOR INFO UI */}

                {form.sponsor && (
                  <div className="space-y-2">

                    {/* ⏳ LOADING */}
                    {userInfo === null && (
                      <div className="text-xs text-gray-400 animate-pulse">
                        Checking sponsor...
                      </div>
                    )}

                    {/* ❌ ERROR */}
                    {userInfo === "error" && (
                      <div className="text-xs text-red-400 bg-red-500/10 p-2 rounded">
                        Invalid Sponsor ID ❌
                      </div>
                    )}

                    {/* ✅ SUCCESS */}
                    {userInfo && userInfo !== "error" && (
                      <div className="
        relative overflow-hidden
        p-3 rounded-xl
        bg-gradient-to-r from-blue-500/10 to-purple-500/10
        border border-blue-500/20
        text-xs
      ">

                    
                          <div className="flex items-center gap-2">

                            {/* 🟢 status dot */}
                            <span className="relative flex h-2 w-2">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                            </span>

                            {/* 🔥 badge */}
                            <span className="
    text-[11px] font-semibold
    px-2 py-0.5 rounded-full
    bg-green-500/10 text-green-400
    border border-green-500/20
    backdrop-blur
  ">
                              Verified User
                            </span>
                        </div>

                        {/* glow line */}
                        <div className="absolute inset-0 opacity-20 bg-gradient-to-r from-transparent via-blue-400/30 to-transparent animate-pulse" />
                      </div>
                    )}

                  </div>
                )}

              </div>

            </div>

            {/* BUTTON */}
            <ButtonComponent
              variant="neon"
              fullWidth
              onClick={handleConnectClick}
            >
              Connect Wallet →
            </ButtonComponent>

            {/* FOOTER */}
            <p className="text-center text-sm text-gray-400">
              Already have an account?{" "}
              <Link to={AuthRoutes.LOGIN}>
                <span className="text-[var(--accent-primary)] cursor-pointer">
                  Login
                </span>
              </Link>
            </p>

          </div>
        </div>
      </div>

      {/* 🔥 WALLET MODAL */}
      <WalletModal
        open={openWalletModal}
        onClose={() => setOpenWalletModal(false)}
        sponsor={form.sponsor}
        type="register"
      />
    </div>
  );
};

export default RegisterPage;