
import React, { useState } from 'react';
import GameSetup from '../components/GameSetup.jsx';
import GameBoard from '../components/GameBoard.jsx';
import GameResults from '../components/GameResults.jsx';

const Index = () => {
  const [gameState, setGameState] = useState('setup'); // 'setup' | 'playing' | 'results'
  const [players, setPlayers] = useState([]);
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [gameTimer, setGameTimer] = useState(30);

  const startGame = (playerList, timer) => {
    console.log(`🎮 Starting game with ${playerList.length} players, ${timer}s timer`);
    setPlayers(playerList);
    setGameTimer(timer);
    setCurrentPlayerIndex(0);
    setGameState('playing');
  };

  const nextPlayer = (updatedPlayer) => {
    console.log(`✅ Player ${updatedPlayer.name} completed turn with score: ${updatedPlayer.score}`);
    
    const updatedPlayers = [...players];
    updatedPlayers[currentPlayerIndex] = updatedPlayer;
    setPlayers(updatedPlayers);

    if (currentPlayerIndex < players.length - 1) {
      console.log(`➡️ Moving to next player: ${players[currentPlayerIndex + 1].name}`);
      setCurrentPlayerIndex(currentPlayerIndex + 1);
    } else {
      console.log('🏁 All players finished - showing results');
      setGameState('results');
    }
  };

  const resetGame = () => {
    console.log('🔄 Resetting game');
    setGameState('setup');
    setPlayers([]);
    setCurrentPlayerIndex(0);
  };

  return (
    <div className="game-container">
      {gameState === 'setup' && (
        <GameSetup onStartGame={startGame} />
      )}
      
      {gameState === 'playing' && (
        <GameBoard
          currentPlayer={players[currentPlayerIndex]}
          timer={gameTimer}
          onPlayerComplete={nextPlayer}
          players={players}
          currentPlayerIndex={currentPlayerIndex}
        />
      )}
      
      {gameState === 'results' && (
        <GameResults
          players={players}
          onResetGame={resetGame}
        />
      )}
    </div>
  );
};

export default Index;
