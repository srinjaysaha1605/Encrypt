import React from 'react';
import { playClickSound } from '../../audio';
import { AsymmetricGlitchedButton } from './AsymmetricGlitchedButton';

export interface CrypticButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'tertiary' | 'disabled';
  icon?: React.ReactNode;
  children: React.ReactNode;
}

export const CrypticButton: React.FC<CrypticButtonProps> = ({
  variant = 'primary',
  icon,
  children,
  onClick,
  disabled,
  className = '',
  ...props
}) => {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    playClickSound();
    if (onClick) onClick(e);
  };

  if (variant === 'disabled' || disabled) {
    return (
      <button
        disabled
        className={`relative inline-flex items-center justify-between gap-3 px-6 py-3 font-display font-semibold text-xs tracking-widest text-[#525866] bg-[#0c0e14] border border-[#222633] cursor-not-allowed clip-chamfer opacity-70 ${className}`}
        {...props}
      >
        <div className="flex items-center gap-2">
          <span className="text-[14px]">🔒</span>
          <span>{children}</span>
        </div>
      </button>
    );
  }

  if (variant === 'primary') {
    // Render the pixel-perfect Asymmetric Glitched polygon button from design reference
    return (
      <AsymmetricGlitchedButton
        onClick={onClick}
        className={className}
      >
        {children}
      </AsymmetricGlitchedButton>
    );
  }

  if (variant === 'secondary') {
    return (
      <button
        onClick={handleClick}
        className={`group relative inline-flex items-center justify-between gap-4 px-7 py-3 font-display font-semibold text-xs tracking-widest text-[#e2e8f0] bg-[#0a0c12] hover:bg-[#121520] active:bg-[#181c2b] border border-[#ff003c]/40 hover:border-[#ff003c] clip-chamfer hover:shadow-[0_0_15px_rgba(255,0,60,0.25)] transition-all duration-200 cursor-pointer ${className}`}
        {...props}
      >
        <span className="relative z-10 flex items-center gap-2.5">
          {icon || <span className="text-[#ff003c] text-xs">░░</span>}
          <span className="uppercase">{children}</span>
        </span>
        <span className="font-mono text-sm text-[#ff003c] group-hover:translate-x-1 transition-transform">→</span>
      </button>
    );
  }

  // Tertiary
  return (
    <button
      onClick={handleClick}
      className={`group relative inline-flex items-center justify-between gap-3 px-5 py-2.5 font-display font-medium text-xs tracking-widest text-[#a0aab8] hover:text-white bg-transparent hover:bg-[#ff003c]/10 border border-[#333846] hover:border-[#ff003c]/60 clip-chamfer transition-all duration-200 cursor-pointer ${className}`}
      {...props}
    >
      <span className="uppercase flex items-center gap-2">{children}</span>
      <span className="font-mono text-xs text-[#a0aab8] group-hover:text-[#ff003c] group-hover:translate-x-1 transition-all">→</span>
    </button>
  );
};
