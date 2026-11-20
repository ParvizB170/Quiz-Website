import React from 'react';
import { Play, Users, Trophy, Sparkles, ArrowRight } from 'lucide-react';

const steps = [
  {
    number: '01',
    title: 'Host a Game',
    description: 'Teachers pick or create a quiz in under a minute, select a game mode (like Tower Defense or Classic), and launch a live room.',
    icon: Play,
    color: 'from-violet-600 to-indigo-700',
    badge: 'Teacher Action'
  },
  {
    number: '02',
    title: 'Students Join',
    description: 'Students pull out any phone, tablet, or laptop, enter the 6-digit Game PIN on screen, and pick their custom gamer nickname.',
    icon: Users,
    color: 'from-purple-600 to-pink-700',
    badge: 'Instant Access'
  },
  {
    number: '03',
    title: 'Epic Live Play',
    description: 'The game begins! Students answer questions to climb the live leaderboard, earn power-ups, and battle for the crown.',
    icon: Trophy,
    color: 'from-amber-500 to-orange-600',
    badge: 'High Engagement'
  }
];

export default function HowItWorks({ onHostClick }) {
  return (
    <section className="py-24 bg-brand-cardDark relative overflow-hidden">
      
      {/* Background glow */}
      <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-brand-lime/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-lime/10 border border-brand-lime/30 text-brand-lime text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            Simple 3-Step Process
          </div>
          <h2 className="font-heading text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
            How BrainBlitz works
          </h2>
          <p className="text-slate-300 text-lg">
            From classroom setup to an arena of cheering students in less than 60 seconds.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div 
                key={idx}
                className="bg-brand-dark/80 backdrop-blur-xl border border-white/10 rounded-3xl p-8 sm:p-10 relative group hover:border-brand-violet/60 transition-all duration-300 hover:-translate-y-2 shadow-2xl flex flex-col justify-between"
              >
                {/* Step Number Badge */}
                <div className="absolute -top-5 left-10 font-heading text-4xl font-extrabold text-brand-lime bg-brand-cardDark px-4 py-1 rounded-2xl border border-brand-violet/50 shadow-lg">
                  {step.number}
                </div>

                <div className="space-y-6 pt-4">
                  <div className="flex items-center justify-between">
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                    <span className="text-xs font-bold px-3 py-1 rounded-full bg-white/5 border border-white/10 text-slate-300">
                      {step.badge}
                    </span>
                  </div>

                  <div className="space-y-3">
                    <h3 className="font-heading text-2xl font-bold text-white group-hover:text-brand-lime transition-colors">
                      {step.title}
                    </h3>
                    <p className="text-slate-300 text-base leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>

                <div className="pt-8 mt-8 border-t border-white/10">
                  <button 
                    onClick={onHostClick}
                    className="w-full py-3 rounded-xl bg-white/5 hover:bg-brand-violet/20 border border-white/10 hover:border-brand-violet text-slate-200 hover:text-white font-semibold text-sm transition-all flex items-center justify-center gap-2"
                  >
                    Get Started
                    <ArrowRight className="w-4 h-4 text-brand-lime" />
                  </button>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
