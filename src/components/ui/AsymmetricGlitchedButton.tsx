import React from 'react';
import { playClickSound } from '../../audio';

export interface AsymmetricGlitchedButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
}

export const AsymmetricGlitchedButton: React.FC<AsymmetricGlitchedButtonProps> = ({
  children = 'ENTER THE CRYPT',
  onClick,
  className = '',
  ...props
}) => {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    playClickSound();
    if (onClick) onClick(e);
  };

  return (
    <button
      onClick={handleClick}
      className={`group relative inline-block cursor-pointer select-none bg-transparent border-0 p-0 transition-transform duration-300 hover:scale-[1.03] active:scale-[0.98] ${className}`}
      {...props}
    >
      <svg
        width="460"
        height="84"
        viewBox="0 0 460 84"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto max-w-[460px] filter drop-shadow-[0_0_12px_rgba(255,0,60,0.5)] group-hover:drop-shadow-[0_0_25px_rgba(255,0,60,0.9)] transition-all duration-300"
      >
        <defs>
          {/* Red Glow Filters */}
          <filter id="redOuterGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>

          {/* Dark Background Gradient with Subtle Red Aura */}
          <radialGradient id="btnBgGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#140206" />
            <stop offset="60%" stopColor="#08090d" />
            <stop offset="100%" stopColor="#040406" />
          </radialGradient>

          {/* Glitch Fill Pattern */}
          <pattern id="noisePattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
            <line x1="0" y1="2" x2="20" y2="2" stroke="rgba(255,0,60,0.06)" strokeWidth="1" />
            <line x1="0" y1="10" x2="20" y2="10" stroke="rgba(255,0,60,0.03)" strokeWidth="1" />
          </pattern>
        </defs>

        {/* Outer Asymmetric Cut Polygon Fill */}
        <path
          d="M 40,16 L 375,6 L 445,70 L 275,68 L 265,77 L 230,77 L 222,68 L 15,62 Z"
          fill="url(#btnBgGrad)"
          className="group-hover:fill-[#1a0208] transition-colors duration-300"
        />

        {/* Noise overlay fill */}
        <path
          d="M 40,16 L 375,6 L 445,70 L 275,68 L 265,77 L 230,77 L 222,68 L 15,62 Z"
          fill="url(#noisePattern)"
        />

        {/* Inner Red Fill Highlight on Hover */}
        <path
          d="M 40,16 L 375,6 L 445,70 L 275,68 L 265,77 L 230,77 L 222,68 L 15,62 Z"
          fill="rgba(255,0,60,0.12)"
          className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        />

        {/* Primary Glowing Blood-Red Outer Frame */}
        <path
          d="M 40,16 L 375,6 L 445,70 L 275,68 L 265,77 L 230,77 L 222,68 L 15,62 Z"
          stroke="#ff003c"
          strokeWidth="2.5"
          strokeLinejoin="miter"
          filter="url(#redOuterGlow)"
        />

        {/* Inner Thin Frame Accent */}
        <path
          d="M 43,19 L 372,9 L 439,67 L 273,65 L 263,74 L 232,74 L 224,65 L 18,59 Z"
          stroke="#ff003c"
          strokeWidth="0.75"
          strokeOpacity="0.5"
        />

        {/* Horizontal Glitch Spur Ticks */}
        <line x1="280" y1="5" x2="355" y2="5" stroke="#ff003c" strokeWidth="1.5" className="animate-glitch" />
        <line x1="390" y1="38" x2="430" y2="38" stroke="#ff003c" strokeWidth="1.5" className="animate-glitch" />
        <line x1="235" y1="81" x2="280" y2="81" stroke="#ff003c" strokeWidth="1.5" />
        <line x1="8" y1="58" x2="60" y2="58" stroke="#ff003c" strokeWidth="1.5" />

        {/* Left Red Vertical Bar Marker */}
        <line x1="80" y1="33" x2="80" y2="51" stroke="#ff003c" strokeWidth="3" strokeLinecap="square" />

        {/* Button Label Text */}
        <text
          x="102"
          y="47"
          fill="#f0f3f8"
          fontFamily="JetBrains Mono, monospace"
          fontSize="15"
          fontWeight="600"
          letterSpacing="4"
          className="uppercase select-none group-hover:fill-white transition-colors"
        >
          {typeof children === 'string' ? children : 'ENTER THE CRYPT'}
        </text>

        {/* Right Red Chevron Arrow > */}
        <g className="group-hover:translate-x-1 transition-transform duration-200">
          <polyline
            points="350,33 365,42 350,51"
            stroke="#ff003c"
            strokeWidth="5"
            fill="none"
            strokeLinecap="square"
            strokeLinejoin="miter"
            filter="url(#redOuterGlow)"
          />
        </g>
      </svg>
    </button>
  );
};
