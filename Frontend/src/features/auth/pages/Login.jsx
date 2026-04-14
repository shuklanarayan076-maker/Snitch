import React, { useState } from 'react';
import { useAuth } from "../hook/useAuth.js";
import { useNavigate } from 'react-router';

/**
 * Login Component
 * 
 * Design Philosophy: "The Nocturnal Atelier"
 * - Deep, dark theme synchronized with the Snitch registration form.
 * - High-end fashion aesthetic with responsive backgrounds.
 * - Colors: Warm Gold (#F2B759) on Deep Forest Green (#0A4A3C / #05251E).
 */
const Login = () => {
  const { handleLogin } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await handleLogin({
        email: formData.email,
        password: formData.password,
      });
      navigate("/");
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center p-4 sm:p-6 font-sans text-[#faf9f7] overflow-x-hidden bg-cover bg-center bg-no-repeat relative
        bg-[url('/fashion_bg_mobile.png')] md:bg-[url('/fashion_bg_desktop.png')]"
    >
      {/* 
        Responsive Fashion Background: 
        Matches the Register form with a dark green overlay and subtle blur.
      */}
      <div className="absolute inset-0 bg-[#05251E]/70 backdrop-blur-[1px]" />

      {/* 
        Refined Dark Card: Synchronized with the Registration form.
      */}
      <div className="w-[92%] max-w-md bg-[#0A4A3C] rounded-2xl p-6 sm:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/5 relative overflow-hidden">
        
        {/* Subtle Fashion Design Element: A gold accent line at the top */}
        <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-transparent via-[#F2B759] to-transparent opacity-80" />

        <header className="mb-6 sm:mb-8 text-center">
          {/* Snitch Branding in Gold */}
          <h1 className="text-2xl sm:text-3xl font-light tracking-[0.2em] mb-2 text-[#F2B759] uppercase">
            Snitch
          </h1>
          <p className="text-[#F2B759]/40 text-[9px] sm:text-xs font-medium uppercase tracking-widest">
            Welcome Back to the Elite
          </p>
        </header>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email Field */}
          <div className="relative group">
            <label className="text-[9px] sm:text-[10px] font-bold uppercase tracking-widest sm:tracking-[0.15em] text-[#F2B759]/30 transition-colors group-focus-within:text-[#F2B759]">
              Email Address
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

          {/* Submit Button - Elevated Gold */}
          <div className="pt-4 sm:pt-6">
            <button
              type="submit"
              className="w-full bg-[#F2B759] text-[#0A4A3C] font-bold text-[10px] sm:text-[11px] py-4 rounded-sm tracking-[0.15em] sm:tracking-[0.2em] uppercase hover:bg-[#efae44] hover:tracking-[0.2em] sm:hover:tracking-[0.25em] transition-all duration-500 ease-in-out transform active:scale-[0.99] shadow-[0_10px_30px_rgba(242,183,89,0.3)]"
            >
              Sign In
            </button>
          </div>
        </form>

        <footer className="mt-6 sm:mt-8 text-center text-[#F2B759]/20 text-[9px] sm:text-[10px] uppercase tracking-widest">
          New to Snitch? <a href="/register" className="text-[#F2B759] font-bold hover:underline transition-colors">Join Now</a>
        </footer>
      </div>
    </div>
  );
};

export default Login;