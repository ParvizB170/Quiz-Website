import React, { useState, useRef, useEffect } from 'react';
import { X, ArrowRight, Zap, Trophy, Sparkles, CheckCircle2, ShieldCheck, RefreshCw } from 'lucide-react';

const blitzerAvatars = [
  { id: 1, emoji: '🦊', name: 'Foxy Blitz', rarity: 'Common', color: 'border-amber-500/50 bg-amber-500/10 text-amber-300' },
  { id: 2, emoji: '🐱', name: 'Cyber Cat', rarity: 'Common', color: 'border-blue-500/50 bg-blue-500/10 text-blue-300' },
  { id: 3, emoji: '🐼', name: 'Ninja Panda', rarity: 'Rare', color: 'border-emerald-500/50 bg-emerald-500/10 text-emerald-300' },
  { id: 4, emoji: '🦖', name: 'Mega Dino', rarity: 'Epic', color: 'border-purple-500/50 bg-purple-500/10 text-purple-300' },
  { id: 5, emoji: '🦄', name: 'Neon Unicorn', rarity: 'Legendary', color: 'border-brand-lime/70 bg-brand-lime/20 text-brand-lime' },
  { id: 6, emoji: '🤖', name: 'Robo Brain', rarity: 'Rare', color: 'border-cyan-500/50 bg-cyan-500/10 text-cyan-300' },
  { id: 7, emoji: '🦁', name: 'Solar Lion', rarity: 'Epic', color: 'border-orange-500/50 bg-orange-500/10 text-orange-300' },
  { id: 8, emoji: '🐙', name: 'Cosmic Squid', rarity: 'Rare', color: 'border-indigo-500/50 bg-indigo-500/10 text-indigo-300' },
  { id: 9, emoji: '⚡', name: 'Volt Spark', rarity: 'Legendary', color: 'border-brand-lime/70 bg-brand-lime/20 text-brand-lime' },
  { id: 10, emoji: '👻', name: 'Phantom Q', rarity: 'Epic', color: 'border-rose-500/50 bg-rose-500/10 text-rose-300' },
  { id: 11, emoji: '🚀', name: 'Astro Star', rarity: 'Common', color: 'border-sky-500/50 bg-sky-500/10 text-sky-300' },
  { id: 12, emoji: '🐉', name: 'Plasma Dragon', rarity: 'Legendary', color: 'border-brand-lime/70 bg-brand-lime/20 text-brand-lime' },
];

