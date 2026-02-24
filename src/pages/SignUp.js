import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Card from '../components/Card';
import Button from '../components/Button';
import { Input } from '../components/FormField';
import SuccessPopup from '../components/SuccessPopup';

export default function SignUp() {
  const navigate = useNavigate();
  const { signUp, user } = useAuth();

  const [form, setForm] = useState({ name:'', email:'', password:'', linkedin:'' });
  const [error,   setError]   = useState('');
  const [loading, setLoading] = useState(false);
  const [popup,   setPopup]   = useState(false);

  useEffect(() => {
    if (user) navigate('/dashboard');
    document.title = 'Sign Up — ScamShield';
  }, [user, navigate]);

  const upd = key => e => setForm(f => ({ ...f, [key]: e.target.value }));

  const handleSubmit = () => {
    setError('');
    if (!form.name.trim() || !form.email.trim() || !form.password.trim()) {
      setError('Name, email, and password are required.'); return;
    }
    if (form.password.length < 6) {
      setError('Password must be at least 6 characters.'); return;
    }
    setLoading(true);
    setTimeout(() => {
      try {
        signUp(form);
        setPopup(true);
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    }, 700);
  };

  return (
    <div className="page-wrap grid-bg" style={{
      display:'flex', alignItems:'center', justifyContent:'center',
      minHeight:'100vh', padding:'24px',
    }}>
      {popup && (
        <SuccessPopup
          message="You have successfully registered! Your ScamShield account is ready."
          onClose={() => navigate('/dashboard')}
        />
      )}

      {/* Orbs */}
      {[{l:'5%',t:'30%',c:'#c4b5fd'},{l:'80%',t:'15%',c:'#22d3ee'},{l:'60%',t:'75%',c:'#6ee7b7'}].map((o,i)=>(
        <div key={i} style={{
          position:'fixed', left:o.l, top:o.t, width:280, height:280, borderRadius:'50%',
          background:`radial-gradient(circle,${o.c}10 0%,transparent 70%)`,
          pointerEvents:'none', animation:`orb ${7+i*2}s ease-in-out infinite`,
          animationDelay:`${i}s`,
        }}/>
      ))}

      <div className="fade-up" style={{ width:'100%', maxWidth:450, position:'relative', zIndex:1 }}>
        {/* Logo */}
        <div style={{ textAlign:'center', marginBottom:28 }}>
          <div style={{
            width:56, height:56, borderRadius:16, margin:'0 auto 14px',
            background:'linear-gradient(135deg,#c4b5fd,#6366f1)',
            display:'flex', alignItems:'center', justifyContent:'center',
            fontSize:26, boxShadow:'0 0 30px rgba(196,181,253,0.3)',
          }}>🚀</div>
          <h1 style={{ fontFamily:'var(--font-head)', fontSize:28, fontWeight:800, marginBottom:6 }}>
            Sign Up
          </h1>
          <p style={{ color:'var(--text-secondary)', fontSize:14 }}>
            Create your ScamShield account
          </p>
        </div>

        <Card glass glow>
          <Input label="Full Name *"           placeholder="Ambika Sharma"           value={form.name}     onChange={upd('name')}     icon="👤" />
          <Input label="Email Address *"       type="email" placeholder="you@mail.com" value={form.email}    onChange={upd('email')}    icon="✉️" />
          <Input label="Password *"            type="password" placeholder="Min 6 characters"  value={form.password} onChange={upd('password')} icon="🔒" />
          <Input label="LinkedIn URL (optional)" placeholder="https://linkedin.com/in/..." value={form.linkedin} onChange={upd('linkedin')} icon="🔗" />

          {error && (
            <div style={{
              padding:'11px 14px', borderRadius:10, marginBottom:16,
              background:'rgba(248,113,113,0.10)', border:'1px solid rgba(248,113,113,0.25)',
              color:'#fda4af', fontSize:13,
            }}>
              ⚠ {error}
            </div>
          )}

          <Button fullWidth size="lg" onClick={handleSubmit} disabled={loading}>
            {loading
              ? <><span style={{animation:'spin 0.8s linear infinite',display:'inline-block'}}>⟳</span> Creating account...</>
              : 'Create Account →'
            }
          </Button>

          <p style={{ textAlign:'center', color:'var(--text-secondary)', fontSize:13, marginTop:20 }}>
            Already have an account?{' '}
            <span
              onClick={() => navigate('/signin')}
              style={{ color:'#67e8f9', cursor:'pointer', fontWeight:600,
                textDecoration:'underline', textUnderlineOffset:3 }}
            >Sign In</span>
          </p>
        </Card>
      </div>
    </div>
  );
}
