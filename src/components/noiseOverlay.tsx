import React from 'react';

interface NoiseOverlayProps {
  opacity?: number;
  className?: string;
  zIndex?: number;
}

const NoiseOverlay: React.FC<NoiseOverlayProps> = ({
  opacity = 1,
  className = '',
  zIndex = 1000
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
        contain: 'strict',
        opacity: opacity,
        zIndex: zIndex
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `url("${process.env.PUBLIC_URL}/grain.png")`,
          backgroundRepeat: 'repeat',
          backgroundSize: '200px 200px',
        }}
      />
    </div>
  );
};

export default NoiseOverlay;
