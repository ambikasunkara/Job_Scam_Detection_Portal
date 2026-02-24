import React, { useState, useRef, useEffect } from 'react';
import Card from '../components/Card';
import Button from '../components/Button';
import { Input, Textarea } from '../components/FormField';
import { ScoreGauge, ModulePieChart } from '../components/RiskGauge';
import ModuleCard from '../components/ModuleCard';
import { analyzeJob } from '../services/riskEngine';

const initialForm = { title:'', company:'', salary:'', email:'', location:'', requirements:'', description:'' };

export default function AnalyzeJob() {
  const [form,    setForm]    = useState(initialForm);
  const [result,  setResult]  = useState(null);
  const [loading, setLoading] = useState(false);
  const resultRef = useRef(null);

  useEffect(() => { document.title = 'Analyze Job — ScamShield'; }, []);

  const upd = k => e => setForm(f => ({ ...f, [k]: e.target.value }));

  const handleAnalyze = () => {
    if (!form.description.trim()) return;
    setLoading(true);
    setResult(null);
    setTimeout(() => {
      setResult(analyzeJob(form));
      setLoading(false);
      setTimeout(() => resultRef.current?.scrollIntoView({ behavior:'smooth', block:'start' }), 120);
    }, 1600);
  };

  const handleClear = () => { setForm(initialForm); setResult(null); };

  const riskColor = result
    ? (result.riskLevel === 'HIGH' ? '#f87171' : result.riskLevel === 'MEDIUM' ? '#fcd34d' : '#6ee7b7')
    : null;

  return (
    <div className="dashboard" style={{ maxWidth:920, margin:'0 auto', padding:'40px 24px 60px' }}>

      {/* ── Header ─────────────────────────────── */}
      <div className="fade-up" style={{ marginBottom:32 }}>
  <h1 style={{ fontFamily:'var(--font-head)', fontSize:30, fontWeight:800, marginBottom:8 }}>
    🔍 Analyze Job Listing
  </h1>
  <p style={{ color:'var(--text-secondary)', fontSize:15 }}>
    Enter the job listing details below. Our 14-module engine will produce a detailed risk score.
  </p>
</div>

      {/* ── Input Form ─────────────────────────── */}
      <Card glow style={{ marginBottom:28 }}>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'0 20px' }}>
          <Input label="Job Title"         placeholder="e.g. Data Entry Operator"        value={form.title}        onChange={upd('title')}        icon="💼" />
          <Input label="Company Name"      placeholder="e.g. Global Opportunities LLC"   value={form.company}      onChange={upd('company')}      icon="🏢" />
          <Input label="Salary"            placeholder="e.g. ₹50,000/month or $5000/week" value={form.salary}       onChange={upd('salary')}       icon="💰" />
          <Input label="Contact Email"     type="email" placeholder="hr@company.com"      value={form.email}        onChange={upd('email')}        icon="📧" />
          <Input label="Location"          placeholder="e.g. Mumbai, Maharashtra"         value={form.location}     onChange={upd('location')}     icon="📍" />
          <Input label="Requirements"      placeholder="e.g. Any graduate, 0–2 years exp" value={form.requirements} onChange={upd('requirements')} icon="📋" />
        </div>
        <Textarea
          label="Full Job Description *"
          placeholder="Paste the complete job description here — include all details, benefits, responsibilities, and any contact information..."
          value={form.description}
          onChange={upd('description')}
          rows={7}
        />
        <div style={{ display:'flex', gap:12, marginTop:4 }}>
          <Button size="lg" onClick={handleAnalyze} disabled={loading || !form.description.trim()}>
            {loading
              ? <><span style={{ animation:'spin 0.8s linear infinite', display:'inline-block' }}>⟳</span> Analyzing 14 modules...</>
              : '🔍 Analyze Job'
            }
          </Button>
          <Button size="lg" variant="secondary" onClick={handleClear}>
            ✕ Clear
          </Button>
        </div>
      </Card>

      {/* ── Loading State ──────────────────────── */}
      {loading && (
        <div className="fade-in" style={{ textAlign:'center', padding:'48px 0' }}>
          <div style={{ fontSize:48, animation:'float 1.5s ease-in-out infinite', marginBottom:16 }}>🧠</div>
          <p style={{ color:'var(--text-secondary)', fontSize:15 }}>Running 14 detection modules...</p>
          <div style={{ display:'flex', justifyContent:'center', gap:8, marginTop:14 }}>
            {['Keyword scan','Salary check','Domain verify','ML patterns'].map((s,i) => (
              <span key={i} style={{
                fontSize:11, padding:'4px 12px', borderRadius:999,
                background:'rgba(103,232,249,0.08)', border:'1px solid rgba(103,232,249,0.18)',
                color:'#67e8f9', animation:`pulse ${1.2+i*0.2}s infinite`,
                animationDelay:`${i*0.15}s`,
              }}>{s}</span>
            ))}
          </div>
        </div>
      )}

      {/* ── Results ────────────────────────────── */}
      {result && (
        <div ref={resultRef} className="fade-up">

          {/* Verdict Banner */}
          <div style={{
            padding:'20px 26px', borderRadius:16, marginBottom:24,
            background:`linear-gradient(135deg, ${riskColor}12, transparent)`,
            border:`1px solid ${riskColor}44`,
            display:'flex', alignItems:'flex-start', gap:14,
          }}>
            <div style={{ fontSize:28, flexShrink:0 }}>
              {result.riskLevel === 'HIGH' ? '🚨' : result.riskLevel === 'MEDIUM' ? '⚠️' : '✅'}
            </div>
            <div>
              <div style={{ fontFamily:'var(--font-head)', fontSize:15, fontWeight:700, color:riskColor, marginBottom:4 }}>
                {result.riskLevel} RISK DETECTED
              </div>
              <div style={{ fontSize:14, color:'var(--text-secondary)', lineHeight:1.65 }}>
                {result.verdict}
              </div>
            </div>
          </div>

          {/* Score + Pie chart */}
          <div style={{ display:'grid', gridTemplateColumns:'220px 1fr', gap:20, marginBottom:24 }}>
            <Card style={{ display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:10, padding:'28px 16px' }}>
              <ScoreGauge score={result.riskScore} />
            </Card>

            <Card>
              <h3 style={{ fontFamily:'var(--font-head)', fontSize:16, fontWeight:700, marginBottom:6, color:'var(--text-bright)' }}>
                📊 Module Distribution
              </h3>
              <p style={{ fontSize:13, color:'var(--text-secondary)', marginBottom:4 }}>
                {result.dangerCount} high-risk · {result.warnCount} warnings · {result.passCount} passed
              </p>
              <ModulePieChart data={result.pieData} />
            </Card>
          </div>

          {/* Summary row */}
          <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:14, marginBottom:24 }}>
            {[
              { label:'Risk Score',       val:`${result.riskScore}/100`, col:riskColor },
              { label:'Modules Flagged',  val:`${result.dangerCount + result.warnCount} / 14`, col:'#fcd34d' },
              { label:'Risk Level',       val:result.riskLevel, col:riskColor },
            ].map((s, i) => (
              <Card key={i} style={{ textAlign:'center', borderColor:`${s.col}22`, padding:'18px 12px' }}>
                <div style={{ fontFamily:'var(--font-head)', fontSize:26, fontWeight:800, color:s.col }}>{s.val}</div>
                <div style={{ fontSize:12, color:'var(--text-secondary)', marginTop:5 }}>{s.label}</div>
              </Card>
            ))}
          </div>

          {/* AI Note */}
          <Card style={{ marginBottom:24, borderLeft:`4px solid ${riskColor}`, borderRadius:'0 16px 16px 0' }}>
            <div style={{ fontSize:11, letterSpacing:2, color:riskColor, marginBottom:8, fontFamily:'var(--font-head)', fontWeight:700 }}>
              💡 AI RECOMMENDATION
            </div>
            <p style={{ color:'var(--text-secondary)', fontSize:14, lineHeight:1.7 }}>
              {result.riskLevel === 'HIGH'
                ? 'Multiple strong scam signals detected across key modules. Payment requests and unofficial contact channels are the most critical red flags. Do not proceed with this listing.'
                : result.riskLevel === 'MEDIUM'
                ? 'Some suspicious patterns detected — particularly in salary claims and company identity modules. Before proceeding, independently verify the company on LinkedIn and their official website. Never pay any fees.'
                : 'This listing passed most modules without significant red flags. However, always verify the company on official sources, confirm the job role on their website, and never share Aadhaar/PAN details before formal hiring.'
              }
            </p>
          </Card>

          {/* Module-by-module */}
          <Card>
            <h3 style={{ fontFamily:'var(--font-head)', fontSize:17, fontWeight:700, marginBottom:20 }}>
              🔬 Module-by-Module Analysis
            </h3>
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12 }}>
              {result.modules.map((mod, i) => (
                <ModuleCard key={i} mod={mod} index={i} />
              ))}
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
