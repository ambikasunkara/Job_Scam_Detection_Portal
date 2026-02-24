import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Card from '../components/Card';
import Button from '../components/Button';
import { Input } from '../components/FormField';

export default function SignIn() {
  const navigate = useNavigate();
  const { signIn, user } = useAuth();

  const [email,    setEmail]    = useState('');
  const [password, setPassword] = useState('');
  const [error,    setError]    = useState('');
  const [loading,  setLoading]  = useState(false);

  useEffect(() => {
    if (user) navigate('/dashboard');
    document.title = 'Sign In — ScamShield';
  }, [user, navigate]);

  const handleSubmit = async () => {
    setError('');
    if (!email.trim() || !password.trim()) {
      setError('Please enter both email and password.'); return;
    }
    setLoading(true);
    setTimeout(() => {
      try {
        signIn(email.trim(), password);
        navigate('/dashboard');
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    }, 600);
  };

  return (
    <div className="page-wrap grid-bg" style={{
      display:'flex', alignItems:'center', justifyContent:'center',
      minHeight:'100vh', padding:'24px',
    }}>
      {/* Orbs */}
      {[{l:'10%',t:'20%',c:'#22d3ee'},{l:'75%',t:'60%',c:'#6366f1'}].map((o,i)=>(
        <div key={i} style={{
          position:'fixed', left:o.l, top:o.t, width:320, height:320, borderRadius:'50%',
          background:`radial-gradient(circle,${o.c}12 0%,transparent 70%)`,
          pointerEvents:'none', animation:`orb ${6+i*2}s ease-in-out infinite`,
        }}/>
      ))}

      <div className="fade-up" style={{ width:'100%', maxWidth:420, position:'relative', zIndex:1 }}>
        {/* Logo */}
        <div style={{ textAlign:'center', marginBottom:32 }}>
          <div style={{
            width:56, height:56, borderRadius:16, margin:'0 auto 14px',
            background:'linear-gradient(135deg,#22d3ee,#6366f1)',
            display:'flex', alignItems:'center', justifyContent:'center',
            fontSize:26, boxShadow:'0 0 30px rgba(34,211,238,0.35)',
          }}>🛡</div>
          <h1 style={{ fontFamily:'var(--font-head)', fontSize:28, fontWeight:800, marginBottom:6 }}>
            Sign In
          </h1>
          <p style={{ color:'var(--text-secondary)', fontSize:14 }}>
            Welcome back to ScamShield
          </p>
        </div>

        <Card glass glow>
          <Input
            label="Email Address"
            type="email"
            placeholder="you@company.com"
            value={email}
            onChange={e => setEmail(e.target.value)}
            icon="✉️"
            onKeyDown={e => e.key === 'Enter' && handleSubmit()}
          />
          <Input
            label="Password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={e => setPassword(e.target.value)}
            icon="🔒"
            onKeyDown={e => e.key === 'Enter' && handleSubmit()}
          />

          {error && (
            <div style={{
              padding:'11px 14px', borderRadius:10, marginBottom:16,
              background:'rgba(248,113,113,0.10)', border:'1px solid rgba(248,113,113,0.25)',
              color:'#fda4af', fontSize:13, display:'flex', alignItems:'center', gap:8,
            }}>
              ⚠ {error}
            </div>
          )}

          <Button fullWidth size="lg" onClick={handleSubmit} disabled={loading}>
            {loading
              ? <><span style={{ animation:'spin 0.8s linear infinite', display:'inline-block' }}>⟳</span> Signing in...</>
              : 'Sign In →'
            }
          </Button>

          <p style={{ textAlign:'center', color:'var(--text-secondary)', fontSize:13, marginTop:20 }}>
            Don't have an account?{' '}
            <span
              onClick={() => navigate('/signup')}
              style={{ color:'#67e8f9', cursor:'pointer', fontWeight:600,
                textDecoration:'underline', textUnderlineOffset:3 }}
            >Sign Up</span>
          </p>
        </Card>

        <p style={{ textAlign:'center', color:'var(--text-muted)', fontSize:12, marginTop:20 }}>
          Demo: Sign up first to create an account, then sign in.
        </p>
      </div>
    </div>
  );
}
