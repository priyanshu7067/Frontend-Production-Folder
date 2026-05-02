import React, { useState } from "react";
import InputField from "../../components/ui/InputField";
import ButtonComponent from "../../components/ui/ButtonComponent";
import { Bot, Shield, Activity } from "lucide-react";
import { Link } from "react-router-dom";
import { AuthRoutes } from "../../constants/routes";

const LoginPage = () => {
    const [form, setForm] = useState({
        email: "",
        password: "",
    });

    return (
        <div className="min-h-screen dashboard-bg flex items-center justify-center px-4">

            <div className="w-full max-w-6xl grid md:grid-cols-2 gap-10 items-center">

                {/* 🔥 LEFT SIDE (INFO PANEL) */}
                <div className="space-y-6 hidden md:block">

                    <h1 className="text-3xl font-bold text-metal text-glow">
                        Smart AI Analytics Platform
                    </h1>

                    <p className="text-gray-400 text-sm">
                        Advanced insights powered by intelligent systems and real-time market data.
                    </p>

                    {/* FEATURES */}
                    <div className="space-y-4 mt-6">

                        <div className="flex items-start gap-3 p-4 rounded-xl border border-white/10 bg-white/5 backdrop-blur">
                            <Activity className="text-[var(--accent-primary)]" size={20} />
                            <div>
                                <p className="text-sm font-semibold">Real-Time Analysis</p>
                                <p className="text-xs text-gray-400">
                                    Multi-asset monitoring with instant insights
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-3 p-4 rounded-xl border border-white/10 bg-white/5 backdrop-blur">
                            <Bot className="text-[var(--accent-secondary)]" size={20} />
                            <div>
                                <p className="text-sm font-semibold">AI Insights</p>
                                <p className="text-xs text-gray-400">
                                    Smart predictions & automated intelligence
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-3 p-4 rounded-xl border border-white/10 bg-white/5 backdrop-blur">
                            <Shield className="text-[var(--accent-primary)]" size={20} />
                            <div>
                                <p className="text-sm font-semibold">Secure System</p>
                                <p className="text-xs text-gray-400">
                                    Advanced protection & encrypted data
                                </p>
                            </div>
                        </div>

                    </div>

                    {/* STATS */}
                    <div className="flex gap-10 mt-6 text-sm">
                        <div>
                            <p className="text-[var(--accent-primary)] text-lg font-bold">Multi</p>
                            <p className="text-gray-400 text-xs">Sources</p>
                        </div>
                        <div>
                            <p className="text-[var(--accent-secondary)] text-lg font-bold">Pro</p>
                            <p className="text-gray-400 text-xs">Analysis</p>
                        </div>
                        <div>
                            <p className="text-[var(--accent-primary)] text-lg font-bold">24/7</p>
                            <p className="text-gray-400 text-xs">Support</p>
                        </div>
                    </div>

                </div>

                {/* 🔥 RIGHT SIDE (LOGIN CARD) */}
                <div className="glow-card p-6 md:p-8 w-full max-w-md mx-auto">

                    {/* subtle gradient inside */}
                    <div className="absolute inset-0 opacity-10 bg-gradient-to-br from-[#b76e79] to-[#7f9ca8]" />

                    <div className="relative z-10 space-y-6">

                        <div className="text-center">
                            <h2 className="text-xl font-semibold text-white">
                                Secure Login
                            </h2>
                            <p className="text-xs text-gray-400 mt-1">
                                Access your intelligent dashboard
                            </p>
                        </div>

                        {/* INPUTS */}
                        <div className="space-y-4 grid grid-cols-1 gap-4">
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
                        </div>

                        {/* BUTTON */}
                        <ButtonComponent fullWidth>
                            Access Dashboard →
                        </ButtonComponent>

                        {/* FOOTER */}
                        <p className="text-center text-sm mt-3 text-gray-400">
                            Don’t have an account?{" "}
                            <Link
                                to={AuthRoutes.REGISTER}>
                                <span className="text-[var(--accent-primary)] cursor-pointer">
                                    Sign up
                                </span></Link>
                        </p>

                    </div>
                </div>

            </div>
        </div>
    );
};

export default LoginPage;