
import React from 'react';

const Sink = ({ gameArea }) => {
  const sinkWidth = Math.max(120, gameArea.width * 0.15);
  
  return (
    <div
      style={{
        position: 'absolute',
        bottom: '80px',
        right: '20px',
        width: `${sinkWidth}px`,
        height: '100px',
        background: 'linear-gradient(180deg, #9ca3af, #374151)',
        border: '4px solid #1f2937',
        borderRadius: '12px 12px 6px 6px',
        boxShadow: '0 10px 20px rgba(0, 0, 0, 0.3)'
      }}
    >
      {/* Sink interior */}
      <div style={{
        position: 'absolute',
        top: '12px',
        left: '12px',
        right: '12px',
        bottom: '12px',
        background: 'linear-gradient(180deg, #6b7280, #1f2937)',
        borderRadius: '4px',
        boxShadow: 'inset 0 4px 8px rgba(0, 0, 0, 0.3)'
      }}>
        {/* Metal shine effect */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '12px',
          background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.2), transparent)',
          borderRadius: '4px 4px 0 0'
        }} />
        
        {/* Water/collection area */}
        <div style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '12px',
          background: 'linear-gradient(0deg, rgba(59, 130, 246, 0.3), transparent)',
          borderRadius: '0 0 4px 4px'
        }} />
      </div>
      
      {/* Sink label */}
      <div style={{
        position: 'absolute',
        top: '-32px',
        left: '50%',
        transform: 'translateX(-50%)',
        fontSize: '12px',
        fontWeight: 'bold',
        color: '#8b5cf6',
        background: 'rgba(255, 255, 255, 0.9)',
        padding: '4px 12px',
        borderRadius: '20px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        border: '2px solid #f9a8d4'
      }}>
        DROP HERE
      </div>
      
      {/* Decorative elements */}
      <div style={{
        position: 'absolute',
        top: '-12px',
        left: '-12px',
        fontSize: '18px'
      }}>⭐</div>
      <div style={{
        position: 'absolute',
        top: '-16px',
        right: '-8px',
        fontSize: '18px'
      }}>💖</div>
    </div>
  );
};

export default Sink;
