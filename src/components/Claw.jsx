
import React from 'react';

const Claw = ({ position, gameArea }) => {
  const clawSize = Math.max(40, Math.min(80, gameArea.width * 0.08));
  const cableWidth = Math.max(2, gameArea.width * 0.005);
  
  return (
    <div
      style={{
        position: 'absolute',
        left: position.x - clawSize / 2,
        top: position.y - clawSize / 2,
        transform: position.isMoving ? 'scale(1.1)' : 'scale(1)',
        transition: 'all 0.3s ease-in-out',
        zIndex: 20
      }}
    >
      {/* Claw cable */}
      <div 
        style={{
          position: 'absolute',
          width: `${cableWidth}px`,
          height: Math.max(10, position.y - 10),
          left: `${clawSize / 2 - cableWidth / 2}px`,
          top: `-${Math.max(10, position.y - 10)}px`,
          background: '#374151',
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)'
        }}
      />
      
      {/* Claw mechanism */}
      <div 
        style={{ 
          position: 'relative',
          display: 'flex',
          justifyContent: 'center',
          width: `${clawSize}px`, 
          height: `${clawSize * 1.2}px` 
        }}
      >
        {/* Left claw */}
        <div
          style={{
            position: 'absolute',
            width: `${clawSize * 0.3}px`,
            height: `${clawSize * 0.8}px`,
            left: `${clawSize * 0.2}px`,
            top: `${clawSize * 0.1}px`,
            background: 'linear-gradient(180deg, #9ca3af, #374151)',
            borderRadius: '8px 8px 0 0',
            border: '2px solid #1f2937',
            transform: position.isOpen ? 'rotate(-12deg)' : 'rotate(12deg)',
            transformOrigin: 'top center',
            transition: 'transform 0.2s ease'
          }}
        />
        
        {/* Right claw */}
        <div
          style={{
            position: 'absolute',
            width: `${clawSize * 0.3}px`,
            height: `${clawSize * 0.8}px`,
            right: `${clawSize * 0.2}px`,
            top: `${clawSize * 0.1}px`,
            background: 'linear-gradient(180deg, #9ca3af, #374151)',
            borderRadius: '8px 8px 0 0',
            border: '2px solid #1f2937',
            transform: position.isOpen ? 'rotate(12deg)' : 'rotate(-12deg)',
            transformOrigin: 'top center',
            transition: 'transform 0.2s ease'
          }}
        />
        
        {/* Claw center mechanism */}
        <div 
          style={{
            position: 'absolute',
            width: `${clawSize * 0.6}px`,
            height: `${clawSize * 0.4}px`,
            top: `${clawSize * 0.02}px`,
            left: '50%',
            transform: 'translateX(-50%)',
            background: 'linear-gradient(180deg, #d1d5db, #6b7280)',
            borderRadius: '4px',
            border: '2px solid #374151'
          }}
        />
        
        {/* Caught teddy */}
        {position.caughtTeddy && (
          <div
            style={{
              position: 'absolute',
              top: `${clawSize * 1.1}px`,
              left: '50%',
              transform: 'translateX(-50%)',
              fontSize: `${Math.max(20, Math.min(40, gameArea.width * 0.04))}px`,
              lineHeight: '1'
            }}
          >
            🧸
          </div>
        )}
      </div>
    </div>
  );
};

export default Claw;
