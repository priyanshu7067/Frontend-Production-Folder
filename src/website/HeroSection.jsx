import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { AuthRoutes } from "../constants/routes";
import ButtonComponent from "../components/ui/ButtonComponent";
import { Play } from "lucide-react";

const HeroSection = () => {
  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      const offset = 80;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <section id="home" className="relative min-h-[75vh] lg:min-h-[82vh] flex items-center bg-gradient-to-b from-sky-50/60 via-white to-slate-50 overflow-hidden py-12 lg:py-20">
      
      {/* BACKGROUND ARCHITECTURAL IMAGE & SKY GRADIENT MATCHING REFERENCE IMAGE */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=2000&q=80"
          alt="Modern Glass Building Sky"
          className="w-full h-full object-cover object-right opacity-35 sm:opacity-45"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/90 to-transparent sm:to-white/20" />
        <div className="absolute inset-0 bg-gradient-to-b from-white/80 via-transparent to-white" />
      </div>

      <div className="relative z-10 w-full px-4 sm:px-8 lg:px-12">
        <div className="grid lg:grid-cols-12 gap-8 items-center">
          
          {/* LEFT SIDE TEXT CONTENT MATCHING SCREENSHOT */}
          <div className="lg:col-span-7 space-y-6">
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-1"
            >
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 leading-[1.15]">
                Innovating Today
              </h1>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-sky-600 leading-[1.15]">
                Inspiring Tomorrow
              </h1>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="text-slate-600 text-base sm:text-lg font-normal leading-relaxed max-w-xl"
            >
              We deliver intelligent solutions that drive growth, empower businesses, and create lasting impact across India.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-wrap items-center gap-4 pt-2"
            >
              <Link to={AuthRoutes.REGISTER}>
                <ButtonComponent variant="primary" padding="12px 28px">
                  Our Services
                </ButtonComponent>
              </Link>

              <button
                onClick={() => scrollToSection("about")}
                className="px-5 py-3 rounded-xl border border-sky-600 bg-white text-sky-600 font-semibold hover:bg-sky-50 transition-colors flex items-center gap-2 text-sm cursor-pointer shadow-xs"
              >
                <div className="w-5 h-5 rounded-full bg-sky-100 flex items-center justify-center text-sky-600">
                  <Play size={10} fill="currentColor" />
                </div>
                Watch Overview
              </button>
            </motion.div>

          </div>

          {/* RIGHT SIDE ARCHITECTURAL BUILDING HIGHLIGHT */}
          <div className="hidden lg:block lg:col-span-5 relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-200/80"
            >
              <img
                src="https://images.unsplash.com/photo-1541888946425-d0fbb186a5b7?auto=format&fit=crop&w=1000&q=80"
                alt="Modern Glass Architecture"
                className="w-full h-[400px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/30 via-transparent to-transparent" />
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default HeroSection;
