import { useState } from "react";
import "../App.css";

/* ── Mock Data ──────────────────────────────────────────────────────────── */

const WORKFORCE_METRICS = [
  { label: "Workforce Readiness",  value: "74%",  sub: "+6% vs last quarter",      good: true  },
  { label: "Skill Distribution",   value: "81%",  sub: "Roles with full coverage",  good: true  },
  { label: "Attrition Risk",       value: "12%",  sub: "High-risk employees: 48",   good: false },
  { label: "Department Health",    value: "8.4",  sub: "Out of 10 composite score", good: true  },
];

const DEPARTMENTS = [
  { name: "Engineering",   readiness: 82, gap: 18, employees: 140 },
  { name: "Product",       readiness: 71, gap: 29, employees:  60 },
  { name: "Sales",         readiness: 65, gap: 35, employees:  95 },
  { name: "Operations",    readiness: 78, gap: 22, employees:  80 },
  { name: "Data & AI",     readiness: 88, gap: 12, employees:  45 },
];

const SKILL_MAP = [
  { name: "Priya Nair",    dept: "Engineering", skills: ["Python","AWS","ML"],        completion: 92 },
  { name: "James Cole",    dept: "Product",     skills: ["Figma","Roadmapping","SQL"], completion: 78 },
  { name: "Dana West",     dept: "Sales",       skills: ["CRM","Negotiation"],         completion: 61 },
  { name: "Marcus Held",   dept: "Data & AI",   skills: ["PyTorch","Spark","dbt"],    completion: 95 },
  { name: "Sofia Reyes",   dept: "Operations",  skills: ["Lean","Excel","JIRA"],       completion: 74 },
];

const LEARNING_PATHS = [
  { title: "AI & Machine Learning Fundamentals", enrolled: 38, cert: "Google Cloud ML",  progress: 64, weeks: 8  },
  { title: "Cloud Architecture (AWS Solutions)", enrolled: 52, cert: "AWS Solutions Arch", progress: 41, weeks: 12 },
  { title: "Product-Led Growth",                 enrolled: 24, cert: "AIPMM CPM",          progress: 78, weeks: 6  },
  { title: "Advanced Data Engineering",          enrolled: 19, cert: "Databricks Cert",    progress: 55, weeks: 10 },
];

const HIRING_FORECASTS = [
  { role: "Senior ML Engineer",       dept: "Data & AI",    priority: "Critical", timeline: "Q3 2025", count: 4 },
  { role: "Frontend Developer",       dept: "Engineering",  priority: "High",     timeline: "Q3 2025", count: 6 },
  { role: "Product Manager",          dept: "Product",      priority: "Medium",   timeline: "Q4 2025", count: 2 },
  { role: "Revenue Operations",       dept: "Sales",        priority: "High",     timeline: "Q3 2025", count: 3 },
];

const SKILL_GAPS = [
  { skill: "LLM / Generative AI",  gap: 78, impacted: 62 },
  { skill: "Kubernetes",           gap: 55, impacted: 38 },
  { skill: "Data Governance",      gap: 49, impacted: 44 },
  { skill: "Go / Rust",            gap: 42, impacted: 27 },
  { skill: "Product Analytics",    gap: 37, impacted: 31 },
];

const PERF_INSIGHTS = [
  { label: "High Performers",    value: "22%", desc: "Exceeding all OKRs" },
  { label: "On Track",           value: "61%", desc: "Meeting targets"    },
  { label: "Needs Coaching",     value: "17%", desc: "Flagged for support" },
];

