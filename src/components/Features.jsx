import React from 'react';
import { Brain, BarChart3, Zap, Lock, Users, CheckCircle } from 'lucide-react';

const features = [
  {
    icon: Brain,
    title: 'AI Question Generator',
    description: 'Paste any reading passage, textbook chapter, or PDF URL and watch our AI instantly generate 20+ quiz questions with distractors.'
  },
  {
    icon: BarChart3,
    title: 'Real-Time Analytics',
    description: 'Instantly identify student learning gaps with automated post-game reports highlighting which questions tripped up the class.'
  },
  {
    icon: Zap,
    title: 'Zero Lag Live Sync',
    description: 'Engineered on ultra-fast WebSockets. Supports up to 500 simultaneous students per room with zero latency.'
  },
  {
    icon: Lock,
    title: 'Safe Student Access',
    description: 'No student accounts or email addresses required. Just enter the PIN and a nickname to join safely.'
  }
];

export default function Features() {
  return (
    <section id="teachers" className="py-24 bg-brand-dark relative overflow-hidden">
      
      {/* Background glow */}
      <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-brand-violet/15 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left info */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-violet/20 border border-brand-violet/40 text-brand-lime text-xs font-bold uppercase tracking-wider">
              Designed For Educators
            </div>
            
            <h2 className="font-heading text-4xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
              Built by teachers, loved by students.
            </h2>

            <p className="text-slate-300 text-lg leading-relaxed">
              We know how precious lesson planning time is. BrainBlitz gives you powerful tools to create engaging formative assessments in under a minute.
            </p>

            <div className="space-y-4 pt-2">
              {[
                'Zero preparation required with 100k+ ready-to-use quizzes',
                'Seamless integration with Google Classroom & Canvas',
                'Student-paced homework mode or live synchronous play'
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-brand-lime/20 flex items-center justify-center text-brand-lime shrink-0">
                    <CheckCircle className="w-4 h-4" />
                  </div>
                  <span className="text-slate-200 font-medium text-sm sm:text-base">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right grid of features */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {features.map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <div 
                  key={idx}
                  className="bg-brand-cardDark/80 backdrop-blur-xl border border-white/10 rounded-3xl p-8 hover:border-brand-violet/50 transition-all duration-300 hover:scale-[1.02] shadow-xl space-y-4 group"
                >
                  <div className="w-12 h-12 rounded-2xl bg-brand-violet/20 border border-brand-violet/40 flex items-center justify-center text-brand-lime group-hover:bg-brand-violet group-hover:text-white transition-colors">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-heading text-xl font-bold text-white">
                    {feature.title}
                  </h3>
                  <p className="text-slate-300 text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
