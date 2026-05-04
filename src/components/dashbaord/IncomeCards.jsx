import { useNavigate } from "react-router-dom";
import { ArrowUpRight, ArrowDownRight, Wallet, ArrowRight } from "lucide-react";

const IncomeCards = ({ data = [], loading = false }) => {
  const navigate = useNavigate();

  // Custom styles for different card flavors
  const cardStyles = [
    "from-[#6366f1] to-[#a855f7]", // Indigo-Purple
    "from-[#0ea5e9] to-[#22c55e]", // Blue-Green
    "from-[#f59e0b] to-[#ef4444]", // Amber-Red
    "from-[#ec4899] to-[#8b5cf6]", // Pink-Violet
  ];

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="h-44 rounded-3xl bg-gray-800/50 animate-pulse"
          />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-4">
      {data.map((item, index) => {
        const isPositive = item.change >= 0;
        const gradientClass = cardStyles[index % cardStyles.length];

        return (
          <div
            key={index}
            onClick={() => navigate(item.route)}
            className="group relative cursor-pointer overflow-hidden rounded-[2rem] p-1 transition-all duration-500 hover:scale-[1.03] hover:shadow-[0_20px_50px_rgba(0,0,0,0.3)]"
          >
            {/* The Animated Gradient Border Layer */}
            <div
              className={`absolute inset-0 bg-gradient-to-br ${gradientClass} opacity-20 group-hover:opacity-100 transition-opacity duration-500`}
            />

            {/* Inner Card Content */}
            <div className="relative h-full rounded-[1.9rem] bg-[#0f1115] p-3">
              {/* Top Row: Icon & Trend */}
              <div className="flex items-center justify-between">
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${gradientClass} shadow-lg shadow-black/20 text-white`}
                >
                  {item?.icon || <Wallet size={24} />}
                </div>

                <div
                  className={`flex items-center gap-1 text-sm font-bold ${isPositive ? "text-emerald-400" : "text-rose-400"}`}
                >
                  {isPositive ? (
                    <ArrowUpRight size={18} />
                  ) : (
                    <ArrowDownRight size={18} />
                  )}
                  {item.change}%
                </div>
              </div>

              {/* Middle Row: Amount & Label */}
              <div className="mt-4">
                <p className="text-sm font-medium text-gray-400 mb-1">
                  {item?.title}
                </p>
                <div className="flex items-baseline gap-1">
                  <span className="text-xl font-medium text-gray-400">$</span>
                  <h2 className="text-xl font-bold tracking-tight text-white">
                    {item?.amount.toLocaleString()}
                  </h2>
                </div>
              </div>

              {/* Bottom Row: Subtitle & Navigation Hint */}
              <div className="mt-3 flex items-center justify-between">
                <span className="text-[11px] font-semibold uppercase tracking-widest text-gray-500">
                  {item?.subtitle || "Active Now"}
                </span>

                <div className="rounded-full bg-white/5 p-2 text-gray-400 transition-all duration-300 group-hover:bg-white group-hover:text-black">
                  <ArrowRight size={16} />
                </div>
              </div>

              {/* Decorative Mesh Circle */}
              <div
                className={`absolute -bottom-10 -right-10 h-32 w-32 rounded-full bg-gradient-to-br ${gradientClass} opacity-10 blur-3xl group-hover:opacity-30 transition-opacity`}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default IncomeCards;
