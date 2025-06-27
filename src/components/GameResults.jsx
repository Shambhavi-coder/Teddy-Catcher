
import React from 'react';

const GameResults = ({ players, onResetGame }) => {
  // Sort players by score and assign rankings with tie handling
  const sortedPlayers = [...players].sort((a, b) => b.score - a.score);
  
  // Assign rankings with tie handling
  const playersWithRanking = sortedPlayers.map((player, index) => {
    let rank = 1;
    
    // Count how many players have better scores
    for (let i = 0; i < sortedPlayers.length; i++) {
      if (sortedPlayers[i].score > player.score) {
        rank++;
      } else {
        break;
      }
    }
    
    return { ...player, rank };
  });

  const winner = playersWithRanking[0];
  const winnersCount = playersWithRanking.filter(p => p.score === winner.score).length;

  const getRankEmoji = (rank) => {
    switch (rank) {
      case 1: return '🥇';
      case 2: return '🥈';
      case 3: return '🥉';
      default: return '🏅';
    }
  };

  const getRankStyles = (rank) => {
    switch (rank) {
      case 1: return { background: 'linear-gradient(135deg, #fef3c7, #fde68a)', borderColor: '#f59e0b' };
      case 2: return { background: 'linear-gradient(135deg, #f3f4f6, #e5e7eb)', borderColor: '#9ca3af' };
      case 3: return { background: 'linear-gradient(135deg, #fed7aa, #fdba74)', borderColor: '#f97316' };
      default: return { background: 'linear-gradient(135deg, #fce7f3, #f3e8ff)', borderColor: '#f9a8d4' };
    }
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      padding: '16px',
      position: 'relative'
    }}>
      {/* Background decorations */}
      <div style={{ 
        position: 'absolute', 
        inset: 0, 
        overflow: 'hidden',
        pointerEvents: 'none'
      }}>
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="animate-bounce"
            style={{
              position: 'absolute',
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          >
            {i % 3 === 0 ? (
              <span style={{ color: '#fbbf24', fontSize: '24px' }}>⭐</span>
            ) : i % 3 === 1 ? (
              <span style={{ color: '#8b5cf6', fontSize: '20px' }}>🏆</span>
            ) : (
              <span style={{ fontSize: '32px' }}>🧸</span>
            )}
          </div>
        ))}
      </div>

      <div className="card" style={{ width: '100%', maxWidth: '600px' }}>
        <div className="card-header">
          <div style={{ fontSize: '80px', marginBottom: '16px' }}>🎉</div>
          <h1 className="card-title" style={{ fontSize: '2.5rem' }}>
            Game Over!
          </h1>
          <div style={{ 
            fontSize: '24px', 
            color: '#8b5cf6', 
            fontWeight: 'bold', 
            marginTop: '8px' 
          }}>
            {winnersCount > 1 ? (
              `🏆 Tie! ${winnersCount} Winners with ${winner.score} teddies! 🏆`
            ) : (
              `🏆 Winner: ${winner.name} with ${winner.score} teddies! 🏆`
            )}
          </div>
        </div>
        
        <div className="space-y">
          <div>
            <h3 style={{ 
              fontSize: '20px', 
              fontWeight: 'bold', 
              textAlign: 'center', 
              color: '#8b5cf6',
              marginBottom: '16px'
            }}>
              Final Rankings
            </h3>
            <div className="space-y">
              {playersWithRanking.map((player) => (
                <div
                  key={player.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '16px',
                    borderRadius: '8px',
                    border: '2px solid',
                    ...getRankStyles(player.rank)
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ fontSize: '32px' }}>
                      {getRankEmoji(player.rank)}
                    </div>
                    <div>
                      <div style={{ 
                        fontWeight: 'bold', 
                        fontSize: '18px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px'
                      }}>
                        {player.name}
                        <span style={{
                          fontSize: '12px',
                          background: 'rgba(255, 255, 255, 0.5)',
                          padding: '2px 8px',
                          borderRadius: '20px'
                        }}>
                          Rank #{player.rank}
                        </span>
                      </div>
                      <div style={{ fontSize: '14px', color: '#6b7280' }}>
                        {player.score} {player.score === 1 ? 'teddy' : 'teddies'} caught
                      </div>
                    </div>
                  </div>
                  
                  <div style={{ display: 'flex', gap: '4px' }}>
                    {player.collectedTeddies.map((teddy, teddyIndex) => (
                      <div
                        key={teddyIndex}
                        style={{
                          width: '24px',
                          height: '24px',
                          borderRadius: '50%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '12px',
                          backgroundColor: teddy.color
                        }}
                      >
                        🧸
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '24px' }}>
            <button
              className="btn btn-primary"
              onClick={onResetGame}
              style={{ fontSize: '18px', padding: '16px 32px' }}
            >
              Play Again! 🎮
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameResults;
