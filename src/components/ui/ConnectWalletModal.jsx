import { useState } from "react";
import { connectWallet } from "../../utils/walletService";
import { toast } from "react-toastify";
import safePalImg from "../../assets/safepal.png";
import tokenPocket from "../../assets/token-pocket.png";
import bitgetWallet from "../../assets/bitget-wallet.jpg";

const ConnectWalletModal = ({ open, onClose, onConnect }) => {
  const [loading, setLoading] = useState(false);

  if (!open) return null;

  const handleConnect = async () => {
    try {
      setLoading(true);
      const address = await connectWallet();
      onConnect(address);
      onClose();
      toast.success("Wallet connected ✅");
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

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

  return (
    <div className="fixed inset-0 z-[1300] flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4">
      <div className="w-full max-w-md p-6 bg-white border border-slate-200 rounded-3xl shadow-2xl relative">
        <h2 className="text-xl font-bold text-slate-900 text-center mb-1">
          Select Wallet
        </h2>
        <p className="text-xs text-slate-500 text-center mb-6">
          Connect to process deposit or transaction signature
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
                Select →
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

export default ConnectWalletModal;