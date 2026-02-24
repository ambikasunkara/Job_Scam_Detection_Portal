import React from 'react';
import Button from './Button';

export default function SuccessPopup({ message, onClose }) {
  return (
    <div style={{
      position:'fixed', inset:0, zIndex:9999,
      background:'rgba(0,0,0,0.75)',
      backdropFilter:'blur(8px)',
      display:'flex', alignItems:'center', justifyContent:'center',
    }} onClick={onClose}>
      <div
        className="pop-bounce"
        onClick={e => e.stopPropagation()}
        style={{
          background:'var(--bg-card2)',
          border:'1px solid rgba(110,231,183,0.25)',
          borderRadius:24,
          padding:'48px 56px',
          textAlign:'center',
          maxWidth:420, width:'90%',
          boxShadow:'0 0 80px rgba(110,231,183,0.15), 0 24px 64px rgba(0,0,0,0.5)',
        }}
      >
        <div style={{ fontSize:60, marginBottom:16, animation:'float 3s ease-in-out infinite' }}>✅</div>
        <h2 style={{
          fontFamily:'var(--font-head)', fontSize:24, fontWeight:800,
          color:'var(--mint)', marginBottom:10,
        }}>Success!</h2>
        <p style={{ color:'var(--text-secondary)', fontSize:15, lineHeight:1.65, marginBottom:28 }}>
          {message}
        </p>
        <Button onClick={onClose} variant="success" size="lg">
          Continue →
        </Button>
      </div>
    </div>
  );
}
