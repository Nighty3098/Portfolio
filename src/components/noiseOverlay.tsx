import React from 'react';

interface NoiseOverlayProps {
  opacity?: number;
  className?: string;
  zIndex?: number;
}

const NoiseOverlay: React.FC<NoiseOverlayProps> = ({
  opacity = 1,
  className = '',
  zIndex = 9999
}) => {
  return (
    <div
      className={className}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        overflow: 'hidden',
        opacity: opacity,
        zIndex: zIndex
      }}
    >
      <div
        style={{
          width: '100%',
          height: '100%',
          backgroundImage: 'url("/grain.png")',
          backgroundRepeat: 'repeat',
          backgroundSize: '200px 200px',
          animation: 'noise 2s steps(1) infinite',
          willChange: 'background-position',
          backfaceVisibility: 'hidden',
          transform: 'translateZ(0)'
        }}
      />

      <style>{`
        @keyframes noise {
          0%, 100% { background-position: 0 0; }
          10% { background-position: -5% -10%; }
          20% { background-position: -15% 5%; }
          30% { background-position: 7% -25%; }
          40% { background-position: 20% 25%; }
          50% { background-position: -25% 10%; }
          60% { background-position: 15% 5%; }
          70% { background-position: 0% 15%; }
          80% { background-position: 25% 35%; }
          90% { background-position: -10% 10%; }
        }
      `}</style>
    </div>
  );
};

export default NoiseOverlay;
