// src/components/Header.js
import React from 'react';

const Nav = () => {
  return (
    <nav style={headerStyles}>
      
      <img src="/clean.png" style={imageStyle} />
      <h1 style={FontStyle}>Clear Skin</h1>
    </nav>
  );
};

const headerStyles = {
  color: '#fff',
  justifyContent: 'center',
  display: 'flex',
  flexdirection: 'row',
  gap: '1.5rem',
};

const FontStyle = {
  color: '#ffffff',
  fontFamily: 'Brush Script MT',
  marginTop: '20px',
};

const imageStyle = {
  height: '80px',
  width: '80px',
  borderRadius: '1500px',
  border: 'solid 0.2px',
};

export default Nav;
