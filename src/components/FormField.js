import React from 'react';

export function FormField({ label, children, error }) {
  return (
    <div style={{ marginBottom: 18 }}>
      {label && <label>{label}</label>}
      {children}
      {error && (
        <p style={{ fontSize:12, color:'var(--rose)', marginTop:5, display:'flex', alignItems:'center', gap:4 }}>
          ⚠ {error}
        </p>
      )}
    </div>
  );
}

export function Input({ label, icon, error, ...props }) {
  return (
    <FormField label={label} error={error}>
      <div style={{ position:'relative' }}>
        {icon && (
          <span style={{
            position:'absolute', left:13, top:'50%', transform:'translateY(-50%)',
            fontSize:16, pointerEvents:'none', opacity:0.7,
          }}>{icon}</span>
        )}
        <input {...props} style={{ paddingLeft: icon ? 42 : 16, ...props.style }} />
      </div>
    </FormField>
  );
}

export function Textarea({ label, error, ...props }) {
  return (
    <FormField label={label} error={error}>
      <textarea {...props} style={{ padding:14, ...props.style }} />
    </FormField>
  );
}
