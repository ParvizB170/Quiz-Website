import React, { useState, useEffect } from 'react';
import { Zap, Menu, X, Sparkles, Play, ShieldAlert } from 'lucide-react';

export default function Navbar({ onHostClick }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled 
        ? 'backdrop-blur-md bg-brand-dark/80 border-b border-white/10 shadow-2xl py-3' 
        : 'bg-transparent py-5'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        
        {/* Logo */}
        <a href="#" className="flex items-center gap-2 group">
          <div className="w-10 h-10 rounded-xl bg-brand-violet flex items-center justify-center shadow-tactile border border-violet-400/30 group-hover:scale-105 transition-transform">
            <Zap className="w-6 h-6 text-brand-lime fill-brand-lime" />
          </div>
          <span className="font-heading text-2xl font-bold tracking-tight text-white">
            Brain<span className="text-brand-lime">Blitz</span>
          </span>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 bg-white/5 backdrop-blur-sm px-6 py-2.5 rounded-full border border-white/10 shadow-inner">
          <a href="#discover" className="text-sm font-medium text-slate-200 hover:text-brand-lime transition-colors">
            Discover
          </a>
          <a href="#game-modes" className="text-sm font-medium text-slate-200 hover:text-brand-lime transition-colors flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-brand-lime" />
            Game Modes
          </a>
          <a href="#teachers" className="text-sm font-medium text-slate-200 hover:text-brand-lime transition-colors">
            For Teachers
          </a>
          <a href="#pricing" className="text-sm font-medium text-slate-200 hover:text-brand-lime transition-colors">
            Pricing
          </a>
        </nav>

        {/* Action Buttons */}
        <div className="hidden md:flex items-center gap-4">
          <a 
            href="#login" 
            className="text-sm font-semibold text-slate-300 hover:text-white px-4 py-2 transition-colors"
          >
            Log in
          </a>
          <button 
            onClick={onHostClick}
            className="btn-tactile bg-brand-violet hover:bg-brand-violetDark text-white font-heading font-bold px-5 py-2.5 rounded-xl shadow-tactile border-b-4 border-violet-900 flex items-center gap-2 text-sm"
          >
            <Play className="w-4 h-4 fill-white text-white" />
            Host a game
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-xl bg-white/5 border border-white/10 text-slate-200 hover:text-white"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-brand-dark/95 backdrop-blur-xl border-b border-white/10 px-6 py-6 space-y-4 shadow-2xl animate-in slide-in-from-top-2">
          <a 
            href="#discover" 
            onClick={() => setMobileMenuOpen(false)}
            className="block text-base font-medium text-slate-200 hover:text-brand-lime py-2 border-b border-white/5"
          >
            Discover
          </a>
          <a 
            href="#game-modes" 
            onClick={() => setMobileMenuOpen(false)}
            className="block text-base font-medium text-slate-200 hover:text-brand-lime py-2 border-b border-white/5"
          >
            Game Modes
          </a>
          <a 
            href="#teachers" 
            onClick={() => setMobileMenuOpen(false)}
            className="block text-base font-medium text-slate-200 hover:text-brand-lime py-2 border-b border-white/5"
          >
            For Teachers
          </a>
          <a 
            href="#pricing" 
            onClick={() => setMobileMenuOpen(false)}
            className="block text-base font-medium text-slate-200 hover:text-brand-lime py-2 border-b border-white/5"
          >
            Pricing
          </a>
          <div className="pt-2 flex flex-col gap-3">
            <a 
              href="#login" 
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-3 rounded-xl bg-white/5 border border-white/10 font-semibold text-white"
            >
              Log in
            </a>
            <button 
              onClick={() => { setMobileMenuOpen(false); onHostClick(); }}
              className="w-full btn-tactile bg-brand-violet text-white font-heading font-bold py-3 rounded-xl shadow-tactile border-b-4 border-violet-900 flex items-center justify-center gap-2"
            >
              <Play className="w-4 h-4 fill-white text-white" />
              Host a game
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
