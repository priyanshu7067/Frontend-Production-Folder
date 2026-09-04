import React, { useState } from "react";
import { toast } from "react-toastify";
import { transferToEarnings } from "../../apis/user/users.api";
import ReusableInput from "../../components/global/ReusableInput";
import ButtonComponent from "../../components/ui/ButtonComponent";
import { useAuth } from "../../context/AuthContext";
import { formatINR } from "../../utils/helper";
import { ArrowRightLeft, Wallet } from "lucide-react";

const WalletTransfer = () => {
  const { user, refreshUser, showLoader, hideLoader } = useAuth();

  const principal = user?.wallets?.principalWallet || 0;
  const earnings = user?.wallets?.earningsWallet || 0;

  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);

  const validate = () => {
    if (!amount) {
      toast.error("Please enter transfer amount");
      return false;
    }

    const num = Number(amount);

    if (isNaN(num) || num <= 0) {
      toast.error("Please enter a valid amount");
      return false;
    }

    if (num > principal) {
      toast.error("Insufficient principal wallet balance");
      return false;
    }

    return true;
  };

  const handleTransfer = async () => {
    if (!validate()) return;

    showLoader();
    try {
      setLoading(true);
      const res = await transferToEarnings({
        amount: Number(amount),
      });

      if (res?.success) {
        toast.success("Funds transferred successfully 🚀");
        refreshUser();
        setAmount("");
      } else {
        toast.error(res?.message || "Transfer failed");
      }
    } catch (err) {
      toast.error(err.message || "Something went wrong");
    } finally {
      setLoading(false);
      hideLoader();
    }
  };

  return (
    <div className="max-w-xl mx-auto py-8">
      <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs">
        
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center font-bold">
            <ArrowRightLeft size={20} />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900">
              Transfer to Earnings Wallet
            </h2>
            <p className="text-xs text-slate-500">Internal balance allocation</p>
          </div>
        </div>

        {/* BALANCES */}
        <div className="grid grid-cols-2 gap-4 mb-6 p-4 rounded-2xl bg-slate-50 border border-slate-100">
          <div>
            <p className="text-xs font-semibold text-slate-500">Principal Wallet</p>
            <p className="text-lg font-bold text-slate-900 mt-0.5">
              {formatINR(principal)}
            </p>
          </div>

          <div>
            <p className="text-xs font-semibold text-slate-500">Earnings Wallet</p>
            <p className="text-lg font-bold text-sky-600 mt-0.5">
              {formatINR(earnings)}
            </p>
          </div>
        </div>

        {/* INPUT */}
        <div className="space-y-2">
          <ReusableInput
            label="Transfer Amount (INR)"
            type="number"
            placeholder="Enter amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />

          <div className="flex justify-end">
            <button
              onClick={() => setAmount(principal)}
              className="text-xs font-bold text-sky-600 hover:underline cursor-pointer"
            >
              Use Max Balance
            </button>
          </div>
        </div>

        {/* ACTION */}
        <div className="mt-6">
          <ButtonComponent
            variant="primary"
            fullWidth
            disabled={loading}
            onClick={handleTransfer}
          >
            {loading ? "Transferring..." : "Confirm Internal Transfer →"}
          </ButtonComponent>
        </div>

        {/* INFO */}
        <div className="mt-6 pt-4 border-t border-slate-100 text-xs text-slate-500 space-y-1">
          <p>• Internal transfers execute instantly without delay.</p>
          <p>• Zero processing fees applied for wallet conversion.</p>
        </div>

      </div>
    </div>
  );
};

export default WalletTransfer;
