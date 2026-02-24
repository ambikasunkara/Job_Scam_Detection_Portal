import React from 'react';

export default function Card({ children, style = {}, glass = false, glow = false, onClick }) {
  const base = {
    background: glass
      ? 'rgba(26,37,64,0.55)'
      : 'var(--bg-card)',
    backdropFilter: glass ? 'blur(20px)' : 'none',
    WebkitBackdropFilter: glass ? 'blur(20px)' : 'none',
    border: glass
      ? '1px solid rgba(255,255,255,0.08)'
      : '1px solid var(--border)',
    borderRadius: 18,
    padding: 24,
    boxShadow: glow
      ? '0 0 30px rgba(103,232,249,0.08), 0 8px 32px rgba(0,0,0,0.35)'
      : '0 4px 24px rgba(0,0,0,0.3)',
    transition: 'box-shadow 0.25s, transform 0.25s',
    cursor: onClick ? 'pointer' : 'default',
    ...style,
  };

  const handleEnter = (e) => {
    if (onClick) {
      e.currentTarget.style.boxShadow = '0 0 40px rgba(103,232,249,0.15), 0 8px 32px rgba(0,0,0,0.4)';
      e.currentTarget.style.transform = 'translateY(-3px)';
    }
  };

  const handleLeave = (e) => {
    if (onClick) {
      e.currentTarget.style.boxShadow = base.boxShadow;
      e.currentTarget.style.transform = 'none';
    }
  };

  return (
    <div style={base} onClick={onClick} onMouseEnter={handleEnter} onMouseLeave={handleLeave}>
      {children}
    </div>
  );
}
