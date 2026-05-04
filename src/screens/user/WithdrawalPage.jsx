import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { sendWithdrawalOtp, submitWithdrawalApi } from "../../apis/user/users.api";
import { useAuth } from "../../context/AuthContext";
import ButtonComponent from "../../components/ui/ButtonComponent";
import ReusableInput from "../../components/global/ReusableInput";
import { form } from "framer-motion/client";

const WithdrawalPage = () => {
  const { user, showLoader, hideLoader } = useAuth();
  const userInfo = user;

  const [isOtpDisabled, setIsOtpDisabled] = useState(false);
  const [otpTimer, setOtpTimer] = useState(0);

  const [formData, setFormData] = useState({
    userWalletAddress: userInfo?.walletAddress,
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
    if(userInfo?.isKycVerified === false) {
      return Swal.fire("Error", "KYC not verified! Please verify KYC first", "error");
    }
    showLoader();
    try {
      const res = await sendWithdrawalOtp();
      if (res?.success) {
        Swal.fire("OTP Sent!", res?.message, "success");
        setIsOtpDisabled(true);
        setOtpTimer(30);
      } else {
        Swal.fire("Failed!", res?.message, "error");
      }
    } catch(error) {
      Swal.fire("Error", error?.message || "API failed", "error");
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
      return Swal.fire("Error", "Please fill all required fields", "error");
    }

    if(formData.amount > userInfo?.wallets?.earningsWallet) {
      return Swal.fire("Error", "Insufficient balance", "error");
    }

    // if(formData.amount < 10) {
    //   return Swal.fire("Error", "Minimum withdrawal amount is 10", "error");
    // }

    if(formData.userWalletAddress !== userInfo?.walletAddress) {
      return Swal.fire("Error", "Invalid wallet address", "error");
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
        Swal.fire("Success!", res?.message, "success");

        setFormData({
          userWalletAddress: userInfo?.walletAddress,
          loginPassword: "",
          amount: "",
          otp: "",
          options: "mainWallet",
        });
      } else {
        Swal.fire("Failed!", res?.message, "error");
      }
    } catch(error) {
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
    <div className="flex flex-col lg:flex-row gap-6">

      {/* LEFT CARD */}
      <div className="flex-1">
        <div className="bg-[rgba(2,6,23,0.7)] border border-[#22d3ee]/20 rounded-xl p-5 shadow-lg">
          <div className="flex justify-between mb-4">
            <p className="text-white font-semibold">Available Balance</p>
            <span className="text-[#22d3ee] font-bold">
              {userInfo?.wallets?.earningsWallet?.toFixed(2)}
            </span>
          </div>

          <div className="flex justify-between">
            <p className="text-white font-semibold">Minimum Withdrawal</p>
            <span className="text-[#22d3ee] font-bold">10 USDT</span>
          </div>
        </div>
      </div>

      {/* RIGHT FORM */}
      <div className="w-full lg:w-[420px]">
        <div className="bg-[rgba(2,6,23,0.7)] border border-[#22d3ee]/20 rounded-xl p-6">

          <h2 className="text-xl font-semibold text-[#22d3ee] mb-4">
            Withdraw
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">

            <ReusableInput
              label="Wallet Address"
              name="userWalletAddress"
              value={formData.userWalletAddress}
              onChange={handleChange}
              sx={{mb:2}}
              disabled
            />

            {/* Amount */}
            <div className="flex gap-2">
              <ReusableInput
                label="Amount"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
              />

              <ButtonComponent variant="neon" onClick={handleAllWithdrawal}>
                All
              </ButtonComponent>
            </div>

            {/* Wallet select */}
            {/* <select
              name="options"
              value={formData.options}
              onChange={handleChange}
              className="
                w-full px-4 py-2 rounded-lg
                bg-[rgba(255,255,255,0.03)]
                border border-white/10
                text-white
                focus:outline-none focus:border-[#22d3ee]
              "
            >
              <option value="mainWallet">Main Wallet</option>
            </select> */}

            {/* <ReusableInput
              label="Login Password"
              type="password"
              name="loginPassword"
              value={formData.loginPassword}
              onChange={handleChange}
              sx={{mb:2}}
            /> */}

            {/* OTP */}
            <div className="flex gap-2">
              <ReusableInput
                label="OTP"
                name="otp"
                value={formData.otp}
                onChange={handleChange}
              />

              <ButtonComponent
                onClick={otpHandler}
                variant="neon"
                wrap
              >
                {isOtpDisabled ? `${otpTimer}s` : "GET OTP"}
              </ButtonComponent>
            </div>

            {/* Buttons */}
            <div className="flex gap-2">
              <ButtonComponent variant="outline" fullWidth>
                Cancel
              </ButtonComponent>

              <ButtonComponent variant="neon" fullWidth type="submit">
                Withdraw
              </ButtonComponent>
            </div>
          </form>

          {/* NOTES */}
          <div className="mt-4 text-sm text-gray-300 space-y-2">
            <p>• Withdrawal processed within 3–96 hours</p>
            <p>• Next withdrawal after previous is completed</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WithdrawalPage;