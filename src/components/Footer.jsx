import React from 'react';
import { Zap, Globe, Share2, MessageCircle, Bookmark, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-brand-dark border-t border-white/10 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-16 border-b border-white/10">
          
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-brand-violet flex items-center justify-center shadow-tactile border border-violet-400/30">
                <Zap className="w-6 h-6 text-brand-lime fill-brand-lime" />
              </div>
              <span className="font-heading text-2xl font-bold tracking-tight text-white">
                Brain<span className="text-brand-lime">Blitz</span>
              </span>
            </div>

            <p className="text-slate-400 text-sm max-w-sm leading-relaxed">
              The next-generation live quiz game platform where teachers host immersive learning battles and students join instantly from any device.
            </p>

            <div className="flex items-center gap-4 text-slate-400">
              <a href="#" className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:text-brand-lime hover:border-brand-violet transition-colors" aria-label="Website">
                <Globe className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:text-brand-lime hover:border-brand-violet transition-colors" aria-label="Community">
                <MessageCircle className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:text-brand-lime hover:border-brand-violet transition-colors" aria-label="Share">
                <Share2 className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:text-brand-lime hover:border-brand-violet transition-colors" aria-label="Resources">
                <Bookmark className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Links Column 1 */}
          <div className="space-y-4">
            <h4 className="font-heading text-sm font-bold uppercase tracking-wider text-white">
              Product
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li><a href="#game-modes" className="hover:text-brand-lime transition-colors">Tower Defense</a></li>
              <li><a href="#game-modes" className="hover:text-brand-lime transition-colors">Gold Quest</a></li>
              <li><a href="#game-modes" className="hover:text-brand-lime transition-colors">Battle Royale</a></li>
              <li><a href="#game-modes" className="hover:text-brand-lime transition-colors">AI Question Gen</a></li>
              <li><a href="#pricing" className="hover:text-brand-lime transition-colors">Pricing & Plans</a></li>
            </ul>
          </div>

          {/* Links Column 2 */}
          <div className="space-y-4">
            <h4 className="font-heading text-sm font-bold uppercase tracking-wider text-white">
              For Educators
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li><a href="#teachers" className="hover:text-brand-lime transition-colors">Teacher Guide</a></li>
              <li><a href="#" className="hover:text-brand-lime transition-colors">Quiz Library</a></li>
              <li><a href="#" className="hover:text-brand-lime transition-colors">Professional Dev</a></li>
              <li><a href="#" className="hover:text-brand-lime transition-colors">School Districts</a></li>
              <li><a href="#" className="hover:text-brand-lime transition-colors">Safety & COPPA</a></li>
            </ul>
          </div>

          {/* Links Column 3 */}
          <div className="space-y-4">
            <h4 className="font-heading text-sm font-bold uppercase tracking-wider text-white">
              Company
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li><a href="#" className="hover:text-brand-lime transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-brand-lime transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-brand-lime transition-colors">Press Kit</a></li>
              <li><a href="#" className="hover:text-brand-lime transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-brand-lime transition-colors">Terms of Service</a></li>
            </ul>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 font-medium">
          <p>© 2026 BrainBlitz Inc. All rights reserved. Made with lightning speed for modern classrooms.</p>
          <div className="flex items-center gap-1">
            <span>Powered by high-energy fun</span>
            <Heart className="w-3.5 h-3.5 text-brand-lime fill-brand-lime" />
          </div>
        </div>

      </div>
    </footer>
  );
}
