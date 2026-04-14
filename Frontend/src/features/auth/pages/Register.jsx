import React, { useState } from 'react';
import {useAuth} from "../hook/useAuth.js";
import { useNavigate } from 'react-router';
import ContinueWithGoogle from '../components/ContinueWithGoogle.jsx';

const Register = () => {
  const {handleRegister} = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: '',
    contactNumber: '',
    email: '',
    password: '',
    isSeller: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await handleRegister({
      email: formData.email,
      contact: formData.contactNumber,
      password: formData.password,
      fullname: formData.fullName,
      isSeller: formData.isSeller
    })
    navigate("/")
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center p-4 sm:p-6 font-sans text-[#faf9f7] overflow-x-hidden bg-cover bg-center bg-no-repeat relative
        bg-[url('/fashion_bg_mobile.png')] md:bg-[url('/fashion_bg_desktop.png')]"
    >
      {/* 
        Responsive Fashion Background: 
        We use a mobile-first portrait image for vertical screens (9:16) and 
        switch to the luxury boutique interior (16:9) on desktops (md+).
        Overlay ensures the 'Midnight Elite' branding remains legible.
      */}
      <div className="absolute inset-0 bg-[#05251E]/70 backdrop-blur-[1px]" />

      {/* 
        Refined Dark Card: Uses the primary branding green (#0A4A3C) as the card base.
        Shadows and borders are adjusted to be subtle yet effective on a dark background.
      */}
      <div className="w-[92%] max-w-md bg-[#0A4A3C] rounded-2xl p-6 sm:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/5 relative overflow-hidden">
        
        {/* Subtle Fashion Design Element: A gold accent line at the top */}
        <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-transparent via-[#F2B759] to-transparent opacity-80" />

        <header className="mb-6 sm:mb-8 text-center">
          {/* Snitch Branding in Gold */}
          <h1 className="text-2xl sm:text-3xl font-light tracking-[0.2em] mb-2 text-[#F2B759] uppercase">
            Snitch
          </h1>
          <p className="text-[#F2B759]/40 text-[9px] sm:text-xs font-medium uppercase tracking-widest sm:tracking-widest">
            The Fashion Elite Registry
          </p>
        </header>

        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
          {/* Full Name Field */}
          <div className="relative group">
            <label className="text-[9px] sm:text-[10px] font-bold uppercase tracking-widest sm:tracking-[0.15em] text-[#F2B759]/30 transition-colors group-focus-within:text-[#F2B759]">
              Full Name
            </label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Full Name"
              className="w-full bg-transparent border-b border-white/10 focus:border-[#F2B759] py-1.5 sm:py-2 outline-none transition-all duration-300 placeholder:text-white/10 text-sm"
              required
            />
          </div>

          {/* Contact Number Field */}
          <div className="relative group">
            <label className="text-[9px] sm:text-[10px] font-bold uppercase tracking-widest sm:tracking-[0.15em] text-[#F2B759]/30 transition-colors group-focus-within:text-[#F2B759]">
              Contact Number
            </label>
            <input
              type="tel"
              name="contactNumber"
              value={formData.contactNumber}
              onChange={handleChange}
              placeholder="+1 (555) 000-0000"
              className="w-full bg-transparent border-b border-white/10 focus:border-[#F2B759] py-1.5 sm:py-2 outline-none transition-all duration-300 placeholder:text-white/10 text-sm"
              required
            />
          </div>

          {/* Email Field */}
          <div className="relative group">
            <label className="text-[9px] sm:text-[10px] font-bold uppercase tracking-widest sm:tracking-[0.15em] text-[#F2B759]/30 transition-colors group-focus-within:text-[#F2B759]">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              className="w-full bg-transparent border-b border-white/10 focus:border-[#F2B759] py-1.5 sm:py-2 outline-none transition-all duration-300 placeholder:text-white/10 text-sm"
              required
            />
          </div>

          {/* Password Field */}
          <div className="relative group">
            <label className="text-[9px] sm:text-[10px] font-bold uppercase tracking-widest sm:tracking-[0.15em] text-[#F2B759]/30 transition-colors group-focus-within:text-[#F2B759]">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              className="w-full bg-transparent border-b border-white/10 focus:border-[#F2B759] py-1.5 sm:py-2 outline-none transition-all duration-300 placeholder:text-white/10 text-sm"
              required
            />
          </div>

          {/* Is Seller - Gold Toggle */}
          <div className="flex items-center justify-between pt-1">
            <span className="text-[10px] sm:text-[11px] font-semibold text-[#F2B759]/50 uppercase tracking-tight sm:tracking-wider">
              Apply for Seller Account
            </span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                name="isSeller"
                checked={formData.isSeller}
                onChange={handleChange}
                className="sr-only peer"
              />
              <div className="w-8 h-4 sm:w-10 sm:h-5 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-[#faf9f7] after:rounded-full after:h-3 after:w-3 sm:after:h-4 sm:after:w-4 after:transition-all peer-checked:bg-[#F2B759]"></div>
            </label>
          </div>
           

          {/* Submit Button - Elevated Gold */}
          <div className="pt-4 sm:pt-6">
            <button
              type="submit"
              className="w-full bg-[#F2B759] text-[#0A4A3C] font-bold text-[10px] sm:text-[11px] py-4 rounded-sm tracking-[0.15em] sm:tracking-[0.2em] uppercase hover:bg-[#efae44] hover:tracking-[0.2em] sm:hover:tracking-[0.25em] transition-all duration-500 ease-in-out transform active:scale-[0.99] shadow-[0_10px_30px_rgba(242,183,89,0.3)]"
            >
              Enter Marketplace
            </button>
          </div>

          {/* Divider */}
          <div className="relative flex items-center justify-center my-4 overflow-hidden">
            <div className="grow border-t border-white/5"></div>
            <span className="shrink mx-4 text-[9px] text-[#F2B759]/20 uppercase tracking-widest">or continue with</span>
            <div className="grow border-t border-white/5"></div>
          </div>

          <ContinueWithGoogle />
        </form>

        <footer className="mt-6 sm:mt-8 text-center text-[#F2B759]/20 text-[9px] sm:text-[10px] uppercase tracking-widest">
          Already verified? <a href="/login" className="text-[#F2B759] font-bold hover:underline transition-colors">Log In</a>
        </footer>
      </div>
    </div>
  );
};

export default Register;