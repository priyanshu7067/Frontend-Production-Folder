import React, { useState } from "react";
import { Link } from "react-router-dom";
import { AuthRoutes } from "../constants/routes";
import ButtonComponent from "../components/ui/ButtonComponent";
import { ChevronDown, HelpCircle, ArrowRight } from "lucide-react";

const faqs = [
  {
    q: "How are my returns calculated and credited?",
    a: "Returns are calculated daily based on your active investment plan. All earnings are displayed in INR (₹) and credited automatically to your dashboard balance at 00:00 UTC daily.",
  },
  {
    q: "What methods can I use to deposit or withdraw funds?",
    a: "You can deposit funds via Indian bank transfers, UPI, or BEP-20 (USDT/crypto) payment networks. Payouts can be requested directly into your verified Indian bank account or wallet.",
  },
  {
    q: "Is there a minimum investment amount?",
    a: "Yes, our starter growth package begins at just ₹5,000, making automated wealth generation accessible to every investor.",
  },
  {
    q: "How does the referral and level income system work?",
    a: "When you refer new investors using your unique referral link, you earn direct referral income plus multi-level commission bonuses whenever your team members invest.",
  },
  {
    q: "How secure is my personal and financial information?",
    a: "We utilize 256-bit SSL encryption, strict KYC verification protocols, and multi-factor security controls to ensure total privacy and safety.",
  },
];

const ContactSection = () => {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div id="faq" className="bg-slate-50 py-20 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        
        {/* FAQ SECTION */}
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-sky-600 bg-sky-50 px-3.5 py-1.5 rounded-full border border-sky-100">
              Got Questions?
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-4">
              Frequently Asked Questions
            </h2>
            <p className="text-slate-600 text-sm mt-2">
              Everything you need to know about investing with Finor Capital.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => {
              const isOpen = openIndex === idx;
              return (
                <div
                  key={faq.q}
                  className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xs transition-all"
                >
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : idx)}
                    className="w-full text-left p-5 font-bold text-slate-900 text-base flex items-center justify-between gap-4 hover:text-sky-600 transition-colors"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      size={20}
                      className={`text-slate-400 shrink-0 transition-transform duration-200 ${
                        isOpen ? "rotate-180 text-sky-600" : ""
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 text-xs text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* FINAL CTA BANNER */}
        <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-sky-950 rounded-3xl p-8 sm:p-14 text-white text-center shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-2xl mx-auto space-y-6">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight">
              Ready to Accelerate Your Financial Growth?
            </h2>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Join thousands of investors earning automated daily INR yields. Create your account in minutes and start building your portfolio today.
            </p>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to={AuthRoutes.REGISTER}>
                <ButtonComponent variant="primary" padding="14px 32px">
                  Create Account Free →
                </ButtonComponent>
              </Link>

              <Link to={AuthRoutes.LOGIN}>
                <ButtonComponent variant="outline" padding="14px 32px">
                  Sign In to Dashboard
                </ButtonComponent>
              </Link>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ContactSection;