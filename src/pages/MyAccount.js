import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Card from '../components/Card';
import Button from '../components/Button';

export default function MyAccount() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  useEffect(() => { document.title = 'My Account — ScamShield'; }, []);

  const reports = JSON.parse(localStorage.getItem('ss_reports') || '[]');

  const handleSignOut = () => { signOut(); navigate('/'); };

  if (!user) return null;

  const profileFields = [
    { label:'Full Name',     val:user.name,     icon:'👤' },
    { label:'Email Address', val:user.email,    icon:'✉️' },
    { label:'LinkedIn',      val:user.linkedin || 'Not provided', icon:'🔗' },
    { label:'Member Since',  val:user.joined,   icon:'📅' },
    { label:'Account ID',    val:`#SS-${user.id?.toString().slice(-6) || '------'}`, icon:'🆔' },
  ];

  return (
    <div className="page-wrap" style={{ maxWidth:880, margin:'0 auto', padding:'40px 24px 60px' }}>

      {/* ── Profile Header ─────────────────────── */}
      <div className="fade-up" style={{ display:'flex', alignItems:'center', gap:24, marginBottom:36, flexWrap:'wrap' }}>
        {/* Avatar */}
        <div style={{
          width:80, height:80, borderRadius:20, flexShrink:0,
          background:'linear-gradient(135deg,#6366f1,#22d3ee)',
          display:'flex', alignItems:'center', justifyContent:'center',
          fontSize:32, fontWeight:800, color:'#fff',
          boxShadow:'0 0 30px rgba(99,102,241,0.4)',
        }}>
          {user.avatar || user.name?.[0]?.toUpperCase() || 'U'}
        </div>

        <div style={{ flex:1 }}>
          <h1 style={{ fontFamily:'var(--font-head)', fontSize:'clamp(22px,3vw,30px)', fontWeight:800, marginBottom:5 }}>
            {user.name}
          </h1>
          <p style={{ color:'var(--text-secondary)', fontSize:14 }}>
            ScamShield member since {user.joined}
          </p>
          <div style={{ display:'flex', gap:8, marginTop:10, flexWrap:'wrap' }}>
            {['Active Account', 'Verified', 'Full Access'].map((tag, i) => (
              <span key={i} style={{
                fontSize:11, padding:'3px 12px', borderRadius:999,
                background:'rgba(110,231,183,0.12)', border:'1px solid rgba(110,231,183,0.25)',
                color:'#6ee7b7', fontWeight:600,
              }}>{tag}</span>
            ))}
          </div>
        </div>

        <Button variant="secondary" onClick={handleSignOut}>
          Sign Out
        </Button>
      </div>

      {/* ── Profile Details + Stats ─────────────── */}
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:20, marginBottom:24 }}>

        {/* Profile card */}
        <Card glow>
          <h3 style={{ fontFamily:'var(--font-head)', fontSize:15, fontWeight:700, color:'#67e8f9', marginBottom:18 }}>
            👤 Profile Details
          </h3>
          {profileFields.map((f, i) => (
            <div key={i} style={{
              display:'flex', gap:12, padding:'12px 0',
              borderBottom:'1px solid var(--border)', alignItems:'flex-start',
            }}>
              <span style={{ fontSize:17, flexShrink:0, marginTop:1 }}>{f.icon}</span>
              <div>
                <div style={{ fontSize:11, color:'var(--text-muted)', marginBottom:3 }}>{f.label}</div>
                <div style={{
                  fontSize:14, fontWeight:500,
                  color: f.val === 'Not provided' ? 'var(--text-muted)' : 'var(--text-primary)',
                  wordBreak:'break-all',
                }}>
                  {f.val && f.val.startsWith('http')
                    ? <a href={f.val} target="_blank" rel="noreferrer" style={{ color:'#67e8f9' }}>{f.val}</a>
                    : f.val
                  }
                </div>
              </div>
            </div>
          ))}
        </Card>

        {/* Stats card */}
        <div style={{ display:'flex', flexDirection:'column', gap:14 }}>
          {[
            { label:'Reports Submitted', val:reports.length, icon:'🚨', col:'#f87171', bg:'rgba(248,113,113,0.08)' },
            { label:'Account Status',    val:'Active & Verified', icon:'✅', col:'#6ee7b7', bg:'rgba(110,231,183,0.08)' },
            { label:'Protection Level',  val:'Full Shield',  icon:'🛡', col:'#67e8f9', bg:'rgba(103,232,249,0.08)' },
            { label:'Access Level',      val:'Standard User',icon:'🔑', col:'#c4b5fd', bg:'rgba(196,181,253,0.08)' },
          ].map((s, i) => (
            <div key={i} style={{
              display:'flex', alignItems:'center', gap:14,
              padding:'16px 18px', borderRadius:14,
              background:s.bg, border:`1px solid ${s.col}28`,
            }}>
              <span style={{ fontSize:22 }}>{s.icon}</span>
              <div style={{ flex:1 }}>
                <div style={{ fontSize:11, color:'var(--text-muted)', marginBottom:3 }}>{s.label}</div>
                <div style={{ fontWeight:700, color:s.col, fontSize:15 }}>{s.val}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Reports History ─────────────────────── */}
      <Card>
        <h3 style={{ fontFamily:'var(--font-head)', fontSize:15, fontWeight:700, color:'#f87171', marginBottom:18 }}>
          🚨 My Scam Reports ({reports.length})
        </h3>
        {reports.length === 0 ? (
          <div style={{ textAlign:'center', padding:'32px 0', color:'var(--text-muted)' }}>
            <div style={{ fontSize:38, marginBottom:12 }}>📭</div>
            <p style={{ fontSize:14 }}>You haven't submitted any reports yet.</p>
          </div>
        ) : (
          <div>
            {reports.map((r, i) => (
              <div key={i} style={{
                display:'flex', justifyContent:'space-between', alignItems:'flex-start',
                padding:'12px 0', borderBottom:'1px solid var(--border)',
              }}>
                <div>
                  <div style={{ fontWeight:600, fontSize:14, marginBottom:3 }}>{r.jobTitle}</div>
                  <div style={{ fontSize:12, color:'var(--text-muted)' }}>
                    🏢 {r.company} &nbsp;·&nbsp; 📅 {r.date}
                  </div>
                </div>
                <span style={{
                  fontSize:11, background:'rgba(248,113,113,0.12)', color:'#f87171',
                  padding:'4px 12px', borderRadius:999, fontWeight:600,
                }}>Reported</span>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
}
