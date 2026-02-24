/* ═══════════════════════════════════════════════
   SCAMSHIELD — 14-Module Risk Analysis Engine
   Pure JS rule-based scoring system
═══════════════════════════════════════════════ */

/**
 * Returns score (0-100) where higher = riskier
 * and status = "pass" | "warn" | "danger"
 */

const SCAM_KEYWORDS = [
  'guaranteed income','guaranteed salary','make money fast','earn from home',
  'no experience needed','no qualifications','anyone can do this','unlimited earning',
  'registration fee','processing fee','training fee','advance payment','pay to apply',
  'send money','wire transfer','western union','gift card payment',
  'limited slots','act now','urgent hiring','apply asap','last chance',
  'whatsapp only','telegram only','contact via whatsapp','dm for details',
  'work from home earn','earn daily','earn weekly','passive income guaranteed',
  'no interview','immediate selection','100% confirmed','not a scam',
];

const FREE_DOMAINS = [
  'gmail.com','yahoo.com','hotmail.com','outlook.com','ymail.com',
  'rediffmail.com','live.com','aol.com','icloud.com',
];

const URGENCY_PHRASES = [
  'limited slots','act now','urgent','asap','hurry','today only',
  'expires','last chance','don\'t miss','immediate','apply immediately',
  'only 3 spots','filling fast',
];

const PAYMENT_PHRASES = [
  'registration fee','processing fee','training fee','advance','deposit',
  'pay to','send money','wire','western union','gift card','upfront cost',
];

const VAGUE_TITLES = [
  'data entry','home worker','online worker','digital assistant',
  'envelope stuffing','mystery shopper','business associate',
  'field executive','multi level','mlm','network marketing',
];

const UNREALISTIC_SALARY_PATTERNS = [
  /\$\s*\d{4,}[\s\/]*(week|day|hr|hour)/i,
  /₹\s*\d{5,}[\s\/]*(week|day|hr|hour)/i,
  /earn.*\$\s*\d{3,}.*per\s*day/i,
  /guaranteed.*\d+.*per\s*(week|day|month)/i,
  /\d+\s*lakh.*per\s*month/i,
  /unlimited.*earn/i,
];

function containsAny(text, list) {
  const t = text.toLowerCase();
  return list.filter(phrase => t.includes(phrase.toLowerCase()));
}

function scoreToStatus(score) {
  if (score >= 55) return 'danger';
  if (score >= 25) return 'warn';
  return 'pass';
}

/* ── Module Definitions ──────────────────────── */
function m_keywordRisk(full) {
  const hits = containsAny(full, SCAM_KEYWORDS);
  const score = Math.min(100, hits.length * 18);
  return {
    name: 'Scam Keyword Detection',
    icon: '🔤',
    score,
    status: scoreToStatus(score),
    detail: hits.length > 0
      ? `Found ${hits.length} suspicious keyword(s): "${hits.slice(0,3).join('", "')}"`
      : 'No high-risk scam keywords detected',
  };
}

function m_salaryRealism(salary, full) {
  const text = (salary + ' ' + full).toLowerCase();
  const unrealistic = UNREALISTIC_SALARY_PATTERNS.filter(p => p.test(text));
  const guaranteed  = /guaranteed/i.test(text);
  const score = Math.min(100, unrealistic.length * 45 + (guaranteed ? 30 : 0));
  return {
    name: 'Salary Realism Check',
    icon: '💰',
    score,
    status: scoreToStatus(score),
    detail: score > 0
      ? `Unrealistic salary patterns detected${guaranteed ? ' + income guarantee' : ''}`
      : 'Salary claims appear within normal ranges',
  };
}

function m_emailDomain(email) {
  if (!email || !email.includes('@')) {
    return { name:'Email Domain Risk', icon:'📧', score: 30, status:'warn', detail:'No contact email provided — unable to verify' };
  }
  const domain = email.split('@')[1]?.toLowerCase() || '';
  const isFree = FREE_DOMAINS.some(d => domain.includes(d));
  const score = isFree ? 75 : 10;
  return {
    name: 'Email Domain Risk',
    icon: '📧',
    score,
    status: scoreToStatus(score),
    detail: isFree
      ? `Free consumer email used for HR contact: ${domain}`
      : `Corporate domain detected: @${domain}`,
  };
}

