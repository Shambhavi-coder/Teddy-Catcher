
import React from 'react';

const GameHUD = ({ playerName, score, timeRemaining }) => {
  return (
    <div className="game-hud">
      <div className="hud-card">
        <div className="hud-content">
          <div className="hud-item text-purple">
            <span>👤</span>
            <span>{playerName}</span>
          </div>
          
          <div className="hud-item text-pink">
            <span>🏆</span>
            <span>Score: {score}</span>
          </div>
          
          <div className={`hud-item ${timeRemaining <= 10 ? 'time-warning' : 'text-blue'}`}>
            <span>⏰</span>
            <span>Time: {timeRemaining}s</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameHUD;
