import React from "react";
import { motion } from "framer-motion";
import { Users, Briefcase, Trophy, Globe } from "lucide-react";

const stats = [
  {
    icon: Users,
    num: "50,000+",
    label: "Happy Clients",
  },
  {
    icon: Briefcase,
    num: "1,200+",
    label: "Projects Delivered",
  },
  {
    icon: Trophy,
    num: "15+",
    label: "Awards Won",
  },
  {
    icon: Globe,
    num: "30+",
    label: "Countries Served",
  },
];

const StatsBar = () => {
  return (
    <div className="relative z-20 px-4 sm:px-8 lg:px-12 w-full -mt-8 sm:-mt-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="bg-white border border-slate-200/90 rounded-2xl sm:rounded-3xl p-6 shadow-lg grid grid-cols-2 md:grid-cols-4 gap-6 divide-y sm:divide-y-0 sm:divide-x divide-slate-100"
      >
        {stats.map((item, index) => {
          const Icon = item.icon;
          return (
            <div
              key={item.label}
              className={`flex items-center gap-4 ${
                index > 0 ? "sm:pl-6" : ""
              } ${index >= 2 ? "pt-4 sm:pt-0" : ""}`}
            >
              <div className="w-11 h-11 rounded-2xl bg-sky-50 text-sky-600 flex items-center justify-center shrink-0">
                <Icon size={22} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900 tracking-tight">
                  {item.num}
                </h3>
                <p className="text-xs font-medium text-slate-500 mt-0.5">
                  {item.label}
                </p>
              </div>
            </div>
          );
        })}
      </motion.div>
    </div>
  );
};

export default StatsBar;
