import React, { useState, useEffect, useRef } from 'react';
import { 
  X, Plus, GripVertical, Image as ImageIcon, Check, Trash2, Copy, 
  Settings, Clock, Award, Sparkles, ArrowLeft, Play, Save, AlertCircle, Wand2, Globe, Lock, Palette 
} from 'lucide-react';

const coverColors = [
  { name: 'Electric Violet', hex: '#7C3AED' },
  { name: 'Sunset Orange', hex: '#F97316' },
  { name: 'Emerald Green', hex: '#10B981' },
  { name: 'Deep Blue', hex: '#3B82F6' },
  { name: 'Neon Pink', hex: '#EC4899' },
  { name: 'Lime Gold', hex: '#A3E635' },
];

const sampleSpaceQuestions = [
  {
    id: 101,
    title: 'Which planet in our solar system is known as the Red Planet?',
    type: 'Quiz',
    timeLimit: 10,
    points: 'Standard',
    image: null,
    answers: [
      { id: 1, text: 'Mars', shape: '▲', color: 'bg-red-500', isCorrect: true },
      { id: 2, text: 'Venus', shape: '◆', color: 'bg-blue-500', isCorrect: false },
      { id: 3, text: 'Jupiter', shape: '●', color: 'bg-amber-500', isCorrect: false },
      { id: 4, text: 'Saturn', shape: '■', color: 'bg-emerald-500', isCorrect: false },
    ]
  },
  {
    id: 102,
    title: 'What is the largest planet in our solar system?',
    type: 'Quiz',
    timeLimit: 15,
    points: 'Standard',
    image: null,
    answers: [
      { id: 1, text: 'Saturn', shape: '▲', color: 'bg-red-500', isCorrect: false },
      { id: 2, text: 'Jupiter', shape: '◆', color: 'bg-blue-500', isCorrect: true },
      { id: 3, text: 'Neptune', shape: '●', color: 'bg-amber-500', isCorrect: false },
      { id: 4, text: 'Uranus', shape: '■', color: 'bg-emerald-500', isCorrect: false },
    ]
  },
  {
    id: 103,
    title: 'Venus is the hottest planet in our solar system because of its thick greenhouse atmosphere.',
    type: 'True/False',
    timeLimit: 15,
    points: 'Standard',
    image: null,
    answers: [
      { id: 1, text: 'True', shape: '▲', color: 'bg-red-500', isCorrect: true },
      { id: 2, text: 'False', shape: '◆', color: 'bg-blue-500', isCorrect: false },
    ]
  }
];