const SECURITY_FEATURES = [
  {
    title: "Single Sign-On (SSO)",
    desc:  "SAML 2.0 and OIDC support. Integrate with Okta, Azure AD, Google Workspace in minutes.",
    badge: "SAML 2.0 · OIDC",
    icon:  "🔐",
  },
  {
    title: "Role-Based Access Control",
    desc:  "Granular permissions per role, team, and data scope. Org-wide policy enforcement.",
    badge: "RBAC",
    icon:  "🛡️",
  },
  {
    title: "Audit Logs",
    desc:  "Immutable, exportable audit trail for every action. Real-time alerts on anomalies.",
    badge: "SOC 2 Type II",
    icon:  "📋",
  },
  {
    title: "Compliance & Data Residency",
    desc:  "GDPR, HIPAA, ISO 27001 compliant. Choose EU or US data residency at account level.",
    badge: "GDPR · HIPAA · ISO 27001",
    icon:  "✅",
  },
];

const PRIORITY_COLOR = { Critical: "rp-badge--amber", High: "rp-badge--blue", Medium: "rp-badge--green" };

/* ── Shared helpers ─────────────────────────────────────────────────────── */
function PanelHeader({ eyebrow, title, sub }) {
  return (
    <div className="acip-panel-header" style={{ paddingBottom: 28 }}>
      {eyebrow && <p className="acip-eyebrow">{eyebrow}</p>}
      <h2 className="acip-panel-title">{title}</h2>
      {sub && <p className="acip-panel-sub">{sub}</p>}
    </div>
  );
}

function Bar({ pct, color }) {
  return (
    <div className="acip-progress-bar" style={{ height: 5, marginBottom: 0 }}>
      <div className="acip-progress-fill" style={{ width: `${pct}%`, background: color || "var(--accent)" }} />
    </div>
  );
}

