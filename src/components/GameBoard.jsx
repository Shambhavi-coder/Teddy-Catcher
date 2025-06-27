import React, { useState, useEffect, useCallback, useRef } from 'react';
import Claw from './Claw.jsx';
import TeddyBear from './TeddyBear.jsx';
import Sink from './Sink.jsx';
import GameHUD from './GameHUD.jsx';
import CelebrationPopup from './CelebrationPopup.jsx';
import CollectedTeddies from './CollectedTeddies.jsx';
import PlayerStatus from './PlayerStatus.jsx';
import TouchControls from './TouchControls.jsx';

const GameBoard = ({ 
  currentPlayer, 
  timer, 
  onPlayerComplete,
  players,
  currentPlayerIndex
}) => {
  const [timeRemaining, setTimeRemaining] = useState(timer);
  const [score, setScore] = useState(0);
  const [collectedTeddies, setCollectedTeddies] = useState([]);
  const [showCelebration, setShowCelebration] = useState(false);
  const [teddies, setTeddies] = useState([]);
  const [claw, setClaw] = useState({
    x: 250,
    y: 60,
    isOpen: true,
    isMoving: false
  });
  const [gameArea, setGameArea] = useState({ width: 500, height: 400 });
  const [clawState, setClawState] = useState('ready');
  const [showHeart, setShowHeart] = useState(false);
  const [playerTurnCompleted, setPlayerTurnCompleted] = useState(false);
  const gameRef = useRef(null);

  // Keyboard controls
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (timeRemaining <= 0 || playerTurnCompleted) return;
      
      const key = e.key.toLowerCase();
      
      switch (key) {
        case 'arrowleft':
        case 'a':
          e.preventDefault();
          moveClaw('left');
          break;
        case 'arrowright':
        case 'd':
          e.preventDefault();
          moveClaw('right');
          break;
        case 'arrowup':
        case 'w':
          e.preventDefault();
          moveClaw('up');
          break;
        case 'arrowdown':
        case 's':
          e.preventDefault();
          moveClaw('down');
          break;
        case ' ':
        case 'enter':
          e.preventDefault();
          if (clawState === 'ready') {
            dropClaw();
          } else if (clawState === 'holding') {
            releaseTeddy();
          }
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [timeRemaining, playerTurnCompleted, clawState]);

  // Generate random teddies based on screen size
  const generateTeddies = useCallback(() => {
    const teddyCount = Math.max(5, Math.min(15, Math.floor(gameArea.width / 100)));
    const newTeddies = [];

    for (let i = 0; i < teddyCount; i++) {
      const sinkAreaWidth = Math.max(120, gameArea.width * 0.15) + 40;
      const maxX = gameArea.width - sinkAreaWidth - 40;
      
      const teddy = {
        id: `teddy-${i}`,
        x: Math.random() * maxX + 20,
        y: gameArea.height - Math.max(80, gameArea.height * 0.2),
        color: '#FFB6C1',
        size: Math.max(20, Math.min(40, gameArea.width * 0.04)),
        rotation: Math.random() * 360,
        isCaught: false
      };
      newTeddies.push(teddy);
    }
    setTeddies(newTeddies);
    console.log(`Generated ${newTeddies.length} fresh teddies for player: ${currentPlayer.name}`);
  }, [gameArea, currentPlayer.name]);

  // Handle responsive game area
  useEffect(() => {
    const updateGameArea = () => {
      if (gameRef.current) {
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;
        
        let width, height;
        
        if (viewportWidth < 640) { // Mobile
          width = viewportWidth - 40;
          height = Math.min(400, viewportHeight * 0.4);
        } else if (viewportWidth < 1024) { // Tablet
          width = Math.min(700, viewportWidth - 100);
          height = Math.min(500, viewportHeight * 0.5);
        } else { // Desktop
          width = Math.min(900, viewportWidth - 300);
          height = Math.min(600, viewportHeight * 0.6);
        }
        
        setGameArea({ width: Math.max(300, width), height: Math.max(250, height) });
      }
    };

    updateGameArea();
    window.addEventListener('resize', updateGameArea);
    return () => window.removeEventListener('resize', updateGameArea);
  }, []);

  useEffect(() => {
    generateTeddies();
    setClaw(prev => ({
      ...prev,
      x: gameArea.width / 2,
      y: Math.max(40, gameArea.height * 0.1)
    }));
  }, [generateTeddies, gameArea]);

  // Reset game state when player changes
  useEffect(() => {
    console.log(`🎮 Starting fresh turn for player: ${currentPlayer.name} (Player ${currentPlayerIndex + 1})`);
    setTimeRemaining(timer);
    setScore(0);
    setCollectedTeddies([]);
    setShowHeart(false);
    setClawState('ready');
    setPlayerTurnCompleted(false);
    generateTeddies();
    setClaw({
      x: gameArea.width / 2,
      y: Math.max(40, gameArea.height * 0.1),
      isOpen: true,
      isMoving: false
    });
  }, [currentPlayer.id, timer, generateTeddies, gameArea, currentPlayerIndex]);

  // Function to complete player turn
  const completePlayerTurn = useCallback(() => {
    if (playerTurnCompleted) return;
    
    setPlayerTurnCompleted(true);
    console.log(`⏰ Player ${currentPlayer.name} turn completed with score: ${score}`);
    const updatedPlayer = {
      ...currentPlayer,
      score,
      collectedTeddies
    };
    
    setTimeout(() => {
      onPlayerComplete(updatedPlayer);
    }, 100);
  }, [currentPlayer, score, collectedTeddies, onPlayerComplete, playerTurnCompleted]);

  // Timer countdown
  useEffect(() => {
    if (playerTurnCompleted) return;
    
    if (timeRemaining > 0) {
      const timerInterval = setTimeout(() => {
        setTimeRemaining(timeRemaining - 1);
      }, 1000);
      return () => clearTimeout(timerInterval);
    } else {
      console.log(`⏰ Time's up for player ${currentPlayer.name}`);
      completePlayerTurn();
    }
  }, [timeRemaining, completePlayerTurn, playerTurnCompleted]);

  // Check if all teddies are collected
  useEffect(() => {
    if (playerTurnCompleted) return;
    
    const remainingTeddies = teddies.filter(t => !t.isCaught).length;
    if (remainingTeddies === 0 && teddies.length > 0) {
      console.log(`🏆 All teddies collected! Player ${currentPlayer.name} completed their turn early.`);
      setShowHeart(true);
      setTimeout(() => {
        setShowHeart(false);
        completePlayerTurn();
      }, 2000);
    }
  }, [teddies, currentPlayer.name, completePlayerTurn, playerTurnCompleted]);

  const moveClaw = (direction, step = Math.max(15, gameArea.width * 0.025)) => {
    setClaw(prev => {
      let newX = prev.x;
      let newY = prev.y;

      switch (direction) {
        case 'left':
          newX = Math.max(Math.max(30, gameArea.width * 0.06), prev.x - step);
          break;
        case 'right':
          newX = Math.min(gameArea.width - Math.max(30, gameArea.width * 0.06), prev.x + step);
          break;
        case 'down':
          newY = Math.min(gameArea.height - Math.max(60, gameArea.height * 0.15), prev.y + step);
          break;
        case 'up':
          newY = Math.max(Math.max(40, gameArea.height * 0.1), prev.y - step);
          break;
      }

      return { ...prev, x: newX, y: newY };
    });
  };

  const dropClaw = () => {
    setClawState('dropping');
    setClaw(prev => ({ ...prev, isMoving: true, isOpen: false }));

    setTimeout(() => {
      const clawSize = Math.max(40, gameArea.width * 0.08);
      const clawRect = {
        x: claw.x - clawSize / 2,
        y: claw.y + clawSize / 2,
        width: clawSize,
        height: clawSize
      };

      const caughtTeddy = teddies.find(teddy => 
        !teddy.isCaught &&
        teddy.x < clawRect.x + clawRect.width &&
        teddy.x + teddy.size > clawRect.x &&
        teddy.y < clawRect.y + clawRect.height &&
        teddy.y + teddy.size > clawRect.y
      );

      if (caughtTeddy) {
        setTeddies(prev => 
          prev.map(t => t.id === caughtTeddy.id ? { ...t, isCaught: true } : t)
        );
        setClaw(prev => ({ ...prev, caughtTeddy, isOpen: false }));
        setClawState('holding');
        console.log(`🧸 Caught teddy: ${caughtTeddy.id}`);
      } else {
        setClawState('ready');
        console.log('❌ Missed - no teddy caught');
      }

      setTimeout(() => {
        setClaw(prev => ({ ...prev, y: Math.max(40, gameArea.height * 0.1), isMoving: false }));
        if (!caughtTeddy) {
          setClaw(prev => ({ ...prev, isOpen: true }));
        }
      }, 1000);
    }, 500);
  };

  const releaseTeddy = () => {
    const caughtTeddy = claw.caughtTeddy;
    if (!caughtTeddy) return;

    setClawState('releasing');
    setClaw(prev => ({ ...prev, isOpen: true }));

    const sinkWidth = Math.max(120, gameArea.width * 0.15);
    const sinkPosition = gameArea.width - sinkWidth - 20;
    
    if (claw.x > sinkPosition && claw.x < gameArea.width - 20) {
      console.log(`🎯 Score increased from ${score} to ${score + 1} for player ${currentPlayer.name}`);
      setScore(prev => prev + 1);
      setCollectedTeddies(prev => [...prev, caughtTeddy]);
      setShowCelebration(true);
      setTimeout(() => setShowCelebration(false), 2000);
      
      setTeddies(prev => prev.filter(t => t.id !== caughtTeddy.id));
    } else {
      setTeddies(prev => 
        prev.map(t => 
          t.id === caughtTeddy.id 
            ? { ...t, isCaught: false, x: claw.x - 15, y: gameArea.height - Math.max(80, gameArea.height * 0.2), rotation: Math.random() * 360 }
            : t
        )
      );
      console.log(`📍 Teddy dropped back on ground at position ${claw.x - 15}`);
    }
    
    setTimeout(() => {
      setClaw(prev => ({ 
        ...prev, 
        caughtTeddy: undefined 
      }));
      setClawState('ready');
    }, 500);
  };

  const remainingTeddiesCount = teddies.filter(t => !t.isCaught).length;

  return (
    <div ref={gameRef} className="game-container">
      <div className="game-board-wrapper">
        <GameHUD 
          playerName={currentPlayer.name}
          score={score}
          timeRemaining={timeRemaining}
        />
        
        <div className="game-main">
          <div className="player-status-sidebar">
            <PlayerStatus 
              players={players}
              currentPlayerIndex={currentPlayerIndex}
              remainingTeddies={remainingTeddiesCount}
            />
          </div>
          
          <div className="game-area-container">
            <div 
              className="game-area"
              style={{ 
                width: gameArea.width, 
                height: gameArea.height
              }}
            >
              <div className="game-background">
                {[...Array(Math.max(3, Math.floor(gameArea.width / 60)))].map((_, i) => (
                  <div
                    key={i}
                    style={{
                      position: 'absolute',
                      left: `${Math.random() * 90}%`,
                      top: `${Math.random() * 60}%`,
                      fontSize: `${Math.max(8, gameArea.width * 0.02)}px`,
                      color: '#fbbf24',
                      opacity: 0.6
                    }}
                  >
                    {i % 4 === 0 ? '⭐' : i % 4 === 1 ? '🌸' : i % 4 === 2 ? '💎' : '🌟'}
                  </div>
                ))}
              </div>

              {teddies.map(teddy => (
                <TeddyBear key={teddy.id} teddy={teddy} />
              ))}

              <Claw position={claw} gameArea={gameArea} />
              <Sink gameArea={gameArea} />

              <div 
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: `${Math.max(60, gameArea.height * 0.15)}px`,
                  background: 'linear-gradient(180deg, #10b981, #059669)',
                  borderTop: '2px solid #047857'
                }}
              />
            </div>
          </div>
        </div>

        <TouchControls
          onMove={moveClaw}
          onAction={clawState === 'ready' ? dropClaw : releaseTeddy}
          clawState={clawState}
          disabled={timeRemaining <= 0 || playerTurnCompleted}
        />
      </div>

      <CollectedTeddies teddies={collectedTeddies} />

      {showCelebration && <CelebrationPopup />}

      {showHeart && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          pointerEvents: 'none',
          zIndex: 50
        }}>
          <div style={{ fontSize: '80px' }} className="animate-pulse">
            ❤️
          </div>
        </div>
      )}

      {/* Keyboard instructions */}
      <div className="keyboard-instructions">
        <p>🎮 Keyboard: Arrow keys or WASD to move, Space/Enter to action</p>
      </div>
    </div>
  );
};

export default GameBoard;
