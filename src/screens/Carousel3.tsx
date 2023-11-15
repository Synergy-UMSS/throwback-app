/// <reference types="react" />

import React from 'react';

const Carousel3: React.FC = () => {
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
        src="../assets/carousel/Carrusel3.jpg" 
      />
    </div>
  );
};

export default Carousel3;
