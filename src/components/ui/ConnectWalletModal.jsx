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

      onConnect(address); // 🔥 pass back
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
    <div className="fixed inset-0 z-[99] flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div className="w-full max-w-md p-6 rounded-2xl glass relative">

        <h2 className="text-xl font-semibold text-gradient text-center mb-6">
          Connect Wallet
        </h2>

        <div className="space-y-4">
          {wallets.map((wallet) => (
            <button
              key={wallet.name}
              onClick={handleConnect}
              disabled={loading}
              className="w-full flex items-center gap-4 p-3 rounded-xl
              border border-[#22d3ee]/20 bg-[#22d3ee]/5
              hover:bg-[#22d3ee]/10"
            >
              <img src={wallet.icon} className="w-6 h-6 rounded-full" />
              <span className="text-white text-sm">{wallet.name}</span>
            </button>
          ))}
        </div>

        <button onClick={onClose} className="absolute top-3 right-3">
          ✕
        </button>
      </div>
    </div>
  );
};

export default ConnectWalletModal;