import { useState } from "react";
import "../App.css";

/* ── Mock Data ─────────────────────────────────────────────────────────── */
const MOCK_CANDIDATES = [
  { id: 1, name: "Sarah Chen",        role: "Frontend Developer",   exp: "5 yrs", location: "San Francisco, CA", salary: "$130k",  remote: true,  match: 94, skills: ["React","TypeScript","CSS"],          status: "shortlisted" },
  { id: 2, name: "Michael Rodriguez", role: "Full Stack Developer", exp: "7 yrs", location: "New York, NY",      salary: "$155k",  remote: false, match: 88, skills: ["Node.js","PostgreSQL","React"],      status: "screening"   },
  { id: 3, name: "Emily Watson",      role: "Frontend Developer",   exp: "3 yrs", location: "Austin, TX",        salary: "$105k",  remote: true,  match: 85, skills: ["Vue","JavaScript","Figma"],          status: "interview"   },
  { id: 4, name: "David Park",        role: "DevOps Engineer",      exp: "8 yrs", location: "Seattle, WA",       salary: "$165k",  remote: true,  match: 97, skills: ["Kubernetes","Docker","AWS"],         status: "offer"       },
  { id: 5, name: "Jessica Liu",       role: "Full Stack Developer", exp: "4 yrs", location: "Chicago, IL",       salary: "$120k",  remote: false, match: 82, skills: ["React","MongoDB","Express"],         status: "screening"   },
  { id: 6, name: "Alex Thompson",     role: "DevOps Engineer",      exp: "6 yrs", location: "Remote",            salary: "$145k",  remote: true,  match: 90, skills: ["Terraform","CI/CD","GCP"],          status: "shortlisted" },
];

const MOCK_INTERVIEWS = [
  { candidate: "Emily Watson",      role: "Frontend Developer",   time: "Mon 12 May · 2:00 PM",  interviewer: "Dana West",    status: "confirmed" },
  { candidate: "Sarah Chen",        role: "Frontend Developer",   time: "Tue 13 May · 10:30 AM", interviewer: "James Kim",    status: "confirmed" },
  { candidate: "Michael Rodriguez", role: "Full Stack Developer", time: "Wed 14 May · 3:00 PM",  interviewer: "Priya Nair",   status: "pending"   },
  { candidate: "Alex Thompson",     role: "DevOps Engineer",      time: "Thu 15 May · 11:00 AM", interviewer: "Marcus Held",  status: "confirmed" },
];

const PIPELINE = [
  { stage: "Applied",     count: 54, max: 54 },
  { stage: "Screened",    count: 32, max: 54 },
  { stage: "Shortlisted", count: 18, max: 54 },
  { stage: "Interviewed", count: 12, max: 54 },
  { stage: "Offer Sent",  count: 4,  max: 54 },
];

const ANALYTICS = [
  { label: "Total Applications", value: "54",     sub: "Last 30 days"       },
  { label: "Avg. Time to Hire",  value: "18 d",   sub: "Industry avg: 24 d" },
  { label: "Shortlisted",        value: "18",     sub: "33% of screened"    },
  { label: "Offers Extended",    value: "4",      sub: "22% interview→offer" },
];

const TOP_SOURCES = [
  { name: "LinkedIn",       pct: 42 },
  { name: "Direct Apply",   pct: 28 },
  { name: "Referral",       pct: 18 },
  { name: "Job Boards",     pct: 12 },
];

const FUNNEL = [
  { stage: "Applied → Screened",    rate: 59 },
  { stage: "Screened → Interview",  rate: 37 },
  { stage: "Interview → Offer",     rate: 33 },
  { stage: "Offer → Accepted",      rate: 75 },
];

const AI_RESULTS = [
  { name: "David Park",        match: 97, reason: "Perfect cloud/infra alignment; K8s + AWS certified" },
  { name: "Alex Thompson",     match: 90, reason: "Strong IaC experience; GCP + Terraform overlap"      },
  { name: "Sarah Chen",        match: 84, reason: "React expertise matches stack; slight BE gap"         },
  { name: "Michael Rodriguez", match: 79, reason: "Broad full-stack; less DevOps exposure"              },
];