/* ── Section 1: Workforce Analytics ────────────────────────────────────── */
function WorkforceAnalytics() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      {/* KPI row */}
      <div className="ep-kpi-grid">
        {WORKFORCE_METRICS.map((m, i) => (
          <div key={i} className="acip-score-card ep-kpi-card">
            <p className="acip-card-label">{m.label}</p>
            <p className="acip-score-value" style={{ color: m.good ? "var(--accent)" : "var(--accent-2)" }}>
              {m.value}
            </p>
            <p style={{ fontSize: 12, color: "var(--ink-3)", marginTop: 6 }}>{m.sub}</p>
          </div>
        ))}
      </div>

      {/* Department breakdown */}
      <div className="acip-panel">
        <PanelHeader eyebrow="Breakdown" title="Department Health" sub="Skill readiness vs gap per business unit." />
        <div style={{ padding: "0 36px 36px" }}>
          {DEPARTMENTS.map((d, i) => (
            <div key={i} style={{ marginBottom: 22 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                <div>
                  <span style={{ fontSize: 14, fontWeight: 600, color: "var(--ink)" }}>{d.name}</span>
                  <span style={{ fontSize: 12, color: "var(--ink-4)", marginLeft: 8 }}>{d.employees} employees</span>
                </div>
                <div style={{ display: "flex", gap: 16 }}>
                  <span style={{ fontSize: 12, color: "var(--success)", fontWeight: 500 }}>Ready {d.readiness}%</span>
                  <span style={{ fontSize: 12, color: "var(--accent-2)", fontWeight: 500 }}>Gap {d.gap}%</span>
                </div>
              </div>
              <div style={{ display: "flex", gap: 3, height: 6 }}>
                <div style={{ flex: d.readiness, background: "var(--success)", borderRadius: "99px 0 0 99px" }} />
                <div style={{ flex: d.gap,       background: "rgba(232,160,32,.35)", borderRadius: "0 99px 99px 0" }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── Section 2: Internal Upskilling ─────────────────────────────────────── */
function Upskilling() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      {/* Employee skill map */}
      <div className="acip-panel">
        <PanelHeader eyebrow="Skill Mapping" title="Employee Skill Profiles" sub="Current skill coverage and learning progress per employee." />
        <div style={{ padding: "0 36px 36px" }}>
          {SKILL_MAP.map((e, i) => (
            <div key={i} className="ep-employee-row">
              <div className="rp-candidate-avatar rp-avatar-sm">
                {e.name.split(" ").map(w => w[0]).join("")}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                  <div>
                    <span style={{ fontSize: 14, fontWeight: 600, color: "var(--ink)" }}>{e.name}</span>
                    <span style={{ fontSize: 12, color: "var(--ink-4)", marginLeft: 8 }}>{e.dept}</span>
                  </div>
                  <span style={{ fontSize: 13, fontWeight: 600, color: e.completion >= 80 ? "var(--success)" : "var(--accent)" }}>
                    {e.completion}%
                  </span>
                </div>
                <div className="acip-role-skills" style={{ margin: "0 0 8px" }}>
                  {e.skills.map(s => <span key={s} className="acip-skill-tag">{s}</span>)}
                </div>
                <Bar pct={e.completion} color={e.completion >= 80 ? "var(--success)" : "var(--accent)"} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Learning paths */}
      <div className="acip-panel">
        <PanelHeader eyebrow="Learning Engine" title="Active Learning Paths" sub="AI-assigned programs with certification tracking." />
        <div className="ep-lp-grid">
          {LEARNING_PATHS.map((lp, i) => (
            <div key={i} className="acip-role-card">
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <h3 className="acip-role-name" style={{ fontSize: 18 }}>{lp.title}</h3>
                <span style={{ fontSize: 11, color: "var(--ink-4)", whiteSpace: "nowrap", marginLeft: 8 }}>
                  {lp.weeks}w
                </span>
              </div>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                <span className="acip-skill-tag">{lp.cert}</span>
                <span style={{ fontSize: 12, color: "var(--ink-3)", alignSelf: "center" }}>{lp.enrolled} enrolled</span>
              </div>
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                  <span style={{ fontSize: 12, color: "var(--ink-3)" }}>Avg. progress</span>
                  <span style={{ fontSize: 12, fontWeight: 600, color: "var(--ink)" }}>{lp.progress}%</span>
                </div>
                <Bar pct={lp.progress} />
              </div>
              <button className="acip-btn-select" style={{ padding: "10px 0" }}>View Path</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── Section 3: Talent Intelligence Dashboard ───────────────────────────── */
function TalentIntelligence() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      {/* Hiring forecasts */}
      <div className="acip-panel">
        <PanelHeader eyebrow="Forecasting" title="Hiring Forecasts" sub="AI-predicted headcount needs based on growth trajectory and attrition signals." />
        <div style={{ padding: "0 36px 36px" }}>
          {HIRING_FORECASTS.map((h, i) => (
            <div key={i} className="ep-forecast-row">
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: 14, fontWeight: 600, color: "var(--ink)", marginBottom: 3 }}>{h.role}</p>
                <p style={{ fontSize: 12, color: "var(--ink-3)" }}>{h.dept} · {h.timeline}</p>
              </div>
              <span style={{ fontSize: 14, fontWeight: 700, color: "var(--accent)", marginRight: 16 }}>
                ×{h.count} hires
              </span>
              <span className={`rp-badge ${PRIORITY_COLOR[h.priority]}`}>{h.priority}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Skill gaps + performance side by side */}
      <div className="rp-analytics-row">
        <div className="acip-panel rp-analytics-half">
          <PanelHeader eyebrow="Gap Analysis" title="Critical Skill Gaps" sub="Org-wide missing competencies." />
          <div style={{ padding: "0 36px 36px" }}>
            {SKILL_GAPS.map((g, i) => (
              <div key={i} style={{ marginBottom: 20 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                  <span style={{ fontSize: 13, color: "var(--ink-2)" }}>{g.skill}</span>
                  <span style={{ fontSize: 12, color: "var(--ink-4)" }}>{g.impacted} employees</span>
                </div>
                <Bar pct={g.gap} color="var(--accent-2)" />
              </div>
            ))}
          </div>
        </div>

        <div className="acip-panel rp-analytics-half">
          <PanelHeader eyebrow="Performance" title="Performance Insights" sub="Team-wide performance distribution." />
          <div style={{ padding: "0 36px 36px" }}>
            {PERF_INSIGHTS.map((p, i) => (
              <div key={i} className="acip-score-card ep-perf-card">
                <p className="acip-card-label">{p.label}</p>
                <p className="acip-score-value">{p.value}</p>
                <p style={{ fontSize: 12, color: "var(--ink-3)", marginTop: 6 }}>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Section 4: Security Features ──────────────────────────────────────── */
function SecuritySection() {
  return (
    <div className="acip-panel">
      <PanelHeader
        eyebrow="Enterprise Grade"
        title="Security & Compliance"
        sub="Built for teams that demand the highest security standards. Audit-ready from day one."
      />
      <div className="ep-security-grid">
        {SECURITY_FEATURES.map((f, i) => (
          <div key={i} className="ep-security-card">
            <div style={{ fontSize: 28, marginBottom: 12 }}>{f.icon}</div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
              <h3 style={{
                fontFamily: "'DM Serif Display', serif",
                fontSize: 20,
                fontWeight: 400,
                color: "var(--ink)",
              }}>
                {f.title}
              </h3>
            </div>
            <p style={{ fontSize: 14, color: "var(--ink-3)", lineHeight: 1.6, marginBottom: 16 }}>{f.desc}</p>
            <span className="acip-skill-tag" style={{ fontSize: 11 }}>{f.badge}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Section 5: Demo Request Form ──────────────────────────────────────── */
function DemoForm() {
  const [form, setForm] = useState({ company: "", name: "", email: "", count: "", message: "" });
  const [sent, setSent] = useState(false);

  const set = field => e => setForm(prev => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = e => {
    e.preventDefault();
    if (!form.company || !form.email) return;
    setSent(true);
  };

  if (sent) {
    return (
      <div className="acip-panel">
        <div style={{ padding: "64px 36px", textAlign: "center" }}>
          <p style={{ fontSize: 40, marginBottom: 20 }}>✅</p>
          <h2 className="acip-panel-title" style={{ marginBottom: 10 }}>Request Received</h2>
          <p className="acip-panel-sub">
            Our enterprise team will reach out to <strong>{form.email}</strong> within one business day.
          </p>
          <button
            className="acip-btn-analyze"
            style={{ marginTop: 28 }}
            onClick={() => { setForm({ company: "", name: "", email: "", count: "", message: "" }); setSent(false); }}
          >
            Submit Another Request
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="acip-panel">
      <PanelHeader
        eyebrow="Get Started"
        title="Request a Demo"
        sub="Tell us about your organisation and we'll tailor a session to your exact needs."
      />
      <form onSubmit={handleSubmit} style={{ padding: "0 36px 40px" }}>
        <div className="ep-form-grid">
          <div className="acip-input-group">
            <label className="acip-meta-label" style={{ display: "block", marginBottom: 6 }}>Company Name *</label>
            <input className="acip-text-input" placeholder="Acme Corp" value={form.company} onChange={set("company")} required />
          </div>
          <div className="acip-input-group">
            <label className="acip-meta-label" style={{ display: "block", marginBottom: 6 }}>Contact Name</label>
            <input className="acip-text-input" placeholder="Jane Smith" value={form.name} onChange={set("name")} />
          </div>
          <div className="acip-input-group">
            <label className="acip-meta-label" style={{ display: "block", marginBottom: 6 }}>Work Email *</label>
            <input className="acip-text-input" type="email" placeholder="jane@company.com" value={form.email} onChange={set("email")} required />
          </div>
          <div className="acip-input-group">
            <label className="acip-meta-label" style={{ display: "block", marginBottom: 6 }}>Employee Count</label>
            <select className="acip-text-input" value={form.count} onChange={set("count")}>
              <option value="">Select range</option>
              <option value="1-50">1 – 50</option>
              <option value="51-200">51 – 200</option>
              <option value="201-500">201 – 500</option>
              <option value="501-1000">501 – 1 000</option>
              <option value="1000+">1 000+</option>
            </select>
          </div>
        </div>
        <div style={{ marginTop: 16 }}>
          <label className="acip-meta-label" style={{ display: "block", marginBottom: 6 }}>Message</label>
          <textarea
            className="acip-text-input rp-textarea"
            placeholder="Tell us about your current challenges and what you're hoping to achieve…"
            rows={4}
            value={form.message}
            onChange={set("message")}
          />
        </div>
        <div className="acip-analyzer-footer" style={{ marginTop: 24 }}>
          <button type="submit" className="acip-btn-analyze">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
            </svg>
            Send Request
          </button>
          <p className="acip-analyzer-note">We'll respond within one business day. No spam, ever.</p>
        </div>
      </form>
    </div>
  );
}

/* ── Page ───────────────────────────────────────────────────────────────── */
const TABS = [
  { id: "workforce",   label: "Workforce Analytics"   },
  { id: "upskilling",  label: "Upskilling Engine"     },
  { id: "talent",      label: "Talent Intelligence"   },
  { id: "security",    label: "Security"              },
  { id: "demo",        label: "Request Demo"          },
];

export default function EnterprisePage() {
  const [tab, setTab] = useState("workforce");

  return (
    <>
      {/* Navbar */}
      <header className="acip-topbar">
        <div className="acip-container acip-topbar-inner">
          <div className="acip-brand">
            <span className="acip-brand-mark">ACIP</span>
            <span className="acip-brand-divider" />
            <span className="acip-brand-sub">AI Career Intelligence Platform</span>
          </div>
          <nav className="acip-nav">
            <a href="/career"      className="acip-nav-link">Career</a>
            <a href="/recruitment" className="acip-nav-link">Recruitment</a>
            <a href="/enterprise"  className="acip-nav-link">Enterprise</a>
            <a href="/pricing"     className="acip-nav-link">Pricing</a>
            <button className="acip-btn-primary">Contact Sales</button>
          </nav>
        </div>
      </header>

      {/* Tab Strip */}
      <div className="acip-tabstrip">
        <div className="acip-tabstrip-inner">
          {TABS.map(t => (
            <button
              key={t.id}
              className={`acip-tab ${tab === t.id ? "acip-tab--active" : ""}`}
              onClick={() => setTab(t.id)}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      <main className="acip-container acip-main">
        {/* Hero */}
        <section className="acip-hero">
          <div className="acip-hero-content">
            <p className="acip-eyebrow">Enterprise Platform</p>
            <h1 className="acip-hero-title">Enterprise Workforce<br />Intelligence</h1>
            <p className="acip-hero-sub">
              Map every skill, close every gap, and grow every career — across your entire
              organisation. ACIP gives HR and L&amp;D teams the intelligence to act, not guess.
            </p>
          </div>
          <div className="acip-hero-stats">
            <div className="acip-stat">
              <span className="acip-stat-value">3×</span>
              <span className="acip-stat-label">Faster Skill Gap Closure</span>
            </div>
            <div className="acip-stat-divider" />
            <div className="acip-stat">
              <span className="acip-stat-value">31%</span>
              <span className="acip-stat-label">Attrition Reduction</span>
            </div>
          </div>
        </section>

        {/* Tab Content */}
        {tab === "workforce"  && <WorkforceAnalytics />}
        {tab === "upskilling" && <Upskilling />}
        {tab === "talent"     && <TalentIntelligence />}
        {tab === "security"   && <SecuritySection />}
        {tab === "demo"       && <DemoForm />}
      </main>

      {/* Footer */}
      <footer className="acip-footer">
        <div className="acip-container acip-footer-inner">
          <span className="acip-brand-mark acip-brand-mark--sm">ACIP</span>
          <span className="acip-footer-copy">© 2025 AI Career Intelligence Platform. All rights reserved.</span>
        </div>
      </footer>
    </>
  );
}
