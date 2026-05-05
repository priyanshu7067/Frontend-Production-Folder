import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { connectAndSendUSDT } from "../../utils/walletService";
import { topupApi } from "../../apis/user/users.api";
import { getConnectedWallet } from "../../utils/walletService";
import ConnectWalletModal from "./ConnectWalletModal";
import { useAuth } from "../../context/AuthContext";

const TopUpModal = ({ open, onClose }) => {
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [walletAddress, setWalletAddress] = useState(null);
  const [openWalletModal, setOpenWalletModal] = useState(false);
  const { refreshUser, showLoader, hideLoader } = useAuth();

  if (!open) return null;

  // 🔥 Check if already connected
  useEffect(() => {
    const checkWallet = async () => {
      const address = await getConnectedWallet();
      if (address) {
        setWalletAddress(address);
      }
    };
    checkWallet();
  }, []);

  // 🔥 HANDLE CONNECT
  const handleConnect = async () => {
    if (walletAddress) return;
    setOpenWalletModal(true);
  };

  // 🔥 HANDLE PAYMENT
  const handleTopUp = async () => {
    showLoader();
    try {
      if (!amount || Number(amount) < 50) {
        toast.error("Minimum 50 USDT required");
        return;
      }

      if (!walletAddress) {
        toast.error("Connect wallet first");
        return;
      }

      setLoading(true);

      const result = await connectAndSendUSDT(amount);

      const res = await topupApi({
        walletAddress: result.walletAddress,
        transactionHash: result.transactionHash,
        amount: result.amount,
      });

      if (res?.success) {
        toast.success(res?.message || "Top up successful 🚀");
        refreshUser();
    } else {
        toast.error(res?.message);
    }
    onClose();
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
      hideLoader();
    }
  };

  return (
    <>
      <div className="fixed inset-0 z-[1201] flex items-center justify-center bg-black/70">
        <div className="glass p-6 rounded-xl w-full max-w-sm">

          <h2 className="text-gradient text-lg mb-4">Top Up Balance</h2>

          <input
            type="number"
            placeholder="Enter amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            min={50}
            className="w-full p-3 rounded-lg bg-black/40 border border-white/10 text-white"
          />

          {/* 🔥 CONNECT WALLET */}
          {!walletAddress ? (
            <button
              onClick={handleConnect}
              className="w-full mt-4 bg-yellow-400 text-black py-2 rounded-lg cursor-pointer"
            >
              Connect Wallet
            </button>
          ) : (
            <>
              <p className="text-green-400 text-sm mt-2">
                Wallet Connected: {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
              </p>

              <button
                onClick={handleTopUp}
                className="w-full mt-4 bg-[#22d3ee] text-black py-2 rounded-lg cursor-pointer"
              >
                {loading ? "Processing..." : "Confirm & Pay"}
              </button>
            </>
          )}

          <button
            onClick={onClose}
            className="w-full mt-4 bg-gray-300 text-black py-2 rounded-lg cursor-pointer"
          >
            Cancel
          </button>
        </div>
      </div>

      {/* 🔥 WALLET MODAL */}
      <ConnectWalletModal
        open={openWalletModal}
        onClose={() => setOpenWalletModal(false)}
        onConnect={(address) => setWalletAddress(address)}
      />
    </>
  );
};

export default TopUpModal;