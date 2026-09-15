import React, { useState } from 'react';
import { CrypticSigil } from './ui/CrypticSigil';
import { CrypticButton } from './ui/CrypticButton';
import { playEnterCryptSound } from '../audio';

export interface LandingScreenProps {
  onEnterCrypt: () => void;
}

export const LandingScreen: React.FC<LandingScreenProps> = ({ onEnterCrypt }) => {
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);

  const handleEnter = () => {
    setIsTransitioning(true);
    playEnterCryptSound();
    setTimeout(() => {
      onEnterCrypt();
    }, 1200);
  };

  return (
    <div
      className={`relative w-full min-h-screen bg-[#000000] text-[#e2e8f0] flex flex-col items-center justify-between p-6 overflow-hidden select-none transition-all duration-1000 ${
        isTransitioning ? 'scale-125 opacity-0 blur-md filter' : 'opacity-100'
      }`}
    >
      {/* Background Subtle Red Tech Grid */}
      <div className="absolute inset-0 bg-red-grid opacity-30 pointer-events-none" />

      {/* TOP HUD Technical Readouts */}
      <div className="relative z-20 w-full max-w-7xl flex items-center justify-between font-mono text-[10px] tracking-widest text-[#717a8c] uppercase">
        <div className="flex items-center gap-3">
          <span className="w-2 h-2 rounded-full bg-[#ff003c] animate-ping" />
          <span className="text-[#ff003c] font-bold">0x4E 0x43 0x52</span>
          <span>// ENCRYPT_CORE_ONLINE</span>
        </div>

        <div className="hidden sm:flex items-center gap-2 text-[#51596a]">
          <span className="text-[#ff003c]">&gt;</span> SHA-256
          <span className="text-[#ff003c]">&gt;</span> AES-GCM
          <span className="text-[#ff003c]">&gt;</span> HMAC
          <span className="text-[#ff003c]">&gt;</span> RSA
          <span className="text-[#ff003c]">&gt;</span> ECDSA
        </div>
      </div>

      {/* CENTER Composition: Sigil + Branding + Enter CTA */}
      <div className="relative z-20 flex flex-col items-center justify-center text-center my-auto max-w-3xl">
        {/* Geometric Red Seal / Sigil */}
        <div className="mb-6 transform hover:scale-105 transition-transform duration-500 cursor-pointer">
          <CrypticSigil size={320} />
        </div>

        {/* E N C R Y P T Title */}
        <h1 className="font-heading font-black text-5xl sm:text-7xl lg:text-8xl tracking-[0.25em] text-white flex items-center justify-center my-2 uppercase drop-shadow-[0_0_20px_rgba(255,0,60,0.5)]">
          E<span className="text-[#ff003c] animate-glitch">N</span>CRYPT
        </h1>

        {/* Subtitle */}
        <div className="font-mono text-xs sm:text-sm tracking-[0.35em] text-[#8e98a8] uppercase mb-10 flex items-center gap-3">
          <span>ARS</span>
          <span className="text-[#ff003c] font-bold">/</span>
          <span>CRYPTOGRAPHICA</span>
        </div>

        {/* > ENTER THE CRYPT Button */}
        <div className="relative group">
          <CrypticButton
            variant="primary"
            onClick={handleEnter}
          >
            ENTER THE CRYPT
          </CrypticButton>
        </div>
      </div>

      {/* BOTTOM HUD Corner Mottos */}
      <div className="relative z-20 w-full max-w-7xl flex items-center justify-between font-mono text-[10px] tracking-widest text-[#565e70] uppercase pt-4 border-t border-[#121520]">
        <div className="flex items-center gap-2">
          <span className="text-[#ff003c]">❖</span>
          <span>THE TRUTH IS ALWAYS ENCRYPTED</span>
        </div>

        <div className="flex items-center gap-2">
          <span>DECODE THE UNKNOWN</span>
          <span className="text-[#ff003c]">❖</span>
        </div>
      </div>

      {/* Glitch Overlay Pulse when transitioning */}
      {isTransitioning && (
        <div className="absolute inset-0 bg-[#ff003c]/20 z-50 pointer-events-none animate-pulse" />
      )}
    </div>
  );
};
