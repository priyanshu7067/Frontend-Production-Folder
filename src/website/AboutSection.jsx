import React from "react";

const AboutSection = () => {
  return (
    <section
      id="about"
      className="relative py-10 px-6 bg-[var(--bg-main)] overflow-hidden"
    >
      {/* 🔥 Background Glow */}
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <div className="absolute w-[250px] md:w-[400px] h-[250px] md:h-[400px] bg-[#22d3ee]/20 blur-[120px] top-[-80px] left-[-80px]" />

        <div className="absolute w-[250px] md:w-[400px] h-[250px] md:h-[400px] bg-[#06b6d4]/20 blur-[120px] bottom-[-80px] right-[-80px]" />
      </div>

      <div className="relative max-w-7xl mx-auto">
        {/* 🔥 SECTION HEADER */}
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-5xl font-bold text-gradient text-glow">
            About Our Platform
          </h2>
          <p className="mt-4 text-gray-400 max-w-2xl mx-auto text-sm md:text-base">
            A next-generation crypto investment and automated trading platform
            designed for performance, transparency, and intelligent growth.
          </p>
        </div>

        {/* 🔥 CONTENT GRID */}
        <div className="grid md:grid-cols-2 gap-10 items-center">

          {/* LEFT SIDE */}
          <div className="space-y-6">
            <div className="card">
              <h3 className="text-xl font-semibold text-[#22d3ee] mb-2">
                Smart AI Trading
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Our advanced AI-driven algorithms analyze market trends in real-time,
                executing high-precision trades to maximize profits while minimizing risk.
              </p>
            </div>

            <div className="card">
              <h3 className="text-xl font-semibold text-[#22d3ee] mb-2">
                Secure & Transparent
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Built with enterprise-grade security, ensuring your funds and data
                remain safe. Every transaction is transparent and trackable.
              </p>
            </div>

            <div className="card">
              <h3 className="text-xl font-semibold text-[#22d3ee] mb-2">
                Passive Income Engine
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Generate consistent passive income through automated strategies,
                even while you sleep. Let technology work for you 24/7.
              </p>
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="relative">
            <div className="glow-card p-6">
              <h3 className="text-2xl font-bold text-gradient mb-4">
                Why Choose Us?
              </h3>

              <ul className="space-y-4 text-sm text-gray-300">
                <li className="flex items-start gap-3">
                  <span className="text-[#22d3ee]">✔</span>
                  Real-time AI-powered trading engine
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#22d3ee]">✔</span>
                  Multi-layer security & encrypted transactions
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#22d3ee]">✔</span>
                  Beginner-friendly & expert-ready dashboard
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#22d3ee]">✔</span>
                  High ROI strategies with risk management
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#22d3ee]">✔</span>
                  24/7 automated trading & monitoring
                </li>
              </ul>

              {/* CTA */}
              <div className="mt-6">
                <button className="
                  px-6 py-2 rounded-full text-sm font-semibold
                  bg-gradient-to-r from-[#06b6d4] to-[#22d3ee]
                  text-black
                  shadow-[0_0_18px_rgba(34,211,238,0.5)]
                  hover:shadow-[0_0_25px_rgba(34,211,238,0.8)]
                  transition-all duration-300
                ">
                  Start Investing
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;