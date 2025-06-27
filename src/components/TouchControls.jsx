
import React from 'react';

const TouchControls = ({ onMove, onAction, clawState, disabled }) => {
  const handleMove = (direction) => {
    if (disabled || (clawState !== 'ready' && clawState !== 'holding')) return;
    onMove(direction);
  };

  const handleAction = () => {
    if (disabled || clawState === 'dropping' || clawState === 'releasing') return;
    onAction();
  };

  const getActionText = () => {
    switch (clawState) {
      case 'ready': return 'DROP';
      case 'holding': return 'RELEASE';
      case 'dropping': return 'DROPPING...';
      case 'releasing': return 'RELEASING...';
      default: return 'ACTION';
    }
  };

  const getStatusText = () => {
    switch (clawState) {
      case 'ready': return 'Ready to drop claw';
      case 'dropping': return 'Dropping...';
      case 'holding': return 'Holding teddy - tap RELEASE to drop';
      case 'releasing': return 'Releasing...';
      default: return 'Ready';
    }
  };

  return (
    <div className="controls-section">
      <div className="controls-card">
        <div className="controls-header">Touch Controls</div>
        
        <div className="controls-grid">
          <div className="control-button empty"></div>
          <div 
            className="control-button"
            onTouchStart={(e) => {
              e.preventDefault();
              handleMove('up');
            }}
            onClick={() => handleMove('up')}
          >
            ↑
          </div>
          <div className="control-button empty"></div>
          
          <div 
            className="control-button"
            onTouchStart={(e) => {
              e.preventDefault();
              handleMove('left');
            }}
            onClick={() => handleMove('left')}
          >
            ←
          </div>
          <div 
            className="control-button"
            onTouchStart={(e) => {
              e.preventDefault();
              handleMove('down');
            }}
            onClick={() => handleMove('down')}
          >
            ↓
          </div>
          <div 
            className="control-button"
            onTouchStart={(e) => {
              e.preventDefault();
              handleMove('right');
            }}
            onClick={() => handleMove('right')}
          >
            →
          </div>
          
          <button 
            className="control-button action-button"
            onTouchStart={(e) => e.preventDefault()}
            onClick={handleAction}
            disabled={disabled || clawState === 'dropping' || clawState === 'releasing'}
            style={{
              opacity: disabled ? 0.5 : 1,
              cursor: disabled ? 'not-allowed' : 'pointer'
            }}
          >
            {getActionText()}
          </button>
        </div>
        
        <div className="controls-instructions">
          Use directional buttons to move claw, then tap action button
        </div>
        <div className="claw-status">
          {getStatusText()}
        </div>
      </div>
    </div>
  );
};

export default TouchControls;
