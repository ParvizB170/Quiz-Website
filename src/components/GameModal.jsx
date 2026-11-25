import React, { useState, useRef, useEffect } from 'react';
import { X, ArrowRight, Zap, Trophy, Sparkles, CheckCircle2, ShieldCheck, RefreshCw, QrCode, Users, Play, Radio, Award, BarChart3, Flame, TrendingUp, Pause, SkipForward, RotateCcw } from 'lucide-react';

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

const fakeNicknames = [
  'TurboCoder', 'PixelNinja', 'QuantumQueen', 'MegaByte', 'AlphaGlitch',
  'CosmicCoder', 'NeuralKnight', 'VelocityVortex', 'HyperHacker', 'SonicSprite',
  'PlasmaPioneer', 'StellarScribe', 'MatrixMaster', 'AstroAce', 'BinaryBard'
];

const defaultSpaceQuiz = {
  title: 'Cosmic Space Exploration Blitz 🚀',
  questions: [
    {
      id: 1,
      title: 'Which planet in our solar system is known as the Red Planet?',
      timeLimit: 15,
      answers: [
        { id: 1, text: 'Mars', shape: '▲', color: 'bg-red-500', isCorrect: true },
        { id: 2, text: 'Venus', shape: '◆', color: 'bg-blue-500', isCorrect: false },
        { id: 3, text: 'Jupiter', shape: '●', color: 'bg-amber-500', isCorrect: false },
        { id: 4, text: 'Saturn', shape: '■', color: 'bg-emerald-500', isCorrect: false },
      ]
    },
    {
      id: 2,
      title: 'What is the hottest planet in our solar system?',
      timeLimit: 15,
      answers: [
        { id: 1, text: 'Mercury', shape: '▲', color: 'bg-red-500', isCorrect: false },
        { id: 2, text: 'Venus', shape: '◆', color: 'bg-blue-500', isCorrect: true },
        { id: 3, text: 'Mars', shape: '●', color: 'bg-amber-500', isCorrect: false },
        { id: 4, text: 'Sun', shape: '■', color: 'bg-emerald-500', isCorrect: false },
      ]
    },
    {
      id: 3,
      title: 'Which galaxy is the nearest large spiral galaxy to the Milky Way?',
      timeLimit: 15,
      answers: [
        { id: 1, text: 'Andromeda', shape: '▲', color: 'bg-red-500', isCorrect: true },
        { id: 2, text: 'Sombrero', shape: '◆', color: 'bg-blue-500', isCorrect: false },
        { id: 3, text: 'Triangulum', shape: '●', color: 'bg-amber-500', isCorrect: false },
        { id: 4, text: 'Whirlpool', shape: '■', color: 'bg-emerald-500', isCorrect: false },
      ]
    }
  ]
};

