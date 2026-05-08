import { useState } from "react";
import API from "./services/api";
import "./App.css";

function App() {
  const [resume, setResume] = useState(null);
  const [role, setRole] = useState("");
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("jobseekers");
  const [completedTasks, setCompletedTasks] = useState({});
  const [fileName, setFileName] = useState("");

  const toggleTask = (taskId) => {
    setCompletedTasks((prev) => ({ ...prev, [taskId]: !prev[taskId] }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setResume(file);
    setFileName(file ? file.name : "");
  };

  const handleSubmit = async () => {
    if (!resume || !role) {
      alert("Upload resume and enter role");
      return;
    }

    setError(null);
    setData(null);
    setCompletedTasks({});

    const formData = new FormData();
    formData.append("resume", resume);
    formData.append("role", role);
    try {
      setLoading(true);
      const response = await API.post("/analyze", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.data?.error) {
        setError(response.data.error);
        setData(null);
      } else {
        setData(response.data);
      }
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.error ||
          err.message ||
          "Backend connection failed"
      );
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  const tabs = [
    { id: "jobseekers", label: "Job Seekers" },
    { id: "enterprise", label: "Enterprise" },
    { id: "recruiters", label: "Recruiters" },
  ];

  const tabContent = {
    jobseekers: {
      eyebrow: "Career Intelligence",
      title: "Build Your Career Strategy",
      subtitle:
        "Upload your resume to receive ATS scoring, skill gap analysis, personalised learning resources, and a detailed roadmap tailored to your target role.",
      stat1: { value: "94%", label: "ATS Match Accuracy" },
      stat2: { value: "3×", label: "Interview Rate Lift" },
    },
    enterprise: {
      eyebrow: "Workforce Development",
      title: "Upskill Your Workforce",
      subtitle:
        "Analyse workforce skill gaps, identify learning pathways, and build strategic development programmes across teams and departments.",
      stat1: { value: "60%", label: "Faster Onboarding" },
      stat2: { value: "40%", label: "Retention Improvement" },
    },
    recruiters: {
      eyebrow: "Talent Acquisition",
      title: "Find Better Candidates Faster",
      subtitle:
        "Evaluate candidate profiles, identify strengths and weaknesses, and streamline hiring decisions using AI-powered insights.",
      stat1: { value: "5×", label: "Screening Speed" },
      stat2: { value: "82%", label: "Placement Success" },
    },
  };

  const content = tabContent[activeTab];
  const completedCount = Object.values(completedTasks).filter(Boolean).length;

  return (
    <div className="acip-root">
      {/* TOP BAR */}
      <header className="acip-topbar">
        <div className="acip-container acip-topbar-inner">
          <div className="acip-brand">
            <span className="acip-brand-mark">ACIP</span>
            <span className="acip-brand-divider" />
            <span className="acip-brand-sub">AI Career Intelligence Platform</span>
          </div>
          <nav className="acip-nav">
            <a href="#" className="acip-nav-link">Features</a>
            <a href="#" className="acip-nav-link">Pricing</a>
            <a href="#" className="acip-nav-link">Docs</a>
            <button className="acip-btn-primary">Request Demo</button>
          </nav>
        </div>
      </header>

      {/* TAB STRIP */}
      <div className="acip-tabstrip">
        <div className="acip-container acip-tabstrip-inner">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`acip-tab ${activeTab === tab.id ? "acip-tab--active" : ""}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <main className="acip-container acip-main">

        {/* HERO SECTION */}
        <section className="acip-hero">
          <div className="acip-hero-content">
            <p className="acip-eyebrow">{content.eyebrow}</p>
            <h1 className="acip-hero-title">{content.title}</h1>
            <p className="acip-hero-sub">{content.subtitle}</p>
          </div>
          <div className="acip-hero-stats">
            <div className="acip-stat">
              <span className="acip-stat-value">{content.stat1.value}</span>
              <span className="acip-stat-label">{content.stat1.label}</span>
            </div>
            <div className="acip-stat-divider" />
            <div className="acip-stat">
              <span className="acip-stat-value">{content.stat2.value}</span>
              <span className="acip-stat-label">{content.stat2.label}</span>
            </div>
          </div>
        </section>

        {/* ANALYZER PANEL */}
        <section className="acip-panel acip-analyzer">
          <div className="acip-panel-header">
            <h2 className="acip-panel-title">Resume Analysis</h2>
            <p className="acip-panel-sub">Upload a PDF or DOCX and specify your target role to begin.</p>
          </div>
          <div className="acip-analyzer-fields">
            <label className="acip-file-label">
              <input
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={handleFileChange}
                className="acip-file-input"
              />
              <div className="acip-file-box">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                  <polyline points="14 2 14 8 20 8"/>
                  <line x1="12" y1="18" x2="12" y2="12"/>
                  <line x1="9" y1="15" x2="15" y2="15"/>
                </svg>
                <span>{fileName || "Upload Resume (PDF / DOCX)"}</span>
              </div>
            </label>
            <div className="acip-input-group">
              <input
                type="text"
                placeholder="Target Role — e.g. Senior Product Manager"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="acip-text-input"
              />
            </div>
          </div>
          <div className="acip-analyzer-footer">
            <button
              onClick={handleSubmit}
              disabled={loading}
              className={`acip-btn-analyze ${loading ? "acip-btn-analyze--loading" : ""}`}
            >
              {loading ? (
                <>
                  <span className="acip-spinner" />
                  Analysing…
                </>
              ) : (
                <>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
                  </svg>
                  Analyse Resume
                </>
              )}
            </button>
            <p className="acip-analyzer-note">Your data is processed securely and never stored.</p>
          </div>
        </section>

        {error && (
          <section className="acip-panel acip-error-panel">
            <div className="acip-panel-header">
              <h2 className="acip-panel-title">Error</h2>
              <p className="acip-panel-sub">{error}</p>
            </div>
          </section>
        )}

        {/* ROADMAP */}
        {data && data.roadmap && (
          <section className="acip-panel acip-roadmap">
            <div className="acip-roadmap-header">
              <div>
                <h2 className="acip-panel-title">Career Roadmap</h2>
                <p className="acip-panel-sub">Track milestones and mark skills as completed.</p>
              </div>
              <div className="acip-progress-badge">
                <span className="acip-progress-count">{completedCount}</span>
                <span className="acip-progress-label">milestones complete</span>
              </div>
            </div>

            <div className="acip-phases">
              {data.roadmap?.map((phase, phaseIndex) => (
                <div key={phaseIndex} className="acip-phase">
                  <div className="acip-phase-header">
                    <span className="acip-phase-num">Phase {phaseIndex + 1}</span>
                    <h3 className="acip-phase-title">{phase.title}</h3>
                  </div>

                  <div className="acip-items">
                    {phase.items?.map((item, itemIndex) => {
                      const taskId = `${phaseIndex}-${itemIndex}`;
                      const completed = completedTasks[taskId];
                      return (
                        <div key={itemIndex} className={`acip-item ${completed ? "acip-item--done" : ""}`}>
                          <div className="acip-item-top">
                            <div className="acip-item-left">
                              <button
                                onClick={() => toggleTask(taskId)}
                                className={`acip-check ${completed ? "acip-check--done" : ""}`}
                                aria-label="Toggle completion"
                              >
                                {completed && (
                                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                                    <polyline points="20 6 9 17 4 12"/>
                                  </svg>
                                )}
                              </button>
                              <div>
                                <h4 className="acip-item-skill">{item.skill}</h4>
                                <p className="acip-item-time">Timeline: {item.time}</p>
                              </div>
                            </div>
                            <span className={`acip-status-badge ${completed ? "acip-status-badge--done" : ""}`}>
                              {completed ? "Completed" : "In Progress"}
                            </span>
                          </div>

                          <div className="acip-progress-bar">
                            <div className={`acip-progress-fill ${completed ? "acip-progress-fill--done" : ""}`} />
                          </div>

                          <div className="acip-item-meta">
                            <div className="acip-meta-block">
                              <p className="acip-meta-label">Suggested Project</p>
                              <p className="acip-meta-value">{item.project}</p>
                            </div>
                            <div className="acip-meta-block">
                              <p className="acip-meta-label">Difficulty</p>
                              <p className="acip-meta-value">{item.difficulty}</p>
                            </div>
                          </div>

                          {item.resources?.length > 0 && (
                            <div className="acip-resources">
                              <p className="acip-meta-label">Learning Resources</p>
                              <div className="acip-resource-grid">
                                {item.resources.map((resource, ri) => (
                                  <a
                                    key={ri}
                                    href={resource[1]}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="acip-resource-card"
                                  >
                                    <span className="acip-resource-name">{resource[0]}</span>
                                    <span className="acip-resource-cta">
                                      Open →
                                    </span>
                                  </a>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>

      <footer className="acip-footer">
        <div className="acip-container acip-footer-inner">
          <span className="acip-brand-mark acip-brand-mark--sm">ACIP</span>
          <span className="acip-footer-copy">© 2025 AI Career Intelligence Platform. All rights reserved.</span>
        </div>
      </footer>
    </div>
  );
}

export default App;
