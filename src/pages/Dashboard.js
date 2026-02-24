import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Card from '../components/Card';

const tiles = [
  {
    path:    '/analyze',
    icon:    '🔍',
    title:   'Analyze Job',
    desc:    'Paste a job listing and get a full 14-module scam risk analysis.',
    grad:    'linear-gradient(135deg, rgba(34,211,238,0.15), rgba(99,102,241,0.15))',
    border:  'rgba(103,232,249,0.22)',
    accent:  '#67e8f9',
    badge:   'Core Feature',
  },
  {
    path:    '/learn',
    icon:    '📚',
    title:   'Learn',
    desc:    'Master the art of identifying fake jobs with our scam awareness guide.',
    grad:    'linear-gradient(135deg, rgba(196,181,253,0.15), rgba(99,102,241,0.15))',
    border:  'rgba(196,181,253,0.22)',
    accent:  '#c4b5fd',
    badge:   'Education',
  },
  {
    path:    '/account',
    icon:    '👤',
    title:   'My Account',
    desc:    'View your registered profile, stats, and submitted reports.',
    grad:    'linear-gradient(135deg, rgba(110,231,183,0.12), rgba(52,211,153,0.12))',
    border:  'rgba(110,231,183,0.22)',
    accent:  '#6ee7b7',
    badge:   'Profile',
  },
  {
    path:    '/report',
    icon:    '🚨',
    title:   'Report a Scam',
    desc:    'Help others by reporting a fake job you encountered.',
    grad:    'linear-gradient(135deg, rgba(248,113,113,0.12), rgba(239,68,68,0.12))',
    border:  'rgba(248,113,113,0.22)',
    accent:  '#f87171',
    badge:   'Community',
  },
];

const platformStats = [
  { val:'1,247+', label:'Total Reports',          col:'#f87171' },
  { val:'849',    label:'Scams Identified',        col:'#fcd34d' },
  { val:'50K+',   label:'Users Protected',         col:'#6ee7b7' },
  { val:'94.2%',  label:'Detection Accuracy',      col:'#67e8f9' },
];

const trendingKeywords = [
  '"guaranteed income"', '"no experience needed"', '"registration fee"',
  '"whatsapp only"', '"work from home earn"', '"unlimited earning"',
];

