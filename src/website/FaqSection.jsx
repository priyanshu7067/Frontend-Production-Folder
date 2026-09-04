import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    q: "How are daily yields calculated and credited?",
    a: "Yields are calculated daily based on your active investment plan strategy. Earnings are credited directly to your INR dashboard wallet balance at 00:00 UTC every day.",
  },
  {
    q: "What deposit and withdrawal methods are supported?",
    a: "Deposits and withdrawals are supported via Indian bank transfer, UPI, and BEP-20 (USDT/crypto) payment networks. All payout requests are processed swiftly into your verified account.",
  },
  {
    q: "What is the minimum investment required to start?",
    a: "Our Starter Growth Package begins at just ₹5,000, making automated wealth generation accessible to everyone.",
  },
  {
    q: "How does the referral and level bonus system operate?",
    a: "By sharing your unique referral link, you earn direct referral bonuses plus multi-tier team commissions whenever members of your network activate an investment plan.",
  },
  {
    q: "What security measures protect my capital and data?",
    a: "We deploy 256-bit SSL encryption, multi-signature wallet security, strict KYC verification, and continuous automated risk monitoring.",
  },
];

const FaqSection = () => {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section id="faq" className="py-16 sm:py-20 lg:py-24 bg-slate-50/70 border-t border-slate-200/80">
      <div className="px-4 sm:px-8 lg:px-12 w-full max-w-4xl mx-auto">
        
        <div className="text-center mb-12">
          <span className="text-xs font-semibold uppercase tracking-wider text-sky-600 block mb-2">
            GOT QUESTIONS?
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-slate-600 text-sm mt-3">
            Everything you need to know about investing with Finor Capital.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={faq.q}
                className="bg-white border border-slate-200/80 rounded-2xl overflow-hidden shadow-xs transition-all"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full text-left p-5 font-bold text-slate-900 text-sm sm:text-base flex items-center justify-between gap-4 hover:text-sky-600 transition-colors cursor-pointer"
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
                  <div className="px-5 pb-5 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default FaqSection;
