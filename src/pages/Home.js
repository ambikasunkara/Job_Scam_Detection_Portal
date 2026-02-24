import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import Card from '../components/Card';

function OrbBg() {
  return (
    <>
      {[
        { left:'8%',  top:'18%', col:'#22d3ee', size:400 },
        { left:'72%', top:'35%', col:'#6366f1', size:350 },
        { left:'45%', top:'75%', col:'#c4b5fd', size:300 },
      ].map((o, i) => (
        <div key={i} style={{
          position:'absolute', left:o.left, top:o.top,
          width:o.size, height:o.size, borderRadius:'50%',
          background:`radial-gradient(circle, ${o.col}14 0%, transparent 70%)`,
          pointerEvents:'none',
          animation:`orb ${6 + i * 2}s ease-in-out infinite`,
          animationDelay:`${i * 1.5}s`,
        }}/>
      ))}
    </>
  );
}

export default function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = 'ScamShield — Detect Fake Job Offers';
  }, []);

  const stats = [
    { val:'14M+', label:'Scam victims in 2023',      col:'#f87171' },
    { val:'68%',  label:'Victims are students',       col:'#fcd34d' },
    { val:'₹22Cr',label:'Lost in India annually',     col:'#c4b5fd' },
    { val:'95%',  label:'Target accuracy on scams',   col:'#6ee7b7' },
  ];

  const features = [
    { icon:'🔤', title:'14-Module Analysis', desc:'Keyword risk, salary realism, email domain, urgency language, and 10 more checks.' },
    { icon:'📊', title:'Visualized Risk Score', desc:'Pie chart breakdown and circular gauge showing your exact scam probability.' },
    { icon:'🧠', title:'AI Explanations', desc:'Every module explains why a signal was flagged — not just a number.' },
    { icon:'🚨', title:'Community Reports', desc:'Report scams to contribute to a growing database protecting future job seekers.' },
  ];

  return (
    <div className="home-hero">
      {/* ── Hero ─────────────────────────────────── */}
      <section className="grid-bg" style={{
        minHeight: '92vh', display:'flex', flexDirection:'column',
        alignItems:'center', justifyContent:'center', textAlign:'center',
        padding:'100px 24px 80px', position:'relative', overflow:'hidden',
      }}>
        <OrbBg />

        <div className="fade-up" style={{ maxWidth:820, position:'relative', zIndex:1 }}>
          {/* Badge */} 
          <div style={{
            display:'inline-flex', alignItems:'center', gap:8,
            background:'rgba(103,232,249,0.08)',
            border:'1px solid rgba(103,232,249,0.22)',
            borderRadius:999, padding:'7px 20px', marginBottom:28,
            fontSize:13, color:'#67e8f9', fontWeight:500,
          }}>
            <span style={{
              width:7, height:7, borderRadius:'50%',
              background:'#6ee7b7', display:'inline-block',
              animation:'pulse 1.5s infinite',
            }}/>
            AI-Powered · 14 Detection Modules · Real-Time Analysis
          </div>

          {/* Headline */}
          <h1 style={{
            fontFamily:'var(--font-head)', fontWeight:800,
            fontSize:'clamp(36px,5.5vw,68px)',
            lineHeight:1.10, marginBottom:22, color:'var(--text-bright)',
          }}>
            Detect fake job offers<br />
            <span style={{
              background:'linear-gradient(135deg, #67e8f9 0%, #93c5fd 40%, #c4b5fd 100%)',
              WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent',
            }}>
              before they reach you
            </span>
          </h1>

          {/* Subtitle */}
          <p style={{
            fontSize:'clamp(15px,1.8vw,18px)', color:'var(--text-secondary)',
            lineHeight:1.75, marginBottom:44, maxWidth:620, margin:'0 auto 44px',
          }}>
            Paste any job listing. Our{' '}
            <strong style={{ color:'#67e8f9' }}>14-module engine</strong> analyzes language patterns,
            salary claims, company identity, and more to produce a precise risk score.
          </p>

          {/* CTA */}
          <div style={{ display:'flex', gap:14, justifyContent:'center', flexWrap:'wrap' }}>
            <Button size="xl" onClick={() => navigate('/signin')}
              style={{ animation:'glowPulse 3s ease-in-out infinite' }}>
              🛡 Get Started — Sign In
            </Button>
            <Button size="xl" variant="ghost" onClick={() => navigate('/signup')}>
              Create Free Account
            </Button>
          </div>
        </div>

        {/* Scroll indicator */}
        <div style={{
          position:'absolute', bottom:28, left:'50%', transform:'translateX(-50%)',
          color:'var(--text-muted)', fontSize:12, display:'flex', flexDirection:'column',
          alignItems:'center', gap:6, animation:'float 2.5s ease-in-out infinite',
        }}>
          <span>Scroll to explore</span>
          <span style={{ fontSize:18 }}>↓</span>
        </div>
      </section>

      {/* ── Stats ────────────────────────────────── */}
      <section style={{ padding:'60px 40px', background:'var(--bg-surface)' }}>
        <div style={{ maxWidth:960, margin:'0 auto', display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:20 }}>
          {stats.map((s, i) => (
            <div key={i} className="fade-up" style={{ animationDelay:`${i*0.1}s` }}>
              <Card glow style={{ textAlign:'center', border:`1px solid ${s.col}28` }}>
                <div style={{
                  fontSize:36, fontFamily:'var(--font-head)', fontWeight:800,
                  color:s.col, marginBottom:8,
                }}>{s.val}</div>
                <div style={{ fontSize:13, color:'var(--text-secondary)' }}>{s.label}</div>
              </Card>
            </div>
          ))}
        </div>
      </section>

      {/* ── Features ─────────────────────────────── */}
      <section style={{ padding:'80px 40px', maxWidth:1000, margin:'0 auto' }}>
        <div style={{ textAlign:'center', marginBottom:52 }}>
          <h2 style={{ fontFamily:'var(--font-head)', fontSize:32, fontWeight:800, marginBottom:10 }}>
            How ScamShield Works
          </h2>
          <p style={{ color:'var(--text-secondary)', fontSize:15, maxWidth:520, margin:'0 auto' }}>
            A multi-layer AI system built to catch what human eyes miss
          </p>
        </div>

        <div style={{ display:'grid', gridTemplateColumns:'repeat(2,1fr)', gap:22 }}>
          {features.map((f, i) => (
            <div key={i} className="fade-up" style={{ animationDelay:`${i*0.08}s` }}>
              <Card glow style={{ height:'100%' }}>
                <div style={{ fontSize:36, marginBottom:14 }}>{f.icon}</div>
                <h3 style={{
                  fontFamily:'var(--font-head)', fontSize:18, fontWeight:700,
                  marginBottom:10, color:'var(--text-bright)',
                }}>{f.title}</h3>
                <p style={{ color:'var(--text-secondary)', fontSize:14, lineHeight:1.7 }}>
                  {f.desc}
                </p>
              </Card>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA Banner ───────────────────────────── */}
      <section style={{
        margin:'0 40px 80px', borderRadius:24,
        background:'linear-gradient(135deg, rgba(34,211,238,0.08), rgba(99,102,241,0.08))',
        border:'1px solid rgba(103,232,249,0.18)',
        padding:'56px 40px', textAlign:'center',
      }}>
        <h2 style={{ fontFamily:'var(--font-head)', fontSize:30, fontWeight:800, marginBottom:12 }}>
          Don't be the next victim. Check first.
        </h2>
        <p style={{ color:'var(--text-secondary)', marginBottom:32, fontSize:15, maxWidth:480, margin:'0 auto 32px' }}>
          Free to use. Takes 30 seconds. Could save you lakhs.
        </p>
        <Button size="xl" onClick={() => navigate('/signup')}>
          🚀 Start Protecting Yourself
        </Button>
      </section>

      {/* ── Footer ───────────────────────────────── */}
      <footer style={{
        borderTop:'1px solid var(--border)', padding:'28px 40px',
        textAlign:'center', color:'var(--text-muted)', fontSize:13,
      }}>
        ScamShield © 2026 — Protecting every graduate's first step 🛡️
      </footer>
    </div>
  );
}