function m_urgencyLanguage(full) {
  const hits = containsAny(full, URGENCY_PHRASES);
  const score = Math.min(100, hits.length * 28);
  return {
    name: 'Urgency Language',
    icon: '⏰',
    score,
    status: scoreToStatus(score),
    detail: hits.length > 0
      ? `${hits.length} urgency phrase(s) detected: "${hits.slice(0,2).join('", "')}"`
      : 'No artificial urgency pressure found',
  };
}

function m_paymentRequest(full) {
  const hits = containsAny(full, PAYMENT_PHRASES);
  const score = Math.min(100, hits.length * 55);
  return {
    name: 'Payment Request Detection',
    icon: '💸',
    score,
    status: scoreToStatus(score),
    detail: hits.length > 0
      ? `⚠ CRITICAL: Payment terms detected — "${hits.slice(0,2).join('", "')}"`
      : 'No upfront payment or fee requests found',
  };
}

function m_companyPresence(company, email) {
  if (!company || company.trim().length < 3) {
    return { name:'Company Identity', icon:'🏢', score: 60, status:'warn', detail:'Company name not provided or too vague' };
  }
  const vaguePhrases = ['global','international','worldwide','solutions','opportunities','ltd','llc','pvt'];
  const matchCount = vaguePhrases.filter(p => company.toLowerCase().includes(p)).length;
  const emailMatch = email && !FREE_DOMAINS.some(d => email.split('@')[1]?.includes(d));
  const score = Math.max(0, Math.min(70, matchCount * 18 - (emailMatch ? 20 : 0)));
  return {
    name: 'Company Identity',
    icon: '🏢',
    score,
    status: scoreToStatus(score),
    detail: score >= 25
      ? 'Generic or unverifiable company name pattern'
      : `Company name: "${company}" — appears specific`,
  };
}

function m_contactChannel(full) {
  const unofficial = ['whatsapp','telegram','signal','wechat','snapchat','instagram dm','message us on'];
  const hits = containsAny(full, unofficial);
  const score = Math.min(100, hits.length * 42);
  return {
    name: 'Contact Channel Risk',
    icon: '📱',
    score,
    status: scoreToStatus(score),
    detail: hits.length > 0
      ? `Unofficial channel detected: "${hits.slice(0,2).join('", "')}"`
      : 'Official contact channels used',
  };
}

function m_noExperienceClaim(full, requirements) {
  const text = (full + ' ' + requirements).toLowerCase();
  const phrases = ['no experience','no qualification','no degree','zero experience','anyone can','freshers only','10th pass','12th pass'];
  const hits = phrases.filter(p => text.includes(p));
  const score = Math.min(90, hits.length * 30);
  return {
    name: 'Experience Claim Analysis',
    icon: '🎯',
    score,
    status: scoreToStatus(score),
    detail: hits.length > 0
      ? `"No experience needed" is a classic scam signal (${hits.length} phrase(s))`
      : 'Role requirements appear well-defined',
  };
}

function m_jobTitleRisk(title) {
  if (!title || title.length < 4) {
    return { name:'Job Title Risk', icon:'💼', score: 45, status:'warn', detail:'No job title provided — highly suspicious' };
  }
  const hits = VAGUE_TITLES.filter(v => title.toLowerCase().includes(v));
  const score = Math.min(80, hits.length * 35 + (title.length < 8 ? 25 : 0));
  return {
    name: 'Job Title Risk',
    icon: '💼',
    score,
    status: scoreToStatus(score),
    detail: hits.length > 0
      ? `Vague job title often associated with scams: "${hits[0]}"`
      : `Title "${title}" appears role-specific`,
  };
}

function m_guaranteedIncome(salary, full) {
  const text = (salary + ' ' + full).toLowerCase();
  const guarantees = ['guaranteed','100% sure','assured income','never earn less','always earn','confirmed salary'];
  const hits = guarantees.filter(p => text.includes(p));
  const score = Math.min(100, hits.length * 50);
  return {
    name: 'Guaranteed Income Claims',
    icon: '✅',
    score,
    status: scoreToStatus(score),
    detail: hits.length > 0
      ? 'Income guarantee is financially impossible — strong scam signal'
      : 'No misleading income guarantees found',
  };
}

function m_locationRisk(location) {
  if (!location || location.trim().length < 3) {
    return { name:'Location Verification', icon:'📍', score: 40, status:'warn', detail:'No location provided — unable to verify physical presence' };
  }
  const vague = ['anywhere','worldwide','all states','multiple','not disclosed','confidential','any city'];
  const hits = vague.filter(v => location.toLowerCase().includes(v));
  const score = Math.min(65, hits.length * 35);
  return {
    name: 'Location Verification',
    icon: '📍',
    score,
    status: scoreToStatus(score),
    detail: hits.length > 0
      ? 'Location is vague or undisclosed'
      : `Location specified: "${location}"`,
  };
}

