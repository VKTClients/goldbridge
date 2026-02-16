"use client";

import { useState, useEffect, useRef } from "react";
import { Menu, X, Shield, LogOut, LayoutDashboard, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/context/AuthContext";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Trust", href: "/trust" },
  { label: "Packages", href: "/#pricing" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { user, setShowAuthModal, logout } = useAuth();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const handleLogout = () => {
    logout();
    setDropdownOpen(false);
    window.location.href = "/";
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
        scrolled
          ? "bg-[#060608]/70 backdrop-blur-2xl border-b border-white/[0.03]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 h-[72px] flex items-center justify-between">
        {/* Logo */}
        <a href="/" className="flex items-center gap-3 group">
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#D4AF37] via-[#C9A84C] to-[#B8942E] flex items-center justify-center shadow-lg shadow-[#D4AF37]/10 group-hover:shadow-[#D4AF37]/20 transition-shadow duration-500">
            <span className="text-[#060608] font-bold text-sm">G</span>
          </div>
          <div className="hidden sm:flex flex-col">
            <span className="text-white font-semibold text-[13px] tracking-wide leading-tight">
              Goldbridge
            </span>
            <span className="text-[#D4AF37]/60 text-[9px] uppercase tracking-[0.2em] font-medium">
              Capital
            </span>
          </div>
        </a>

        {/* Desktop Links - Liquid Glass Pill */}
        <div className="hidden lg:flex items-center gap-0.5 glass-subtle px-1.5 py-1">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="px-4 py-1.5 text-[12px] text-[#777] hover:text-white rounded-full hover:bg-white/[0.05] transition-all duration-300 font-medium tracking-wide"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Right side */}
        <div className="hidden lg:flex items-center gap-3">
          <div className="flex items-center gap-1.5 text-[11px] text-[#555] px-3 py-1.5 rounded-full border border-white/[0.04] bg-white/[0.02]">
            <Shield size={10} className="text-[#D4AF37]/60" />
            <span>Protected</span>
          </div>

          {user ? (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/[0.06] bg-white/[0.03] hover:bg-white/[0.06] transition-all duration-300"
              >
                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#B8942E] flex items-center justify-center">
                  <span className="text-[#060608] text-[10px] font-bold uppercase">
                    {user.name.charAt(0)}
                  </span>
                </div>
                <span className="text-white text-[11px] font-medium max-w-[80px] truncate">
                  {user.name}
                </span>
                <ChevronDown size={12} className={`text-[#555] transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""}`} />
              </button>

              <AnimatePresence>
                {dropdownOpen && (
                  <motion.div
                    className="absolute right-0 top-full mt-2 w-48 bg-[#0c0c10] border border-white/[0.06] rounded-xl shadow-2xl shadow-black/50 overflow-hidden"
                    initial={{ opacity: 0, y: -8, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -8, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                  >
                    <div className="p-3 border-b border-white/[0.04]">
                      <p className="text-white text-xs font-medium truncate">{user.name}</p>
                      <p className="text-[#444] text-[10px] truncate">{user.email}</p>
                    </div>
                    <div className="p-1.5">
                      <a
                        href="/dashboard"
                        className="flex items-center gap-2.5 px-3 py-2 text-[#888] hover:text-white hover:bg-white/[0.04] rounded-lg transition-all text-xs"
                        onClick={() => setDropdownOpen(false)}
                      >
                        <LayoutDashboard size={13} />
                        Dashboard
                      </a>
                      <button
                        onClick={handleLogout}
                        className="flex items-center gap-2.5 px-3 py-2 text-[#888] hover:text-red-400 hover:bg-red-500/[0.04] rounded-lg transition-all text-xs w-full text-left"
                      >
                        <LogOut size={13} />
                        Sign Out
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <>
              <button
                onClick={() => setShowAuthModal(true)}
                className="text-[#777] hover:text-white text-[11px] font-medium transition-colors duration-300 px-3 py-1.5"
              >
                Sign In
              </button>
              <button
                onClick={() => setShowAuthModal(true)}
                className="btn-gold text-[11px] font-semibold px-5 py-2 tracking-wide"
              >
                Get Started
              </button>
            </>
          )}
        </div>

        {/* Mobile Toggle */}
        <button
          className="lg:hidden text-white/80 w-11 h-11 flex items-center justify-center rounded-xl active:bg-white/[0.04] transition-colors"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="lg:hidden bg-[#060608]/98 backdrop-blur-xl border-t border-white/[0.03] overflow-hidden"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            <div className="px-6 py-5 flex flex-col gap-0.5" style={{ paddingBottom: 'max(1.25rem, env(safe-area-inset-bottom))' }}>
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-[#777] hover:text-white active:text-white transition-colors py-3.5 text-[15px] font-medium rounded-xl px-2 active:bg-white/[0.03]"
                >
                  {link.label}
                </a>
              ))}
              <div className="divider-gold my-3" />

              {user ? (
                <>
                  <a
                    href="/dashboard"
                    className="flex items-center gap-3 text-[#D4AF37] py-3.5 text-[15px] font-medium rounded-xl px-2 active:bg-[#D4AF37]/[0.06]"
                    onClick={() => setMobileOpen(false)}
                  >
                    <LayoutDashboard size={17} />
                    Dashboard
                  </a>
                  <button
                    onClick={() => { handleLogout(); setMobileOpen(false); }}
                    className="flex items-center gap-3 text-[#555] hover:text-red-400 active:text-red-400 py-3.5 text-[15px] font-medium transition-colors text-left rounded-xl px-2 active:bg-red-500/[0.04]"
                  >
                    <LogOut size={17} />
                    Sign Out
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => { setShowAuthModal(true); setMobileOpen(false); }}
                    className="text-[#777] hover:text-white active:text-white py-3.5 text-[15px] font-medium text-left rounded-xl px-2 active:bg-white/[0.03]"
                  >
                    Sign In
                  </button>
                  <button
                    onClick={() => { setShowAuthModal(true); setMobileOpen(false); }}
                    className="btn-gold text-sm mt-3 text-center py-3.5"
                  >
                    Get Started
                  </button>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
