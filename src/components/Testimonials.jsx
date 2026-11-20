import React from 'react';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    quote: "BrainBlitz has completely transformed my high school biology classes. Students who used to sleep through lectures are now begging to play Tower Defense to review for exams.",
    author: "Sarah Jenkins",
    role: "AP Biology Teacher",
    school: "Oakridge High School",
    rating: 5
  },
  {
    quote: "The AI question generator is an absolute game-changer. I can turn any PDF article into a competitive live quiz in 30 seconds flat before 1st period.",
    author: "Marcus Vance",
    role: "Middle School History Dept Chair",
    school: "Lincoln Academy",
    rating: 5
  },
  {
    quote: "Unlike other platforms that get clunky with 30+ kids, BrainBlitz runs with blazing speed. The 3D tactile buttons and sound effects make it feel like a real console game.",
    author: "Elena Rostova",
    role: "STEM Educator",
    school: "Metro Science Center",
    rating: 5
  }
];

export default function Testimonials() {
  return (
    <section className="py-24 bg-brand-cardDark relative overflow-hidden">
      
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-violet/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-lime/10 border border-brand-lime/30 text-brand-lime text-xs font-bold uppercase tracking-wider">
            Loved by 850k+ Teachers
          </div>
          <h2 className="font-heading text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
            What educators are saying
          </h2>
          <p className="text-slate-300 text-lg">
            Hear how teachers around the world are bringing joy and engagement back into their classrooms.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, idx) => (
            <div 
              key={idx}
              className="bg-brand-dark/80 backdrop-blur-xl border border-white/10 rounded-3xl p-8 flex flex-col justify-between shadow-xl relative group hover:border-brand-violet/50 transition-all duration-300"
            >
              <div className="space-y-6">
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-amber-400" />
                  ))}
                </div>

                <p className="text-slate-200 text-base leading-relaxed italic">
                  "{t.quote}"
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-white/10 flex items-center justify-between">
                <div>
                  <h4 className="font-heading text-lg font-bold text-white">
                    {t.author}
                  </h4>
                  <p className="text-xs text-brand-lime font-medium">
                    {t.role} • {t.school}
                  </p>
                </div>
                <div className="w-10 h-10 rounded-full bg-brand-violet/20 border border-brand-violet/40 flex items-center justify-center text-brand-lime font-heading font-bold">
                  {t.author[0]}
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