export default function GameModal({ mode, initialPin = '', onClose }) {
  const [step, setStep] = useState(mode === 'join' ? 'pin' : 'host');
  
  // 6 PIN boxes state
  const [pinDigits, setPinDigits] = useState(['', '', '', '', '', '']);
  const [pinError, setPinError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const inputRefs = useRef([]);

  // Nickname state
  const [nickname, setNickname] = useState('');

  // Selected avatar state
  const [selectedAvatar, setSelectedAvatar] = useState(blitzerAvatars[4]); // Neon Unicorn default

  // Initialize pin digits if initialPin is provided
  useEffect(() => {
    if (initialPin && initialPin.length === 6) {
      setPinDigits(initialPin.split(''));
    }
  }, [initialPin]);

  const handlePinChange = (index, value) => {
    const digit = value.replace(/\D/g, '').slice(-1);
    const newDigits = [...pinDigits];
    newDigits[index] = digit;
    setPinDigits(newDigits);
    setPinError(false);

    if (digit && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handlePinKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !pinDigits[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
    if (e.key === 'Enter') {
      validateAndSubmitPin();
    }
  };

  const validateAndSubmitPin = () => {
    const fullPin = pinDigits.join('');
    if (fullPin.length < 6) {
      setPinError(true);
      setErrorMessage('Please enter all 6 digits');
      return;
    }

    // Rule: Any PIN starting with '1' is valid; any other PIN shakes the boxes and shows "Hmm, we can't find that game"
    if (fullPin.startsWith('1')) {
      setPinError(false);
      setStep('nickname');
    } else {
      setPinError(true);
      setErrorMessage("Hmm, we can't find that game");
      setTimeout(() => {
        // clear error after animation
      }, 500);
    }
  };

  const handleNicknameSubmit = (e) => {
    e.preventDefault();
    if (!nickname.trim()) return;
    setStep('avatar');
  };

  const handleAvatarSelect = (avatar) => {
    setSelectedAvatar(avatar);
  };

  const handleFinalJoin = () => {
    setStep('waiting');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl bg-brand-cardDark border border-brand-violet/40 rounded-3xl p-8 sm:p-10 shadow-2xl text-white overflow-hidden">
        
        {/* Glow */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-brand-violet/25 rounded-full blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-slate-300 hover:text-white transition-colors z-20"
        >
          <X className="w-5 h-5" />
        </button>

        {/* STEP 1: 6-Digit PIN Boxes */}
        {step === 'pin' && (
          <div className="space-y-8 animate-in zoom-in-95">
            <div className="space-y-3 text-center">
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-brand-lime/10 text-brand-lime text-xs font-bold uppercase tracking-wider border border-brand-lime/30">
                <Zap className="w-3.5 h-3.5 fill-brand-lime" />
                Live Game Join
              </div>
              <h3 className="font-heading text-3xl sm:text-4xl font-extrabold tracking-tight">
                Enter Game PIN
              </h3>
              <p className="text-slate-300 text-sm">
                Type the 6-digit code provided by your teacher or host (Try starting with <span className="text-brand-lime font-bold">1</span>, e.g. <span className="text-brand-lime font-bold">199281</span>)
              </p>
            </div>

            <div className="space-y-6">
              <div className={`flex justify-center gap-2 sm:gap-3 ${pinError ? 'animate-shake' : ''}`}>
                {pinDigits.map((digit, idx) => (
                  <input
                    key={idx}
                    ref={(el) => (inputRefs.current[idx] = el)}
                    type="text"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handlePinChange(idx, e.target.value)}
                    onKeyDown={(e) => handlePinKeyDown(idx, e)}
                    autoFocus={idx === 0}
                    className={`w-11 sm:w-14 h-14 sm:h-16 text-center font-heading text-2xl sm:text-3xl font-extrabold rounded-2xl border-2 transition-all outline-none bg-brand-dark text-white ${
                      pinError 
                        ? 'border-red-500 bg-red-950/30 text-red-300' 
                        : digit 
                        ? 'border-brand-lime bg-brand-lime/10 text-brand-lime shadow-glow-lime' 
                        : 'border-white/20 focus:border-brand-violet focus:ring-4 focus:ring-brand-violet/20'
                    }`}
                  />
                ))}
              </div>

              {pinError && (
                <p className="text-sm font-bold text-red-400 text-center animate-pulse">
                  {errorMessage}
                </p>
              )}

              <button 
                type="button"
                onClick={validateAndSubmitPin}
                className="w-full btn-tactile bg-brand-violet hover:bg-brand-violetDark text-white font-heading font-extrabold py-4 rounded-2xl shadow-tactile border-b-4 border-violet-900 text-lg flex items-center justify-center gap-2"
              >
                Continue
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>

            <div className="text-center text-xs text-slate-400">
              Need a test code? Try <button onClick={() => { setPinDigits(['1','9','9','2','8','1']); setPinError(false); }} className="text-brand-lime font-bold underline">199-281</button>
            </div>
          </div>
        )}

        {/* STEP 2: Pick a Nickname */}
        {step === 'nickname' && (
          <form onSubmit={handleNicknameSubmit} className="space-y-8 animate-in zoom-in-95">
            <div className="space-y-3 text-center">
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-brand-violet/20 text-brand-lime text-xs font-bold uppercase tracking-wider border border-brand-violet/40">
                <Sparkles className="w-3.5 h-3.5" />
                Step 2 of 3
              </div>
              <h3 className="font-heading text-3xl sm:text-4xl font-extrabold">
                Choose your nickname
              </h3>
              <p className="text-slate-300 text-sm">
                What should everyone call you on the live scoreboard?
              </p>
            </div>

            <div className="space-y-4">
              <input 
                type="text"
                maxLength={16}
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                placeholder="e.g. ThunderCoder"
                autoFocus
                className="w-full text-center font-heading text-2xl sm:text-3xl font-extrabold py-4 px-4 bg-brand-dark rounded-2xl border-2 border-white/20 focus:border-brand-lime focus:outline-none text-white placeholder:text-slate-600 shadow-inner"
              />

              <button 
                type="submit"
                disabled={!nickname.trim()}
                className={`w-full btn-tactile font-heading font-extrabold py-4 rounded-2xl text-lg flex items-center justify-center gap-2 transition-all ${
                  nickname.trim() 
                    ? 'bg-brand-lime hover:bg-brand-limeHover text-brand-dark shadow-tactile-lime border-b-4 border-lime-700 cursor-pointer' 
                    : 'bg-slate-700 text-slate-400 cursor-not-allowed opacity-60'
                }`}
              >
                Next: Pick Avatar
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </form>
        )}

        {/* STEP 3: Avatar Picker (12 Cute Blitzers with rarity tags) */}
        {step === 'avatar' && (
          <div className="space-y-6 animate-in zoom-in-95">
            <div className="space-y-2 text-center">
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-brand-violet/20 text-brand-lime text-xs font-bold uppercase tracking-wider border border-brand-violet/40">
                <Sparkles className="w-3.5 h-3.5" />
                Step 3 of 3 • Meet the Blitzers
              </div>
              <h3 className="font-heading text-2xl sm:text-3xl font-extrabold">
                Choose your avatar, {nickname}!
              </h3>
              <p className="text-slate-300 text-xs sm:text-sm">
                Select your companion creature for the arena.
              </p>
            </div>

            <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 max-h-[280px] overflow-y-auto pr-1 scrollbar-thin">
              {blitzerAvatars.map((blitzer) => {
                const isSelected = selectedAvatar.id === blitzer.id;
                return (
                  <div
                    key={blitzer.id}
                    onClick={() => handleAvatarSelect(blitzer)}
                    className={`p-3 rounded-2xl border-2 cursor-pointer transition-all duration-200 flex flex-col items-center justify-center gap-1 text-center group ${
                      isSelected 
                        ? 'border-brand-lime bg-brand-lime/20 shadow-[0_0_20px_rgba(163,230,53,0.4)] scale-105' 
                        : 'border-white/10 bg-brand-dark/60 hover:border-brand-violet/50 hover:bg-white/5'
                    }`}
                  >
                    <span className="text-3xl sm:text-4xl group-hover:scale-110 transition-transform select-none">
                      {blitzer.emoji}
                    </span>
                    <span className="font-heading font-bold text-xs text-white truncate max-w-full">
                      {blitzer.name}
                    </span>
                    <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${blitzer.color}`}>
                      {blitzer.rarity}
                    </span>
                  </div>
                );
              })}
            </div>

            <button 
              type="button"
              onClick={handleFinalJoin}
              className="w-full btn-tactile bg-brand-lime hover:bg-brand-limeHover text-brand-dark font-heading font-extrabold py-4 rounded-2xl shadow-tactile-lime border-b-4 border-lime-700 text-lg flex items-center justify-center gap-2"
            >
              Enter Room with {selectedAvatar.emoji} {selectedAvatar.name}!
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        )}

        {/* STEP 4: Waiting Screen ("You're in! 🎉 See your name on the screen?") */}
        {step === 'waiting' && (
          <div className="text-center space-y-6 py-4 animate-in zoom-in-95">
            
            {/* Gently pulsing avatar */}
            <div className="relative w-28 h-28 mx-auto flex items-center justify-center">
              <div className="absolute inset-0 bg-brand-lime/30 rounded-full blur-xl animate-ping" style={{ animationDuration: '3s' }} />
              <div className="relative w-28 h-28 rounded-3xl bg-gradient-to-br from-brand-violet to-purple-800 border-2 border-brand-lime flex items-center justify-center text-6xl shadow-glow-lime animate-bounce" style={{ animationDuration: '4s' }}>
                {selectedAvatar.emoji}
              </div>
            </div>

            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold uppercase tracking-wider border border-emerald-500/30">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                Connected Successfully
              </div>
              <h3 className="font-heading text-3xl sm:text-4xl font-extrabold text-white">
                You're in! 🎉
              </h3>
              <p className="text-slate-300 text-base font-medium">
                See your name (<span className="text-brand-lime font-bold">{nickname}</span>) on the screen?
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-brand-dark border border-white/10 flex items-center justify-between max-w-xs mx-auto">
              <span className="text-xs text-slate-400 font-medium">Room PIN:</span>
              <span className="font-heading font-bold text-brand-lime tracking-widest text-lg">{pinDigits.join('')}</span>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
              <button 
                onClick={onClose}
                className="btn-tactile bg-brand-violet hover:bg-brand-violetDark text-white font-heading font-extrabold px-6 py-3.5 rounded-xl shadow-tactile border-b-4 border-violet-900 text-sm"
              >
                Back to Home
              </button>
              <button 
                onClick={() => setStep('pin')}
                className="px-6 py-3.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 font-semibold text-sm border border-white/10 transition-all flex items-center justify-center gap-2"
              >
                <RefreshCw className="w-4 h-4" />
                Join Another Game
              </button>
            </div>

          </div>
        )}

        {/* HOST MODE */}
        {mode === 'host' && step === 'host' && (
          <div className="space-y-6 animate-in zoom-in-95">
            <div className="space-y-2 text-center">
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-brand-violet/20 text-brand-lime text-xs font-bold uppercase tracking-wider border border-brand-violet/40">
                <Sparkles className="w-3.5 h-3.5" />
                Teacher Host Dashboard
              </div>
              <h3 className="font-heading text-3xl font-extrabold">
                Host a Live Game
              </h3>
              <p className="text-slate-300 text-sm">
                Select a game mode to generate your active room PIN.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div 
                onClick={onClose}
                className="p-5 rounded-2xl bg-brand-dark border border-brand-violet/40 hover:border-brand-lime cursor-pointer transition-all space-y-2 group"
              >
                <div className="text-3xl">🛡️</div>
                <h4 className="font-heading font-bold text-white group-hover:text-brand-lime">Tower Defense</h4>
                <p className="text-xs text-slate-400">Strategy & turret building</p>
              </div>

              <div 
                onClick={onClose}
                className="p-5 rounded-2xl bg-brand-dark border border-brand-violet/40 hover:border-brand-lime cursor-pointer transition-all space-y-2 group"
              >
                <div className="text-3xl">🪙</div>
                <h4 className="font-heading font-bold text-white group-hover:text-brand-lime">Gold Rush</h4>
                <p className="text-xs text-slate-400">Treasure chests & loot</p>
              </div>
            </div>

            <button 
              onClick={onClose}
              className="w-full btn-tactile bg-brand-violet hover:bg-brand-violetDark text-white font-heading font-extrabold py-4 rounded-2xl shadow-tactile border-b-4 border-violet-900 text-base"
            >
              Launch Live Room (PIN: 199281)
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
