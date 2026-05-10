import { useState, useEffect } from "react";
import API from "../services/api";
import "../App.css";

/**
 * CareerPage - Job Seeker / Career Development
 * Contains: Resume Upload, Dream Roles, Career Quiz, Dashboard
 */
function CareerPage() {
  const [mainTab, setMainTab] = useState("upload");
  const [resume, setResume] = useState(null);
  const [selectedRole, setSelectedRole] = useState("");
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [completedTasks, setCompletedTasks] = useState({});
  const [fileName, setFileName] = useState("");
  const [roles, setRoles] = useState([]);
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [quizResponses, setQuizResponses] = useState({});
  const [quizLoading, setQuizLoading] = useState(false);

  useEffect(() => {
    fetchRoles();
    fetchQuiz();
  }, []);

  const fetchRoles = async () => {
    try {
      const response = await API.get("/roles");
      setRoles(response.data.roles || []);
    } catch (err) {
      console.error("Error fetching roles:", err);
    }
  };

  const fetchQuiz = async () => {
    try {
      const response = await API.get("/quiz");
      setQuizQuestions(response.data.questions || []);
    } catch (err) {
      console.error("Error fetching quiz:", err);
    }
  };

  const toggleTask = (taskId) => {
    setCompletedTasks((prev) => ({ ...prev, [taskId]: !prev[taskId] }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setResume(file);
    setFileName(file ? file.name : "");
  };

  const handleSubmit = async () => {
    if (!resume || !selectedRole) {
      alert("Upload resume and select role");
      return;
    }

    setError(null);
    setData(null);
    setCompletedTasks({});

    const formData = new FormData();
    formData.append("resume", resume);
    formData.append("role", selectedRole);
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
        setMainTab("dashboard");
      }
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.error || err.message || "Backend connection failed"
      );
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  const handleQuizSubmit = async () => {
    if (Object.keys(quizResponses).length < quizQuestions.length) {
      alert("Please answer all questions");
      return;
    }

    setQuizLoading(true);
    try {
      const response = await API.post("/quiz/submit", quizResponses);
      if (response.data?.recommendations) {
        alert("Quiz submitted! Check the recommendations.");
        setQuizResponses({});
      }
    } catch (err) {
      console.error("Quiz error:", err);
      alert("Error submitting quiz");
    } finally {
      setQuizLoading(false);
    }
  };

  const mainTabs = [
    { id: "upload", label: "Upload Resume" },
    { id: "dream-role", label: "Dream Role" },
    { id: "career-quiz", label: "Career Quiz" },
    { id: "dashboard", label: "Dashboard" },
  ];

  const completedCount = Object.values(completedTasks).filter(Boolean).length;

  return (
    <>
      {/* TOP BAR */}
      <header className="acip-topbar">
        <div className="acip-container acip-topbar-inner">
          <div className="acip-brand">
            <span className="acip-brand-mark">ACIP</span>
            <span className="acip-brand-divider" />
            <span className="acip-brand-sub">AI Career Intelligence Platform</span>
          </div>
          <nav className="acip-nav">
            <a href="/career" className="acip-nav-link">Career</a>
            <a href="/recruitment" className="acip-nav-link">Recruitment</a>
            <a href="/enterprise" className="acip-nav-link">Enterprise</a>
            <a href="/pricing" className="acip-nav-link">Pricing</a>
            <button className="acip-btn-primary">Sign In</button>
          </nav>
        </div>
      </header>

      {/* MAIN TAB STRIP */}
      <div className="acip-tabstrip">
        <div className="acip-container acip-tabstrip-inner">
          {mainTabs.map((tab) => (
            <button
              key={tab.id}
              className={`acip-tab ${mainTab === tab.id ? "acip-tab--active" : ""}`}
              onClick={() => setMainTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <main className="acip-container acip-main">
        {/* UPLOAD RESUME TAB */}
        {mainTab === "upload" && (
          <>
            <section className="acip-hero">
              <div className="acip-hero-content">
                <p className="acip-eyebrow">Career Intelligence</p>
                <h1 className="acip-hero-title">Build Your Career Strategy</h1>
                <p className="acip-hero-sub">
                  Upload your resume to receive ATS scoring, skill gap analysis, personalized
                  learning resources, and a detailed roadmap tailored to your target role.
                </p>
              </div>
              <div className="acip-hero-stats">
                <div className="acip-stat">
                  <span className="acip-stat-value">94%</span>
                  <span className="acip-stat-label">ATS Match Accuracy</span>
                </div>
                <div className="acip-stat-divider" />
                <div className="acip-stat">
                  <span className="acip-stat-value">3×</span>
                  <span className="acip-stat-label">Interview Rate Lift</span>
                </div>
              </div>
            </section>

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
                  <select
                    value={selectedRole}
                    onChange={(e) => setSelectedRole(e.target.value)}
                    className="acip-text-input"
                  >
                    <option value="">Select Target Role</option>
                    {roles.map((role) => (
                      <option key={role.value} value={role.value}>
                        {role.name}
                      </option>
                    ))}
                  </select>
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
                        <circle cx="11" cy="11" r="8"/>
                        <path d="m21 21-4.35-4.35"/>
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
          </>
        )}

        {/* DREAM ROLE TAB */}
        {mainTab === "dream-role" && (
          <section className="acip-panel">
            <div className="acip-panel-header">
              <h2 className="acip-panel-title">Dream Role Selection</h2>
              <p className="acip-panel-sub">Choose your target role and we'll create a personalized learning path</p>
            </div>
            <div className="acip-roles-grid">
              {roles.map((role) => (
                <div key={role.value} className="acip-role-card">
                  <h3 className="acip-role-name">{role.name}</h3>
                  <p className="acip-role-desc">{role.description}</p>
                  <div className="acip-role-skills">
                    {role.core_skills.map((skill) => (
                      <span key={skill} className="acip-skill-tag">{skill}</span>
                    ))}
                  </div>
                  <button
                    onClick={() => {
                      setSelectedRole(role.value);
                      setMainTab("upload");
                    }}
                    className="acip-btn-select"
                  >
                    Select Role
                  </button>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* CAREER QUIZ TAB */}
        {mainTab === "career-quiz" && (
          <section className="acip-panel">
            <div className="acip-panel-header">
              <h2 className="acip-panel-title">Career Assessment Quiz</h2>
              <p className="acip-panel-sub">Help us understand your learning preferences and goals</p>
            </div>
            <div className="acip-quiz-container">
              {quizQuestions.map((question) => (
                <div key={question.id} className="acip-question">
                  <h3 className="acip-question-title">{question.id}. {question.question}</h3>
                  <div className="acip-options">
                    {question.options.map((option) => (
                      <label key={option.value} className="acip-option">
                        <input
                          type={question.type === "checkbox" ? "checkbox" : "radio"}
                          name={`question-${question.id}`}
                          value={option.value}
                          checked={
                            question.type === "checkbox"
                              ? (quizResponses[question.id] || []).includes(option.value)
                              : quizResponses[question.id] === option.value
                          }
                          onChange={(e) => {
                            if (question.type === "checkbox") {
                              const currentValues = quizResponses[question.id] || [];
                              setQuizResponses((prev) => ({
                                ...prev,
                                [question.id]: e.target.checked
                                  ? [...currentValues, option.value]
                                  : currentValues.filter((v) => v !== option.value),
                              }));
                            } else {
                              setQuizResponses((prev) => ({
                                ...prev,
                                [question.id]: option.value,
                              }));
                            }
                          }}
                        />
                        <span className="acip-option-label">{option.label}</span>
                      </label>
                    ))}
                  </div>
                </div>
              ))}
              <button
                onClick={handleQuizSubmit}
                disabled={quizLoading}
                className="acip-btn-analyze"
              >
                {quizLoading ? "Submitting..." : "Submit Quiz"}
              </button>
            </div>
          </section>
        )}

        {/* DASHBOARD TAB */}
        {mainTab === "dashboard" && data && (
          <section className="acip-panel">
            <div className="acip-panel-header">
              <h2 className="acip-panel-title">Your Career Dashboard</h2>
              <p className="acip-panel-sub">Personalized insights and learning roadmap</p>
            </div>

            <div className="acip-dashboard">
              <div className="acip-dashboard-grid">
                <div className="acip-score-card">
                  <span className="acip-score-value">{data.score}</span>
                  <span className="acip-score-label">ATS Score</span>
                </div>
                <div className="acip-score-card">
                  <span className="acip-score-value">{data.skills?.length || 0}</span>
                  <span className="acip-score-label">Skills Detected</span>
                </div>
                <div className="acip-score-card">
                  <span className="acip-score-value">
                    {(data.gaps?.critical?.length || 0) +
                      (data.gaps?.tools?.length || 0) +
                      (data.gaps?.support?.length || 0)}
                  </span>
                  <span className="acip-score-label">Skill Gaps</span>
                </div>
              </div>

              {data.roadmap && (
                <div className="acip-roadmap">
                  {Object.entries(data.roadmap).map(([phaseKey, phase]) => (
                    <div key={phaseKey} className="acip-roadmap-phase">
                      <h3>{phase.title}</h3>
                      {phase.skills.map((skill) => (
                        <div key={skill.name} className="acip-roadmap-skill">
                          <input
                            type="checkbox"
                            id={skill.name}
                            checked={!!completedTasks[skill.name]}
                            onChange={() => toggleTask(skill.name)}
                          />
                          <label htmlFor={skill.name} className="acip-roadmap-label">
                            <span className="acip-skill-name">{skill.name}</span>
                            <span className="acip-skill-time">{skill.time}</span>
                            <span className="acip-skill-difficulty">{skill.difficulty}</span>
                          </label>
                          {skill.resources && (
                            <div className="acip-skill-resources">
                              {skill.resources.map((resource, idx) => (
                                <a
                                  key={idx}
                                  href={resource[1]}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="acip-resource-link"
                                >
                                  {resource[0]}
                                </a>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>
        )}

        {mainTab === "dashboard" && !data && (
          <section className="acip-panel">
            <div className="acip-panel-header">
              <h2 className="acip-panel-title">Dashboard</h2>
              <p className="acip-panel-sub">Upload and analyze your resume to see your personalized dashboard</p>
            </div>
          </section>
        )}
      </main>
    </>
  );
}

export default CareerPage;
