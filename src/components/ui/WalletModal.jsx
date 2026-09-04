import React, { useState } from "react";
import { toast } from "react-toastify";
import { connectAndSign } from "../../utils/walletService";
import { userLogin, UserRegister } from "../../apis/user/users.api";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { UserRoutes } from "../../constants/routes";
import safePalImg from "../../assets/safepal.png";
import tokenPocket from "../../assets/token-pocket.png";
import bitgetWallet from "../../assets/bitget-wallet.jpg";

const wallets = [
  {
    name: "MetaMask",
    icon: "https://img.icons8.com/color/96/metamask-logo.png",
  },
  {
    name: "Trust Wallet",
    icon: "https://trustwallet.com/assets/images/media/assets/TWT.png",
  },
  {
    name: "SafePal",
    icon: safePalImg,
  },
  {
    name: "Token Pocket",
    icon: tokenPocket,
  },
  {
    name: "Bitget Wallet",
    icon: bitgetWallet,
  }
];

const WalletModal = ({ open, onClose, sponsor, type = "login" }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  if (!open) return null;

  const handleConnect = async () => {
    try {
      setLoading(true);
      const address = await connectAndSign();

      if (!address?.address) {
        throw new Error("Failed to connect wallet. Please try again.");
      }

      let res;
      if (type === "register") {
        res = await UserRegister({
          walletAddress: address?.address,
          sponsor,
        });
      } else {
        res = await userLogin({
          walletAddress: address?.address,
        });
      }

      if (res?.success) {
        login(res?.data?.token, res?.data?.user);
        onClose();
        toast.success(
          type === "register"
            ? "Registration successful 🚀"
            : "Login successful 🚀",
          {
            onClose: () => {
              navigate(UserRoutes.DASHBOARD);
            },
          }
        );
      } else {
        toast.error(res?.message || "Something went wrong");
      }
    } catch (err) {
      toast.error(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[99] flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4">
      <div className="w-full max-w-md p-6 bg-white border border-slate-200 rounded-3xl shadow-2xl relative">
        <h2 className="text-xl font-bold text-slate-900 text-center mb-1">
          Connect Web3 Wallet
        </h2>
        <p className="text-xs text-slate-500 text-center mb-6">
          Supported BEP-20 / EVM Wallets
        </p>

        <div className="space-y-3">
          {wallets.map((wallet) => (
            <button
              key={wallet.name}
              onClick={handleConnect}
              disabled={loading}
              className="w-full flex items-center justify-between p-3.5 rounded-2xl border border-slate-200 bg-slate-50/70 hover:bg-sky-50 hover:border-sky-300 transition-all cursor-pointer group"
            >
              <div className="flex items-center gap-3.5">
                <img src={wallet.icon} alt={wallet.name} className="w-7 h-7 rounded-full object-contain" />
                <span className="text-slate-900 font-semibold text-sm group-hover:text-sky-600 transition-colors">
                  {wallet.name}
                </span>
              </div>
              <span className="text-xs text-slate-400 font-medium group-hover:text-sky-600 transition-colors">
                Connect →
              </span>
            </button>
          ))}
        </div>

        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 text-sm font-bold"
        >
          ✕
        </button>
      </div>
    </div>
  );
};

export default WalletModal;
