import React from "react";
import { motion } from "framer-motion";
import { Rocket, Briefcase, Cloud, Lightbulb, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { AuthRoutes } from "../constants/routes";

const services = [
  {
    icon: Rocket,
    iconBg: "bg-sky-50 text-sky-600 border-sky-100",
    title: "Digital Transformation",
    desc: "Modernize your business with cutting-edge digital fintech solutions.",
  },
  {
    icon: Briefcase,
    iconBg: "bg-emerald-50 text-emerald-600 border-emerald-100",
    title: "IT & Financial Consulting",
    desc: "Expert guidance to optimize systems and drive capital efficiency.",
  },
  {
    icon: Cloud,
    iconBg: "bg-purple-50 text-purple-600 border-purple-100",
    title: "Cloud Financial Solutions",
    desc: "Scalable and secure cloud infrastructure for modern fintech enterprises.",
  },
  {
    icon: Lightbulb,
    iconBg: "bg-amber-50 text-amber-600 border-amber-100",
    title: "Data & Market Analytics",
    desc: "Turn raw market data into actionable insights and accelerate growth.",
  },
];

const ServicesSection = () => {
  return (
    <section id="services" className="py-16 sm:py-20 lg:py-24 bg-slate-50/70">
      <div className="px-4 sm:px-8 lg:px-12 w-full">
        
        {/* TOP LAYOUT */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-sky-600 block mb-2">
              WHAT WE DO
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
              Solutions that{" "}
              <span className="text-sky-600">Drive Real Impact</span>
            </h2>
          </div>

          <div className="max-w-md">
            <p className="text-sm text-slate-600 leading-relaxed mb-2">
              From strategy to execution, we provide end-to-end services tailored to your business and investment goals.
            </p>
            <Link
              to={AuthRoutes.REGISTER}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-sky-600 hover:text-sky-700 transition-colors"
            >
              Explore All Services <ArrowRight size={14} />
            </Link>
          </div>
        </div>

        {/* 4 CARDS GRID */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-white border border-slate-200/80 rounded-3xl p-7 shadow-xs hover:shadow-lg hover:border-sky-200 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className={`w-12 h-12 rounded-2xl border flex items-center justify-center mb-6 ${item.iconBg}`}>
                    <Icon size={22} />
                  </div>

                  <h3 className="text-base font-bold text-slate-900 mb-2 group-hover:text-sky-600 transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-xs text-slate-500 leading-relaxed mb-6">
                    {item.desc}
                  </p>
                </div>

                <Link
                  to={AuthRoutes.REGISTER}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-sky-600 hover:text-sky-700 group-hover:translate-x-1 transition-all"
                >
                  Learn More <ArrowRight size={14} />
                </Link>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default ServicesSection;
