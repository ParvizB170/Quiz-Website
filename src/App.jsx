import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import GameModes from './components/GameModes';
import TrendingQuizzes from './components/TrendingQuizzes';
import Features from './components/Features';
import HowItWorks from './components/HowItWorks';
import Testimonials from './components/Testimonials';
import CTA from './components/CTA';
import Footer from './components/Footer';
import GameModal from './components/GameModal';
import CreateQuizStudio from './components/CreateQuizStudio';
import MyQuizzesModal from './components/MyQuizzesModal';

const defaultSeedQuizzes = [
  {
    id: 1001,
    title: 'Cosmic Space Exploration Blitz 🚀',
    coverColor: '#7C3AED',
    visibility: 'Public',
    updatedAt: new Date().toISOString(),
    questions: [
      {
        id: 1,
        title: 'Which planet in our solar system is known as the Red Planet?',
        type: 'Quiz',
        timeLimit: 10,
        points: 'Standard',
        answers: [
          { id: 1, text: 'Mars', shape: '▲', color: 'bg-red-500', isCorrect: true },
          { id: 2, text: 'Venus', shape: '◆', color: 'bg-blue-500', isCorrect: false },
          { id: 3, text: 'Jupiter', shape: '●', color: 'bg-amber-500', isCorrect: false },
          { id: 4, text: 'Saturn', shape: '■', color: 'bg-emerald-500', isCorrect: false },
        ]
      },
      {
        id: 2,
        title: 'Venus is the hottest planet in our solar system because of its thick atmosphere.',
        type: 'True/False',
        timeLimit: 15,
        points: 'Standard',
        answers: [
          { id: 1, text: 'True', shape: '▲', color: 'bg-red-500', isCorrect: true },
          { id: 2, text: 'False', shape: '◆', color: 'bg-blue-500', isCorrect: false },
        ]
      }
    ]
  },
  {
    id: 1002,
    title: 'Cellular Biology & Genetics 🧬',
    coverColor: '#10B981',
    visibility: 'Private',
    updatedAt: new Date().toISOString(),
    questions: [
      {
        id: 1,
        title: 'Which organelle produces ATP for the cell?',
        type: 'Quiz',
        timeLimit: 20,
        points: 'Standard',
        answers: [
          { id: 1, text: 'Mitochondria', shape: '▲', color: 'bg-red-500', isCorrect: true },
          { id: 2, text: 'Ribosome', shape: '◆', color: 'bg-blue-500', isCorrect: false },
        ]
      }
    ]
  }
];

export default function App() {
  const [view, setView] = useState('landing'); // 'landing' or 'studio'
  const [modalState, setModalState] = useState({ isOpen: false, mode: 'join', pin: '', quiz: null });
  const [myQuizzesOpen, setMyQuizzesOpen] = useState(false);
  
  // Quizzes list with localStorage persistence + memory fallback
  const [quizzes, setQuizzes] = useState(() => {
    try {
      const saved = localStorage.getItem('brainblitz_quizzes');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.warn('LocalStorage error reading quizzes:', e);
    }
    return defaultSeedQuizzes;
  });

  const [activeEditingQuiz, setActiveEditingQuiz] = useState(null);

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('brainblitz_quizzes', JSON.stringify(quizzes));
    } catch (e) {
      console.warn('LocalStorage error saving quizzes:', e);
    }
  }, [quizzes]);

  const handleJoinGame = (pin) => {
    setModalState({ isOpen: true, mode: 'join', pin, quiz: null });
  };

  const handleHostClick = () => {
    handleCreateNewQuiz();
  };

  const handleHostQuiz = (quiz) => {
    setMyQuizzesOpen(false);
    setView('landing');
    setModalState({ isOpen: true, mode: 'host', pin: '', quiz });
  };

  const handleSaveAndHost = (savedQuiz) => {
    handleSaveQuiz(savedQuiz);
    setView('landing');
    setModalState({ isOpen: true, mode: 'host', pin: '', quiz: savedQuiz });
  };

  const handleCreateNewQuiz = () => {
    const newQuiz = {
      id: Date.now(),
      title: 'New Untitled Quiz',
      coverColor: '#7C3AED',
      visibility: 'Private',
      questions: [
        {
          id: 1,
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
        }
      ]
    };
    setActiveEditingQuiz(newQuiz);
    setMyQuizzesOpen(false);
    setView('studio');
  };

  const handleSelectQuizToEdit = (quiz) => {
    setActiveEditingQuiz(quiz);
    setMyQuizzesOpen(false);
    setView('studio');
  };

  const handleDeleteQuiz = (id) => {
    setQuizzes(prev => prev.filter(q => q.id !== id));
  };

  const handleSaveQuiz = (updatedQuiz) => {
    setQuizzes(prev => {
      const index = prev.findIndex(q => q.id === updatedQuiz.id);
      if (index >= 0) {
        const copy = [...prev];
        copy[index] = updatedQuiz;
        return copy;
      }
      return [updatedQuiz, ...prev];
    });
  };

  const handleCloseModal = () => {
    setModalState({ isOpen: false, mode: 'join', pin: '' });
  };

  if (view === 'studio') {
    return (
      <CreateQuizStudio 
        currentQuiz={activeEditingQuiz} 
        onClose={() => setView('landing')} 
        onSaveQuiz={handleSaveQuiz}
        onSaveAndHost={handleSaveAndHost}
      />
    );
  }

  return (
    <div className="min-h-screen bg-brand-dark text-slate-100 font-sans selection:bg-brand-lime selection:text-brand-dark">
      
      {/* Sticky Navigation Bar */}
      <Navbar 
        onHostClick={handleHostClick} 
        onMyQuizzesClick={() => setMyQuizzesOpen(true)} 
      />

      {/* Hero Section */}
      <Hero onJoinGame={handleJoinGame} onHostClick={handleHostClick} />

      {/* Game Modes Bento Grid */}
      <GameModes onHostClick={handleHostClick} />

      {/* Trending Quizzes Horizontal Snap Scroll */}
      <TrendingQuizzes onHostClick={handleHostClick} />

      {/* For Teachers / Features */}
      <Features />

      {/* How It Works Strip (Host -> Join -> Play) */}
      <HowItWorks onHostClick={handleHostClick} />

      {/* Testimonials */}
      <Testimonials />

      {/* Final Call to Action */}
      <CTA onHostClick={handleHostClick} />

      {/* Footer */}
      <Footer />

      {/* Interactive Game / Host Modal */}
      {modalState.isOpen && (
        <GameModal 
          mode={modalState.mode} 
          initialPin={modalState.pin} 
          quiz={modalState.quiz || quizzes[0] || defaultSpaceQuiz}
          onClose={handleCloseModal}
          onNewQuiz={() => {
            handleCloseModal();
            setMyQuizzesOpen(true);
          }}
        />
      )}

      {/* My Quizzes Modal */}
      {myQuizzesOpen && (
        <MyQuizzesModal 
          quizzes={quizzes}
          onSelectQuiz={handleSelectQuizToEdit}
          onCreateNew={handleCreateNewQuiz}
          onDeleteQuiz={handleDeleteQuiz}
          onHostQuiz={handleHostQuiz}
          onClose={() => setMyQuizzesOpen(false)}
        />
      )}

    </div>
  );
}
