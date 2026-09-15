import React, { useState } from 'react';
import { LandingScreen } from './components/LandingScreen';
import { MainWorkspace } from './components/MainWorkspace';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<'LANDING' | 'WORKSPACE'>('LANDING');

  return (
    <div className="w-full min-h-screen bg-[#030305] text-[#e2e8f0] font-mono selection:bg-[#ff003c] selection:text-white antialiased overflow-x-hidden">
      {currentScreen === 'LANDING' ? (
        <LandingScreen onEnterCrypt={() => setCurrentScreen('WORKSPACE')} />
      ) : (
        <MainWorkspace onReturnToLanding={() => setCurrentScreen('LANDING')} />
      )}
    </div>
  );
}