/* ── Helpers ────────────────────────────────────────────────────────────── */
const statusMeta = {
  shortlisted: { label: "Shortlisted", cls: "rp-badge--green"  },
  screening:   { label: "Screening",   cls: "rp-badge--blue"   },
  interview:   { label: "Interview",   cls: "rp-badge--amber"  },
  offer:       { label: "Offer",       cls: "rp-badge--teal"   },
  confirmed:   { label: "Confirmed",   cls: "rp-badge--green"  },
  pending:     { label: "Pending",     cls: "rp-badge--amber"  },
};

function Badge({ status }) {
  const m = statusMeta[status] || { label: status, cls: "" };
  return <span className={`rp-badge ${m.cls}`}>{m.label}</span>;
}

function MatchDot({ score }) {
  const cls = score >= 90 ? "rp-match--high" : score >= 80 ? "rp-match--mid" : "rp-match--low";
  return <span className={`rp-match ${cls}`}>{score}%</span>;
}

function SectionHeader({ eyebrow, title, sub }) {
  return (
    <div className="acip-panel-header" style={{ paddingBottom: 28 }}>
      {eyebrow && <p className="acip-eyebrow">{eyebrow}</p>}
      <h2 className="acip-panel-title">{title}</h2>
      {sub && <p className="acip-panel-sub">{sub}</p>}
    </div>
  );
}

