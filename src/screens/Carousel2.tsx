/// <reference types="react" />

import React from 'react';

const Carousel2: React.FC = () => {
  return (
    <div style={{ 
      width: '100vw', 
      height: '100vh', 
      overflow: 'hidden', 
      position: 'relative' 
    }}>
      <img
        style={{ 
          width: '100%', 
          height: '100%', 
          objectFit: 'cover' 
        }}
        src="../assets/carousel/Carrusel2.jpg" 
      />
    </div>
  );
};

export default Carousel2;
