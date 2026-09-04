import React, { useState } from "react";
import InputField from "../../components/ui/InputField";
import ButtonComponent from "../../components/ui/ButtonComponent";
import { Link, useNavigate } from "react-router-dom";
import { AuthRoutes, UserRoutes } from "../../constants/routes";
import { TrendingUp, ShieldCheck, Cpu } from "lucide-react";
import WalletModal from "../../components/ui/WalletModal";
import { userLogin } from "../../apis/user/users.api";
import { useAuth } from "../../context/AuthContext";
import { toast } from "react-toastify";

const LoginPage = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [openWalletModal, setOpenWalletModal] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const validate = () => {
    const newErrors = {};
    if (!form.email.trim()) newErrors.email = "Email Address is required";
    if (!form.password) newErrors.password = "Password is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      const res = await userLogin({
        email: form.email,
        password: form.password,
        walletAddress: form.email,
      });

      if (res?.success) {
        login(res?.data?.token, res?.data?.user);
        toast.success("Welcome back! Login successful 🚀");
        navigate(UserRoutes.DASHBOARD);
      } else {
        setOpenWalletModal(true);
      }
    } catch (err) {
      setOpenWalletModal(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 md:p-8">
      <div className="w-full max-w-5xl bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden grid lg:grid-cols-12">
        
        {/* LEFT SIDE: LIGHT BRAND / INFO */}
        <div className="lg:col-span-5 bg-sky-50/80 border-r border-slate-200 p-8 lg:p-12 text-slate-900 flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-sky-200/30 rounded-full blur-3xl pointer-events-none" />

          <div>
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-xl bg-sky-600 flex items-center justify-center font-bold text-lg text-white shadow-md shadow-sky-600/20">
                ₹
              </div>
              <span className="text-xl font-bold tracking-tight text-slate-900">
                Finor Investments
              </span>
            </div>

            <h1 className="text-2xl lg:text-3xl font-bold tracking-tight leading-tight text-slate-900 mb-4">
              Secure Access to Your Wealth Portfolio
            </h1>
            <p className="text-slate-600 text-sm leading-relaxed mb-8">
              Monitor real-time Indian investment returns, automated compounding, and manage seamless INR fund transfers.
            </p>

            <div className="space-y-4">
              <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-white border border-slate-200 shadow-xs">
                <TrendingUp className="text-sky-600 mt-0.5 shrink-0" size={20} />
                <div>
                  <h4 className="text-xs font-bold text-slate-900">Real-Time INR Growth</h4>
                  <p className="text-[11px] text-slate-500">Live portfolio analytics with high-yield return tracking.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-white border border-slate-200 shadow-xs">
                <Cpu className="text-sky-600 mt-0.5 shrink-0" size={20} />
                <div>
                  <h4 className="text-xs font-bold text-slate-900">Automated Trading Bot</h4>
                  <p className="text-[11px] text-slate-500">Smart AI engine maximizing daily yield efficiency.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-white border border-slate-200 shadow-xs">
                <ShieldCheck className="text-sky-600 mt-0.5 shrink-0" size={20} />
                <div>
                  <h4 className="text-xs font-bold text-slate-900">Institutional Security</h4>
                  <p className="text-[11px] text-slate-500">Encrypted session handling and secure wallet protocols.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500 font-medium">
            <span>Fintech Investment Platform</span>
            <span>v2.4 Production</span>
          </div>
        </div>

        {/* RIGHT SIDE: LOGIN FORM */}
        <div className="lg:col-span-7 p-6 sm:p-10 flex flex-col justify-center">
          <div className="max-w-md mx-auto w-full">
            
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Welcome Back</h2>
              <p className="text-sm text-slate-500 mt-1">
                Enter your credentials to manage your investments.
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-5">
              <div>
                <InputField
                  label="Email Address"
                  type="email"
                  placeholder="rahul@example.com"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  error={!!errors.email}
                  helperText={errors.email}
                />
              </div>

              <div>
                <InputField
                  label="Password"
                  type="password"
                  placeholder="••••••••"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  error={!!errors.password}
                  helperText={errors.password}
                />
              </div>

              <div className="pt-2">
                <ButtonComponent
                  type="submit"
                  fullWidth
                  variant="primary"
                  disabled={loading}
                >
                  {loading ? "Logging in..." : "Access Dashboard →"}
                </ButtonComponent>
              </div>

              <div className="text-center pt-2">
                <button
                  type="button"
                  onClick={() => setOpenWalletModal(true)}
                  className="text-xs font-semibold text-sky-600 hover:text-sky-700 transition-colors cursor-pointer"
                >
                  Connect Web3 Wallet (BEP-20) →
                </button>
              </div>
            </form>

            <p className="text-center text-xs text-slate-600 mt-8 pt-4 border-t border-slate-100">
              Don't have an account yet?{" "}
              <Link to={AuthRoutes.REGISTER} className="text-sky-600 font-bold hover:underline">
                Create an account
              </Link>
            </p>

          </div>
        </div>

      </div>

      <WalletModal
        open={openWalletModal}
        onClose={() => setOpenWalletModal(false)}
        type="login"
      />
    </div>
  );
};

export default LoginPage;
