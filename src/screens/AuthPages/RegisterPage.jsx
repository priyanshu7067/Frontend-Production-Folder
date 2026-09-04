import React, { useEffect, useState } from "react";
import InputField from "../../components/ui/InputField";
import ButtonComponent from "../../components/ui/ButtonComponent";
import { AuthRoutes, UserRoutes } from "../../constants/routes";
import { getUserInfo, UserRegister } from "../../apis/user/users.api";
import { Link, useLocation, useNavigate } from "react-router-dom";
import WalletModal from "../../components/ui/WalletModal";
import { useAuth } from "../../context/AuthContext";
import { toast } from "react-toastify";
import { ShieldCheck, CheckCircle2 } from "lucide-react";

const RegisterPage = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
    confirmPassword: "",
    sponsor: "",
    acceptTerms: false,
  });

  const [errors, setErrors] = useState({});
  const [userInfo, setUserInfo] = useState(null);
  const [openWalletModal, setOpenWalletModal] = useState(false);
  const [isReferral, setIsReferral] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const { showLoader, hideLoader, login } = useAuth();

  const fetchSponsorInfo = async (id) => {
    showLoader();
    try {
      setUserInfo(null);
      const res = await getUserInfo(id);
      const data = res?.data;
      setUserInfo(data);
    } catch (err) {
      console.error("Sponsor fetch error:", err);
      setUserInfo("error");
    } finally {
      hideLoader();
    }
  };

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const ref = params.get("ref");

    if (ref) {
      setForm((prev) => ({
        ...prev,
        sponsor: ref,
      }));
      setIsReferral(true);
      fetchSponsorInfo(ref);
    }
  }, [location.search]);

  const validate = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = "Full Name is required";
    if (!form.email.trim()) {
      newErrors.email = "Email Address is required";
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    if (!form.mobile.trim()) {
      newErrors.mobile = "Mobile Number is required";
    } else if (!/^[0-9]{10}$/.test(form.mobile.replace(/\D/g, ""))) {
      newErrors.mobile = "Please enter a valid 10-digit mobile number";
    }
    if (!form.password) {
      newErrors.password = "Password is required";
    } else if (form.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    if (form.confirmPassword !== form.password) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    if (!form.acceptTerms) {
      newErrors.acceptTerms = "You must agree to the Terms & Conditions";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    try {
      const res = await UserRegister({
        name: form.name,
        email: form.email,
        mobile: form.mobile,
        password: form.password,
        sponsor: form.sponsor,
        walletAddress: form.sponsor || "0x0000000000000000000000000000000000000000",
      });

      if (res?.success) {
        toast.success("Account created successfully! 🚀");
        if (res?.data?.token) {
          login(res.data.token, res.data.user);
          navigate(UserRoutes.DASHBOARD);
        } else {
          navigate(AuthRoutes.LOGIN);
        }
      } else {
        setOpenWalletModal(true);
      }
    } catch (err) {
      console.error(err);
      setOpenWalletModal(true);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 md:p-8">
      <div className="w-full max-w-5xl bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden grid lg:grid-cols-12">
        
        {/* LEFT SIDE: LIGHT BRAND / VALUE PROP */}
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
              Start Building Wealth with India's Smartest Platform
            </h1>
            <p className="text-slate-600 text-sm leading-relaxed mb-8">
              Join thousands of investors earning automated daily returns with institutional security and instant INR withdrawals.
            </p>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="p-1 rounded bg-sky-100 text-sky-600 mt-1">
                  <CheckCircle2 size={16} />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-slate-900">Instant INR Withdrawals</h4>
                  <p className="text-xs text-slate-500">Directly into your verified Indian bank account.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-1 rounded bg-sky-100 text-sky-600 mt-1">
                  <CheckCircle2 size={16} />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-slate-900">Bank-Grade Protection</h4>
                  <p className="text-xs text-slate-500">256-bit encryption & multi-layer audit trails.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-1 rounded bg-sky-100 text-sky-600 mt-1">
                  <CheckCircle2 size={16} />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-slate-900">AI-Powered Allocation</h4>
                  <p className="text-xs text-slate-500">Consistent returns tuned for optimal capital growth.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500 font-medium">
            <span className="flex items-center gap-1.5">
              <ShieldCheck size={16} className="text-sky-600" />
              Verified & Secure
            </span>
            <span>Support: support@finor.in</span>
          </div>
        </div>

        {/* RIGHT SIDE: REGISTRATION FORM */}
        <div className="lg:col-span-7 p-6 sm:p-10 flex flex-col justify-center">
          <div className="max-w-md mx-auto w-full">
            
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Create Account</h2>
              <p className="text-sm text-slate-500 mt-1">
                Fill in your details below to set up your investment portfolio.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              
              {form.sponsor && (
                <div className="p-3 bg-sky-50 rounded-xl border border-sky-200 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-sky-900">🔗 Referral Applied</span>
                    <span className="px-2 py-0.5 rounded bg-sky-200 text-sky-800 font-medium text-[10px]">LOCKED</span>
                  </div>
                  <p className="text-slate-600 mt-1 text-[11px] truncate">Sponsor: {form.sponsor}</p>
                  {userInfo && userInfo !== "error" && (
                    <p className="text-emerald-600 font-medium mt-1">✓ Verified Referral Sponsor</p>
                  )}
                  {userInfo === "error" && (
                    <p className="text-red-500 font-medium mt-1">✕ Invalid Sponsor ID</p>
                  )}
                </div>
              )}

              <div>
                <InputField
                  label="Full Name"
                  placeholder="e.g. Rahul Sharma"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  error={!!errors.name}
                  helperText={errors.name}
                />
              </div>

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
                  label="Mobile Number"
                  type="tel"
                  placeholder="9876543210"
                  value={form.mobile}
                  onChange={(e) => setForm({ ...form, mobile: e.target.value })}
                  error={!!errors.mobile}
                  helperText={errors.mobile}
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

              <div>
                <InputField
                  label="Confirm Password"
                  type="password"
                  placeholder="••••••••"
                  value={form.confirmPassword}
                  onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
                  error={!!errors.confirmPassword}
                  helperText={errors.confirmPassword}
                />
              </div>

              <div className="flex items-start gap-2.5 pt-1">
                <input
                  type="checkbox"
                  id="acceptTerms"
                  checked={form.acceptTerms}
                  onChange={(e) => setForm({ ...form, acceptTerms: e.target.checked })}
                  className="mt-1 w-4 h-4 rounded border-slate-300 text-sky-600 focus:ring-sky-500 cursor-pointer"
                />
                <label htmlFor="acceptTerms" className="text-xs text-slate-600 cursor-pointer leading-tight">
                  I agree to the{" "}
                  <span className="text-sky-600 font-semibold hover:underline">Terms of Service</span>,{" "}
                  <span className="text-sky-600 font-semibold hover:underline">Privacy Policy</span>, and financial disclosure terms.
                </label>
              </div>
              {errors.acceptTerms && (
                <p className="text-xs text-red-500 mt-1">{errors.acceptTerms}</p>
              )}

              <div className="pt-2">
                <ButtonComponent
                  type="submit"
                  fullWidth
                  variant="primary"
                  disabled={submitting}
                >
                  {submitting ? "Creating Account..." : "Create Account →"}
                </ButtonComponent>
              </div>

              <div className="text-center pt-2">
                <button
                  type="button"
                  onClick={() => setOpenWalletModal(true)}
                  className="text-xs font-semibold text-slate-600 hover:text-sky-600 transition-colors cursor-pointer"
                >
                  Or register via Web3 Wallet (BEP-20)
                </button>
              </div>
            </form>

            <p className="text-center text-xs text-slate-600 mt-6 pt-4 border-t border-slate-100">
              Already have an account?{" "}
              <Link to={AuthRoutes.LOGIN} className="text-sky-600 font-bold hover:underline">
                Login here
              </Link>
            </p>

          </div>
        </div>

      </div>

      <WalletModal
        open={openWalletModal}
        onClose={() => setOpenWalletModal(false)}
        sponsor={form.sponsor}
        type="register"
      />
    </div>
  );
};

export default RegisterPage;