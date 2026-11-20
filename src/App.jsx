import React, { useState } from 'react';
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

export default function App() {
  const [modalState, setModalState] = useState({ isOpen: false, mode: 'join', pin: '' });

  const handleJoinGame = (pin) => {
    setModalState({ isOpen: true, mode: 'join', pin });
  };

  const handleHostClick = () => {
    setModalState({ isOpen: true, mode: 'host', pin: '' });
  };

  const handleCloseModal = () => {
    setModalState({ isOpen: false, mode: 'join', pin: '' });
  };

  return (
    <div className="min-h-screen bg-brand-dark text-slate-100 font-sans selection:bg-brand-lime selection:text-brand-dark">
      
      {/* Sticky Navigation Bar */}
      <Navbar onHostClick={handleHostClick} />

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
          onClose={handleCloseModal} 
        />
      )}

    </div>
  );
}
