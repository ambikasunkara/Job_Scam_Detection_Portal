import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const publicLinks  = [];
  const privateLinks = [
    { path:'/dashboard', label:'Dashboard' },
    { path:'/analyze',   label:'Analyze Job' },
    { path:'/learn',     label:'Learn' },
    { path:'/report',    label:'Report Scam' },
  ];

  const links = user ? privateLinks : publicLinks;

  const navStyle = {
    position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
    height: 68,
    background: scrolled
      ? 'rgba(10,15,30,0.92)'
      : 'rgba(15,23,42,0.70)',
    backdropFilter: 'blur(20px)',
    WebkitBackdropFilter: 'blur(20px)',
    borderBottom: '1px solid rgba(103,232,249,0.10)',
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    padding: '0 32px',
    transition: 'background 0.3s',
  };

  const logoStyle = {
    display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer',
  };

  const logoBadge = {
    width: 36, height: 36, borderRadius: 10,
    background: 'linear-gradient(135deg,#22d3ee,#6366f1)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontSize: 18, boxShadow: '0 0 16px rgba(34,211,238,0.3)',
  };

  const logoText = {
    fontFamily: 'var(--font-head)', fontSize: 20, fontWeight: 800,
    letterSpacing: 1,
    background: 'linear-gradient(90deg, #67e8f9, #c4b5fd)',
    WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
  };

  const linkStyle = (active) => ({
    padding: '8px 14px', borderRadius: 8, border: 'none',
    background: active ? 'rgba(103,232,249,0.10)' : 'transparent',
    color: active ? '#67e8f9' : '#94a3b8',
    fontWeight: active ? 600 : 400,
    fontSize: 14, fontFamily: 'var(--font-body)',
    cursor: 'pointer', transition: 'all 0.2s',
    borderBottom: active ? '2px solid #67e8f9' : '2px solid transparent',
  });

  return (
    <nav style={navStyle}>
      {/* Logo */}
      <div style={logoStyle} onClick={() => navigate(user ? '/dashboard' : '/')}>
        <div style={logoBadge}>🛡</div>
        <span style={logoText}>SCAM<span style={{WebkitTextFillColor:'var(--text-primary)'}}>SHIELD</span></span>
      </div>

      {/* Links */}
      <div style={{ display:'flex', alignItems:'center', gap:4 }}>
        {links.map(l => (
          <button key={l.path} onClick={() => navigate(l.path)}
            style={linkStyle(location.pathname === l.path)}>
            {l.label}
          </button>
        ))}
      </div>

      {/* Auth Actions */}
      <div style={{ display:'flex', gap:10, alignItems:'center' }}>
        {user ? (
          <>
            <div onClick={() => navigate('/account')} style={{
              display:'flex', alignItems:'center', gap:8, cursor:'pointer',
              padding:'6px 12px', borderRadius:10,
              background:'rgba(103,232,249,0.06)',
              border:'1px solid rgba(103,232,249,0.15)',
              transition:'all .2s',
            }}>
              <div style={{
                width:28, height:28, borderRadius:'50%',
                background:'linear-gradient(135deg,#6366f1,#22d3ee)',
                display:'flex', alignItems:'center', justifyContent:'center',
                fontSize:12, fontWeight:700, color:'#fff',
              }}>
                {user.avatar || user.name?.[0]?.toUpperCase() || 'U'}
              </div>
              <span style={{ fontSize:13, color:'#94a3b8', fontWeight:500 }}>
                {user.name?.split(' ')[0]}
              </span>
            </div>
            <button onClick={() => { signOut(); navigate('/'); }} style={{
              padding:'8px 16px', borderRadius:8,
              background:'rgba(248,113,113,0.10)', border:'1px solid rgba(248,113,113,0.25)',
              color:'#fda4af', fontSize:13, fontFamily:'var(--font-body)',
              cursor:'pointer', fontWeight:500, transition:'all .2s',
            }}>Sign Out</button>
          </>
        ) : (
          <>
            <button onClick={() => navigate('/signin')} style={{
              padding:'8px 18px', borderRadius:8, border:'1px solid rgba(103,232,249,0.22)',
              background:'transparent', color:'#94a3b8', fontSize:14,
              fontFamily:'var(--font-body)', cursor:'pointer',
            }}>Sign In</button>
            <button onClick={() => navigate('/signup')} style={{
              padding:'8px 18px', borderRadius:8, border:'none',
              background:'linear-gradient(135deg,#22d3ee,#6366f1)',
              color:'#fff', fontSize:14, fontFamily:'var(--font-body)',
              cursor:'pointer', fontWeight:600,
              boxShadow:'0 4px 16px rgba(34,211,238,0.25)',
            }}>Sign Up</button>
          </>
        )}
      </div>
    </nav>
  );
}
