import React, { useState } from "react";
import { toast } from "react-toastify";
import { transferToEarnings } from "../../apis/user/users.api";
import ReusableInput from "../../components/global/ReusableInput";
import ButtonComponent from "../../components/ui/ButtonComponent";
import { useAuth } from "../../context/AuthContext";

const WalletTransfer = () => {
  const { user, refreshUser, showLoader, hideLoader } = useAuth();

  const principal = user?.wallets?.principalWallet || 0;
  const earnings = user?.wallets?.earningsWallet || 0;

  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);

  // 🔥 VALIDATION
  const validate = () => {
    if (!amount) {
      toast.error("Enter amount");
      return false;
    }

    const num = Number(amount);

    if (isNaN(num) || num <= 0) {
      toast.error("Invalid amount");
      return false;
    }

    if (num < 1) {
      toast.error("Minimum transfer is 1");
      return false;
    }

    if (num > principal) {
      toast.error("Insufficient principal balance");
      return false;
    }

    return true;
  };

  // 🔥 HANDLE TRANSFER
  const handleTransfer = async () => {
    if (!validate()) return;

    showLoader();

    try {
      setLoading(true);

      const res = await transferToEarnings({
        amount: Number(amount),
      });

      if (res?.success) {
        toast.success("Transfer successful 🚀");
        refreshUser();
        setAmount("");
      } else {
        toast.error(res?.message || "Transfer failed");
      }
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
      hideLoader();
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10">
      <div
        className="
        bg-[rgba(2,6,23,0.7)]
        border border-[#22d3ee]/20
        rounded-xl p-6
        shadow-[0_0_20px_rgba(34,211,238,0.1)]
      "
      >
        {/* TITLE */}
        <h2 className="text-xl font-semibold text-[#22d3ee] mb-6">
          Transfer to Earnings Wallet
        </h2>

        {/* BALANCES */}
        <div className="flex justify-between mb-6 text-sm">
          <div>
            <p className="text-gray-400">Principal Wallet</p>
            <p className="text-white font-semibold">
              {principal.toFixed(2)} USDT
            </p>
          </div>

          <div>
            <p className="text-gray-400">Earnings Wallet</p>
            <p className="text-[#22d3ee] font-semibold">
              {earnings.toFixed(2)} USDT
            </p>
          </div>
        </div>

        {/* INPUT */}
        <ReusableInput
          label="Enter Amount"
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        {/* QUICK BUTTON */}
        <button
          onClick={() => setAmount(principal)}
          className="
            text-xs mt-2 text-[#22d3ee]
            hover:underline cursor-pointer
          "
        >
          Use full balance
        </button>

        {/* ACTION */}
        <div className="mt-6">
          <ButtonComponent variant="neon" fullWidth onClick={handleTransfer}>
            {loading ? "Processing..." : "Transfer"}
          </ButtonComponent>
        </div>

        {/* INFO */}
        <div className="mt-4 text-xs text-gray-400 space-y-1">
          <p>• Transfer is instant</p>
          <p>• Minimum transfer: 1 USDT</p>
          <p>• No fees applied</p>
        </div>
      </div>
    </div>
  );
};

export default WalletTransfer;
