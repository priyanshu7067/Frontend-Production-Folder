import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthRoutes } from "../constants/routes";
import { ArrowRight } from "lucide-react";

const Header = () => {
  const navigate = useNavigate();

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
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200/80 shadow-xs transition-all">
      <div className="w-full px-4 sm:px-8 lg:px-12 h-20 flex items-center justify-between">
        
        {/* LOGO */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-sky-600 flex items-center justify-center font-bold text-xl text-white shadow-md shadow-sky-600/20 group-hover:scale-105 transition-transform">
            ₹
          </div>
          <div>
            <span className="text-xl font-bold tracking-tight text-slate-900 block leading-none">
              Finor
            </span>
            <span className="text-[10px] font-semibold tracking-wider text-sky-600 uppercase mt-0.5 block">
              Fintech Capital
            </span>
          </div>
        </Link>

        {/* NAV LINKS MATCHING SCREENSHOT */}
        <nav className="hidden md:flex items-center gap-8 font-medium text-sm text-slate-600">
          <button
            onClick={() => scrollToSection("home")}
            className="hover:text-sky-600 transition-colors cursor-pointer"
          >
            Home
          </button>
          <button
            onClick={() => scrollToSection("about")}
            className="hover:text-sky-600 transition-colors cursor-pointer"
          >
            About Us
          </button>
          <button
            onClick={() => scrollToSection("services")}
            className="hover:text-sky-600 transition-colors cursor-pointer"
          >
            Services
          </button>
          <button
            onClick={() => scrollToSection("plans")}
            className="hover:text-sky-600 transition-colors cursor-pointer"
          >
            Investment Plans
          </button>
          <button
            onClick={() => scrollToSection("reviews")}
            className="hover:text-sky-600 transition-colors cursor-pointer"
          >
            Reviews
          </button>
          <button
            onClick={() => scrollToSection("faq")}
            className="hover:text-sky-600 transition-colors cursor-pointer"
          >
            Contact Us
          </button>
        </nav>

        {/* RIGHT CTA BUTTON MATCHING SCREENSHOT GET IN TOUCH */}
        <div className="flex items-center gap-3">
          <Link
            to={AuthRoutes.LOGIN}
            className="hidden sm:inline-block px-4 py-2 text-sm font-semibold text-slate-700 hover:text-sky-600 transition-all"
          >
            Sign In
          </Link>

          <Link
            to={AuthRoutes.REGISTER}
            className="px-5 py-2.5 text-sm font-semibold rounded-full text-white bg-sky-600 hover:bg-sky-700 shadow-sm shadow-sky-600/30 transition-all flex items-center gap-1.5"
          >
            Get in Touch
            <ArrowRight size={15} />
          </Link>
        </div>

      </div>
    </header>
  );
};

export default Header;
