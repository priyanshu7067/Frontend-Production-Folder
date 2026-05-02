import React from "react";
import { Link } from "react-router-dom";
import Auth from "../navigations/Auth";
import { AuthRoutes } from "../constants/routes";
import { MainContent } from "../constants/mainContent";

const Header = () => {
  return (
    <header className="sticky top-4 z-50 flex justify-center ">
      
      {/* 🔥 GLASS CONTAINER */}
      <div
        className="w-[95%] max-w-7xl px-6 py-3 
        flex items-center justify-between
        rounded-xl glass
        shadow-[0_0_30px_rgba(183,110,121,0.15)] bg-black"
      >

        {/* 🔥 LOGO */}
        <Link
          to="/"
          className="text-2xl font-bold tracking-wide text-metal text-glow"
        >
          <img src={MainContent.logo} alt="" className="w-16" />
        </Link>
        {/* 🔥 NAV LINKS */}
        <nav className="hidden md:flex items-center gap-8 font-bold text-sm text-white/70">
          {["Company", "Solution", "About", "Contact"].map((item, i) => (
            <Link
              key={i}
              to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
              className="relative group transition-all duration-300 hover:text-white"
            >
              {item}
              {/* 🔥 metallic underline */}
              <span
                className="absolute left-0 -bottom-1 w-0 h-[2px] 
                bg-gradient-to-r from-[#b76e79] via-[#7f9ca8] to-[#4f6d7a]
                transition-all duration-300 group-hover:w-full"
              ></span>
            </Link>
          ))}
        </nav>

        {/* 🔥 RIGHT SIDE */}
        <div className="flex items-center gap-3">
          
          {/* Login */}
          <Link
            to={AuthRoutes.LOGIN}
            className="hidden md:block px-4 py-1.5 text-sm rounded-full 
            border border-white/10 text-white/70 
            hover:bg-white/10 transition"
          >
            Login
          </Link>

          {/* CTA */}
          <Link
            to={AuthRoutes.REGISTER}
            className="px-5 py-2 text-sm font-semibold rounded-full 
            text-white
            bg-[linear-gradient(135deg,#b76e79,#7f9ca8,#4f6d7a)]
            hover:opacity-90
            shadow-[0_0_20px_rgba(127,156,168,0.5)]
            transition-all duration-300"
          >
            Get Started
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;