
import React from 'react';

const CollectedTeddies = ({ teddies }) => {
  if (teddies.length === 0) return null;

  return (
    <div className="collected-teddies">
      <div className="collected-header">
        Collected Teddies ({teddies.length})
      </div>
      <div className="collected-grid">
        {teddies.map((teddy, index) => (
          <div
            key={index}
            className="collected-teddy"
          >
            🧸
          </div>
        ))}
      </div>
    </div>
  );
};

export default CollectedTeddies;
