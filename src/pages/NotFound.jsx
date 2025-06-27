
import React from 'react';

const NotFound = () => {
  return (
    <div className="game-container">
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        minHeight: '100vh',
        flexDirection: 'column',
        textAlign: 'center'
      }}>
        <div className="card" style={{ maxWidth: '400px' }}>
          <div className="card-header">
            <h1 className="card-title">404 - Page Not Found</h1>
            <p style={{ color: '#ec4899', fontSize: '18px' }}>
              🧸 Oops! This page seems to have been caught by the claw!
            </p>
          </div>
          <button 
            className="btn btn-primary"
            onClick={() => window.location.href = '/'}
          >
            Go Back Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
