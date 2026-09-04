import React from "react";
import { motion } from "framer-motion";
import { Star, ShieldCheck } from "lucide-react";

const reviews = [
  {
    name: "Rajesh Sharma",
    role: "Senior Business Consultant",
    location: "Mumbai, Maharashtra",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
    quote: "Finor Capital has completely transformed how I manage my passive investments. The daily INR returns are credited like clockwork, and instant bank withdrawals are smooth.",
    stars: 5,
  },
  {
    name: "Priya Sundaram",
    role: "Tech Entrepreneur",
    location: "Bengaluru, Karnataka",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80",
    quote: "The combination of AI quantitative strategy and total financial transparency is impressive. I can track every single return on my dashboard effortlessly.",
    stars: 5,
  },
  {
    name: "Amitabh Verma",
    role: "Portfolio Investor",
    location: "Delhi NCR",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
    quote: "Exceptional platform quality. The customer support is responsive, security is top-notch, and the daily compounding yield has exceeded my expectations.",
    stars: 5,
  },
];

const ReviewsSection = () => {
  return (
    <section id="reviews" className="py-16 sm:py-20 lg:py-24 bg-white border-t border-slate-200/80">
      <div className="px-4 sm:px-8 lg:px-12 w-full">
        
        {/* HEADER */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-semibold uppercase tracking-wider text-sky-600 block mb-2">
            CLIENT TESTIMONIALS
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
            Trusted by Thousands of Investors
          </h2>
          <p className="text-slate-600 text-sm mt-3 leading-relaxed">
            See how Finor Capital helps investors achieve sustainable growth across India.
          </p>
        </div>

        {/* REVIEWS GRID */}
        <div className="grid md:grid-cols-3 gap-8">
          {reviews.map((item, index) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-slate-50/70 border border-slate-200/80 rounded-3xl p-7 shadow-xs hover:shadow-lg hover:bg-white hover:border-sky-200 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-1 text-amber-400 mb-4">
                  {[...Array(item.stars)].map((_, i) => (
                    <Star key={i} size={16} fill="currentColor" />
                  ))}
                </div>

                <p className="text-slate-700 text-xs sm:text-sm leading-relaxed italic mb-6">
                  "{item.quote}"
                </p>
              </div>

              <div className="flex items-center gap-3 pt-4 border-t border-slate-200/60">
                <img
                  src={item.avatar}
                  alt={item.name}
                  className="w-11 h-11 rounded-full object-cover border border-slate-200"
                />
                <div>
                  <h4 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                    {item.name}
                    <ShieldCheck size={14} className="text-sky-600" />
                  </h4>
                  <p className="text-[11px] text-slate-500">{item.role} • {item.location}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default ReviewsSection;
