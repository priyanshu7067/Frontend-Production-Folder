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
      // debugger
      let res;

      // ✅ REGISTER
      if (type === "register") {
        res = await UserRegister({
            walletAddress: address?.address,
          // walletAddress: "0x567ced645a5b17baA7CCdC6e74F419aC2F12caFf",
          sponsor,
        });
      }
      // ✅ LOGIN
      else {
        res = await userLogin({
          // walletAddress: address?.address,
          walletAddress: "0x567ced645a5b17baA7CCdC6e74F419aC2F12caFf",
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
          },
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
    <div className="fixed inset-0 z-[99] flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div className="w-full max-w-md p-6 rounded-2xl glass relative">
        {/* HEADER */}
        <h2 className="text-xl font-semibold text-gradient text-center mb-6">
          Connect Wallet
        </h2>

        {/* WALLET OPTIONS */}
        <div className="space-y-4">
          {wallets.map((wallet) => (
            <button
              key={wallet.name}
              onClick={handleConnect}
              disabled={loading}
              className="
                w-full flex items-center gap-4 p-3 rounded-xl
                border border-[#22d3ee]/20 bg-[#22d3ee]/5
                hover:bg-[#22d3ee]/10
                transition-all
              "
            >
              <img src={wallet.icon} alt={wallet.name} className="w-6 h-6 rounded-full" />
              <span className="text-white text-sm">{wallet.name}</span>
            </button>
          ))}
        </div>

        {/* CLOSE */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-white"
        >
          ✕
        </button>
      </div>
    </div>
  );
};

export default WalletModal;