export default function GameModal({ mode, initialPin = '', quiz = defaultSpaceQuiz, onClose }) {
  const [step, setStep] = useState(mode === 'join' ? 'pin' : 'lobby');
  
  // 6 PIN boxes state
  const [pinDigits, setPinDigits] = useState(['1', '9', '9', '2', '8', '1']);
  const [pinError, setPinError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const inputRefs = useRef([]);

  // Nickname state
  const [nickname, setNickname] = useState('HostBlitz');

  // Selected avatar state
  const [selectedAvatar, setSelectedAvatar] = useState(blitzerAvatars[4]); // Neon Unicorn default

  // Game States: 'lobby' | 'question' | 'feedback' | 'leaderboard' | 'final'
  const [gameState, setGameState] = useState('lobby');
  const [isPaused, setIsPaused] = useState(false);

  const [players, setPlayers] = useState([
    { id: 1, name: 'TurboCoder', avatar: blitzerAvatars[0], score: 2400 },
    { id: 2, name: 'NeuralKnight', avatar: blitzerAvatars[5], score: 1950 },
    { id: 3, name: 'QuantumQueen', avatar: blitzerAvatars[2], score: 1800 },
    { id: 4, name: 'MegaByte', avatar: blitzerAvatars[3], score: 1500 },
    { id: 5, name: 'AstroAce', avatar: blitzerAvatars[10], score: 1200 },
  ]);

  // Scoring & Streaks
  const [userScore, setUserScore] = useState(0);
  const [streakCount, setStreakCount] = useState(0);
  const [lastRoundScore, setLastRoundScore] = useState(0);
  const [wasCorrectLastRound, setWasCorrectLastRound] = useState(false);

  // Active Question State
  const activeQuiz = quiz && quiz.questions && quiz.questions.length > 0 ? quiz : defaultSpaceQuiz;
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const currentQuestion = activeQuiz.questions[currentQuestionIndex] || activeQuiz.questions[0];
  
  const [timeLeft, setTimeLeft] = useState(currentQuestion.timeLimit || 15);
  const [userAnswer, setUserAnswer] = useState(null); // index 0-3
  const [answerCounts, setAnswerCounts] = useState([0, 0, 0, 0]);
  const [answeredPlayersCount, setAnsweredPlayersCount] = useState(0);

  // Simulate new players joining in lobby every 1.5 seconds
  useEffect(() => {
    if (mode === 'host' && gameState === 'lobby') {
      const interval = setInterval(() => {
        setPlayers((prev) => {
          if (prev.length >= 16) return prev;
          const availableNicknames = fakeNicknames.filter(n => !prev.some(p => p.name === n));
          if (availableNicknames.length === 0) return prev;
          const randomName = availableNicknames[Math.floor(Math.random() * availableNicknames.length)];
          const randomAvatar = blitzerAvatars[Math.floor(Math.random() * blitzerAvatars.length)];
          return [...prev, { id: Date.now(), name: randomName, avatar: randomAvatar, score: Math.floor(Math.random() * 1000) }];
        });
      }, 1500);
      return () => clearInterval(interval);
    }
  }, [mode, gameState]);

  // Countdown timer & fake player answering simulation during 'question' state (with Pause check & bug-free cleanup)
  useEffect(() => {
    let timer = null;
    let fakeAnswerInterval = null;

    if (gameState === 'question' && !isPaused) {
      timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            handleTimeOut();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      fakeAnswerInterval = setInterval(() => {
        setAnsweredPlayersCount((prevCount) => {
          if (prevCount >= players.length) {
            clearInterval(fakeAnswerInterval);
            return prevCount;
          }
          const randomChoice = Math.floor(Math.random() * currentQuestion.answers.length);
          setAnswerCounts((counts) => {
            const newCounts = [...counts];
            newCounts[randomChoice] += 1;
            return newCounts;
          });
          return prevCount + 1;
        });
      }, 1000);
    }

    return () => {
      if (timer) clearInterval(timer);
      if (fakeAnswerInterval) clearInterval(fakeAnswerInterval);
    };
  }, [gameState, isPaused, players.length, currentQuestion.answers.length]);

  // Keyboard listener for keys 1-4 when answering question
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (gameState === 'question' && !isPaused && userAnswer === null) {
        if (['1', '2', '3', '4'].includes(e.key)) {
          const index = parseInt(e.key) - 1;
          if (currentQuestion.answers[index]) {
            handleAnswerSelect(index);
          }
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gameState, isPaused, userAnswer, currentQuestion]);

  const handleStartGame = () => {
    if (players.length >= 3) {
      setCurrentQuestionIndex(0);
      setTimeLeft(activeQuiz.questions[0].timeLimit || 15);
      setUserAnswer(null);
      setAnswerCounts([0, 0, 0, 0]);
      setAnsweredPlayersCount(0);
      setUserScore(0);
      setStreakCount(0);
      setIsPaused(false);
      setGameState('question');
    }
  };

  const handleAnswerSelect = (index) => {
    if (userAnswer !== null) return;
    setUserAnswer(index);
    setAnswerCounts((counts) => {
      const newCounts = [...counts];
      newCounts[index] += 1;
      return newCounts;
    });
    setAnsweredPlayersCount((prev) => Math.min(prev + 1, players.length));

    // Calculate score
    const selectedAns = currentQuestion.answers[index];
    const isCorrect = selectedAns.isCorrect;
    setWasCorrectLastRound(isCorrect);

    let earned = 0;
    if (isCorrect) {
      const timeFraction = timeLeft / (currentQuestion.timeLimit || 15);
      earned = Math.round(500 + 500 * timeFraction); // up to 1000 points based on speed
      const newStreak = streakCount + 1;
      setStreakCount(newStreak);
      if (newStreak >= 3) {
        earned += 300; // 🔥 Streak bonus points
      }
      setUserScore(prev => prev + earned);
    } else {
      setStreakCount(0);
    }
    setLastRoundScore(earned);

    updateLeaderboardScores(isCorrect ? earned : 0);
    setTimeout(() => setGameState('feedback'), 500);
  };

  const handleTimeOut = () => {
    if (userAnswer === null) {
      setWasCorrectLastRound(false);
      setStreakCount(0);
      setLastRoundScore(0);
      updateLeaderboardScores(0);
      setGameState('feedback');
    }
  };

  const handleSkipQuestion = () => {
    // Instantly move to feedback
    setWasCorrectLastRound(false);
    setLastRoundScore(0);
    updateLeaderboardScores(0);
    setGameState('feedback');
  };

  const updateLeaderboardScores = (userEarned) => {
    setPlayers(prev => {
      const updated = prev.map(p => ({
        ...p,
        score: p.score + Math.floor(Math.random() * 500) + 150
      }));
      return updated.sort((a, b) => b.score - a.score);
    });
  };

  const handleShowLeaderboard = () => {
    setGameState('leaderboard');
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex + 1 < activeQuiz.questions.length) {
      const nextIdx = currentQuestionIndex + 1;
      setCurrentQuestionIndex(nextIdx);
      const nextQ = activeQuiz.questions[nextIdx];
      setTimeLeft(nextQ.timeLimit || 15);
      setUserAnswer(null);
      setAnswerCounts([0, 0, 0, 0]);
      setAnsweredPlayersCount(0);
      setIsPaused(false);
      setGameState('question');
    } else {
      // Reached end of quiz -> Final Results screen
      setGameState('final');
    }
  };

  const correctAnswerObj = currentQuestion.answers.find(a => a.isCorrect) || currentQuestion.answers[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className={`relative w-full ${mode === 'host' ? 'max-w-4xl' : 'max-w-xl'} bg-brand-cardDark border border-brand-violet/40 rounded-3xl p-6 sm:p-10 shadow-2xl text-white overflow-hidden transition-all duration-300`}>
        
        {/* Glow */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-brand-violet/25 rounded-full blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-slate-300 hover:text-white transition-colors z-20"
        >
          <X className="w-5 h-5" />
        </button>

        {/* HOST MODE */}
        {mode === 'host' && (
          <div className="space-y-6 animate-in zoom-in-95">
            
            {/* LOBBY STATE */}
            {gameState === 'lobby' && (
              <>
                <div className="relative p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-brand-dark via-[#180a3a] to-purple-950 border border-brand-violet/40 shadow-2xl overflow-hidden">
                  <div className="absolute top-0 right-0 w-96 h-96 bg-brand-lime/10 rounded-full blur-3xl pointer-events-none" />
                  
                  <div className="flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
                    
                    <div className="space-y-2 text-center md:text-left">
                      <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand-lime/10 text-brand-lime text-xs font-bold uppercase tracking-wider border border-brand-lime/30">
                        <Radio className="w-3.5 h-3.5 animate-pulse text-brand-lime" />
                        Live Host Lobby • {activeQuiz.title}
                      </div>
                      <div className="text-xs uppercase tracking-widest text-slate-400 font-semibold">Join at brainblitz.live with PIN</div>
                      <div className="font-heading text-5xl sm:text-6xl font-black text-brand-lime tracking-widest drop-shadow-[0_0_25px_rgba(163,230,53,0.5)]">
                        199 281
                      </div>
                    </div>

                    <div className="flex items-center gap-6">
                      <div className="bg-white p-3 rounded-2xl shadow-xl flex flex-col items-center justify-center border-2 border-brand-lime/50">
                        <QrCode className="w-16 h-16 text-slate-950" />
                        <span className="text-[10px] font-bold text-slate-700 mt-1 uppercase tracking-wider">Scan to Join</span>
                      </div>

                      <div className="bg-brand-dark/80 backdrop-blur-md px-6 py-4 rounded-2xl border border-white/15 text-center space-y-1">
                        <div className="flex items-center justify-center gap-2 text-brand-lime">
                          <Users className="w-5 h-5" />
                          <span className="font-heading text-3xl font-extrabold">{players.length}</span>
                        </div>
                        <div className="text-xs font-semibold text-slate-300 uppercase tracking-wider">Players Joined</div>
                      </div>
                    </div>

                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between px-1">
                    <span className="text-sm font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-brand-lime" />
                      Connected Blitzers ({players.length})
                    </span>
                    <span className="text-xs text-slate-400">
                      {players.length < 3 ? 'Waiting for at least 3 players to start...' : '✨ Ready to launch!'}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-h-[220px] overflow-y-auto pr-1 scrollbar-thin">
                    {players.map((player) => (
                      <div
                        key={player.id}
                        className="p-3 rounded-2xl bg-brand-dark/80 border border-brand-violet/30 flex items-center gap-3 animate-in zoom-in-50 duration-300 hover:border-brand-lime transition-all shadow-lg group"
                      >
                        <span className="text-3xl group-hover:scale-125 transition-transform select-none">
                          {player.avatar.emoji}
                        </span>
                        <div className="min-w-0 flex-1">
                          <div className="font-heading font-bold text-sm text-white truncate">
                            {player.name}
                          </div>
                          <div className="text-[10px] text-brand-lime font-extrabold truncate">
                            {player.score} pts
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    onClick={handleStartGame}
                    disabled={players.length < 3}
                    className={`w-full font-heading font-extrabold py-5 rounded-2xl text-lg sm:text-xl flex items-center justify-center gap-3 transition-all duration-300 ${
                      players.length >= 3
                        ? 'btn-tactile bg-brand-lime hover:bg-brand-limeHover text-brand-dark shadow-tactile-lime border-b-4 border-lime-700 cursor-pointer animate-pulse'
                        : 'bg-slate-800 text-slate-500 border border-slate-700 cursor-not-allowed opacity-60'
                    }`}
                  >
                    <Play className="w-6 h-6 fill-current" />
                    {players.length < 3 ? `Waiting for players (${players.length}/3 minimum)...` : 'Start Game Arena! 🚀'}
                  </button>
                  <p className="text-center text-xs text-slate-400 mt-2">
                    {players.length < 3 ? 'Simulating players joining every 1–2 seconds...' : 'All systems go! Click Start when you are ready.'}
                  </p>
                </div>
              </>
            )}

            {/* QUESTION STATE */}
            {gameState === 'question' && (
              <div className="space-y-6 animate-in zoom-in-95">
                
                {/* Top Bar: Progress Indicator ("Question 3 of 8"), Countdown Ring, Score, Pause / Skip controls */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-brand-dark/80 p-4 rounded-2xl border border-white/10">
                  <div className="flex items-center gap-3 flex-wrap">
                    <span className="px-3.5 py-1.5 rounded-full bg-brand-violet/20 border border-brand-violet/40 text-brand-lime text-xs font-bold uppercase tracking-wider">
                      Question {currentQuestionIndex + 1} of {activeQuiz.questions.length}
                    </span>
                    <span className="text-xs text-slate-300 font-bold flex items-center gap-1">
                      Score: <span className="text-brand-lime font-heading text-sm">{userScore}</span>
                    </span>
                    {streakCount >= 2 && (
                      <span className="px-2.5 py-0.5 rounded-full bg-orange-500/20 text-orange-400 border border-orange-500/40 text-xs font-black flex items-center gap-1 animate-pulse">
                        <Flame className="w-3.5 h-3.5 fill-orange-400" /> {streakCount} Streak
                      </span>
                    )}
                  </div>

                  {/* Host Controls: Pause & Skip */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setIsPaused(!isPaused)}
                      className={`px-3 py-1.5 rounded-xl border text-xs font-bold flex items-center gap-1.5 transition-all ${
                        isPaused ? 'bg-amber-500 text-slate-950 border-amber-400 animate-pulse' : 'bg-white/5 text-slate-300 border-white/15 hover:bg-white/10'
                      }`}
                    >
                      <Pause className="w-3.5 h-3.5" />
                      {isPaused ? 'Resume' : 'Pause'}
                    </button>

                    <button
                      onClick={handleSkipQuestion}
                      className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 border border-white/15 text-xs font-bold flex items-center gap-1.5 transition-all"
                    >
                      <SkipForward className="w-3.5 h-3.5" />
                      Skip
                    </button>
                  </div>

                  {/* Circular SVG Countdown Ring */}
                  <div className="relative w-16 h-16 flex items-center justify-center">
                    <svg className="w-16 h-16 transform -rotate-90">
                      <circle
                        cx="32"
                        cy="32"
                        r="26"
                        stroke="currentColor"
                        strokeWidth="5"
                        className="text-slate-800 fill-none"
                      />
                      <circle
                        cx="32"
                        cy="32"
                        r="26"
                        stroke="currentColor"
                        strokeWidth="5"
                        strokeDasharray={2 * Math.PI * 26}
                        strokeDashoffset={2 * Math.PI * 26 * (1 - timeLeft / (currentQuestion.timeLimit || 15))}
                        strokeLinecap="round"
                        className={`fill-none transition-all duration-1000 ${
                          timeLeft <= 5 ? 'text-red-500 animate-pulse' : 'text-brand-lime'
                        }`}
                      />
                    </svg>
                    <div className={`absolute font-heading font-extrabold text-lg ${timeLeft <= 5 ? 'text-red-400 animate-bounce' : 'text-white'}`}>
                      {isPaused ? '⏸' : `${timeLeft}s`}
                    </div>
                  </div>
                </div>

                {isPaused && (
                  <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-center text-amber-300 text-xs font-bold animate-pulse">
                    Game Paused by Host. Timer & Submissions suspended.
                  </div>
                )}

                {/* Big Question Text */}
                <div className="p-6 rounded-3xl bg-gradient-to-r from-brand-violet/20 via-purple-900/30 to-brand-dark border border-brand-violet/40 text-center shadow-xl">
                  <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-white leading-snug">
                    {currentQuestion.title}
                  </h2>
                </div>

                {/* 4 Big Answer Tiles */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {currentQuestion.answers.map((ans, idx) => {
                    const isSelected = userAnswer === idx;
                    return (
                      <div
                        key={ans.id}
                        onClick={() => !isPaused && handleAnswerSelect(idx)}
                        className={`relative p-6 rounded-2xl border-2 transition-all duration-200 cursor-pointer flex items-center justify-between group overflow-hidden ${ans.color} bg-opacity-15 hover:bg-opacity-25 ${
                          isSelected 
                            ? 'border-brand-lime ring-4 ring-brand-lime/30 scale-[1.02]' 
                            : 'border-white/15 bg-brand-dark/70 hover:border-brand-violet/60'
                        } ${isPaused ? 'opacity-60 cursor-not-allowed' : ''}`}
                      >
                        <div className="flex items-center gap-4">
                          <span className={`w-12 h-12 rounded-xl flex items-center justify-center font-heading text-2xl font-black ${ans.color} text-white shadow-lg`}>
                            {ans.shape}
                          </span>
                          <div>
                            <span className="text-xs text-slate-400 font-bold block mb-0.5">Key [{idx + 1}]</span>
                            <span className="font-heading font-bold text-lg sm:text-xl text-white">
                              {ans.text}
                            </span>
                          </div>
                        </div>

                        {isSelected && (
                          <div className="px-3 py-1 rounded-full bg-brand-lime text-brand-dark font-heading font-extrabold text-xs shadow-lg animate-in zoom-in">
                            Selected ✓
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                <div className="text-center text-xs text-slate-400">
                  Tip: Click any tile or press keys <span className="text-brand-lime font-bold">1</span>–<span className="text-brand-lime font-bold">4</span>.
                </div>

              </div>
            )}

            {/* FULL-SCREEN FEEDBACK PANEL STATE */}
            {gameState === 'feedback' && (
              <div className={`p-8 sm:p-12 rounded-3xl text-center space-y-6 animate-in zoom-in-95 border-2 ${
                wasCorrectLastRound 
                  ? 'bg-gradient-to-br from-emerald-950 via-emerald-900/40 to-brand-dark border-emerald-500/50 shadow-[0_0_50px_rgba(16,185,129,0.3)]' 
                  : 'bg-gradient-to-br from-rose-950 via-rose-900/40 to-brand-dark border-rose-500/50 shadow-[0_0_50px_rgba(244,63,94,0.3)]'
              }`}>
                
                <div className="w-24 h-24 mx-auto rounded-3xl flex items-center justify-center text-5xl shadow-2xl animate-bounce" style={{ animationDuration: '3s' }}>
                  {wasCorrectLastRound ? '🎉' : '💡'}
                </div>

                <div className="space-y-3">
                  <div className={`inline-flex items-center gap-2 px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider border ${
                    wasCorrectLastRound 
                      ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40' 
                      : 'bg-rose-500/20 text-rose-300 border-rose-500/40'
                  }`}>
                    {wasCorrectLastRound ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <ShieldCheck className="w-4 h-4 text-rose-400" />}
                    {wasCorrectLastRound ? 'Correct Answer!' : 'Not quite right'}
                  </div>

                  <h3 className="font-heading text-4xl sm:text-5xl font-extrabold text-white">
                    {wasCorrectLastRound ? `+${lastRoundScore} pts` : `It was ${correctAnswerObj.text}`}
                  </h3>

                  <p className="text-slate-300 text-base max-w-md mx-auto">
                    {wasCorrectLastRound 
                      ? (streakCount >= 3 ? '🔥 Amazing 3+ streak bonus activated!' : 'Fantastic speed and accuracy!')
                      : `Don't worry! Every mistake is a step forward in learning. Keep your energy high!`}
                  </p>
                </div>

                {streakCount >= 3 && (
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-orange-500/20 border border-orange-500/40 text-orange-300 font-heading font-extrabold text-sm animate-pulse">
                    <Flame className="w-5 h-5 fill-orange-400 text-orange-400" />
                    {streakCount} Correct in a Row! 🔥 Streak Bonus Active
                  </div>
                )}

                <div className="pt-4 flex justify-center">
                  <button
                    onClick={handleShowLeaderboard}
                    className="btn-tactile bg-brand-lime hover:bg-brand-limeHover text-brand-dark font-heading font-extrabold px-8 py-4 rounded-2xl shadow-tactile-lime border-b-4 border-lime-700 text-lg flex items-center gap-2"
                  >
                    View Leaderboard
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>

              </div>
            )}

            {/* LEADERBOARD STATE (Top 5 with smooth rank animation) */}
            {gameState === 'leaderboard' && (
              <div className="space-y-6 animate-in zoom-in-95">
                
                <div className="text-center space-y-2">
                  <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-brand-violet/20 text-brand-lime text-xs font-bold uppercase tracking-wider border border-brand-violet/40">
                    <Trophy className="w-4 h-4 text-brand-lime" />
                    Live Arena Standings • Top 5
                  </div>
                  <h3 className="font-heading text-3xl sm:text-4xl font-extrabold text-white">
                    Scoreboard Rankings
                  </h3>
                </div>

                {/* Top 5 Leaderboard List with smooth transitions */}
                <div className="space-y-3 max-h-[300px] overflow-y-auto pr-1 scrollbar-thin">
                  {players.slice(0, 5).map((player, idx) => {
                    const rank = idx + 1;
                    return (
                      <div
                        key={player.id}
                        className={`p-4 rounded-2xl bg-brand-dark/90 border flex items-center justify-between transition-all duration-500 transform ${
                          rank === 1 
                            ? 'border-brand-lime bg-brand-lime/10 shadow-[0_0_20px_rgba(163,230,53,0.3)] scale-[1.01]' 
                            : 'border-white/10 hover:border-brand-violet/50'
                        }`}
                      >
                        <div className="flex items-center gap-4">
                          <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-heading font-extrabold text-base ${
                            rank === 1 ? 'bg-brand-lime text-brand-dark shadow-md' :
                            rank === 2 ? 'bg-slate-300 text-slate-950' :
                            rank === 3 ? 'bg-amber-600 text-white' : 'bg-white/10 text-slate-300'
                          }`}>
                            #{rank}
                          </div>

                          <div className="flex items-center gap-3">
                            <span className="text-3xl select-none">{player.avatar.emoji}</span>
                            <div>
                              <div className="font-heading font-bold text-base text-white">
                                {player.name}
                              </div>
                              <div className="text-xs text-brand-lime font-medium">
                                {player.avatar.name}
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="font-heading text-xl font-black text-white flex items-center gap-1.5">
                          <TrendingUp className="w-4 h-4 text-brand-lime" />
                          {player.score.toLocaleString()} <span className="text-xs font-bold text-slate-400">pts</span>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="pt-4 flex items-center justify-between">
                  <button
                    onClick={() => setGameState('lobby')}
                    className="px-6 py-3.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 font-semibold text-sm border border-white/10 transition-all"
                  >
                    Back to Lobby
                  </button>

                  <button
                    onClick={handleNextQuestion}
                    className="btn-tactile bg-brand-lime hover:bg-brand-limeHover text-brand-dark font-heading font-extrabold px-8 py-4 rounded-2xl shadow-tactile-lime border-b-4 border-lime-700 text-base flex items-center gap-2"
                  >
                    {currentQuestionIndex + 1 < activeQuiz.questions.length ? 'Next Question' : 'View Final Results'}
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>

              </div>
            )}

            {/* FINAL RESULTS SCREEN */}
            {gameState === 'final' && (
              <div className="text-center space-y-6 py-8 animate-in zoom-in-95">
                <div className="w-28 h-28 mx-auto rounded-3xl bg-brand-lime/20 border-2 border-brand-lime flex items-center justify-center text-6xl shadow-glow-lime animate-bounce" style={{ animationDuration: '3s' }}>
                  🏆
                </div>

                <div className="space-y-3">
                  <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-brand-violet/20 text-brand-lime text-xs font-bold uppercase tracking-wider border border-brand-violet/40">
                    <Award className="w-4 h-4 text-brand-lime" />
                    Game Completed Successfully
                  </div>
                  <h3 className="font-heading text-4xl sm:text-5xl font-extrabold text-white">
                    Final Arena Results! 🎉
                  </h3>
                  <p className="text-slate-300 text-base max-w-md mx-auto">
                    You earned a total score of <span className="text-brand-lime font-bold font-heading text-xl">{userScore} points</span> across {activeQuiz.questions.length} questions.
                  </p>
                </div>

                <div className="p-6 rounded-3xl bg-brand-dark border border-white/10 max-w-md mx-auto space-y-3">
                  <div className="text-xs uppercase tracking-widest text-slate-400 font-bold">Top Champion of the Match</div>
                  <div className="flex items-center justify-center gap-3">
                    <span className="text-4xl">🦄</span>
                    <div className="text-left">
                      <div className="font-heading font-bold text-lg text-white">{players[0]?.name || 'TurboCoder'}</div>
                      <div className="text-xs text-brand-lime font-extrabold">{players[0]?.score || 3500} pts</div>
                    </div>
                  </div>
                </div>

                <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center">
                  <button
                    onClick={() => {
                      setGameState('lobby');
                      setPlayers([
                        { id: 1, name: 'TurboCoder', avatar: blitzerAvatars[0], score: 2400 },
                        { id: 2, name: 'NeuralKnight', avatar: blitzerAvatars[5], score: 1950 },
                        { id: 3, name: 'QuantumQueen', avatar: blitzerAvatars[2], score: 1800 },
                      ]);
                    }}
                    className="btn-tactile bg-brand-violet hover:bg-brand-violetDark text-white font-heading font-extrabold px-6 py-3.5 rounded-xl shadow-tactile border-b-4 border-violet-900 text-sm flex items-center justify-center gap-2"
                  >
                    <RotateCcw className="w-4 h-4" />
                    Play Again
                  </button>
                  <button
                    onClick={onClose}
                    className="px-6 py-3.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 font-semibold text-sm border border-white/10 transition-all"
                  >
                    Exit to Home
                  </button>
                </div>

              </div>
            )}

          </div>
        )}

        {/* STEP 1: 6-Digit PIN Boxes */}
        {mode === 'join' && step === 'pin' && (
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
        {mode === 'join' && step === 'nickname' && (
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
        {mode === 'join' && step === 'avatar' && (
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
        {mode === 'join' && step === 'waiting' && (
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

      </div>
    </div>
  );
}
