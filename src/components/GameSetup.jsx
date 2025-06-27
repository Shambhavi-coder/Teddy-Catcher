
import React, { useState } from 'react';

const GameSetup = ({ onStartGame }) => {
  const [players, setPlayers] = useState([
    { id: '1', name: '', score: 0, collectedTeddies: [] }
  ]);
  const [timer, setTimer] = useState(30);

  const addPlayer = () => {
    if (players.length < 4) {
      const newPlayer = {
        id: Date.now().toString(),
        name: '',
        score: 0,
        collectedTeddies: []
      };
      setPlayers([...players, newPlayer]);
    }
  };

  const removePlayer = (index) => {
    if (players.length > 1) {
      setPlayers(players.filter((_, i) => i !== index));
    }
  };

  const updatePlayerName = (index, name) => {
    const updatedPlayers = [...players];
    updatedPlayers[index].name = name;
    setPlayers(updatedPlayers);
  };

  const handleStartGame = () => {
    const validPlayers = players.filter(p => p.name.trim() !== '');
    if (validPlayers.length > 0) {
      onStartGame(validPlayers, timer);
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
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="animate-bounce"
            style={{
              position: 'absolute',
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${2 + Math.random() * 2}s`,
              fontSize: '16px',
              opacity: 0.6
            }}
          >
            {i % 3 === 0 ? '⭐' : '💖'}
          </div>
        ))}
      </div>

      <div className="card" style={{ width: '100%', maxWidth: '400px' }}>
        <div className="card-header">
          <h1 className="card-title">🧸 Teddy Catcher 🧸</h1>
          <p style={{ color: '#ec4899', fontSize: '16px' }}>
            Catch as many teddies as you can!
          </p>
        </div>
        
        <div className="space-y">
          <div>
            <label style={{ 
              fontSize: '14px', 
              fontWeight: 'bold', 
              color: '#8b5cf6',
              display: 'block',
              marginBottom: '8px'
            }}>
              Timer (seconds)
            </label>
            <div className="flex" style={{ alignItems: 'center', gap: '8px' }}>
              <button
                className="btn btn-secondary"
                onClick={() => setTimer(Math.max(10, timer - 10))}
                style={{ minWidth: '44px', padding: '8px' }}
              >
                -
              </button>
              <input
                className="input"
                type="number"
                value={timer}
                onChange={(e) => setTimer(Math.max(10, parseInt(e.target.value) || 30))}
                style={{ textAlign: 'center', flex: 1 }}
                min="10"
                max="300"
              />
              <button
                className="btn btn-secondary"
                onClick={() => setTimer(Math.min(300, timer + 10))}
                style={{ minWidth: '44px', padding: '8px' }}
              >
                +
              </button>
            </div>
          </div>

          <div>
            <label style={{ 
              fontSize: '14px', 
              fontWeight: 'bold', 
              color: '#8b5cf6',
              display: 'block',
              marginBottom: '8px'
            }}>
              Players
            </label>
            <div className="space-y">
              {players.map((player, index) => (
                <div key={player.id} className="flex" style={{ gap: '8px' }}>
                  <input
                    className="input"
                    placeholder={`Player ${index + 1} name`}
                    value={player.name}
                    onChange={(e) => updatePlayerName(index, e.target.value)}
                    style={{ flex: 1 }}
                  />
                  {players.length > 1 && (
                    <button
                      className="btn btn-secondary"
                      onClick={() => removePlayer(index)}
                      style={{ minWidth: '44px', padding: '8px' }}
                    >
                      -
                    </button>
                  )}
                </div>
              ))}
              
              {players.length < 4 && (
                <button
                  className="btn btn-secondary"
                  onClick={addPlayer}
                  style={{ width: '100%' }}
                >
                  + Add Player
                </button>
              )}
            </div>
          </div>

          <button
            className="btn btn-primary"
            onClick={handleStartGame}
            disabled={players.every(p => p.name.trim() === '')}
            style={{ width: '100%' }}
          >
            Start Game! 🎮
          </button>
        </div>
      </div>
    </div>
  );
};

export default GameSetup;
