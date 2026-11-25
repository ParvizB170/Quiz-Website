# Project Overview

**BrainBlitz** (`brainblitz-landing`) is a modern, interactive quiz platform and landing page web application built with React, Vite, and Tailwind CSS. It provides an engaging UI with tactile buttons, custom glowing effects, quiz creation studio, game modes, and local storage persistence for user-created quizzes.

## Core Technologies

- **Framework:** React 18 (`react`, `react-dom`)
- **Bundler / Dev Server:** Vite (`vite`, `@vitejs/plugin-react`)
- **Styling:** Tailwind CSS (`tailwindcss`, `postcss`, `autoprefixer`) with custom theme extensions (brand colors, fonts Bricolage Grotesque & Plus Jakarta Sans, tactile shadows).
- **Icons:** `lucide-react`

## Directory Structure

```
C:\Users\baxti\Desktop\Quiz-Website\
├── index.html
├── package.json
├── package-lock.json
├── postcss.config.js
├── tailwind.config.js
├── vite.config.js
├── README.md
├── dist/
├── node_modules/
└── src/
    ├── App.jsx            # Main app component, view switcher, quiz state & localStorage sync
    ├── index.css          # Global styles & Tailwind imports
    ├── main.jsx           # React app entry point
    └── components/        # UI components & modals
        ├── CreateQuizStudio.jsx
        ├── CTA.jsx
        ├── Features.jsx
        ├── Footer.jsx
        ├── GameModal.jsx
        ├── GameModes.jsx
        ├── Hero.jsx
        ├── HowItWorks.jsx
        ├── MyQuizzesModal.jsx
        ├── Navbar.jsx
        ├── Testimonials.jsx
        └── TrendingQuizzes.jsx
```

# Building and Running

## Installation
```bash
npm install
```

## Development Server
```bash
npm run dev
```
Starts the Vite dev server locally.

## Production Build
```bash
npm run build
```
Bundles the application for production in the `dist/` directory.

## Preview Build
```bash
npm run preview
```
Locally preview the production build.

# Development Conventions

- **React Components:** Use functional components with React Hooks (`useState`, `useEffect`, etc.).
- **Styling Guidelines:** Use Tailwind CSS utility classes. Custom design tokens (e.g., `bg-brand-violet`, `shadow-tactile`, `font-heading`) are defined in `tailwind.config.js`.
- **State & Persistence:** Client-side state managed via React hooks with automatic synchronization to `localStorage` (e.g., `brainblitz_quizzes`).
- **Code Quality:** Maintain type safety, modular component breakdown under `src/components/`, and clean idiomatic React code.
