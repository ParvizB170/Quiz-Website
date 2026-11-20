import React from 'react';
import { ArrowRight, Sparkles, Play, Zap } from 'lucide-react';

export default function CTA({ onHostClick }) {
  return (
    <section className="py-24 bg-brand-dark bg-grain relative overflow-hidden">
      
      {/* Background glow mesh */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-brand-violet/30 rounded-full blur-[160px] pointer-events-none animate-blob-1" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative text-center">
        
        <div className="bg-gradient-to-br from-brand-violet/40 via-purple-900/50 to-brand-cardDark border border-brand-violet/50 rounded-3xl p-10 sm:p-16 backdrop-blur-2xl shadow-2xl relative overflow-hidden group">
          
          {/* Decorative corner flash */}
          <div className="absolute -top-12 -right-12 w-40 h-40 bg-brand-lime/20 rounded-full blur-3xl pointer-events-none" />

          <div className="space-y-6 max-w-2xl mx-auto">
            
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-lime/20 border border-brand-lime/40 text-brand-lime text-xs font-bold uppercase tracking-wider">
              <Zap className="w-4 h-4 fill-brand-lime" />
              Get Started in 30 Seconds
            </div>

            <h2 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight">
              Ready to electrify your classroom?
            </h2>

            <p className="text-slate-200 text-lg sm:text-xl font-normal leading-relaxed">
              Join millions of students and teachers already playing BrainBlitz. Free for educators forever.
            </p>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button 
                onClick={onHostClick}
                className="w-full sm:w-auto btn-tactile bg-brand-lime hover:bg-brand-limeHover text-brand-dark font-heading font-extrabold px-9 py-4 rounded-2xl shadow-tactile-lime border-b-4 border-lime-700 flex items-center justify-center gap-3 text-lg"
              >
                <Play className="w-5 h-5 fill-brand-dark text-brand-dark" />
                Host a Game Now
                <ArrowRight className="w-5 h-5" />
              </button>

              <a 
                href="#discover"
                className="w-full sm:w-auto px-9 py-4 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-heading font-bold border border-white/20 backdrop-blur-md transition-all flex items-center justify-center gap-2 text-lg"
              >
                Explore Library
              </a>
            </div>

            <p className="text-xs text-slate-400 font-medium pt-2">
              No credit card required • Free forever plan for all teachers
            </p>

          </div>

        </div>

      </div>
    </section>
  );
}