function m_grammarProfessionalism(desc) {
  if (!desc || desc.length < 50) {
    return { name:'Content Professionalism', icon:'📝', score: 50, status:'warn', detail:'Job description is too short or incomplete' };
  }
  const excessExclaim = (desc.match(/!/g) || []).length;
  const allCapsRatio  = (desc.match(/[A-Z]/g) || []).length / desc.length;
  const shortDesc     = desc.length < 150;
  const score = Math.min(80,
    (excessExclaim > 3 ? 25 : 0) +
    (allCapsRatio > 0.35 ? 30 : 0) +
    (shortDesc ? 25 : 0)
  );
  return {
    name: 'Content Professionalism',
    icon: '📝',
    score,
    status: scoreToStatus(score),
    detail: score > 0
      ? 'Low professionalism: excessive punctuation, caps, or sparse description'
      : 'Description appears professionally written',
  };
}

function m_defensiveClaims(full) {
  const defensive = [
    'this is not a scam','100% legit','genuine offer','no fake','trust me',
    'i promise','real company','verified company','no catch','no hidden',
  ];
  const hits = containsAny(full, defensive);
  const score = Math.min(100, hits.length * 45);
  return {
    name: 'Defensive Language Pattern',
    icon: '🛡',
    score,
    status: scoreToStatus(score),
    detail: hits.length > 0
      ? `Over-reassurance detected: "${hits.slice(0,2).join('", "')}"`
      : 'No self-defensive language found',
  };
}

function m_excessiveBenefits(full) {
  const exaggerated = [
    'free laptop','free phone','free car','luxury travel','5-star','free housing',
    'unlimited leave','no work pressure','free food','company villa',
  ];
  const hits = containsAny(full, exaggerated);
  const score = Math.min(80, hits.length * 28);
  return {
    name: 'Excessive Benefits Claims',
    icon: '🎁',
    score,
    status: scoreToStatus(score),
    detail: hits.length > 0
      ? `Unrealistic perks listed: "${hits.slice(0,2).join('", "')}"`
      : 'Benefits listed appear reasonable',
  };
}

/* ── Main Analyzer ───────────────────────────── */
export function analyzeJob(formData) {
  const { title = '', company = '', salary = '', email = '', location = '', requirements = '', description = '' } = formData;
  const fullText = [title, company, salary, email, location, requirements, description].join(' ');

  const modules = [
    m_keywordRisk(fullText),
    m_salaryRealism(salary, fullText),
    m_emailDomain(email),
    m_urgencyLanguage(fullText),
    m_paymentRequest(fullText),
    m_companyPresence(company, email),
    m_contactChannel(fullText),
    m_noExperienceClaim(fullText, requirements),
    m_jobTitleRisk(title),
    m_guaranteedIncome(salary, fullText),
    m_locationRisk(location),
    m_grammarProfessionalism(description),
    m_defensiveClaims(fullText),
    m_excessiveBenefits(fullText),
  ];

  const riskScore  = Math.round(modules.reduce((a, b) => a + b.score, 0) / modules.length);
  const dangerCount = modules.filter(m => m.status === 'danger').length;
  const warnCount  = modules.filter(m => m.status === 'warn').length;
  const passCount  = modules.filter(m => m.status === 'pass').length;

  const riskLevel =
    riskScore >= 62 ? 'HIGH'
    : riskScore >= 35 ? 'MEDIUM'
    : 'LOW';

  const verdict =
    riskLevel === 'HIGH'
      ? '🚨 This listing shows multiple strong scam indicators. Do NOT apply, pay any fees, or share personal information.'
    : riskLevel === 'MEDIUM'
      ? '⚠️ Some suspicious patterns found. Research the company independently before proceeding. Never pay upfront fees.'
    : '✅ No major red flags detected. This appears legitimate — but always verify independently before sharing sensitive data.';

  const pieData = [
    { name: 'High Risk', value: dangerCount, color: '#f87171' },
    { name: 'Warnings',  value: warnCount,   color: '#fcd34d' },
    { name: 'Passed',    value: passCount,    color: '#6ee7b7' },
  ];

  return { modules, riskScore, riskLevel, dangerCount, warnCount, passCount, verdict, pieData };
}
