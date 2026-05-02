import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getToken } from "../utils/authStorage";

const ContactSection = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const token = getToken();

    // 🔐 AUTH CHECK
    if (!token) {
      toast.info("Please login first to contact us");
      navigate("/login");
      return;
    }

    // ✅ Submit logic (replace with API later)
    console.log("Form submitted:", form);
    toast.success("Message sent successfully 🚀");

    setForm({
      name: "",
      email: "",
      message: "",
    });
  };

  return (
    <section
      id="contact"
      className="relative py-20 px-6 bg-gradient-dark overflow-hidden"
    >
      {/* 🔥 Background Glow */}
      <div className="absolute inset-0 pointer-events-none opacity-30">
        <div className="absolute w-[350px] h-[350px] bg-[#22d3ee]/20 blur-[120px] top-[-80px] right-[-80px]" />
        <div className="absolute w-[350px] h-[350px] bg-[#06b6d4]/20 blur-[120px] bottom-[-80px] left-[-80px]" />
      </div>

      <div className="relative max-w-5xl mx-auto">
        {/* HEADER */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold text-gradient text-glow">
            Contact Us
          </h2>
          <p className="mt-4 text-gray-400 text-sm md:text-base max-w-xl mx-auto">
            Have questions about trading, investments, or our platform?  
            Reach out to us and our team will assist you.
          </p>
        </div>

        {/* FORM */}
        <form
          onSubmit={handleSubmit}
          className="glass p-6 md:p-8 rounded-2xl space-y-5"
        >
          {/* NAME */}
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Your Name"
            required
            className="
              w-full px-4 py-3 rounded-lg
              bg-black/40 border border-white/10
              text-white placeholder-gray-400
              focus:border-[#22d3ee] focus:ring-2 focus:ring-[#22d3ee]
              outline-none transition
            "
          />

          {/* EMAIL */}
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Your Email"
            required
            className="
              w-full px-4 py-3 rounded-lg
              bg-black/40 border border-white/10
              text-white placeholder-gray-400
              focus:border-[#22d3ee] focus:ring-2 focus:ring-[#22d3ee]
              outline-none transition
            "
          />

          {/* MESSAGE */}
          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            placeholder="Your Message..."
            rows={4}
            required
            className="
              w-full px-4 py-3 rounded-lg
              bg-black/40 border border-white/10
              text-white placeholder-gray-400
              focus:border-[#22d3ee] focus:ring-2 focus:ring-[#22d3ee]
              outline-none transition resize-none
            "
          />

          {/* BUTTON */}
          <button
            type="submit"
            className="
              w-full py-3 rounded-lg font-semibold
              bg-gradient-to-r from-[#06b6d4] to-[#22d3ee]
              text-black
              shadow-[0_0_18px_rgba(34,211,238,0.5)]
              hover:shadow-[0_0_25px_rgba(34,211,238,0.8)]
              transition-all duration-300
            "
          >
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
};

export default ContactSection;