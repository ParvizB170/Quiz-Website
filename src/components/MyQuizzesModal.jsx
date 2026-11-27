import React from 'react';
import { X, Play, Edit3, Trash2, Globe, Lock, Plus, Sparkles } from 'lucide-react';

export default function MyQuizzesModal({ quizzes, onSelectQuiz, onCreateNew, onDeleteQuiz, onHostQuiz, onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl bg-brand-cardDark border border-brand-violet/40 rounded-3xl p-8 shadow-2xl text-white overflow-hidden max-h-[85vh] flex flex-col">
        
        {/* Glow */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-brand-violet/25 rounded-full blur-3xl pointer-events-none" />

        {/* Header */}
        <div className="flex items-center justify-between pb-6 border-b border-white/10 relative z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-brand-violet/20 border border-brand-violet/40 flex items-center justify-center text-brand-lime">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-heading text-2xl font-extrabold">My Quizzes</h3>
              <p className="text-xs text-slate-400">Manage and host your saved game collections</p>
            </div>
          </div>

          <button 
            onClick={onClose}
            className="p-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-slate-300 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quizzes Grid */}
        <div className="flex-1 overflow-y-auto py-6 space-y-4 relative z-10 scrollbar-thin pr-1">
          {quizzes.length === 0 ? (
            <div className="text-center py-16 space-y-4">
              <div className="w-16 h-16 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center mx-auto text-2xl">
                📚
              </div>
              <div className="space-y-1">
                <h4 className="font-heading text-lg font-bold">No saved quizzes yet</h4>
                <p className="text-xs text-slate-400">Create your first quiz or load a sample quiz in the studio.</p>
              </div>
              <button 
                onClick={onCreateNew}
                className="btn-tactile bg-brand-lime hover:bg-brand-limeHover text-brand-dark font-heading font-extrabold px-6 py-3 rounded-xl shadow-tactile-lime border-b-4 border-lime-700 text-sm inline-flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Create New Quiz
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {quizzes.map((quiz) => (
                <div 
                  key={quiz.id}
                  className="bg-brand-dark/80 border border-white/10 rounded-2xl p-5 hover:border-brand-violet/60 transition-all shadow-xl flex flex-col justify-between group"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      {/* Cover color badge */}
                      <div className="flex items-center gap-2">
                        <div 
                          className="w-4 h-4 rounded-full shadow-md"
                          style={{ backgroundColor: quiz.coverColor || '#7C3AED' }}
                        />
                        <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-slate-300 uppercase">
                          {quiz.visibility || 'Private'}
                        </span>
                      </div>

                      {quiz.visibility === 'Public' ? (
                        <Globe className="w-3.5 h-3.5 text-brand-lime" />
                      ) : (
                        <Lock className="w-3.5 h-3.5 text-slate-400" />
                      )}
                    </div>

                    <h4 className="font-heading text-lg font-bold text-white group-hover:text-brand-lime transition-colors line-clamp-1">
                      {quiz.title || 'Untitled Quiz'}
                    </h4>

                    <div className="text-xs text-slate-400 font-medium">
                      {quiz.questions?.length || 0} questions • Updated recently
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-white/10 flex items-center justify-between gap-2">
                    <button 
                      onClick={() => onHostQuiz && onHostQuiz(quiz)}
                      className="btn-tactile bg-brand-lime hover:bg-brand-limeHover text-brand-dark font-heading font-extrabold px-3.5 py-2 rounded-xl shadow-tactile-lime border-b-4 border-lime-700 text-xs flex items-center justify-center gap-1.5"
                      title="Host live game"
                    >
                      <Play className="w-3.5 h-3.5 fill-brand-dark" />
                      Host
                    </button>

                    <button 
                      onClick={() => onSelectQuiz(quiz)}
                      className="flex-1 btn-tactile bg-brand-violet hover:bg-brand-violetDark text-white font-heading font-bold py-2 rounded-xl shadow-tactile border-b-4 border-violet-900 text-xs flex items-center justify-center gap-1.5"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                      Edit
                    </button>
                    
                    <button 
                      onClick={() => onDeleteQuiz(quiz.id)}
                      className="p-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-300 border border-red-500/30 transition-colors"
                      title="Delete quiz"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-white/10 flex items-center justify-between relative z-10">
          <button 
            onClick={onCreateNew}
            className="btn-tactile bg-brand-lime hover:bg-brand-limeHover text-brand-dark font-heading font-extrabold px-5 py-2.5 rounded-xl shadow-tactile-lime border-b-4 border-lime-700 text-sm flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Create New Quiz
          </button>

          <button 
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 font-semibold text-sm"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
}
