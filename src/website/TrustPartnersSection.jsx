import React from "react";

const partners = [
  { name: "HDFC Bank", text: "HDFC BANK" },
  { name: "ICICI Bank", text: "ICICI BANK" },
  { name: "Zerodha", text: "ZERODHA" },
  { name: "NSE India", text: "NSE INDIA" },
  { name: "BSE India", text: "BSE INDIA" },
  { name: "AWS Security", text: "AWS CLOUD" },
];

const TrustPartnersSection = () => {
  return (
    <section className="py-12 bg-white border-t border-slate-200/80">
      <div className="px-4 sm:px-8 lg:px-12 w-full">
        <p className="text-center text-xs font-semibold uppercase tracking-widest text-slate-400 mb-8">
          TRUSTED BY LEADING BRANDS & FINANCIAL INSTITUTIONS
        </p>

        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16 opacity-60 hover:opacity-100 transition-opacity">
          {partners.map((item) => (
            <span
              key={item.name}
              className="text-sm sm:text-base font-bold tracking-widest text-slate-600 hover:text-sky-600 transition-colors"
            >
              {item.text}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustPartnersSection;
