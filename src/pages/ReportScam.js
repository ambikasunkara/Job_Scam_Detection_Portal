import React, { useState, useEffect } from 'react';
import Card from '../components/Card';
import Button from '../components/Button';
import { Input, Textarea } from '../components/FormField';
import SuccessPopup from '../components/SuccessPopup';

const initialForm = { jobTitle:'', company:'', desc:'', contact:'', fileName:'' };

export default function ReportScam() {
  const [form,    setForm]    = useState(initialForm);
  const [popup,   setPopup]   = useState(false);
  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState('');

  useEffect(() => { document.title = 'Report a Scam — ScamShield'; }, []);

  const upd = k => e => setForm(f => ({ ...f, [k]: e.target.value }));

  const handleFile = e => {
    const file = e.target.files?.[0];
    if (file) setForm(f => ({ ...f, fileName: file.name }));
  };

  const handleSubmit = () => {
    setError('');
    if (!form.jobTitle.trim() || !form.company.trim() || !form.desc.trim()) {
      setError('Job title, company name, and description are required.'); return;
    }
    setLoading(true);
    setTimeout(() => {
      const existing = JSON.parse(localStorage.getItem('ss_reports') || '[]');
      localStorage.setItem('ss_reports', JSON.stringify([
        ...existing,
        { ...form, id:Date.now(), date:new Date().toLocaleDateString('en-IN') }
      ]));
      setLoading(false);
      setForm(initialForm);
      setPopup(true);
    }, 800);
  };

  return (
    <div className="page-wrap" style={{ maxWidth:700, margin:'0 auto', padding:'40px 24px 60px' }}>
      {popup && (
        <SuccessPopup
          message="Your scam report has been submitted successfully. Thank you for helping protect other job seekers!"
          onClose={() => setPopup(false)}
        />
      )}

      {/* Header */}
      <div className="fade-up" style={{ marginBottom:32 }}>
        <h1 style={{ fontFamily:'var(--font-head)', fontSize:30, fontWeight:800, marginBottom:8 }}>
          🚨 Report a Scam
        </h1>
        <p style={{ color:'var(--text-secondary)', fontSize:15 }}>
          Help protect others by reporting fake job listings. Every report improves our detection engine.
        </p>
      </div>

      {/* Info banner */}
      <div style={{
        padding:'14px 18px', borderRadius:12, marginBottom:24,
        background:'rgba(103,232,249,0.07)', border:'1px solid rgba(103,232,249,0.20)',
        display:'flex', gap:12, alignItems:'flex-start',
      }}>
        <span style={{ fontSize:18, flexShrink:0 }}>ℹ️</span>
        <p style={{ fontSize:13, color:'var(--text-secondary)', lineHeight:1.6 }}>
          Reports are anonymous unless you provide contact details. Your submission contributes to our scam database and helps train our AI detection model.
        </p>
      </div>

      <Card glow>
        <Input
          label="Job Title *"
          placeholder="e.g. Work From Home Data Entry Executive"
          value={form.jobTitle}
          onChange={upd('jobTitle')}
          icon="💼"
        />
        <Input
          label="Company Name *"
          placeholder="e.g. Global Career Opportunities Pvt Ltd"
          value={form.company}
          onChange={upd('company')}
          icon="🏢"
        />
        <Textarea
          label="Description *"
          placeholder="Describe what happened in detail — what was promised, what was suspicious, how they contacted you, what they asked for..."
          value={form.desc}
          onChange={upd('desc')}
          rows={6}
        />

        {/* File Upload */}
        <div style={{ marginBottom:18 }}>
          <label>📎 Upload Evidence (optional)</label>
          <div
            style={{
              border:'2px dashed rgba(103,232,249,0.22)', borderRadius:12,
              padding:'28px 20px', textAlign:'center', cursor:'pointer',
              transition:'border-color .2s, background .2s',
              background: form.fileName ? 'rgba(110,231,183,0.05)' : 'transparent',
            }}
            onClick={() => document.getElementById('scam-evidence-input').click()}
            onDragOver={e => e.preventDefault()}
            onDrop={e => {
              e.preventDefault();
              const file = e.dataTransfer.files?.[0];
              if (file) setForm(f => ({ ...f, fileName: file.name }));
            }}
          >
            <div style={{ fontSize:32, marginBottom:8 }}>
              {form.fileName ? '✅' : '📁'}
            </div>
            <div style={{ fontSize:14, color:'var(--text-secondary)' }}>
              {form.fileName
                ? <><strong style={{ color:'#6ee7b7' }}>{form.fileName}</strong> attached</>
                : 'Click or drag & drop a screenshot or PDF'
              }
            </div>
            <div style={{ fontSize:12, color:'var(--text-muted)', marginTop:5 }}>
              PNG, JPG, PDF — max 10 MB
            </div>
          </div>
          <input
            id="scam-evidence-input"
            type="file"
            accept="image/*,.pdf"
            style={{ display:'none' }}
            onChange={handleFile}
          />
        </div>

        <Input
          label="Your Contact (optional)"
          placeholder="Email or phone number — only if you wish to be contacted"
          value={form.contact}
          onChange={upd('contact')}
          icon="📬"
        />

        {error && (
          <div style={{
            padding:'11px 14px', borderRadius:10, marginBottom:16,
            background:'rgba(248,113,113,0.10)', border:'1px solid rgba(248,113,113,0.25)',
            color:'#fda4af', fontSize:13,
          }}>⚠ {error}</div>
        )}

        <Button
          size="lg"
          variant="danger"
          onClick={handleSubmit}
          disabled={loading || !form.jobTitle.trim() || !form.company.trim() || !form.desc.trim()}
        >
          {loading
            ? <><span style={{animation:'spin 0.8s linear infinite',display:'inline-block'}}>⟳</span> Submitting...</>
            : '🚨 Submit Report'
          }
        </Button>
      </Card>

      {/* Why report? */}
      <Card style={{ marginTop:20 }}>
        <h3 style={{ fontFamily:'var(--font-head)', fontSize:15, fontWeight:700, marginBottom:14, color:'#c4b5fd' }}>
          🧠 Why Your Report Matters
        </h3>
        {[
          { icon:'🛡', text:'Protects future job seekers from the same scam' },
          { icon:'📊', text:'Improves our AI detection accuracy' },
          { icon:'🗂', text:'Adds to our verified scam database' },
          { icon:'⚖️', text:'Can assist law enforcement investigations' },
        ].map((r, i) => (
          <div key={i} style={{
            display:'flex', gap:12, padding:'9px 0',
            borderBottom:'1px solid var(--border)', alignItems:'center',
          }}>
            <span style={{ fontSize:18 }}>{r.icon}</span>
            <span style={{ fontSize:13.5, color:'var(--text-secondary)' }}>{r.text}</span>
          </div>
        ))}
      </Card>
    </div>
  );
}
