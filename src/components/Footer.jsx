import React from "react";
import { Link } from "react-router-dom";
import { AuthRoutes } from "../constants/routes";
import { Shield, Lock, Phone, Mail, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-white text-slate-600 pt-16 pb-8 border-t border-slate-200/80">
      <div className="px-4 sm:px-8 lg:px-12 w-full">
        
        {/* MAIN GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-200">
          
          {/* BRAND */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-sky-600 flex items-center justify-center font-bold text-lg text-white shadow-md shadow-sky-600/30">
                ₹
              </div>
              <span className="text-xl font-bold tracking-tight text-slate-900">
                Finor Capital
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 max-w-sm leading-relaxed">
              India's premier digital fintech investment platform. Automated high-yield returns, AI portfolio trading, and instant INR bank transfers.
            </p>
            <div className="flex items-center gap-4 pt-1 text-xs font-semibold text-slate-600">
              <span className="flex items-center gap-1.5">
                <Shield size={14} className="text-sky-600" /> ISO 27001 Certified
              </span>
              <span className="flex items-center gap-1.5">
                <Lock size={14} className="text-sky-600" /> 256-bit Encryption
              </span>
            </div>
          </div>

          {/* QUICK LINKS */}
          <div>
            <h3 className="text-slate-900 font-bold mb-4 text-xs uppercase tracking-wider">Investment</h3>
            <ul className="space-y-2.5 text-xs sm:text-sm font-medium">
              <li><a href="#plans" className="hover:text-sky-600 transition-colors">Growth Plans</a></li>
              <li><a href="#services" className="hover:text-sky-600 transition-colors">Automated Yield</a></li>
              <li><a href="#about" className="hover:text-sky-600 transition-colors">AI Trading Engine</a></li>
              <li><Link to={AuthRoutes.REGISTER} className="hover:text-sky-600 transition-colors">Create Portfolio</Link></li>
            </ul>
          </div>

          {/* COMPANY */}
          <div>
            <h3 className="text-slate-900 font-bold mb-4 text-xs uppercase tracking-wider">Company</h3>
            <ul className="space-y-2.5 text-xs sm:text-sm font-medium">
              <li><a href="#about" className="hover:text-sky-600 transition-colors">About Finor</a></li>
              <li><a href="#reviews" className="hover:text-sky-600 transition-colors">Client Reviews</a></li>
              <li><a href="#faq" className="hover:text-sky-600 transition-colors">FAQ</a></li>
              <li><Link to={AuthRoutes.LOGIN} className="hover:text-sky-600 transition-colors">Client Login</Link></li>
            </ul>
          </div>

          {/* CONTACT INFO */}
          <div>
            <h3 className="text-slate-900 font-bold mb-4 text-xs uppercase tracking-wider">Contact Us</h3>
            <ul className="space-y-3 text-xs sm:text-sm text-slate-600 font-medium">
              <li className="flex items-center gap-2">
                <Mail size={15} className="text-sky-600 shrink-0" />
                <span>support@finor.in</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={15} className="text-sky-600 shrink-0" />
                <span>+91 (1800) 234-5678</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin size={15} className="text-sky-600 shrink-0 mt-0.5" />
                <span>BKC, Bandra East, Mumbai, Maharashtra 400051</span>
              </li>
            </ul>
          </div>

        </div>

        {/* BOTTOM */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-medium text-slate-500">
          <p>© {new Date().getFullYear()} Finor Capital India. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span className="hover:text-slate-900 cursor-pointer">Privacy Policy</span>
            <span className="hover:text-slate-900 cursor-pointer">Terms of Service</span>
            <span className="hover:text-slate-900 cursor-pointer">Risk Disclosure</span>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;