import React from "react";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";
import { AuthRoutes } from "../constants/routes";
import ButtonComponent from "../components/ui/ButtonComponent";
import { formatINR } from "../utils/helper";

const plans = [
  {
    name: "Starter Growth Plan",
    minAmount: 5000,
    dailyReturn: "1.2%",
    duration: "30 Days",
    features: [
      "Daily Automated INR Credit",
      "Instant Withdrawal Access",
      "Standard AI Portfolio Strategy",
      "24/7 Priority Support",
    ],
    popular: false,
  },
  {
    name: "Pro Wealth Builder",
    minAmount: 50000,
    dailyReturn: "1.8%",
    duration: "60 Days",
    features: [
      "Daily Compounding Yield",
      "Zero Processing Fee Payouts",
      "Advanced Quant Trading Bot",
      "Dedicated Financial Manager",
    ],
    popular: true,
  },
  {
    name: "Institutional Alpha",
    minAmount: 500000,
    dailyReturn: "2.4%",
    duration: "90 Days",
    features: [
      "Custom Wealth Allocation",
      "Instant Bank Deposit & Withdrawal",
      "VIP Institutional Care & API",
      "Maximum Yield Compounding",
    ],
    popular: false,
  },
];

const InvestmentPlansSection = () => {
  return (
    <section id="plans" className="py-16 sm:py-20 lg:py-24 bg-slate-50/70 border-t border-slate-200/80">
      <div className="px-4 sm:px-8 lg:px-12 w-full">
        
        {/* HEADER */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-semibold uppercase tracking-wider text-sky-600 block mb-2">
            WEALTH PACKAGES
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
            Tailored Investment Plans
          </h2>
          <p className="text-slate-600 text-sm mt-3 leading-relaxed">
            Choose an investment strategy suited for your financial targets and start earning daily automated INR returns.
          </p>
        </div>

        {/* 3 CARDS */}
        <div className="grid lg:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`rounded-3xl p-8 relative flex flex-col justify-between transition-all duration-300 ${
                plan.popular
                  ? "bg-sky-50/90 text-slate-900 shadow-xl scale-105 border-2 border-sky-500"
                  : "bg-white text-slate-900 border border-slate-200 shadow-xs hover:shadow-lg"
              }`}
            >
              {plan.popular && (
                <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 bg-sky-600 text-white text-xs font-bold uppercase tracking-wider rounded-full shadow-xs">
                  Most Popular
                </span>
              )}

              <div>
                <h3 className="text-xl font-bold mb-2 text-slate-900">
                  {plan.name}
                </h3>

                <div className="my-6 pb-6 border-b border-slate-200">
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-bold tracking-tight text-slate-900">{plan.dailyReturn}</span>
                    <span className="text-xs font-medium text-slate-500">
                      / Daily Return
                    </span>
                  </div>
                  <p className="text-xs mt-2 font-semibold text-sky-600">
                    Min. Investment: {formatINR(plan.minAmount)}
                  </p>
                </div>

                <div className="space-y-3.5 mb-8">
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Plan Highlights
                  </p>
                  {plan.features.map((feat) => (
                    <div key={feat} className="flex items-center gap-2.5 text-xs font-medium text-slate-700">
                      <CheckCircle2 size={16} className="text-sky-600 shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <Link to={AuthRoutes.REGISTER}>
                  <ButtonComponent
                    fullWidth
                    variant={plan.popular ? "primary" : "outline"}
                    padding="12px 20px"
                  >
                    Start Investing Now →
                  </ButtonComponent>
                </Link>
              </div>

            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default InvestmentPlansSection;
