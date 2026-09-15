import React, { useEffect, useState } from 'react';

interface CrypticSigilProps {
  size?: number;
  interactive?: boolean;
  className?: string;
  color?: string;
}

export const CrypticSigil: React.FC<CrypticSigilProps> = ({
  size = 320,
  interactive = true,
  className = '',
  color = '#ff003c',
}) => {
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; text: string; opacity: number }>>([]);

  useEffect(() => {
    // Generate floating hex particles
    const hexes = ['0x4E', '0x43', '0x52', '0x99', '0x54', '0xFF', '0x00', '0x3C', '0xA1', '0x7E', '0x8B', '0x12'];
    const newParticles = Array.from({ length: 12 }, (_, i) => ({
      id: i,
      x: (Math.random() - 0.5) * 220,
      y: (Math.random() - 0.5) * 220,
      text: hexes[i % hexes.length],
      opacity: 0.2 + Math.random() * 0.5,
    }));
    setParticles(newParticles);
  }, []);

  const isWhite = color === '#ffffff' || color === 'white';
  const glowGradient = isWhite
    ? 'radial-gradient(circle, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0.08) 50%, transparent 75%)'
    : 'radial-gradient(circle, rgba(255,0,60,0.25) 0%, rgba(255,0,60,0.05) 50%, transparent 75%)';

  return (
    <div className={`relative flex items-center justify-center select-none max-w-full overflow-hidden p-2 ${className}`}>
      {/* Background Radial Glow */}
      <div 
        className="absolute rounded-full pointer-events-none animate-pulse-glow max-w-full max-h-full"
        style={{
          width: size * 0.9,
          height: size * 0.9,
          background: glowGradient,
        }}
      />

      {/* Main SVG Sigil */}
      <svg
        width={size}
        height={size}
        viewBox="0 0 400 400"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="relative z-10 max-w-full h-auto"
        style={{ maxWidth: `${size}px` }}
      >
        <defs>
          <filter id="glowFilter" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Outer Hexagon / Compass Bounds */}
        <g className="animate-rotate-slow origin-center" style={{ transformOrigin: '200px 200px' }}>
          {/* Outer Thin Circle */}
          <circle cx="200" cy="200" r="180" stroke={color} strokeWidth="0.75" strokeOpacity="0.3" strokeDasharray="4 8" />
          <circle cx="200" cy="200" r="165" stroke={color} strokeWidth="1" strokeOpacity="0.5" />
          <circle cx="200" cy="200" r="150" stroke={color} strokeWidth="0.5" strokeOpacity="0.4" strokeDasharray="20 4 2 4" />

          {/* Compass Ticks */}
          {Array.from({ length: 36 }).map((_, i) => {
            const angle = (i * 10 * Math.PI) / 180;
            const r1 = i % 9 === 0 ? 155 : 160;
            const r2 = 165;
            const x1 = 200 + r1 * Math.cos(angle);
            const y1 = 200 + r1 * Math.sin(angle);
            const x2 = 200 + r2 * Math.cos(angle);
            const y2 = 200 + r2 * Math.sin(angle);
            return (
              <line
                key={i}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke={color}
                strokeWidth={i % 9 === 0 ? "1.5" : "0.75"}
                strokeOpacity={i % 9 === 0 ? "0.9" : "0.4"}
              />
            );
          })}
        </g>

        {/* Counter-rotating Inner Rune Ring */}
        <g className="animate-rotate-reverse origin-center" style={{ transformOrigin: '200px 200px' }}>
          <circle cx="200" cy="200" r="125" stroke={color} strokeWidth="1" strokeOpacity="0.7" />
          <circle cx="200" cy="200" r="105" stroke={color} strokeWidth="0.75" strokeOpacity="0.4" strokeDasharray="1 5" />
          
          {/* Occult Geometric Quadrants */}
          <polygon points="200,75 325,200 200,325 75,200" stroke={color} strokeWidth="0.75" strokeOpacity="0.6" fill="none" />
          <polygon points="200,95 305,200 200,305 95,200" stroke={color} strokeWidth="0.5" strokeOpacity="0.3" fill="none" />
        </g>

        {/* Stationary Central Precision Reticle & Crosshairs */}
        <g filter="url(#glowFilter)">
          {/* Major Vertical Axis */}
          <line x1="200" y1="20" x2="200" y2="380" stroke={color} strokeWidth="1" strokeOpacity="0.8" />
          {/* Major Horizontal Axis */}
          <line x1="20" y1="200" x2="380" y2="200" stroke={color} strokeWidth="1" strokeOpacity="0.8" />

          {/* Top & Bottom Diamond Terminals */}
          <polygon points="200,30 207,45 200,60 193,45" fill={color} />
          <polygon points="200,340 207,355 200,370 193,355" fill={color} />
          <polygon points="30,200 45,193 60,200 45,207" fill={color} />
          <polygon points="340,200 355,193 370,200 355,207" fill={color} />

          {/* Concentric Center Eye / Diamond Keyhole Seal */}
          <circle cx="200" cy="200" r="65" stroke={color} strokeWidth="2" strokeOpacity="0.9" fill="#030305" />
          <circle cx="200" cy="200" r="45" stroke={color} strokeWidth="1" strokeOpacity="0.7" fill="none" />

          {/* Central Eye/Keyhole Oculus */}
          <path
            d="M155,200 Q200,150 245,200 Q200,250 155,200 Z"
            stroke={color}
            strokeWidth="1.5"
            fill={isWhite ? "rgba(255,255,255,0.2)" : "rgba(255,0,60,0.15)"}
          />
          <circle cx="200" cy="200" r="14" fill={color} />
          <circle cx="200" cy="200" r="5" fill={isWhite ? "#000000" : "#ffffff"} />
        </g>

        {/* Glitch Overlay Lines */}
        <line x1="120" y1="180" x2="280" y2="180" stroke="#ffffff" strokeWidth="0.5" strokeOpacity="0.3" className="animate-glitch" />
        <line x1="90" y1="220" x2="310" y2="220" stroke={color} strokeWidth="0.5" strokeOpacity="0.4" className="animate-glitch" />
      </svg>

      {/* Floating Hexadecimal Particles around Sigil */}
      {particles.map((p) => (
        <span
          key={p.id}
          className="absolute font-mono text-[10px] pointer-events-none select-none tracking-widest transition-opacity duration-1000"
          style={{
            transform: `translate(${p.x}px, ${p.y}px)`,
            opacity: p.opacity,
            color: color,
            textShadow: isWhite ? '0 0 6px rgba(255, 255, 255, 0.6)' : '0 0 6px rgba(255, 0, 60, 0.6)',
          }}
        >
          {p.text}
        </span>
      ))}
    </div>
  );
};
