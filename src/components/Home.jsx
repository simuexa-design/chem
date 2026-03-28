import React, { useState, useEffect, useRef } from 'react';

export default function Home({ onStart }) {
  const containerRef = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const { left, top, width, height } = containerRef.current.getBoundingClientRect();

    // Calculate cursor position relative to the center of the element
    const x = (e.clientX - left - width / 2) / (width / 2);
    const y = (e.clientY - top - height / 2) / (height / 2);

    // Limit and amplify the tilt effect. 
    // x dictates rotateY, y dictates rotateX (inverted)
    setTilt({
      x: x * 15, // max 15 degrees tilt
      y: -(y * 15)
    });
  };

  const handleMouseLeave = () => {
    // Reset tilt
    setTilt({ x: 0, y: 0 });
  };

  return (
    <div className="home-container">
      <div
        className="hero-section"
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ perspective: '1000px' }}
      >
        <div
          className="hero-image-wrapper"
          style={{
            transform: `rotateX(${tilt.y}deg) rotateY(${tilt.x}deg)`,
            transition: 'transform 0.1s ease-out'
          }}
        >
          <img src="/hero.png" alt="3D Molecule Hero" className="hero-img" />

          {/* Glowing layers to augment the 3D effect */}
          <div className="glow-layer"></div>
        </div>

        <div className="hero-content">
          <h1 className="hero-title">ChemScan <span className="highlight">v3.1</span></h1>
          <p className="hero-subtitle">  chemical analysis of Indian terrain.</p>
          <button className="start-button" onClick={onStart}>
            <span>Initialize Scan</span>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
          </button>
        </div>
      </div>
    </div>
  );
}