export default function CreateQuizStudio({ currentQuiz, onClose, onSaveQuiz, onSaveAndHost }) {
  const [quizId] = useState(currentQuiz?.id || Date.now());
  const [quizTitle, setQuizTitle] = useState(currentQuiz?.title || 'Untitled Science Blitz');
  const [coverColor, setCoverColor] = useState(currentQuiz?.coverColor || '#7C3AED');
  const [visibility, setVisibility] = useState(currentQuiz?.visibility || 'Private');
  const [questions, setQuestions] = useState(currentQuiz?.questions || sampleSpaceQuestions);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Autosave status state
  const [saveStatus, setSaveStatus] = useState('Saved ✓'); // 'Saving…' or 'Saved ✓'
  const isInitialMount = useRef(true);

  const currentQ = questions[currentIndex] || questions[0];

  // Autosave effect with debounce & persistence
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    setSaveStatus('Saving…');
    const timer = setTimeout(() => {
      const updatedQuiz = {
        id: quizId,
        title: quizTitle,
        coverColor,
        visibility,
        questions,
        updatedAt: new Date().toISOString()
      };
      
      // Save to localStorage with fallback
      try {
        const existing = JSON.parse(localStorage.getItem('brainblitz_quizzes') || '[]');
        const index = existing.findIndex(q => q.id === quizId);
        if (index >= 0) {
          existing[index] = updatedQuiz;
        } else {
          existing.push(updatedQuiz);
        }
        localStorage.setItem('brainblitz_quizzes', JSON.stringify(existing));
      } catch (err) {
        console.warn('LocalStorage unavailable:', err);
      }

      if (onSaveQuiz) {
        onSaveQuiz(updatedQuiz);
      }

      setSaveStatus('Saved ✓');
    }, 600);

    return () => clearTimeout(timer);
  }, [quizTitle, coverColor, visibility, questions]);

  const handleFillSampleQuiz = () => {
    setQuestions(sampleSpaceQuestions);
    setQuizTitle('Cosmic Space Exploration Blitz 🚀');
    setCurrentIndex(0);
  };

  const getQuestionError = (q) => {
    if (!q.title || !q.title.trim()) {
      return 'Question text is required';
    }
    if (!q.answers || q.answers.length < 2) {
      return 'At least 2 answers are required';
    }
    const hasCorrect = q.answers.some(a => a.isCorrect);
    if (!hasCorrect && q.type !== 'Poll') {
      return 'Please select at least one correct answer';
    }
    return null;
  };

  const handleQuestionChange = (field, value) => {
    const updated = [...questions];
    let updatedQ = { ...updated[currentIndex], [field]: value };

    if (field === 'type' && value === 'True/False') {
      updatedQ.answers = [
        { id: 1, text: 'True', shape: '▲', color: 'bg-red-500', isCorrect: true },
        { id: 2, text: 'False', shape: '◆', color: 'bg-blue-500', isCorrect: false },
      ];
    } else if (field === 'type' && value !== 'True/False' && updatedQ.answers.length === 2) {
      updatedQ.answers = [
        { id: 1, text: 'Answer 1', shape: '▲', color: 'bg-red-500', isCorrect: true },
        { id: 2, text: 'Answer 2', shape: '◆', color: 'bg-blue-500', isCorrect: false },
        { id: 3, text: 'Answer 3', shape: '●', color: 'bg-amber-500', isCorrect: false },
        { id: 4, text: 'Answer 4', shape: '■', color: 'bg-emerald-500', isCorrect: false },
      ];
    }

    updated[currentIndex] = updatedQ;
    setQuestions(updated);
  };

  const handleAnswerChange = (ansId, field, value) => {
    const updated = [...questions];
    const currentAnswers = updated[currentIndex].answers;
    
    const newAnswers = currentAnswers.map(ans => {
      if (ans.id === ansId) {
        return { ...ans, [field]: value };
      }
      if (field === 'isCorrect' && value && updated[currentIndex].type !== 'Poll') {
        return { ...ans, isCorrect: false };
      }
      return ans;
    });

    updated[currentIndex].answers = newAnswers;
    setQuestions(updated);
  };

  const handleAddQuestion = () => {
    const newQ = {
      id: Date.now(),
      title: '',
      type: 'Quiz',
      timeLimit: 20,
      points: 'Standard',
      image: null,
      answers: [
        { id: 1, text: '', shape: '▲', color: 'bg-red-500', isCorrect: false },
        { id: 2, text: '', shape: '◆', color: 'bg-blue-500', isCorrect: false },
        { id: 3, text: '', shape: '●', color: 'bg-amber-500', isCorrect: false },
        { id: 4, text: '', shape: '■', color: 'bg-emerald-500', isCorrect: false },
      ]
    };
    setQuestions([...questions, newQ]);
    setCurrentIndex(questions.length);
  };

  const handleDeleteQuestion = (e, index) => {
    e.stopPropagation();
    if (questions.length <= 1) return;
    const updated = questions.filter((_, i) => i !== index);
    setQuestions(updated);
    if (currentIndex >= updated.length) {
      setCurrentIndex(updated.length - 1);
    }
  };

  const handleDuplicateQuestion = (e, index) => {
    e.stopPropagation();
    const qToCopy = questions[index];
    const duplicated = {
      ...qToCopy,
      id: Date.now(),
      title: `${qToCopy.title || 'Question'} (Copy)`,
      answers: qToCopy.answers.map(a => ({ ...a, id: Date.now() + Math.random() }))
    };
    const updated = [...questions];
    updated.splice(index + 1, 0, duplicated);
    setQuestions(updated);
    setCurrentIndex(index + 1);
  };

  const currentError = getQuestionError(currentQ);

  return (
    <div className="fixed inset-0 z-50 bg-brand-dark flex flex-col text-slate-100 font-sans overflow-hidden animate-in fade-in">
      
      {/* Top Header Bar */}
      <header className="h-16 bg-brand-cardDark border-b border-white/10 px-6 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-4">
          <button 
            onClick={onClose}
            className="p-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-slate-300 hover:text-white transition-colors flex items-center gap-2 text-sm font-semibold"
          >
            <ArrowLeft className="w-4 h-4" />
            Exit Studio
          </button>
          
          <div className="h-6 w-[1px] bg-white/10" />

          {/* Editable Quiz Title */}
          <input 
            type="text"
            value={quizTitle}
            onChange={(e) => setQuizTitle(e.target.value)}
            className="font-heading text-lg font-bold bg-transparent border border-transparent hover:border-white/20 focus:border-brand-lime focus:bg-white/5 rounded-xl px-3 py-1.5 transition-all outline-none text-white w-64"
          />

          {/* Cover Colour Picker */}
          <div className="flex items-center gap-1.5 bg-brand-dark/60 px-3 py-1.5 rounded-xl border border-white/10">
            <Palette className="w-4 h-4 text-slate-400" />
            <div className="flex items-center gap-1.5">
              {coverColors.map((c) => (
                <button
                  key={c.hex}
                  onClick={() => setCoverColor(c.hex)}
                  className={`w-5 h-5 rounded-full transition-all ${
                    coverColor === c.hex ? 'ring-2 ring-white scale-110' : 'opacity-70 hover:opacity-100'
                  }`}
                  style={{ backgroundColor: c.hex }}
                  title={c.name}
                />
              ))}
            </div>
          </div>

          {/* Visibility Toggle */}
          <button
            onClick={() => setVisibility(visibility === 'Private' ? 'Public' : 'Private')}
            className={`px-3 py-1.5 rounded-xl border text-xs font-bold transition-all flex items-center gap-1.5 ${
              visibility === 'Public' 
                ? 'bg-brand-lime/20 border-brand-lime/50 text-brand-lime' 
                : 'bg-white/5 border-white/10 text-slate-300'
            }`}
          >
            {visibility === 'Public' ? <Globe className="w-3.5 h-3.5" /> : <Lock className="w-3.5 h-3.5" />}
            {visibility}
          </button>
        </div>

        <div className="flex items-center gap-4">
          {/* Autosave Indicator */}
          <div className="text-xs font-semibold text-slate-400 flex items-center gap-1.5">
            <span className={`w-2 h-2 rounded-full ${saveStatus === 'Saving…' ? 'bg-amber-400 animate-ping' : 'bg-brand-lime'}`} />
            {saveStatus}
          </div>

          {/* Fill with sample quiz */}
          <button 
            onClick={handleFillSampleQuiz}
            className="px-3.5 py-2 rounded-xl bg-brand-violet/20 hover:bg-brand-violet/30 border border-brand-violet/50 text-brand-lime font-semibold text-sm transition-all flex items-center gap-1.5"
          >
            <Wand2 className="w-4 h-4 text-brand-lime" />
            ✨ Sample Quiz
          </button>

          {/* Big 3D "Save & Host" button */}
          <button 
            onClick={() => {
              const hasAnyError = questions.some(q => getQuestionError(q));
              if (hasAnyError) {
                alert('Please resolve validation hints on your questions before hosting.');
                return;
              }
              const updatedQuiz = {
                id: quizId,
                title: quizTitle,
                coverColor,
                visibility,
                questions,
                updatedAt: new Date().toISOString()
              };
              try {
                const existing = JSON.parse(localStorage.getItem('brainblitz_quizzes') || '[]');
                const index = existing.findIndex(q => q.id === quizId);
                if (index >= 0) {
                  existing[index] = updatedQuiz;
                } else {
                  existing.push(updatedQuiz);
                }
                localStorage.setItem('brainblitz_quizzes', JSON.stringify(existing));
              } catch (err) {
                console.warn('LocalStorage unavailable:', err);
              }

              if (onSaveQuiz) {
                onSaveQuiz(updatedQuiz);
              }

              if (onSaveAndHost) {
                onSaveAndHost(updatedQuiz);
              } else {
                alert(`Saved and launching live game for "${quizTitle}"!`);
              }
            }}
            className="btn-tactile bg-brand-lime hover:bg-brand-limeHover text-brand-dark font-heading font-extrabold px-6 py-3 rounded-2xl shadow-tactile-lime border-b-4 border-lime-700 flex items-center gap-2 text-base"
          >
            <Play className="w-5 h-5 fill-brand-dark" />
            Save & Host
          </button>
        </div>
      </header>

      {/* 3-Panel Editor Body */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* LEFT PANEL: Question Thumbnails List & Add Button */}
        <div className="w-72 bg-brand-cardDark/70 border-r border-white/10 flex flex-col shrink-0">
          
          <div className="p-4 border-b border-white/10 flex items-center justify-between">
            <span className="font-heading text-xs font-bold uppercase tracking-wider text-slate-400">
              Questions ({questions.length})
            </span>
            <span className="text-xs text-brand-lime font-semibold">
              Live State
            </span>
          </div>

          {/* Thumbnails Scroll Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 scrollbar-thin">
            {questions.map((q, idx) => {
              const isActive = currentIndex === idx;
              const qError = getQuestionError(q);
              return (
                <div 
                  key={q.id}
                  onClick={() => setCurrentIndex(idx)}
                  className={`group relative p-3 rounded-2xl border-2 cursor-pointer transition-all flex items-center gap-3 ${
                    isActive 
                      ? 'border-brand-lime bg-brand-violet/20 shadow-glow-violet' 
                      : 'border-white/10 bg-brand-dark/50 hover:border-white/30 hover:bg-white/5'
                  }`}
                >
                  <div className="cursor-grab active:cursor-grabbing text-slate-500 hover:text-slate-300">
                    <GripVertical className="w-4 h-4" />
                  </div>

                  <div className="relative w-6 h-6 rounded-lg bg-brand-dark border border-white/10 flex items-center justify-center font-heading text-xs font-bold text-slate-300">
                    {idx + 1}
                    {qError && (
                      <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-brand-dark animate-pulse" />
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="font-heading text-xs font-bold text-white truncate">
                      {q.title || <span className="text-slate-500 italic">Empty question</span>}
                    </div>
                    <div className="text-[10px] text-slate-400 flex items-center gap-2 pt-0.5">
                      <span>{q.type}</span>
                      <span>•</span>
                      <span>{q.timeLimit}s</span>
                    </div>
                  </div>

                  <div className="opacity-0 group-hover:opacity-100 flex items-center gap-1 transition-opacity">
                    <button 
                      onClick={(e) => handleDuplicateQuestion(e, idx)}
                      className="p-1 rounded-lg bg-white/10 hover:bg-white/20 text-slate-300"
                      title="Duplicate"
                    >
                      <Copy className="w-3.5 h-3.5" />
                    </button>
                    {questions.length > 1 && (
                      <button 
                        onClick={(e) => handleDeleteQuestion(e, idx)}
                        className="p-1 rounded-lg bg-red-500/20 hover:bg-red-500/40 text-red-300"
                        title="Delete"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Add Question Button */}
          <div className="p-4 border-t border-white/10 bg-brand-cardDark">
            <button 
              onClick={handleAddQuestion}
              className="w-full btn-tactile bg-brand-violet hover:bg-brand-violetDark text-white font-heading font-bold py-3 rounded-xl shadow-tactile border-b-4 border-violet-900 flex items-center justify-center gap-2 text-sm"
            >
              <Plus className="w-4 h-4" />
              Add question
            </button>
          </div>

        </div>

        {/* CENTRE PANEL: Active Question Editor */}
        <div className="flex-1 flex flex-col bg-brand-dark overflow-y-auto p-8 lg:p-12">
          <div className="max-w-4xl mx-auto w-full space-y-8">
            
            {currentError && (
              <div className="p-4 rounded-2xl bg-red-500/10 border border-red-500/30 flex items-center gap-3 text-red-300 animate-in fade-in">
                <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />
                <span className="text-sm font-semibold">{currentError}</span>
              </div>
            )}

            <div className="space-y-3">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 font-heading">
                Question {currentIndex + 1}
              </label>
              <input 
                type="text"
                value={currentQ.title}
                onChange={(e) => handleQuestionChange('title', e.target.value)}
                placeholder="Type your question here..."
                className="w-full font-heading text-2xl sm:text-3xl font-extrabold bg-brand-cardDark border-2 border-white/10 focus:border-brand-lime rounded-2xl p-6 outline-none text-white placeholder:text-slate-600 shadow-xl transition-all"
              />
            </div>

            <div className="space-y-3">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 font-heading">
                Media & Visuals (Optional)
              </label>
              <div className="border-2 border-dashed border-white/15 hover:border-brand-violet rounded-2xl p-8 text-center bg-brand-cardDark/40 transition-all group cursor-pointer flex flex-col items-center justify-center gap-3">
                <div className="w-14 h-14 rounded-2xl bg-brand-violet/20 border border-brand-violet/40 flex items-center justify-center text-brand-lime group-hover:scale-110 transition-transform">
                  <ImageIcon className="w-7 h-7" />
                </div>
                <div>
                  <div className="font-heading font-bold text-white text-sm">
                    Drag & drop an image, or <span className="text-brand-lime underline">browse files</span>
                  </div>
                  <div className="text-xs text-slate-400 pt-1">
                    Supports PNG, JPG, GIF up to 10MB • AI Image Generator available
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 font-heading">
                Answer Options ({currentQ.answers.length}) — Click the round button to mark correct answer
              </label>
              <div className={`grid grid-cols-1 ${currentQ.answers.length === 2 ? 'max-w-2xl mx-auto' : 'md:grid-cols-2'} gap-4`}>
                {currentQ.answers.map((ans) => (
                  <div 
                    key={ans.id}
                    className={`p-4 rounded-2xl border-2 transition-all flex items-center gap-4 shadow-xl ${
                      ans.isCorrect ? 'border-brand-lime bg-white/10 ring-2 ring-brand-lime/30' : 'border-white/10 bg-brand-cardDark/80'
                    }`}
                  >
                    <div className={`w-12 h-12 rounded-xl ${ans.color} flex items-center justify-center text-white font-extrabold text-xl shrink-0 shadow-md`}>
                      {ans.shape}
                    </div>

                    <input 
                      type="text"
                      value={ans.text}
                      onChange={(e) => handleAnswerChange(ans.id, 'text', e.target.value)}
                      placeholder={`Add answer ${ans.shape}...`}
                      className="flex-1 font-heading font-bold text-lg bg-transparent border-none outline-none text-white placeholder:text-slate-500"
                    />

                    <button 
                      type="button"
                      onClick={() => handleAnswerChange(ans.id, 'isCorrect', !ans.isCorrect)}
                      className={`w-10 h-10 rounded-full border-2 flex items-center justify-center transition-all shrink-0 ${
                        ans.isCorrect 
                          ? 'bg-brand-lime border-brand-lime text-brand-dark shadow-glow-lime scale-105' 
                          : 'border-white/20 bg-black/30 hover:border-white/50 text-transparent'
                      }`}
                      title="Toggle correct answer"
                    >
                      <Check className={`w-5 h-5 stroke-[3] ${ans.isCorrect ? 'text-brand-dark' : 'text-transparent'}`} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* RIGHT PANEL: Settings Panel */}
        <div className="w-80 bg-brand-cardDark/70 border-l border-white/10 p-6 flex flex-col gap-6 shrink-0 overflow-y-auto">
          
          <div className="flex items-center gap-2 pb-4 border-b border-white/10">
            <Settings className="w-5 h-5 text-brand-lime" />
            <h3 className="font-heading text-base font-bold text-white">
              Question Settings
            </h3>
          </div>

          <div className="space-y-3">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-400 font-heading block">
              Question Type
            </label>
            <div className="grid grid-cols-3 gap-2">
              {['Quiz', 'True/False', 'Poll'].map((t) => (
                <button
                  key={t}
                  onClick={() => handleQuestionChange('type', t)}
                  className={`py-2.5 px-2 rounded-xl text-xs font-bold border transition-all ${
                    currentQ.type === t 
                      ? 'bg-brand-violet border-brand-violet text-white shadow-glow-violet' 
                      : 'bg-brand-dark/50 border-white/10 text-slate-300 hover:border-white/30'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-400 font-heading">
              <Clock className="w-3.5 h-3.5 text-brand-lime" />
              Time Limit
            </div>
            <div className="grid grid-cols-4 gap-2">
              {[5, 10, 20, 30].map((sec) => (
                <button
                  key={sec}
                  onClick={() => handleQuestionChange('timeLimit', sec)}
                  className={`py-2.5 rounded-xl text-xs font-bold border transition-all ${
                    currentQ.timeLimit === sec 
                      ? 'bg-brand-lime border-brand-lime text-brand-dark shadow-sm' 
                      : 'bg-brand-dark/50 border-white/10 text-slate-300 hover:border-white/30'
                  }`}
                >
                  {sec}s
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-400 font-heading">
              <Award className="w-3.5 h-3.5 text-brand-lime" />
              Points
            </div>
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: 'Standard', desc: '1x points' },
                { label: 'Double', desc: '2x points' }
              ].map((p) => (
                <button
                  key={p.label}
                  onClick={() => handleQuestionChange('points', p.label)}
                  className={`p-3 rounded-2xl border text-left transition-all ${
                    currentQ.points === p.label 
                      ? 'bg-brand-violet/20 border-brand-violet text-white shadow-glow-violet' 
                      : 'bg-brand-dark/50 border-white/10 text-slate-400 hover:border-white/30'
                  }`}
                >
                  <div className="font-heading font-bold text-sm text-white">{p.label}</div>
                  <div className="text-[10px] text-slate-400">{p.desc}</div>
                </button>
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
