import React, { useState } from 'react';
import { ArrowRight, Sparkles, CheckCircle2, ShieldCheck, Users, Zap, Trophy, Play } from 'lucide-react';

export default function Hero({ onJoinGame, onHostClick }) {
  const [pin, setPin] = useState('');
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleJoin = (e) => {
    e.preventDefault();
    if (pin.trim().length < 4) {
      setError(true);
      setTimeout(() => setError(false), 2000);
      return;
    }
    setSuccess(true);
    setTimeout(() => {
      onJoinGame(pin);
    }, 800);
  };

  const handleQuickPin = (samplePin) => {
    setPin(samplePin);
    setSuccess(true);
    setTimeout(() => {
      onJoinGame(samplePin);
    }, 800);
  };

  return (
    <section className="relative min-h-[92vh] pt-32 pb-20 overflow-hidden bg-brand-dark bg-grain flex items-center">
      
      {/* Gradient Mesh Atmospheric Blobs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-brand-violet/25 rounded-full blur-[140px] pointer-events-none animate-blob-1" />
      <div className="absolute top-1/3 left-10 w-[500px] h-[500px] bg-brand-lime/15 rounded-full blur-[120px] pointer-events-none animate-blob-2" />
      <div className="absolute bottom-10 right-10 w-[600px] h-[600px] bg-purple-600/20 rounded-full blur-[150px] pointer-events-none animate-blob-3" />

      {/* Grid overlay for modern 2026 tech feel */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Huge Confident Headline & CTA */}
          <div className="lg:col-span-7 space-y-8 text-center lg:text-left">
            
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-violet/20 border border-brand-violet/40 text-brand-lime text-xs sm:text-sm font-bold tracking-wide uppercase backdrop-blur-md shadow-glow-violet">
              <Sparkles className="w-4 h-4 text-brand-lime animate-spin" style={{ animationDuration: '6s' }} />
              <span>Next-Gen Live Learning Platform</span>
              <span className="w-1.5 h-1.5 rounded-full bg-brand-lime animate-ping" />
            </div>

            {/* Headline */}
            <h1 className="font-heading text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.08]">
              Make learning a <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-lime via-emerald-300 to-teal-400">game.</span>
            </h1>

            {/* Subheading */}
            <p className="text-lg sm:text-xl text-slate-300 font-normal max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Transform any classroom or lecture hall into an epic arena of high-energy competition. Host immersive quizzes, tower defense challenges, and live team battles in seconds.
            </p>

            {/* CTA Group */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <button 
                onClick={onHostClick}
                className="w-full sm:w-auto btn-tactile bg-brand-lime hover:bg-brand-limeHover text-brand-dark font-heading font-extrabold px-8 py-4 rounded-2xl shadow-tactile-lime border-b-4 border-lime-700 flex items-center justify-center gap-3 text-base tracking-wide"
              >
                <Play className="w-5 h-5 fill-brand-dark text-brand-dark" />
                Host a Free Game
                <ArrowRight className="w-5 h-5" />
              </button>

              <a 
                href="#game-modes"
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-white/5 hover:bg-white/10 text-white font-heading font-bold border border-white/15 backdrop-blur-md transition-all flex items-center justify-center gap-2 text-base"
              >
                Explore Modes
              </a>
            </div>

            {/* Social Proof Stats */}
            <div className="pt-8 border-t border-white/10 grid grid-cols-3 gap-6 max-w-lg mx-auto lg:mx-0">
              <div>
                <div className="font-heading text-2xl sm:text-3xl font-extrabold text-white">12M+</div>
                <div className="text-xs sm:text-sm text-slate-400 font-medium">Active Students</div>
              </div>
              <div>
                <div className="font-heading text-2xl sm:text-3xl font-extrabold text-brand-lime">850K</div>
                <div className="text-xs sm:text-sm text-slate-400 font-medium">Teachers Worldwide</div>
              </div>
              <div>
                <div className="font-heading text-2xl sm:text-3xl font-extrabold text-purple-300">99.9%</div>
                <div className="text-xs sm:text-sm text-slate-400 font-medium">Uptime & Speed</div>
              </div>
            </div>

          </div>

          {/* Right Column: White Card with Game PIN Input */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="w-full max-w-md bg-white rounded-3xl p-8 sm:p-10 shadow-[0_25px_60px_-15px_rgba(124,58,237,0.3)] border border-white/20 relative group">
              
              {/* Floating decorative badge */}
              <div className="absolute -top-4 -right-4 bg-brand-lime text-brand-dark font-heading font-extrabold text-xs px-3.5 py-1.5 rounded-full shadow-lg border-2 border-brand-dark flex items-center gap-1.5 animate-bounce" style={{ animationDuration: '3s' }}>
                <Zap className="w-3.5 h-3.5 fill-brand-dark" />
                Instant Join
              </div>

              <div className="text-center space-y-2 mb-8">
                <h3 className="font-heading text-3xl font-extrabold text-slate-900 tracking-tight">
                  Join a Game
                </h3>
                <p className="text-slate-600 text-sm font-medium">
                  Enter the 6-digit Game PIN provided by your host
                </p>
              </div>

              <form onSubmit={handleJoin} className="space-y-6">
                <div className="space-y-2">
                  <div className="relative">
                    <input 
                      type="text"
                      maxLength={6}
                      value={pin}
                      onChange={(e) => setPin(e.target.value.replace(/\D/g, ''))}
                      placeholder="e.g. 482910"
                      className={`w-full text-center tracking-[0.4em] font-heading text-3xl sm:text-4xl font-extrabold py-4 px-4 bg-slate-100 rounded-2xl border-2 transition-all outline-none text-slate-900 placeholder:text-slate-400 placeholder:tracking-normal placeholder:text-xl ${
                        error 
                          ? 'border-red-500 bg-red-50 text-red-900 animate-shake' 
                          : success
                          ? 'border-emerald-500 bg-emerald-50 text-emerald-900'
                          : 'border-slate-200 focus:border-brand-violet focus:bg-white focus:ring-4 focus:ring-brand-violet/10'
                      }`}
                    />
                    {success && (
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 text-emerald-600 flex items-center gap-1">
                        <CheckCircle2 className="w-7 h-7 fill-emerald-100" />
                      </div>
                    )}
                  </div>
                  {error && (
                    <p className="text-xs font-semibold text-red-500 text-center animate-pulse">
                      Please enter a valid 6-digit PIN code.
                    </p>
                  )}
                  {success && (
                    <p className="text-xs font-semibold text-emerald-600 text-center animate-pulse">
                      Connecting to game room...
                    </p>
                  )}
                </div>

                <button 
                  type="submit"
                  className="w-full btn-tactile bg-brand-violet hover:bg-brand-violetDark text-white font-heading font-extrabold py-4 rounded-2xl shadow-tactile border-b-4 border-violet-900 text-lg tracking-wide flex items-center justify-center gap-2 group-hover:shadow-[0_8px_25px_rgba(124,58,237,0.4)] transition-all"
                >
                  Enter Game
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </form>

              {/* Sample PINs for easy exploration */}
              <div className="mt-8 pt-6 border-t border-slate-100">
                <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 text-center">
                  Or test with live demo rooms:
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <button 
                    onClick={() => handleQuickPin('992810')}
                    className="py-2.5 px-3 rounded-xl bg-slate-50 hover:bg-brand-violet/10 hover:text-brand-violet text-slate-700 font-semibold text-xs border border-slate-200 transition-all flex items-center justify-center gap-1.5"
                  >
                    <Trophy className="w-3.5 h-3.5 text-amber-500" />
                    Science Quiz (992-810)
                  </button>
                  <button 
                    onClick={() => handleQuickPin('773142')}
                    className="py-2.5 px-3 rounded-xl bg-slate-50 hover:bg-brand-violet/10 hover:text-brand-violet text-slate-700 font-semibold text-xs border border-slate-200 transition-all flex items-center justify-center gap-1.5"
                  >
                    <Zap className="w-3.5 h-3.5 text-brand-violet" />
                    Math Blitz (773-142)
                  </button>
                </div>
              </div>

              {/* Secure badge */}
              <div className="mt-6 flex items-center justify-center gap-2 text-xs text-slate-500 font-medium">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Safe & COPPA compliant classroom environment</span>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
