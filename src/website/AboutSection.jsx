import React from "react";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";
import { AuthRoutes } from "../constants/routes";
import ButtonComponent from "../components/ui/ButtonComponent";

const AboutSection = () => {
  return (
    <section id="about" className="py-16 sm:py-20 lg:py-24 bg-white border-t border-slate-200/80">
      <div className="px-4 sm:px-8 lg:px-12 w-full">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* LEFT SIDE TEXT */}
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs font-semibold uppercase tracking-wider text-sky-600 block">
              ABOUT FINOR CAPITAL
            </span>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight leading-[1.15]">
              Your Trusted Partner for{" "}
              <span className="text-sky-600">Sustainable Growth</span>
            </h2>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              At Finor Capital, we combine innovation, expertise, and collaboration to help businesses and investors unlock new opportunities and achieve long-term success.
            </p>

            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-sky-100 text-sky-600 flex items-center justify-center">
                  <CheckCircle2 size={16} />
                </div>
                <span className="text-xs sm:text-sm font-semibold text-slate-800">
                  Client-Centric Approach
                </span>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-sky-100 text-sky-600 flex items-center justify-center">
                  <CheckCircle2 size={16} />
                </div>
                <span className="text-xs sm:text-sm font-semibold text-slate-800">
                  Proven Track Record
                </span>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-sky-100 text-sky-600 flex items-center justify-center">
                  <CheckCircle2 size={16} />
                </div>
                <span className="text-xs sm:text-sm font-semibold text-slate-800">
                  Commitment to Excellence
                </span>
              </div>
            </div>

            <div className="pt-4">
              <Link to={AuthRoutes.REGISTER}>
                <ButtonComponent variant="primary" padding="12px 24px">
                  Learn More About Us →
                </ButtonComponent>
              </Link>
            </div>
          </div>

          {/* RIGHT SIDE IMAGE WITH FLOATING YEARS EXPERIENCE BADGE */}
          <div className="lg:col-span-6 relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative rounded-3xl overflow-hidden shadow-xl border border-slate-200/80"
            >
              <img
                src="https://images.unsplash.com/photo-1554469384-e58fac16e23a?auto=format&fit=crop&w=1200&q=80"
                alt="Modern Corporate Building"
                className="w-full h-[380px] sm:h-[450px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/30 via-transparent to-transparent" />

              {/* FLOATING EXPERIENCE BADGE */}
              <div className="absolute bottom-6 right-6 bg-white/95 backdrop-blur-md p-5 rounded-2xl shadow-xl border border-slate-200 max-w-[220px]">
                <h3 className="text-2xl font-bold text-slate-900 tracking-tight">
                  15+
                </h3>
                <p className="text-xs font-bold text-slate-900 mt-0.5">
                  Years of Experience
                </p>
                <p className="text-[11px] text-slate-500 mt-1 leading-snug">
                  Delivering value and building lasting partnerships.
                </p>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default AboutSection;