export default function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => { document.title = 'Dashboard — ScamShield'; }, []);

  const reports = JSON.parse(localStorage.getItem('ss_reports') || '[]');

  return (
    <div className="page-wrap" style={{ maxWidth:1040, margin:'0 auto', padding:'40px 24px 60px' }}>

      {/* ── Welcome Header ─────────────────────── */}
      <div className="fade-up" style={{ marginBottom:36 }}>
        <div style={{
          display:'inline-flex', alignItems:'center', gap:8,
          background:'rgba(110,231,183,0.08)',
          border:'1px solid rgba(110,231,183,0.20)',
          borderRadius:999, padding:'6px 18px', marginBottom:16,
          fontSize:13, color:'#6ee7b7', fontWeight:500,
        }}>
          <span style={{ width:7, height:7, borderRadius:'50%', background:'#6ee7b7', display:'inline-block', animation:'pulse 1.5s infinite' }}/>
          Session active · Welcome back
        </div>
        <h1 style={{ fontFamily:'var(--font-head)', fontSize:'clamp(24px,3.5vw,34px)', fontWeight:800, marginBottom:8 }}>
          Hello, {user?.name?.split(' ')[0]} 👋
        </h1>
        <p style={{ color:'var(--text-secondary)', fontSize:15 }}>
          Your ScamShield control center. Start protecting yourself from fake job listings.
        </p>
      </div>

      {/* ── Action Tiles ───────────────────────── */}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(2,1fr)', gap:18, marginBottom:36 }}>
        {tiles.map((t, i) => (
          <div key={i} className="fade-up" style={{ animationDelay:`${i*0.09}s` }}>
            <div
              onClick={() => navigate(t.path)}
              style={{
                background: t.grad, border:`1px solid ${t.border}`,
                borderRadius:18, padding:'26px 24px', cursor:'pointer',
                transition:'all 0.25s', position:'relative', overflow:'hidden',
              }}
              onMouseEnter={e => { e.currentTarget.style.transform='translateY(-4px)'; e.currentTarget.style.boxShadow=`0 12px 40px ${t.border}`; }}
              onMouseLeave={e => { e.currentTarget.style.transform='none'; e.currentTarget.style.boxShadow='none'; }}
            >
              {/* Badge */}
              <span style={{
                position:'absolute', top:16, right:16,
                fontSize:10, fontWeight:700, letterSpacing:1.5,
                color:t.accent, background:`${t.accent}18`,
                padding:'3px 10px', borderRadius:999,
              }}>{t.badge}</span>

              {/* Big number bg */}
              <div style={{
                position:'absolute', right:16, bottom:8,
                fontSize:64, opacity:0.05, fontFamily:'var(--font-head)', fontWeight:800,
              }}>{(i+1).toString().padStart(2,'0')}</div>

              <div style={{ fontSize:38, marginBottom:12 }}>{t.icon}</div>
              <h3 style={{ fontFamily:'var(--font-head)', fontSize:19, fontWeight:700, color:t.accent, marginBottom:8 }}>
                {t.title}
              </h3>
              <p style={{ color:'var(--text-secondary)', fontSize:13.5, lineHeight:1.65 }}>
                {t.desc}
              </p>
              <div style={{ marginTop:16, display:'flex', alignItems:'center', gap:6, color:t.accent, fontSize:13, fontWeight:600 }}>
                Open {t.title} <span>→</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ── Platform Stats ─────────────────────── */}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:16, marginBottom:28 }}>
        {platformStats.map((s, i) => (
          <Card key={i} style={{ textAlign:'center', borderColor:`${s.col}22` }}>
            <div style={{ fontFamily:'var(--font-head)', fontSize:26, fontWeight:800, color:s.col }}>{s.val}</div>
            <div style={{ fontSize:12, color:'var(--text-secondary)', marginTop:4 }}>{s.label}</div>
          </Card>
        ))}
      </div>

      {/* ── Lower grid ─────────────────────────── */}
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:20 }}>
        {/* Trending Keywords */}
        <Card>
          <h3 style={{ fontFamily:'var(--font-head)', fontSize:15, fontWeight:700, marginBottom:16, color:'var(--amber)' }}>
            🔥 Trending Scam Keywords
          </h3>
          {trendingKeywords.map((kw, i) => (
            <div key={i} style={{
              display:'flex', justifyContent:'space-between', alignItems:'center',
              padding:'9px 0', borderBottom:'1px solid var(--border)',
            }}>
              <code style={{ fontSize:13, color:'var(--amber)', fontFamily:'monospace' }}>{kw}</code>
              <span style={{ fontSize:11, color:'var(--text-muted)' }}>
                {Math.floor(Math.random()*400+100)} flagged
              </span>
            </div>
          ))}
        </Card>

        {/* Your reports */}
        <Card>
          <h3 style={{ fontFamily:'var(--font-head)', fontSize:15, fontWeight:700, marginBottom:16, color:'var(--rose)' }}>
            🚨 Your Submitted Reports ({reports.length})
          </h3>
          {reports.length === 0 ? (
            <div style={{ textAlign:'center', padding:'28px 0', color:'var(--text-muted)' }}>
              <div style={{ fontSize:32, marginBottom:10 }}>📭</div>
              <p style={{ fontSize:13 }}>No reports yet</p>
              <p style={{ fontSize:12, marginTop:4 }}>
                <span onClick={() => navigate('/report')}
                  style={{ color:'#67e8f9', cursor:'pointer' }}>
                  Report a scam →
                </span>
              </p>
            </div>
          ) : (
            reports.slice(-5).reverse().map((r, i) => (
              <div key={i} style={{
                padding:'10px 0', borderBottom:'1px solid var(--border)',
                display:'flex', justifyContent:'space-between',
              }}>
                <div>
                  <div style={{ fontSize:13, fontWeight:600 }}>{r.jobTitle}</div>
                  <div style={{ fontSize:12, color:'var(--text-muted)' }}>{r.company} · {r.date}</div>
                </div>
                <span style={{
                  fontSize:10, background:'rgba(248,113,113,0.15)', color:'#f87171',
                  padding:'3px 10px', borderRadius:999, alignSelf:'center',
                }}>Reported</span>
              </div>
            ))
          )}
        </Card>
      </div>
    </div>
  );
}
