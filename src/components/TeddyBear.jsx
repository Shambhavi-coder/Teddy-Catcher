
import React from 'react';

const TeddyBear = ({ teddy }) => {
  if (teddy.isCaught) return null;

  return (
    <div
      style={{
        position: 'absolute',
        left: teddy.x,
        top: teddy.y,
        transform: `rotate(${teddy.rotation}deg)`,
        fontSize: `${teddy.size}px`,
        lineHeight: '1',
        userSelect: 'none',
        zIndex: 5
      }}
    >
      🧸
    </div>
  );
};

export default TeddyBear;
