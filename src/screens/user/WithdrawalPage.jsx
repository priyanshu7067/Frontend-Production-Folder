import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { sendWithdrawalOtp, submitWithdrawalApi } from "../../apis/user/users.api";
import { useAuth } from "../../context/AuthContext";
import ButtonComponent from "../../components/ui/ButtonComponent";
import ReusableInput from "../../components/global/ReusableInput";
import { formatINR } from "../../utils/helper";
import { Wallet, ShieldCheck, HelpCircle } from "lucide-react";

const WithdrawalPage = () => {
  const { user, showLoader, hideLoader } = useAuth();
  const userInfo = user;

  const [isOtpDisabled, setIsOtpDisabled] = useState(false);
  const [otpTimer, setOtpTimer] = useState(0);

  const [formData, setFormData] = useState({
    userWalletAddress: userInfo?.walletAddress || "",
    loginPassword: "",
    amount: "",
    otp: "",
    options: "mainWallet",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAllWithdrawal = () => {
    const selectedWallet = userInfo?.wallets?.earningsWallet || 0;
    setFormData((prev) => ({ ...prev, amount: selectedWallet || "" }));
  };

  const otpHandler = async () => {
    if (userInfo?.isKycVerified === false) {
      return Swal.fire("KYC Required", "Please complete your KYC verification first.", "warning");
    }
    showLoader();
    try {
      const res = await sendWithdrawalOtp();
      if (res?.success) {
        Swal.fire("OTP Sent!", res?.message || "Verification code sent to registered mobile/email.", "success");
        setIsOtpDisabled(true);
        setOtpTimer(30);
      } else {
        Swal.fire("Failed!", res?.message, "error");
      }
    } catch (error) {
      Swal.fire("Error", error?.message || "Failed to send OTP", "error");
    } finally {
      hideLoader();
    }
  };

  const submitWithdrawal = async () => {
    if (
      !formData.userWalletAddress ||
      !formData.amount ||
      !formData.otp
    ) {
      return Swal.fire("Missing Information", "Please fill all required fields before submitting.", "warning");
    }

    if (Number(formData.amount) > (userInfo?.wallets?.earningsWallet || 0)) {
      return Swal.fire("Insufficient Balance", "Requested withdrawal exceeds available balance.", "error");
    }

    showLoader();

    const payload = {
      ...formData,
      userWalletAddress: formData.userWalletAddress.trim(),
      walletType: formData.options,
    };

    try {
      const res = await submitWithdrawalApi(payload);
      if (res?.success) {
        Swal.fire("Withdrawal Submitted!", res?.message || "Your withdrawal request has been submitted successfully.", "success");
        setFormData({
          userWalletAddress: userInfo?.walletAddress || "",
          loginPassword: "",
          amount: "",
          otp: "",
          options: "mainWallet",
        });
      } else {
        Swal.fire("Request Failed", res?.message, "error");
      }
    } catch (error) {
      Swal.fire("Error", error?.message || "Something went wrong", "error");
    } finally {
      hideLoader();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    submitWithdrawal();
  };

  useEffect(() => {
    let interval;
    if (isOtpDisabled && otpTimer > 0) {
      interval = setInterval(() => setOtpTimer((p) => p - 1), 1000);
    } else if (otpTimer === 0) {
      setIsOtpDisabled(false);
    }
    return () => clearInterval(interval);
  }, [isOtpDisabled, otpTimer]);

  return (
    <div className="space-y-6 pb-12">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Withdraw Funds</h1>
        <p className="text-xs text-slate-500 mt-1">Request instant or bank-credited INR payouts.</p>
      </div>

      <div className="grid lg:grid-cols-12 gap-6">
        {/* LEFT CARDS */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xs">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center font-bold">
                <Wallet size={20} />
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-500">Available Earnings Balance</p>
                <h2 className="text-2xl font-extrabold text-sky-600 mt-0.5">
                  {formatINR(userInfo?.wallets?.earningsWallet || 0)}
                </h2>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-medium">
              <span className="text-slate-500">Min. Withdrawal</span>
              <span className="text-slate-900 font-bold">{formatINR(1000)} (or 10 USDT)</span>
            </div>
          </div>

          <div className="bg-slate-900 text-white rounded-3xl p-6 shadow-md space-y-4">
            <div className="flex items-center gap-2 text-sky-400 font-semibold text-sm">
              <ShieldCheck size={18} /> Payout Guidelines
            </div>
            <ul className="space-y-2 text-xs text-slate-300 leading-relaxed">
              <li>• Withdrawals are processed within 3 to 24 business hours.</li>
              <li>• Ensure your bank account / payout wallet address is verified.</li>
              <li>• OTP authentication is required for every withdrawal request.</li>
            </ul>
          </div>
        </div>

        {/* RIGHT FORM */}
        <div className="lg:col-span-7">
          <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs">
            <h2 className="text-lg font-bold text-slate-900 mb-5">
              Submit Withdrawal Request
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <ReusableInput
                  label="Registered Wallet / Account Address"
                  name="userWalletAddress"
                  value={formData.userWalletAddress}
                  onChange={handleChange}
                  disabled
                />
              </div>

              <div className="flex gap-2 items-start">
                <div className="flex-1">
                  <ReusableInput
                    label="Withdrawal Amount (INR)"
                    name="amount"
                    type="number"
                    placeholder="Enter amount"
                    value={formData.amount}
                    onChange={handleChange}
                  />
                </div>

                <div className="pt-0.5">
                  <ButtonComponent variant="outline" onClick={handleAllWithdrawal}>
                    Max Balance
                  </ButtonComponent>
                </div>
              </div>

              <div className="flex gap-2 items-start">
                <div className="flex-1">
                  <ReusableInput
                    label="Verification OTP"
                    type="number"
                    name="otp"
                    placeholder="Enter 6-digit OTP"
                    value={formData.otp}
                    onChange={handleChange}
                  />
                </div>

                <div className="pt-0.5">
                  <ButtonComponent
                    onClick={otpHandler}
                    variant="secondary"
                    disabled={isOtpDisabled}
                  >
                    {isOtpDisabled ? `${otpTimer}s` : "Get OTP"}
                  </ButtonComponent>
                </div>
              </div>

              <div className="pt-4 flex gap-3">
                <ButtonComponent variant="primary" fullWidth type="submit">
                  Confirm Withdrawal →
                </ButtonComponent>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WithdrawalPage;