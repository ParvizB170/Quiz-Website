import React, { useRef } from 'react';
import { Flame, ChevronLeft, ChevronRight, Play, Users, HelpCircle } from 'lucide-react';

const trendingQuizzes = [
  {
    id: 1,
    title: 'AP Biology: Cellular Respiration & ATP',
    questions: 20,
    plays: '45.2K',
    creator: 'Dr. Aris Thorne',
    avatar: '🧬',
    bg: 'from-emerald-600 to-teal-800',
    tag: 'Science'
  },
  {
    id: 2,
    title: 'World History: Ancient Empires & Battles',
    questions: 25,
    plays: '82.9K',
    creator: 'Prof. Linda Chen',
    avatar: '🏛️',
    bg: 'from-amber-600 to-orange-800',
    tag: 'History'
  },
  {
    id: 3,
    title: 'Quantum Physics & General Relativity',
    questions: 15,
    plays: '19.4K',
    creator: 'Dr. Stephen K.',
    avatar: '⚛️',
    bg: 'from-violet-600 to-indigo-900',
    tag: 'Physics'
  },
  {
    id: 4,
    title: 'Advanced Calculus & Derivatives Masterclass',
    questions: 30,
    plays: '34.8K',
    creator: 'Jessica Taylor',
    avatar: '📐',
    bg: 'from-blue-600 to-cyan-800',
    tag: 'Mathematics'
  },
  {
    id: 5,
    title: 'World Geography: Flags, Capitals & Biomes',
    questions: 40,
    plays: '120K',
    creator: 'Mateo Gomez',
    avatar: '🌍',
    bg: 'from-rose-600 to-pink-800',
    tag: 'Geography'
  },
  {
    id: 6,
    title: 'Greek Mythology: Gods, Titans & Heroes',
    questions: 20,
    plays: '67.1K',
    creator: 'Chloe Adams',
    avatar: '⚡',
    bg: 'from-purple-600 to-fuchsia-900',
    tag: 'Literature'
  }
];

export default function TrendingQuizzes({ onHostClick }) {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollAmount = clientWidth * 0.75;
      scrollRef.current.scrollTo({
        left: direction === 'left' ? scrollLeft - scrollAmount : scrollLeft + scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section id="discover" className="py-24 bg-brand-dark relative overflow-hidden">
      
      {/* Background glow */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-brand-violet/15 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Header & Scroll Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-violet/20 border border-brand-violet/40 text-brand-lime text-xs font-bold uppercase tracking-wider">
              <Flame className="w-3.5 h-3.5 fill-brand-lime" />
              Trending Worldwide
            </div>
            <h2 className="font-heading text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
              Explore trending quizzes
            </h2>
            <p className="text-slate-300 text-lg max-w-xl">
              Discover ready-to-play educator-verified games or clone and customize them for your own classroom in seconds.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button 
              onClick={() => scroll('left')}
              className="p-3 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 text-white transition-colors"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button 
              onClick={() => scroll('right')}
              className="p-3 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 text-white transition-colors"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Horizontal Snap Scroll Container */}
        <div 
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-6 pt-2 scrollbar-none [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {trendingQuizzes.map((quiz) => (
            <div 
              key={quiz.id}
              className="w-[320px] sm:w-[360px] shrink-0 snap-start bg-brand-cardDark border border-white/10 rounded-3xl overflow-hidden shadow-2xl group hover:border-brand-violet/60 transition-all duration-300 flex flex-col justify-between"
            >
              {/* Colourful Cover Area */}
              <div className={`h-44 bg-gradient-to-br ${quiz.bg} p-6 relative flex flex-col justify-between overflow-hidden group/cover`}>
                
                {/* Decorative background pattern */}
                <div className="absolute -right-6 -bottom-6 text-9xl opacity-20 select-none group-hover/cover:scale-110 transition-transform">
                  {quiz.avatar}
                </div>

                <div className="flex items-center justify-between relative z-10">
                  <span className="text-xs font-extrabold px-3 py-1 rounded-full bg-black/30 backdrop-blur-md text-white border border-white/20">
                    {quiz.tag}
                  </span>
                  <span className="text-3xl select-none">
                    {quiz.avatar}
                  </span>
                </div>

                {/* Hover Play Overlay */}
                <div className="absolute inset-0 bg-black/60 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center z-20">
                  <button 
                    onClick={onHostClick}
                    className="btn-tactile bg-brand-lime hover:bg-brand-limeHover text-brand-dark font-heading font-extrabold px-6 py-3 rounded-2xl shadow-tactile-lime border-b-4 border-lime-700 flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-transform text-base"
                  >
                    <Play className="w-5 h-5 fill-brand-dark text-brand-dark" />
                    Host Quiz Now
                  </button>
                </div>

                <div className="relative z-10 flex items-center gap-4 text-white/90 text-xs font-semibold">
                  <span className="flex items-center gap-1.5 bg-black/20 backdrop-blur-sm px-2.5 py-1 rounded-lg">
                    <HelpCircle className="w-3.5 h-3.5 text-brand-lime" />
                    {quiz.questions} Questions
                  </span>
                  <span className="flex items-center gap-1.5 bg-black/20 backdrop-blur-sm px-2.5 py-1 rounded-lg">
                    <Users className="w-3.5 h-3.5 text-brand-lime" />
                    {quiz.plays} plays
                  </span>
                </div>

              </div>

              {/* Card Body */}
              <div className="p-6 space-y-6 flex-1 flex flex-col justify-between">
                <h3 className="font-heading text-xl font-bold text-white group-hover:text-brand-lime transition-colors leading-snug line-clamp-2">
                  {quiz.title}
                </h3>

                <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-brand-violet/30 border border-brand-violet/50 flex items-center justify-center text-sm">
                      {quiz.avatar}
                    </div>
                    <div>
                      <div className="text-xs text-slate-400 font-medium">Created by</div>
                      <div className="text-sm font-bold text-white">{quiz.creator}</div>
                    </div>
                  </div>

                  <button 
                    onClick={onHostClick}
                    className="w-10 h-10 rounded-xl bg-white/5 hover:bg-brand-violet border border-white/10 hover:border-brand-violet flex items-center justify-center text-slate-300 hover:text-white transition-all"
                    aria-label="Host quiz"
                  >
                    <Play className="w-4 h-4 fill-current" />
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
