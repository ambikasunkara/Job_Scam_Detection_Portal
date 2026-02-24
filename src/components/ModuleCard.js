import React from 'react';

const statusConfig = {
  pass: {
    bg:     'rgba(110,231,183,0.06)',
    border: 'rgba(110,231,183,0.20)',
    badge:  { bg:'rgba(110,231,183,0.15)', color:'#6ee7b7' },
    bar:    '#6ee7b7',
    icon:   '✓',
    label:  'PASS',
  },
  warn: {
    bg:     'rgba(252,211,77,0.06)',
    border: 'rgba(252,211,77,0.20)',
    badge:  { bg:'rgba(252,211,77,0.15)', color:'#fcd34d' },
    bar:    '#fcd34d',
    icon:   '⚡',
    label:  'WARN',
  },
  danger: {
    bg:     'rgba(248,113,113,0.07)',
    border: 'rgba(248,113,113,0.25)',
    badge:  { bg:'rgba(248,113,113,0.18)', color:'#f87171' },
    bar:    '#f87171',
    icon:   '⚠',
    label:  'RISK',
  },
};

export default function ModuleCard({ mod, index }) {
  const cfg = statusConfig[mod.status] || statusConfig.pass;

  return (
    <div
      className="fade-up"
      style={{
        animationDelay: `${index * 0.04}s`,
        padding: '14px 16px',
        borderRadius: 14,
        background: cfg.bg,
        border: `1px solid ${cfg.border}`,
        display: 'flex',
        gap: 14,
        alignItems: 'flex-start',
      }}
    >
      {/* Status icon */}
      <div style={{
        width: 34, height: 34, borderRadius: 10, flexShrink: 0,
        background: cfg.badge.bg,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 15, color: cfg.badge.color, fontWeight: 700,
        marginTop: 2,
      }}>
        {mod.icon || cfg.icon}
      </div>

      {/* Content */}
      <div style={{ flex: 1, minWidth: 0 }}>
        {/* Header */}
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:6, gap:8 }}>
          <span style={{ fontWeight:600, fontSize:13.5, color:'var(--text-primary)', whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis' }}>
            {mod.name}
          </span>
          <span style={{
            flexShrink: 0,
            padding: '2px 10px', borderRadius: 999,
            background: cfg.badge.bg, color: cfg.badge.color,
            fontSize: 10, fontWeight: 800, letterSpacing: 1.5,
            fontFamily: 'var(--font-head)',
          }}>
            {cfg.label}
          </span>
        </div>

        {/* Score bar */}
        <div style={{
          height: 4, borderRadius: 4, marginBottom: 7,
          background: 'rgba(255,255,255,0.06)', overflow: 'hidden',
        }}>
          <div style={{
            height: '100%', borderRadius: 4,
            width: `${mod.score}%`,
            background: cfg.bar,
            transition: 'width 1s ease',
            boxShadow: `0 0 6px ${cfg.bar}88`,
          }} />
        </div>

        {/* Detail */}
        <p style={{ fontSize:12.5, color:'var(--text-secondary)', lineHeight:1.5, margin:0 }}>
          {mod.detail}
        </p>
      </div>
    </div>
  );
}
