
import React from 'react';

const CelebrationPopup = () => {
  return (
    <div className="celebration-overlay">
      <div className="celebration-popup">
        <span className="celebration-emoji">🎉</span>
        <h2 className="celebration-title">Great Catch!</h2>
        <p className="celebration-message">You caught a teddy! 🧸</p>
        
        <div className="celebration-stars">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="celebration-star"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${1 + Math.random()}s`
              }}
            >
              {i % 2 === 0 ? '⭐' : '💖'}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CelebrationPopup;
