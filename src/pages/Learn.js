import React, { useEffect } from 'react';
import Card from '../components/Card';

const tips = [
  {
    icon:'💸', title:'Never Pay to Work',
    desc:'Legitimate employers NEVER ask you to pay registration fees, training costs, or equipment deposits upfront. If you\'re asked for money to get a job, it\'s a scam.',
    col:'#f87171',
  },
  {
    icon:'🏦', title:'Fake Check Scams',
    desc:'Scammers send fake checks and ask you to wire part back. The check bounces after you\'ve sent real money. Mystery shopper roles are a classic version of this.',
    col:'#fcd34d',
  },
  {
    icon:'🤑', title:'Unrealistic Pay',
    desc:"Ads promising $500–$5000/week for 'easy work from home' with no experience are almost always scams. Research real salary ranges on Glassdoor or LinkedIn.",
    col:'#6ee7b7',
  },
  {
    icon:'⏰', title:'Urgency Pressure',
    desc:"'Act now, limited spots!' is a classic pressure tactic. Real jobs don't disappear in hours. Scammers create artificial urgency to prevent you from researching.",
    col:'#67e8f9',
  },
  {
    icon:'🔍', title:'Research the Company',
    desc:"Search the company name + 'scam' or 'review'. Check their official website domain. Look them up on LinkedIn. If they have no online presence, be very cautious.",
    col:'#c4b5fd',
  },
  {
    icon:'🔒', title:'Protect Your Info',
    desc:'Never send your SSN, Aadhaar, PAN, bank details, or ID photos early in the hiring process. Legitimate employers only need this after you\'ve officially been hired.',
    col:'#93c5fd',
  },
];

const realJobSigns = [
  'Specific job title and clearly defined responsibilities',
  'Named company with a verifiable online presence',
  'Salary range — not vague "up to X" claims',
  'Clear requirements: degree, experience, specific skills',
  'Application via official website or professional email',
  'Interview process clearly mentioned',
  'Physical address or verified remote location',
  'Benefits and perks described professionally',
];

const scamTypes = [
  { icon:'👥', title:'Fake HR Scams',       desc:'Impersonating real company HR teams via LinkedIn, WhatsApp, or fake portals.' },
  { icon:'💸', title:'Payment Scams',        desc:'Charging upfront fees for registration, training, background checks, or uniforms.' },
  { icon:'📱', title:'Telegram/WA Scams',    desc:'Only communicating via unofficial channels — avoiding professional email trails.' },
  { icon:'🏠', title:'WFH Fraud',            desc:'Easy work-from-home schemes with inflated, unverifiable pay promises.' },
  { icon:'📋', title:'Fake Offer Letters',   desc:'Forged documents designed to steal personal information or demand deposits.' },
  { icon:'🔗', title:'Phishing Job Portals', desc:'Fake job listing sites designed to harvest your login credentials and personal data.' },
];

export default function Learn() {
  useEffect(() => { document.title = 'Learn — ScamShield'; }, []);

  return (
    <div className="page-wrap" style={{ maxWidth:960, margin:'0 auto', padding:'40px 24px 60px' }}>

      {/* Header */}
      <div className="fade-up" style={{ marginBottom:44 }}>
        <h1 style={{ fontFamily:'var(--font-head)', fontSize:30, fontWeight:800, marginBottom:8 }}>
          📚 How to Spot Job Scams
        </h1>
        <p style={{ color:'var(--text-secondary)', fontSize:15 }}>
          Learn the warning signs and protect yourself before you become a victim.
        </p>
      </div>

      {/* ── Scam Tips ──────────────────────────── */}
      <section style={{ marginBottom:52 }}>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:20 }}>
          {tips.map((t, i) => (
            <div key={i} className="fade-up" style={{ animationDelay:`${i*0.07}s` }}>
              <Card style={{ borderLeft:`3px solid ${t.col}`, height:'100%' }}>
                <div style={{ fontSize:34, marginBottom:12 }}>{t.icon}</div>
                <h3 style={{
                  fontFamily:'var(--font-head)', fontSize:17, fontWeight:700,
                  color:t.col, marginBottom:10,
                }}>{t.title}</h3>
                <p style={{ color:'var(--text-secondary)', fontSize:14, lineHeight:1.72 }}>{t.desc}</p>
              </Card>
            </div>
          ))}
        </div>
      </section>

      {/* ── Signs of a Real Job ────────────────── */}
      <section style={{ marginBottom:52 }}>
        <Card glow>
          <h2 style={{
            fontFamily:'var(--font-head)', fontSize:22, fontWeight:800,
            color:'#6ee7b7', marginBottom:22,
          }}>✅ Signs of a REAL Job Posting</h2>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10 }}>
            {realJobSigns.map((s, i) => (
              <div key={i} style={{
                display:'flex', gap:10, alignItems:'flex-start',
                padding:'11px 14px', borderRadius:12,
                background:'rgba(110,231,183,0.05)',
                border:'1px solid rgba(110,231,183,0.18)',
              }}>
                <span style={{ color:'#6ee7b7', fontWeight:700, fontSize:15, flexShrink:0, marginTop:1 }}>✓</span>
                <span style={{ fontSize:13.5, color:'var(--text-primary)', lineHeight:1.55 }}>{s}</span>
              </div>
            ))}
          </div>
        </Card>
      </section>

      {/* ── Common Scam Types ──────────────────── */}
      <section>
        <h2 style={{ fontFamily:'var(--font-head)', fontSize:22, fontWeight:800, marginBottom:22 }}>
          🚨 Common Job Scam Types
        </h2>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:16 }}>
          {scamTypes.map((c, i) => (
            <div key={i} className="fade-up" style={{ animationDelay:`${i*0.06}s` }}>
              <Card style={{ textAlign:'center' }}>
                <div style={{ fontSize:30, marginBottom:10 }}>{c.icon}</div>
                <div style={{ fontWeight:600, fontSize:14, marginBottom:7, color:'var(--text-bright)' }}>{c.title}</div>
                <div style={{ fontSize:12.5, color:'var(--text-secondary)', lineHeight:1.6 }}>{c.desc}</div>
              </Card>
            </div>
          ))}
        </div>
      </section>

      {/* Quick Reference */}
      <section style={{ marginTop:44 }}>
        <Card style={{
          background:'linear-gradient(135deg,rgba(248,113,113,0.08),rgba(252,211,77,0.06))',
          border:'1px solid rgba(248,113,113,0.22)',
        }}>
          <h3 style={{ fontFamily:'var(--font-head)', fontSize:18, fontWeight:700, color:'#fda4af', marginBottom:14 }}>
            🛑 Quick Red Flag Checklist
          </h3>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:8 }}>
            {[
              'Asked to pay any fee before joining',
              'No company website or LinkedIn page',
              'Only WhatsApp/Telegram communication',
              'Salary unrealistically high for the role',
              'No clear job description or requirements',
              'Guaranteed income or "no experience needed"',
              'Offer letter without an interview',
              'Urgency: "Apply in the next 2 hours"',
            ].map((r, i) => (
              <div key={i} style={{
                display:'flex', gap:8, alignItems:'center',
                fontSize:13, color:'var(--text-secondary)',
              }}>
                <span style={{ color:'#f87171', fontWeight:700, flexShrink:0 }}>✕</span>
                {r}
              </div>
            ))}
          </div>
        </Card>
      </section>
    </div>
  );
}