/* ── Tab: Candidate Search ──────────────────────────────────────────────── */
function CandidateSearch() {
  const [query,      setQuery]      = useState("");
  const [skillF,     setSkillF]     = useState("");
  const [locationF,  setLocationF]  = useState("");
  const [expF,       setExpF]       = useState("");
  const [salaryF,    setSalaryF]    = useState("");

  const filtered = MOCK_CANDIDATES.filter(c => {
    const q = query.toLowerCase();
    return (
      (c.name.toLowerCase().includes(q) || c.role.toLowerCase().includes(q) || c.skills.some(s => s.toLowerCase().includes(q))) &&
      (!skillF    || c.skills.some(s => s.toLowerCase().includes(skillF.toLowerCase()))) &&
      (!locationF || c.location.toLowerCase().includes(locationF.toLowerCase())) &&
      (!expF      || c.exp.startsWith(expF)) &&
      (!salaryF   || true)
    );
  });

  return (
    <div className="acip-panel">
      <SectionHeader
        eyebrow="Talent Acquisition"
        title="Candidate Search"
        sub="Filter by skills, location, experience and salary range to find your next hire."
      />

      {/* Filters */}
      <div className="rp-filters">
        <input
          className="acip-text-input"
          placeholder="Search name, role, skill…"
          value={query}
          onChange={e => setQuery(e.target.value)}
        />
        <input
          className="acip-text-input"
          placeholder="Skill (e.g. React)"
          value={skillF}
          onChange={e => setSkillF(e.target.value)}
        />
        <input
          className="acip-text-input"
          placeholder="Location"
          value={locationF}
          onChange={e => setLocationF(e.target.value)}
        />
        <select
          className="acip-text-input"
          value={expF}
          onChange={e => setExpF(e.target.value)}
        >
          <option value="">Experience</option>
          <option value="1">1+ years</option>
          <option value="3">3+ years</option>
          <option value="5">5+ years</option>
          <option value="7">7+ years</option>
        </select>
        <select className="acip-text-input" value={salaryF} onChange={e => setSalaryF(e.target.value)}>
          <option value="">Salary Range</option>
          <option value="100">$100k+</option>
          <option value="120">$120k+</option>
          <option value="140">$140k+</option>
          <option value="160">$160k+</option>
        </select>
      </div>

      {/* Results */}
      <div className="rp-candidate-list">
        {filtered.length === 0 && (
          <p style={{ color: "var(--ink-3)", fontSize: 14, padding: "0 36px 36px" }}>No candidates match your filters.</p>
        )}
        {filtered.map(c => (
          <div key={c.id} className="rp-candidate-row">
            <div className="rp-candidate-avatar">{c.name.split(" ").map(w => w[0]).join("")}</div>
            <div className="rp-candidate-info">
              <div className="rp-candidate-top">
                <span className="rp-candidate-name">{c.name}</span>
                <Badge status={c.status} />
              </div>
              <p className="rp-candidate-role">{c.role} · {c.exp} · {c.location}</p>
              <div className="rp-candidate-meta">
                <div className="acip-role-skills" style={{ margin: 0 }}>
                  {c.skills.map(s => <span key={s} className="acip-skill-tag">{s}</span>)}
                  {c.remote && <span className="rp-remote-tag">Remote</span>}
                </div>
                <span className="rp-salary">{c.salary}</span>
              </div>
            </div>
            <div className="rp-candidate-score">
              <MatchDot score={c.match} />
              <span className="rp-match-label">match</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Tab: Resume Screening ──────────────────────────────────────────────── */
function ResumeScreening() {
  const [fileName, setFileName] = useState("");
  const [ranked,   setRanked]   = useState(false);

  const handleFile = e => {
    const f = e.target.files[0];
    setFileName(f ? `${f.name} + 5 more` : "");
    setRanked(false);
  };

  return (
    <div className="acip-panel">
      <SectionHeader
        eyebrow="Automated Screening"
        title="Resume Screening"
        sub="Upload resumes in bulk. ACIP ranks them against your job criteria and surfaces top picks."
      />

      <div className="rp-body">
        {/* Upload */}
        <label className="acip-file-label" style={{ display: "block" }}>
          <input type="file" multiple accept=".pdf,.doc,.docx" onChange={handleFile} className="acip-file-input" />
          <div className="acip-file-box rp-file-box-lg">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
              <polyline points="14 2 14 8 20 8"/>
              <line x1="12" y1="18" x2="12" y2="12"/>
              <line x1="9" y1="15" x2="15" y2="15"/>
            </svg>
            <div>
              <p style={{ fontWeight: 500, color: "var(--ink-2)", fontSize: 14 }}>
                {fileName || "Drop resumes here or click to upload"}
              </p>
              <p style={{ fontSize: 12, color: "var(--ink-4)", marginTop: 4 }}>Supports PDF, DOC, DOCX · Batch upload enabled</p>
            </div>
          </div>
        </label>

        <div className="acip-analyzer-footer" style={{ marginTop: 20 }}>
          <button className="acip-btn-analyze" onClick={() => setRanked(true)}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
            </svg>
            Run ATS Ranking
          </button>
          <p className="acip-analyzer-note">Resumes are processed securely and not stored.</p>
        </div>

        {/* ATS Results */}
        {ranked && (
          <div className="rp-ats-results">
            <p className="acip-eyebrow" style={{ marginBottom: 16 }}>Shortlist Recommendations</p>
            {MOCK_CANDIDATES.slice(0, 4).map((c, i) => (
              <div key={c.id} className="rp-ats-row">
                <span className="rp-rank">#{i + 1}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <span style={{ fontWeight: 600, color: "var(--ink)", fontSize: 14 }}>{c.name}</span>
                    <span style={{ fontSize: 12, color: "var(--ink-3)" }}>{c.role}</span>
                  </div>
                  <div className="acip-progress-bar" style={{ marginTop: 8, marginBottom: 0 }}>
                    <div className="acip-progress-fill" style={{ width: `${c.match}%`, background: c.match >= 90 ? "var(--success)" : "var(--accent)" }} />
                  </div>
                </div>
                <MatchDot score={c.match} />
                <Badge status={c.match >= 90 ? "shortlisted" : "screening"} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

/* ── Tab: AI Matching ───────────────────────────────────────────────────── */
function AIMatching() {
  const [jd,      setJd]      = useState("");
  const [matched, setMatched] = useState(false);

  return (
    <div className="acip-panel">
      <SectionHeader
        eyebrow="Powered by ACIP Intelligence"
        title="AI Candidate Matching"
        sub="Paste a job description. ACIP scores every candidate in your pipeline against it instantly."
      />

      <div className="rp-body">
        <label style={{ display: "block" }}>
          <p className="acip-meta-label" style={{ marginBottom: 8 }}>Job Description</p>
          <textarea
            className="acip-text-input rp-textarea"
            placeholder="Paste the full job description here…"
            value={jd}
            onChange={e => setJd(e.target.value)}
            rows={6}
          />
        </label>

        <div className="acip-analyzer-footer" style={{ marginTop: 20 }}>
          <button className="acip-btn-analyze" onClick={() => setMatched(true)} disabled={!jd.trim()}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
            </svg>
            Match Candidates
          </button>
        </div>

        {matched && (
          <div className="rp-ats-results">
            <p className="acip-eyebrow" style={{ marginBottom: 16 }}>Ranked Matches</p>
            {AI_RESULTS.map((r, i) => (
              <div key={r.name} className="rp-ai-row">
                <div className="rp-ai-left">
                  <div className="rp-candidate-avatar rp-avatar-sm">{r.name.split(" ").map(w=>w[0]).join("")}</div>
                  <div>
                    <p style={{ fontWeight: 600, fontSize: 14, color: "var(--ink)" }}>#{i+1} · {r.name}</p>
                    <p style={{ fontSize: 13, color: "var(--ink-3)", marginTop: 2 }}>{r.reason}</p>
                  </div>
                </div>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 6, flexShrink: 0 }}>
                  <MatchDot score={r.match} />
                  <button className="rp-action-btn">Shortlist</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

/* ── Tab: Interviews ────────────────────────────────────────────────────── */
function Interviews() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      {/* Schedule */}
      <div className="acip-panel">
        <SectionHeader
          eyebrow="Interview Scheduling"
          title="Upcoming Interviews"
          sub="Manage your interview pipeline and track candidate progress."
        />
        <div className="rp-body">
          <div className="rp-interview-grid">
            {MOCK_INTERVIEWS.map((iv, i) => (
              <div key={i} className="rp-interview-card">
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
                  <div className="rp-candidate-avatar rp-avatar-sm">{iv.candidate.split(" ").map(w=>w[0]).join("")}</div>
                  <Badge status={iv.status} />
                </div>
                <p style={{ fontWeight: 600, fontSize: 15, color: "var(--ink)", marginBottom: 2 }}>{iv.candidate}</p>
                <p style={{ fontSize: 13, color: "var(--ink-3)", marginBottom: 12 }}>{iv.role}</p>
                <div className="rp-interview-meta">
                  <div>
                    <p className="acip-meta-label">Time</p>
                    <p className="acip-meta-value">{iv.time}</p>
                  </div>
                  <div>
                    <p className="acip-meta-label">Interviewer</p>
                    <p className="acip-meta-value">{iv.interviewer}</p>
                  </div>
                </div>
                <button className="acip-btn-select" style={{ marginTop: 16, padding: "10px 0" }}>
                  View Details
                </button>
              </div>
            ))}
          </div>

          <div className="acip-analyzer-footer" style={{ marginTop: 24 }}>
            <button className="acip-btn-analyze">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                <line x1="16" y1="2" x2="16" y2="6"/>
                <line x1="8" y1="2" x2="8" y2="6"/>
                <line x1="3" y1="10" x2="21" y2="10"/>
              </svg>
              Schedule New Interview
            </button>
          </div>
        </div>
      </div>

      {/* Candidate Pipeline */}
      <div className="acip-panel">
        <SectionHeader title="Candidate Pipeline" sub="Live funnel across all active job openings." />
        <div className="rp-body">
          {PIPELINE.map((p, i) => (
            <div key={i} style={{ marginBottom: 18 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                <span style={{ fontSize: 13, fontWeight: 500, color: "var(--ink-2)" }}>{p.stage}</span>
                <span style={{ fontSize: 13, fontWeight: 600, color: "var(--ink)" }}>{p.count}</span>
              </div>
              <div className="acip-progress-bar" style={{ height: 6, marginBottom: 0 }}>
                <div
                  className="acip-progress-fill"
                  style={{ width: `${(p.count / p.max) * 100}%`, background: i === 0 ? "var(--accent)" : i === 4 ? "var(--success)" : "var(--accent)" }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── Tab: Analytics ─────────────────────────────────────────────────────── */
function Analytics() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      {/* KPI Cards */}
      <div className="rp-kpi-grid">
        {ANALYTICS.map((a, i) => (
          <div key={i} className="acip-score-card rp-kpi-card">
            <p className="acip-card-label" style={{ marginBottom: 6 }}>{a.label}</p>
            <p className="acip-score-value">{a.value}</p>
            <p style={{ fontSize: 12, color: "var(--ink-3)", marginTop: 6 }}>{a.sub}</p>
          </div>
        ))}
      </div>

      <div className="rp-analytics-row">
        {/* Funnel Conversion */}
        <div className="acip-panel rp-analytics-half">
          <SectionHeader eyebrow="Conversion" title="Hiring Funnel" sub="Stage-by-stage conversion rates" />
          <div className="rp-body">
            {FUNNEL.map((f, i) => (
              <div key={i} style={{ marginBottom: 20 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                  <span style={{ fontSize: 13, color: "var(--ink-2)" }}>{f.stage}</span>
                  <span style={{ fontSize: 13, fontWeight: 600, color: "var(--ink)" }}>{f.rate}%</span>
                </div>
                <div className="acip-progress-bar" style={{ height: 5, marginBottom: 0 }}>
                  <div className="acip-progress-fill" style={{ width: `${f.rate}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Sources */}
        <div className="acip-panel rp-analytics-half">
          <SectionHeader eyebrow="Attribution" title="Top Sources" sub="Where your best candidates come from" />
          <div className="rp-body">
            {TOP_SOURCES.map((s, i) => (
              <div key={i} style={{ marginBottom: 20 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                  <span style={{ fontSize: 13, color: "var(--ink-2)" }}>{s.name}</span>
                  <span style={{ fontSize: 13, fontWeight: 600, color: "var(--ink)" }}>{s.pct}%</span>
                </div>
                <div className="acip-progress-bar" style={{ height: 5, marginBottom: 0 }}>
                  <div className="acip-progress-fill" style={{ width: `${s.pct}%`, background: i % 2 === 0 ? "var(--accent)" : "var(--accent-2)" }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Page ───────────────────────────────────────────────────────────────── */
const TABS = [
  { id: "search",    label: "Candidate Search"  },
  { id: "screening", label: "Resume Screening"  },
  { id: "matching",  label: "AI Matching"       },
  { id: "interviews",label: "Interviews"        },
  { id: "analytics", label: "Analytics"         },
];

export default function RecruitmentPage() {
  const [tab, setTab] = useState("search");

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
            <button className="acip-btn-primary">Sign In</button>
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
            <p className="acip-eyebrow">Recruiter Intelligence</p>
            <h1 className="acip-hero-title">Hire Top Talent<br />Faster with AI</h1>
            <p className="acip-hero-sub">
              Search, screen, and match candidates with precision. ACIP's AI-powered recruitment
              engine cuts time-to-hire by 40% while surfacing candidates human filters miss.
            </p>
          </div>
          <div className="acip-hero-stats">
            <div className="acip-stat">
              <span className="acip-stat-value">40%</span>
              <span className="acip-stat-label">Faster Time-to-Hire</span>
            </div>
            <div className="acip-stat-divider" />
            <div className="acip-stat">
              <span className="acip-stat-value">97%</span>
              <span className="acip-stat-label">Match Accuracy</span>
            </div>
          </div>
        </section>

        {/* Tab Content */}
        {tab === "search"     && <CandidateSearch />}
        {tab === "screening"  && <ResumeScreening />}
        {tab === "matching"   && <AIMatching />}
        {tab === "interviews" && <Interviews />}
        {tab === "analytics"  && <Analytics />}
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
