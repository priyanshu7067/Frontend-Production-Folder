import React, { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { AdminLoginApi } from "../../apis/admin/admin.api";
import { useAuth } from "../../context/AuthContext";
import ReusableInput from "../../components/global/ReusableInput";
import ButtonComponent from "../../components/ui/ButtonComponent";

const AdminLogin = () => {
  const navigate = useNavigate();
  const {login} = useAuth();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!form.email || !form.password) {
      toast.error("All fields are required");
      return;
    }

    try {
      setLoading(true);

      const res = await AdminLoginApi(form);

      if (res?.success) {
        toast.success(res?.message || "Admin login successful 🚀");
        login(res?.token, res?.data);
        setTimeout(() => {
          navigate("/admin/dashboard");
        }, 1200);
      } else {
        toast.error(res?.message || "Admin login failed");
      }

      // redirect

    } catch (err) {
      toast.error(err?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen dashboard-bg flex items-center justify-center px-4">

      {/* 🔥 CARD */}
      <div className="relative glow-card w-full max-w-md p-8">

        {/* Background glow */}
        <div className="absolute inset-0 opacity-10 bg-gradient-to-br from-[#06b6d4] to-[#22d3ee]" />

        <div className="relative z-10 space-y-6">

          {/* HEADER */}
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-gradient">
              Admin Panel
            </h2>
            <p className="text-sm text-gray-400 mt-1">
              Secure access to admin dashboard
            </p>
          </div>

          {/* FORM */}
          <div className="space-y-4">

            <ReusableInput
              label="Admin Email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Enter email"
              sx={{mb: 2}}
            />

            <ReusableInput
              label="Password"
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Enter password"
            />

          </div>

          {/* BUTTON */}
          <ButtonComponent
            fullWidth
            variant="neon"
            onClick={handleSubmit}
          >
            {loading ? "Logging in..." : "Login →"}
          </ButtonComponent>

        </div>
      </div>
    </div>
  );
};

export default AdminLogin;