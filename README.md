# 🛡 ScamShield — Job Scam Detection Portal

A modern, futuristic full-stack web application that helps users detect fake job postings using a 14-module AI-powered analysis engine.

---

## 🚀 Quick Start

```bash
# 1. Install dependencies
cd scamshield
npm install

# 2. Start development server
npm start

# 3. Open browser
http://localhost:3000
```

---

## 📁 Project Structure

```
scamshield/
├── public/
│   └── index.html              # HTML entry point + Google Fonts
│
├── src/
│   ├── index.js                # React entry point
│   ├── App.js                  # Root app + React Router setup
│   │
│   ├── styles/
│   │   └── global.css          # Design system, CSS variables, animations
│   │
│   ├── context/
│   │   └── AuthContext.js      # Auth state + localStorage user management
│   │
│   ├── services/
│   │   └── riskEngine.js       # 14-module scam detection engine (pure JS)
│   │
│   ├── components/
│   │   ├── Navbar.js           # Responsive navigation bar
│   │   ├── Button.js           # Reusable button with variants
│   │   ├── Card.js             # Glass/standard card component
│   │   ├── FormField.js        # Input, Textarea, Label wrappers
│   │   ├── SuccessPopup.js     # Animated success modal
│   │   ├── RiskGauge.js        # SVG score gauge + Recharts pie chart
│   │   └── ModuleCard.js       # Individual module result card
│   │
│   └── pages/
│       ├── Home.js             # Public landing page with hero + features
│       ├── SignIn.js           # Sign in form → Dashboard
│       ├── SignUp.js           # Sign up form → Success popup → Dashboard
│       ├── Dashboard.js        # Authenticated home with tiles + stats
│       ├── AnalyzeJob.js       # Full analysis form + results visualization
│       ├── Learn.js            # Scam awareness educational page
│       ├── MyAccount.js        # User profile + report history
│       └── ReportScam.js       # Scam submission form
│
└── package.json
```

---

## 🧠 14 Detection Modules

| # | Module | What It Checks |
|---|--------|----------------|
| 1 | Scam Keyword Detection | 30+ known scam phrases |
| 2 | Salary Realism Check | Unrealistic income patterns |
| 3 | Email Domain Risk | Free vs corporate email |
| 4 | Urgency Language | Pressure phrases |
| 5 | Payment Request Detection | Fee/deposit requests |
| 6 | Company Identity | Vague company names |
| 7 | Contact Channel Risk | WhatsApp/Telegram-only |
| 8 | Experience Claim Analysis | "No experience needed" |
| 9 | Job Title Risk | Vague or known-scam titles |
| 10 | Guaranteed Income Claims | Impossible guarantees |
| 11 | Location Verification | No physical address |
| 12 | Content Professionalism | Grammar, caps, punctuation |
| 13 | Defensive Language Pattern | Over-reassurance phrases |
| 14 | Excessive Benefits Claims | Unrealistic perks |

---

## 🎨 Design System

- **Theme**: Dark pastel futuristic (dark navy base)
- **Background**: `#0f172a` (deep slate)
- **Accents**: Pastel cyan, violet, mint gradients
- **Cards**: Glassmorphism with soft glow
- **Typography**: Syne (headers) + DM Sans (body)
- **Animations**: Float, pulse, fade-up, glow pulse

---

## 🔐 Authentication

Uses localStorage for demo purposes:
- Passwords stored locally (demo only — use bcrypt in production)
- Session persists on refresh
- Protected routes redirect to `/signin`

---

## 📊 Visualization

- **SVG Circular Gauge**: Animated risk score meter
- **Recharts Pie Chart**: Module distribution (pass/warn/danger)
- **Score Bars**: Per-module severity bars with glow effects

---

## 🚀 Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18 |
| Routing | React Router v6 |
| Charts | Recharts |
| HTTP | Axios (ready for API) |
| State | Context API + localStorage |
| Fonts | Google Fonts (Syne + DM Sans) |
| Styling | Pure CSS (design system) |

---

## 🏆 Competition Features

✅ 14-module detection engine  
✅ Real-time risk scoring  
✅ Pie chart + circular gauge visualization  
✅ Pass/Warn/Danger per module  
✅ AI recommendation text  
✅ Community scam reporting  
✅ User authentication flow  
✅ Fully responsive dark UI  
✅ Educational content  
✅ Production-ready architecture  

---

*ScamShield © 2026 — Protecting every graduate's first step 🛡*
