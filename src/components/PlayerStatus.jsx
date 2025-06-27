
import React from 'react';

const PlayerStatus = ({ players, currentPlayerIndex, remainingTeddies }) => {
  return (
    <div className="player-status">
      <div className="player-status-header">
        <span>🏆</span>
        <span>Players Status</span>
      </div>
      
      <div className="space-y">
        {players.map((player, index) => (
          <div 
            key={player.id}
            className={`player-card ${
              index === currentPlayerIndex 
                ? 'player-current' 
                : index < currentPlayerIndex
                ? 'player-finished'
                : 'player-waiting'
            }`}
          >
            <div className="player-info">
              <span>👤</span>
              <span style={{ fontWeight: 'bold' }}>{player.name}</span>
              {index === currentPlayerIndex && (
                <span style={{ color: '#2563eb' }} className="animate-pulse">⏰</span>
              )}
            </div>
            
            <div className="player-score">
              <span>🏆</span>
              <span>{player.score} teddies</span>
            </div>
            
            <div className="player-status-text">
              {index === currentPlayerIndex ? (
                <span className="status-playing">Playing</span>
              ) : index < currentPlayerIndex ? (
                <span className="status-finished">Finished</span>
              ) : (
                <span className="status-waiting">Waiting</span>
              )}
            </div>
          </div>
        ))}
      </div>
      
      <div className="remaining-teddies">
        <span>🎯</span>
        <span>{remainingTeddies} teddies left</span>
      </div>
    </div>
  );
};

export default PlayerStatus;
