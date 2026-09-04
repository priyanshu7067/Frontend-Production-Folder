import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { connectAndSendUSDT, getConnectedWallet } from "../../utils/walletService";
import { topupApi } from "../../apis/user/users.api";
import ConnectWalletModal from "./ConnectWalletModal";
import { useAuth } from "../../context/AuthContext";
import ButtonComponent from "./ButtonComponent";
import { ShieldCheck, Wallet, ArrowRight } from "lucide-react";

const TopUpModal = ({ open, onClose }) => {
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [walletAddress, setWalletAddress] = useState(null);
  const [openWalletModal, setOpenWalletModal] = useState(false);
  const { refreshUser, showLoader, hideLoader } = useAuth();

  if (!open) return null;

  useEffect(() => {
    const checkWallet = async () => {
      const address = await getConnectedWallet();
      if (address) {
        setWalletAddress(address);
      }
    };
    checkWallet();
  }, []);

  const handleConnect = async () => {
    if (walletAddress) return;
    setOpenWalletModal(true);
  };

  const handleTopUp = async () => {
    showLoader();
    try {
      if (!amount || Number(amount) < 50) {
        toast.error("Minimum 50 USDT deposit required");
        return;
      }

      if (!walletAddress) {
        toast.error("Please connect your wallet first");
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
        toast.error(res?.message || "Deposit processing error");
      }
      onClose();
    } catch (err) {
      toast.error(err.message || "Transaction failed");
    } finally {
      setLoading(false);
      hideLoader();
    }
  };

  return (
    <>
      <div className="fixed inset-0 z-[1201] flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4">
        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 w-full max-w-md shadow-2xl relative">
          
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center font-bold">
              <Wallet size={20} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900">Deposit / Top Up</h2>
              <p className="text-xs text-slate-500">BEP-20 Payment Network</p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">
                Deposit Amount (USDT / BEP-20)
              </label>
              <input
                type="number"
                placeholder="Minimum 50 USDT"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                min={50}
                className="w-full p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none font-medium"
              />
            </div>

            {!walletAddress ? (
              <ButtonComponent
                variant="outline"
                fullWidth
                onClick={handleConnect}
              >
                Connect Wallet (BEP-20)
              </ButtonComponent>
            ) : (
              <div className="space-y-3">
                <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center justify-between text-xs text-emerald-800 font-medium">
                  <span className="flex items-center gap-1.5">
                    <ShieldCheck size={16} className="text-emerald-600" /> Connected Wallet:
                  </span>
                  <span className="font-mono">{walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}</span>
                </div>

                <ButtonComponent
                  variant="primary"
                  fullWidth
                  disabled={loading}
                  onClick={handleTopUp}
                >
                  {loading ? "Processing Deposit..." : "Confirm & Pay USDT →"}
                </ButtonComponent>
              </div>
            )}

            <ButtonComponent
              variant="secondary"
              fullWidth
              onClick={onClose}
            >
              Cancel
            </ButtonComponent>
          </div>

          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 text-sm font-bold"
          >
            ✕
          </button>
        </div>
      </div>

      <ConnectWalletModal
        open={openWalletModal}
        onClose={() => setOpenWalletModal(false)}
        onConnect={(address) => setWalletAddress(address)}
      />
    </>
  );
};

export default TopUpModal;