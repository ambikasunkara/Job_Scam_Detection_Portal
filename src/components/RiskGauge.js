import React from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';

/* ── Circular score gauge ──────────────────── */
export function ScoreGauge({ score }) {
  const r   = 68;
  const cx  = 88;
  const cy  = 88;
  const circ = 2 * Math.PI * r;
  const dash = (score / 100) * circ;

  const color = score >= 62 ? '#f87171' : score >= 35 ? '#fcd34d' : '#6ee7b7';
  const level = score >= 62 ? 'HIGH RISK' : score >= 35 ? 'MEDIUM RISK' : 'LOW RISK';
  const levelColor = color;

  return (
    <div style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:14 }}>
      <svg width={176} height={176} viewBox="0 0 176 176">
        {/* Track */}
        <circle cx={cx} cy={cy} r={r} fill="none"
          stroke="rgba(255,255,255,0.06)" strokeWidth={16} />
        {/* Glow */}
        <circle cx={cx} cy={cy} r={r} fill="none"
          stroke={color} strokeWidth={20}
          strokeDasharray={`${dash} ${circ - dash}`}
          strokeLinecap="round"
          transform={`rotate(-90 ${cx} ${cy})`}
          style={{
            transition:'stroke-dasharray 1.2s ease',
            filter:`drop-shadow(0 0 10px ${color})`,
          }}
          opacity={0.25}
        />
        {/* Main arc */}
        <circle cx={cx} cy={cy} r={r} fill="none"
          stroke={color} strokeWidth={10}
          strokeDasharray={`${dash} ${circ - dash}`}
          strokeLinecap="round"
          transform={`rotate(-90 ${cx} ${cy})`}
          style={{ transition:'stroke-dasharray 1.2s ease' }}
        />
        {/* Score */}
        <text x={cx} y={cy - 8} textAnchor="middle"
          fill="#f8fafc" fontSize={34} fontWeight={800} fontFamily="Syne, sans-serif">
          {score}
        </text>
        <text x={cx} y={cy + 14} textAnchor="middle"
          fill="#64748b" fontSize={11} fontFamily="DM Sans, sans-serif">
          RISK SCORE
        </text>
      </svg>

      {/* Badge */}
      <div style={{
        padding:'6px 22px', borderRadius:999,
        background:`${color}1a`,
        border:`1px solid ${color}55`,
        color: levelColor,
        fontWeight:800, fontSize:13, letterSpacing:2,
        fontFamily:'var(--font-head)',
      }}>
        {level}
      </div>
    </div>
  );
}

/* ── Module pie chart ──────────────────────── */
const CustomTooltip = ({ active, payload }) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{
      background:'var(--bg-card2)', border:'1px solid rgba(255,255,255,0.1)',
      borderRadius:10, padding:'10px 16px', fontSize:13,
      boxShadow:'0 8px 24px rgba(0,0,0,0.4)',
    }}>
      <strong style={{ color:payload[0].color }}>{payload[0].name}</strong>: {payload[0].value} modules
    </div>
  );
};

export function ModulePieChart({ data }) {
  return (
    <ResponsiveContainer width="100%" height={220}>
      <PieChart>
        <Pie
          data={data}
          cx="50%" cy="50%"
          innerRadius={55}
          outerRadius={90}
          paddingAngle={4}
          dataKey="value"
          strokeWidth={0}
        >
          {data.map((entry, i) => (
            <Cell key={i} fill={entry.color}
              style={{ filter:`drop-shadow(0 0 8px ${entry.color}66)` }} />
          ))}
        </Pie>
        <Tooltip content={<CustomTooltip />} />
        <Legend
          formatter={(value, entry) => (
            <span style={{ color:entry.color, fontSize:13, fontWeight:500 }}>{value}</span>
          )}
        />
      </PieChart>
    </ResponsiveContainer>
  );
}
