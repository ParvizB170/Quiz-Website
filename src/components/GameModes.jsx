import React from 'react';
import { Sparkles, ArrowRight, Play } from 'lucide-react';

const bentoModes = [
  {
    id: 'classic',
    title: 'Classic Blitz',
    subtitle: 'The Flagship Experience',
    description: 'The timeless arcade quiz experience featuring combo multipliers, dynamic streak bonuses, and live leaderboards updated every second.',
    emoji: '⚡️',
    players: '1 - 100+ players',
    size: 'col-span-1 md:col-span-2 lg:col-span-2 row-span-2',
    bg: 'from-violet-900/40 via-brand-cardDark to-brand-violet/20',
    border: 'border-brand-violet/50',
    highlight: 'bg-brand-lime text-brand-dark'
  },
  {
    id: 'team',
    title: 'Team Battle',
    subtitle: 'Collaborative Squads',
    description: 'Work together with classmates in synchronized squad quiz showdowns to conquer the arena.',
    emoji: '🤝',
    players: 'Teams of 2 - 5',
    size: 'col-span-1',
    bg: 'from-purple-900/30 to-brand-cardDark',
    border: 'border-white/10',
    highlight: 'bg-purple-500/20 text-purple-300'
  },
  {
    id: 'gold',
    title: 'Gold Rush',
    subtitle: 'Treasure & Loot',
    description: 'Collect gold chests, steal loot from rival players, and trigger high-stakes bonus rounds.',
    emoji: '🪙',
    players: '1 - 50 players',
    size: 'col-span-1',
    bg: 'from-amber-950/30 to-brand-cardDark',
    border: 'border-amber-500/30',
    highlight: 'bg-amber-400 text-slate-950'
  },
  {
    id: 'tower',
    title: 'Tower Defense',
    subtitle: 'Strategy & Trivia',
    description: 'Answer trivia correctly to build defensive turrets and fend off incoming monster waves.',
    emoji: '🛡️',
    players: 'Solo or Co-op',
    size: 'col-span-1',
    bg: 'from-emerald-950/30 to-brand-cardDark',
    border: 'border-emerald-500/30',
    highlight: 'bg-emerald-400 text-slate-950'
  },
  {
    id: 'speed',
    title: 'Speed Round',
    subtitle: 'Lightning Fast',
    description: 'Rapid-fire questions where answering fastest secures the ultimate crown.',
    emoji: '⏱️',
    players: 'High energy',
    size: 'col-span-1',
    bg: 'from-rose-950/30 to-brand-cardDark',
    border: 'border-rose-500/30',
    highlight: 'bg-rose-500 text-white'
  }
];

export default function GameModes({ onHostClick }) {
  return (
    <section id="game-modes" className="py-24 bg-brand-cardDark relative overflow-hidden">
      
      {/* Background glow effects */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-brand-violet/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-brand-lime/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-lime/10 border border-brand-lime/30 text-brand-lime text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            Immersive Gameplay
          </div>
          <h2 className="font-heading text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
            Game modes tailored for every classroom
          </h2>
          <p className="text-slate-300 text-lg">
            Say goodbye to boring multiple-choice worksheets. BrainBlitz bento game modes turn studying into an addictive gaming experience.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 auto-rows-[240px]">
          {bentoModes.map((mode) => (
            <div 
              key={mode.id}
              onClick={onHostClick}
              className={`${mode.size} bg-gradient-to-br ${mode.bg} backdrop-blur-xl border ${mode.border} rounded-3xl p-8 flex flex-col justify-between hover:border-brand-lime transition-all duration-300 hover:-translate-y-2 hover:rotate-[0.5deg] shadow-2xl group cursor-pointer relative overflow-hidden`}
            >
              {/* Top glow on hover */}
              <div className="absolute inset-0 bg-brand-violet/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

              <div className="flex items-start justify-between relative z-10">
                <div className="text-5xl sm:text-6xl transition-transform duration-300 group-hover:scale-125 group-hover:-translate-y-1 select-none">
                  {mode.emoji}
                </div>
                <div className="flex items-center gap-2">
                  <span className={`text-xs font-extrabold px-3 py-1 rounded-full ${mode.highlight} shadow-sm`}>
                    {mode.players}
                  </span>
                </div>
              </div>

              <div className="space-y-2 relative z-10 pt-4">
                <div className="text-xs font-semibold text-brand-lime uppercase tracking-wider">
                  {mode.subtitle}
                </div>
                <h3 className="font-heading text-2xl sm:text-3xl font-extrabold text-white group-hover:text-brand-lime transition-colors">
                  {mode.title}
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed line-clamp-2">
                  {mode.description}
                </p>
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center justify-between relative z-10">
                <span className="text-xs font-medium text-slate-400 flex items-center gap-1 group-hover:text-white transition-colors">
                  Click to host <ArrowRight className="w-3.5 h-3.5 text-brand-lime group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-brand-lime group-hover:bg-brand-lime group-hover:text-brand-dark transition-colors">
                  <Play className="w-3.5 h-3.5 fill-current" />
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* Bottom Banner */}
        <div className="mt-16 bg-gradient-to-r from-brand-violet/30 via-purple-900/40 to-brand-dark border border-brand-violet/40 rounded-3xl p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6 backdrop-blur-md shadow-2xl">
          <div className="space-y-2 text-center md:text-left">
            <h4 className="font-heading text-2xl sm:text-3xl font-extrabold text-white">
              Ready to create your first custom game?
            </h4>
            <p className="text-slate-300 text-sm sm:text-base max-w-xl">
              Import questions from Quizlet, Google Forms, or let our AI question generator build a game in 30 seconds.
            </p>
          </div>
          <button 
            onClick={onHostClick}
            className="btn-tactile bg-brand-lime hover:bg-brand-limeHover text-brand-dark font-heading font-extrabold px-8 py-4 rounded-2xl shadow-tactile-lime border-b-4 border-lime-700 whitespace-nowrap text-base"
          >
            Create Quiz Free
          </button>
        </div>

      </div>
    </section>
  );
}
