import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowUpRight, Wallet, ArrowRight } from "lucide-react";
import { formatINR } from "../../utils/helper";

const IncomeCards = ({ data = [], loading = false }) => {
  const navigate = useNavigate();

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-2">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="h-36 rounded-2xl bg-slate-200/60 animate-pulse"
          />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-1">
      {data.map((item, index) => {
        return (
          <div
            key={index}
            onClick={() => item.route && navigate(item.route)}
            className="group relative cursor-pointer bg-white border border-slate-200 rounded-2xl p-5 shadow-xs hover:shadow-md hover:border-sky-300 transition-all duration-200 flex flex-col justify-between"
          >
            {/* TOP ROW */}
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center font-bold group-hover:bg-sky-600 group-hover:text-white transition-colors">
                {item?.icon || <Wallet size={20} />}
              </div>

              <div className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-sky-50 group-hover:text-sky-600 transition-colors">
                <ArrowRight size={14} />
              </div>
            </div>

            {/* CONTENT */}
            <div className="mt-4">
              <p className="text-xs font-semibold text-slate-500 tracking-wide mb-1">
                {item?.title}
              </p>
              <h3 className="text-xl font-extrabold text-slate-900 tracking-tight">
                {typeof item?.amount === "number" || !isNaN(Number(item?.amount))
                  ? formatINR(item?.amount)
                  : item?.amount || "₹0.00"}
              </h3>
            </div>

            {/* BOTTOM SUBTITLE */}
            {item?.subtitle && (
              <div className="mt-3 pt-2 border-t border-slate-100 text-[11px] font-medium text-slate-400">
                {item.subtitle}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default IncomeCards;
