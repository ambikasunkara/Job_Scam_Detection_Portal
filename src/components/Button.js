import React from 'react';

const variants = {
  primary: {
    background: 'linear-gradient(135deg, #22d3ee 0%, #6366f1 100%)',
    color: '#fff',
    border: 'none',
    boxShadow: '0 4px 20px rgba(34,211,238,0.28)',
  },
  secondary: {
    background: 'rgba(255,255,255,0.05)',
    color: '#94a3b8',
    border: '1px solid rgba(148,163,184,0.18)',
  },
  danger: {
    background: 'linear-gradient(135deg, #f87171, #dc2626)',
    color: '#fff',
    border: 'none',
    boxShadow: '0 4px 16px rgba(248,113,113,0.3)',
  },
  ghost: {
    background: 'transparent',
    color: '#67e8f9',
    border: '1px solid rgba(103,232,249,0.28)',
  },
  success: {
    background: 'linear-gradient(135deg, #6ee7b7, #059669)',
    color: '#fff',
    border: 'none',
  },
  violet: {
    background: 'linear-gradient(135deg, #c4b5fd, #7c3aed)',
    color: '#fff',
    border: 'none',
    boxShadow: '0 4px 20px rgba(124,58,237,0.3)',
  },
};

const sizes = {
  sm:  { padding:'8px 18px',  fontSize:13 },
  md:  { padding:'12px 24px', fontSize:14 },
  lg:  { padding:'15px 34px', fontSize:15 },
  xl:  { padding:'18px 42px', fontSize:16 },
};

export default function Button({ children, onClick, variant='primary', size='md', fullWidth, disabled, style: extra={} }) {
  const v = variants[variant] || variants.primary;
  const s = sizes[size]       || sizes.md;

  const base = {
    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
    gap: 8, fontFamily: 'var(--font-body)', fontWeight: 600,
    borderRadius: 12, cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.5 : 1,
    transition: 'all 0.22s ease',
    width: fullWidth ? '100%' : 'auto',
    letterSpacing: '0.3px',
    ...v, ...s, ...extra,
  };

  return (
    <button
      style={base}
      disabled={disabled}
      onClick={disabled ? undefined : onClick}
      onMouseEnter={e => {
        if (!disabled) {
          e.currentTarget.style.transform = 'translateY(-2px)';
          e.currentTarget.style.filter    = 'brightness(1.12)';
        }
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = 'none';
        e.currentTarget.style.filter    = 'none';
      }}
    >
      {children}
    </button>
  );
}
