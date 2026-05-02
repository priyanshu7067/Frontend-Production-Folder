import React, { useState } from "react";
import InputField from "../../components/ui/InputField";
import ButtonComponent from "../../components/ui/ButtonComponent";
import { Activity, Shield, Sparkles } from "lucide-react";
import { AuthRoutes } from "../../constants/routes";
import { Link } from "react-router-dom";

const RegisterPage = () => {
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    return (
        <div className="min-h-screen dashboard-bg flex items-center justify-center px-4">

            <div className="w-full max-w-6xl grid md:grid-cols-2 gap-10 items-center">

                {/* 🔥 LEFT SIDE */}
                <div className="space-y-6 hidden md:block">

                    <h1 className="text-4xl font-bold leading-tight text-metal text-glow">
                        AI Powered <br /> Smart Platform
                    </h1>

                    <p className="text-gray-400 text-sm">
                        Intelligent system designed to analyze and process your data in real-time.
                    </p>

                    {/* FEATURES */}
                    <div className="space-y-4 mt-6">

                        <div className="flex items-start gap-3 p-4 rounded-xl border border-white/10 bg-white/5 backdrop-blur">
                            <Activity className="text-[var(--accent-primary)]" size={20} />
                            <div>
                                <p className="text-sm font-semibold">Advanced Analytics</p>
                                <p className="text-xs text-gray-400">
                                    Real-time intelligent processing
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-3 p-4 rounded-xl border border-white/10 bg-white/5 backdrop-blur">
                            <Sparkles className="text-[var(--accent-secondary)]" size={20} />
                            <div>
                                <p className="text-sm font-semibold">AI Automation</p>
                                <p className="text-xs text-gray-400">
                                    24/7 smart data analysis
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-3 p-4 rounded-xl border border-white/10 bg-white/5 backdrop-blur">
                            <Shield className="text-[var(--accent-primary)]" size={20} />
                            <div>
                                <p className="text-sm font-semibold">Secure Access</p>
                                <p className="text-xs text-gray-400">
                                    Encrypted & protected system
                                </p>
                            </div>
                        </div>

                    </div>

                </div>

                {/* 🔥 RIGHT SIDE FORM */}
                <div className="glow-card p-6 md:p-8 w-full max-w-md mx-auto">

                    {/* subtle gradient */}
                    <div className="absolute inset-0 opacity-10 bg-gradient-to-br from-[#b76e79] to-[#7f9ca8]" />

                    <div className="relative z-10 space-y-6">

                        {/* 🔥 HEADER */}
                        <div className="text-center">
                            <h2 className="text-xl font-semibold">Create Account</h2>
                            <p className="text-xs text-gray-400">
                                Start your AI journey
                            </p>
                        </div>

                        {/* 🔥 STEP BAR */}
                        <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
                            <div className="h-full w-[25%] bg-gradient-to-r from-[#b76e79] to-[#7f9ca8]" />
                        </div>

                        {/* 🔥 FORM */}
                        <div className="space-y-4 grid grid-cols-1 gap-3">

                            <InputField
                                label="Full Name"
                                value={form.name}
                                onChange={(e) =>
                                    setForm({ ...form, name: e.target.value })
                                }
                            />

                            <InputField
                                label="Email"
                                value={form.email}
                                onChange={(e) =>
                                    setForm({ ...form, email: e.target.value })
                                }
                            />

                            <InputField
                                label="Password"
                                type="password"
                                value={form.password}
                                onChange={(e) =>
                                    setForm({ ...form, password: e.target.value })
                                }
                            />

                            <InputField
                                label="Confirm Password"
                                type="password"
                                value={form.confirmPassword}
                                onChange={(e) =>
                                    setForm({ ...form, confirmPassword: e.target.value })
                                }
                            />

                        </div>

                        {/* 🔥 BUTTON */}
                        <ButtonComponent fullWidth>
                            Continue →
                        </ButtonComponent>

                        {/* 🔥 FOOTER */}
                        <p className="text-center text-sm text-gray-400">
                            Already have an account?{" "}
                            <Link to={AuthRoutes.LOGIN}>
                                <span className="text-[var(--accent-primary)] cursor-pointer">
                                    Login
                                </span>
                                 </Link>
                        </p>

                    </div>
                </div>

            </div>
        </div>
    );
};

export default RegisterPage;