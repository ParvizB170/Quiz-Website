import React, { useState } from 'react';
import { X, Play, Zap, Users, Trophy, ArrowRight, CheckCircle2, Shield, Sparkles } from 'lucide-react';

export default function GameModal({ mode, initialPin, onClose }) {
  const [step, setStep] = useState(initialPin ? 'nickname' : 'host-setup');
  const [nickname, setNickname] = useState('');
  const [pin] = useState(initialPin || '482910');
  const [joined, setJoined] = useState(false);

  const handleJoinSubmit = (e) => {
    e.preventDefault();
    if (!nickname.trim()) return;
    setJoined(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl bg-brand-cardDark border border-brand-violet/40 rounded-3xl p-8 shadow-2xl text-white overflow-hidden">
        
        {/* Glow */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-brand-violet/20 rounded-full blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-slate-300 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {mode === 'join' && !joined && (
          <div className="space-y-6">
            <div className="space-y-2 text-center">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-lime/10 text-brand-lime text-xs font-bold uppercase tracking-wider">
                <Zap className="w-3.5 h-3.5 fill-brand-lime" />
                Game PIN: {pin}
              </div>
              <h3 className="font-heading text-3xl font-extrabold">
                Choose your nickname
              </h3>
              <p className="text-slate-300 text-sm">
                Enter your name or cool gamer handle to join the live room.
              </p>
            </div>

            <form onSubmit={handleJoinSubmit} className="space-y-4">
              <div>
                <input 
                  type="text"
                  maxLength={15}
                  value={nickname}
                  onChange={(e) => setNickname(e.target.value)}
                  placeholder="e.g. ThunderCoder"
                  autoFocus
                  className="w-full text-center font-heading text-2xl font-bold py-4 px-4 bg-brand-dark rounded-2xl border-2 border-white/20 focus:border-brand-lime focus:outline-none text-white placeholder:text-slate-600"
                />
              </div>

              <button 
                type="submit"
                className="w-full btn-tactile bg-brand-lime hover:bg-brand-limeHover text-brand-dark font-heading font-extrabold py-4 rounded-2xl shadow-tactile-lime border-b-4 border-lime-700 text-lg flex items-center justify-center gap-2"
              >
                Let's Go!
                <ArrowRight className="w-5 h-5" />
              </button>
            </form>
          </div>
        )}

        {mode === 'join' && joined && (
          <div className="text-center space-y-6 py-6 animate-in zoom-in-95">
            <div className="w-20 h-20 rounded-3xl bg-brand-lime/20 border-2 border-brand-lime flex items-center justify-center mx-auto text-brand-lime shadow-glow-lime animate-bounce">
              <Trophy className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <h3 className="font-heading text-3xl font-extrabold text-white">
                You're in, {nickname}!
              </h3>
              <p className="text-slate-300 text-sm max-w-sm mx-auto">
                Waiting for the host to start the game. Look up at the big screen!
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-brand-dark border border-white/10 flex items-center justify-between">
              <span className="text-xs text-slate-400 font-medium">Room PIN:</span>
              <span className="font-heading font-bold text-brand-lime tracking-widest">{pin}</span>
            </div>

            <button 
              onClick={onClose}
              className="text-xs font-bold text-slate-400 hover:text-white underline"
            >
              Leave Game Room
            </button>
          </div>
        )}

        {mode === 'host' && (
          <div className="space-y-6">
            <div className="space-y-2 text-center">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-violet/20 text-brand-lime text-xs font-bold uppercase tracking-wider border border-brand-violet/40">
                <Sparkles className="w-3.5 h-3.5" />
                Teacher Host Dashboard
              </div>
              <h3 className="font-heading text-3xl font-extrabold">
                Host a Live Game
              </h3>
              <p className="text-slate-300 text-sm">
                Select a game mode to generate a room PIN for your students.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div 
                onClick={onClose}
                className="p-4 rounded-2xl bg-brand-dark border border-brand-violet/40 hover:border-brand-lime cursor-pointer transition-all space-y-2 group"
              >
                <div className="w-10 h-10 rounded-xl bg-violet-600 flex items-center justify-center font-bold">🛡️</div>
                <h4 className="font-heading font-bold text-white group-hover:text-brand-lime">Tower Defense</h4>
                <p className="text-xs text-slate-400">Strategy & turret building</p>
              </div>

              <div 
                onClick={onClose}
                className="p-4 rounded-2xl bg-brand-dark border border-brand-violet/40 hover:border-brand-lime cursor-pointer transition-all space-y-2 group"
              >
                <div className="w-10 h-10 rounded-xl bg-amber-500 flex items-center justify-center font-bold">🪙</div>
                <h4 className="font-heading font-bold text-white group-hover:text-brand-lime">Gold Quest</h4>
                <p className="text-xs text-slate-400">Treasure chests & loot</p>
              </div>
            </div>

            <button 
              onClick={onClose}
              className="w-full btn-tactile bg-brand-violet hover:bg-brand-violetDark text-white font-heading font-extrabold py-3.5 rounded-2xl shadow-tactile border-b-4 border-violet-900"
            >
              Launch Quick Game Room (PIN: 992810)
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
