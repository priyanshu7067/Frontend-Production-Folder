import React from "react";
import { MainContent } from "../constants/mainContent";
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import XIcon from '@mui/icons-material/X';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import YouTubeIcon from '@mui/icons-material/YouTube';
const Footer = () => {
  return (
    <footer className="bg-black text-gray-300 mt-20 border-t border-gray-800">

      {/* 🔥 MAIN GRID */}
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-2 md:grid-cols-4 gap-8">

        {/* 🔥 BRAND */}
        <div>
          <img src={MainContent.logo} alt="logo" className="w-20 mb-3" />
          <p className="text-sm text-gray-400">
            Build your future with smart shopping & earning platform.
          </p>
        </div>

        {/* 🔥 COMPANY */}
        <div>
          <h3 className="text-white font-semibold mb-3 text-sm">Company</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#about" className="hover:text-white transition">About</a></li>
            <li><a href="#contact" className="hover:text-white transition">Contact</a></li>
            <li><a href="#solution" className="hover:text-white transition">Solution</a></li>
          </ul>
        </div>

        {/* 🔥 SUPPORT */}
        <div>
          <h3 className="text-white font-semibold mb-3 text-sm">Support</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#faq" className="hover:text-white transition">FAQ</a></li>
            <li><a href="#policy" className="hover:text-white transition">Privacy Policy</a></li>
            <li><a href="#terms" className="hover:text-white transition">Terms</a></li>
          </ul>
        </div>

        {/* 🔥 SOCIAL */}
        <div>
          <h3 className="text-white font-semibold mb-3 text-sm">Follow Us</h3>

          <div className="flex gap-3 flex-wrap">

            <a href="#" className="p-2 bg-white/5 rounded-lg hover:bg-white/10 transition">
              <FacebookIcon size={18} />
            </a>

            <a href="#" className="p-2 bg-white/5 rounded-lg hover:bg-white/10 transition">
              <InstagramIcon size={18} />
            </a>

            <a href="#" className="p-2 bg-white/5 rounded-lg hover:bg-white/10 transition">
              <XIcon size={18} />
            </a>

            <a href="#" className="p-2 bg-white/5 rounded-lg hover:bg-white/10 transition">
              <LinkedInIcon size={18} />
            </a>

            <a href="#" className="p-2 bg-white/5 rounded-lg hover:bg-white/10 transition">
              <YouTubeIcon size={18} />
            </a>

          </div>
        </div>

      </div>

      {/* 🔥 BOTTOM */}
      <div className="border-t border-gray-800 text-center py-4 text-xs text-gray-500">
        © {new Date().getFullYear()} YourBrand. All rights reserved.
      </div>

    </footer>
  );
};

export default Footer;