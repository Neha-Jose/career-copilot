/**
 * EnterprisePage - Enterprise / Team Management
 * Features: Team dashboard, bulk analysis, learning programs, reporting
 */
function EnterprisePage() {
  return (
    <>
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

      <main className="acip-container acip-main">
        <section className="acip-panel">
          <div className="acip-panel-header">
            <h1 className="acip-panel-title">Enterprise Platform</h1>
            <p className="acip-panel-sub">Manage and develop your team's career growth at scale</p>
          </div>

          <div style={{ padding: "40px", textAlign: "center" }}>
            <p style={{ fontSize: "18px", marginBottom: "20px" }}>
              Welcome to the Enterprise Platform
            </p>
            <p style={{ color: "#7A746C", marginBottom: "30px" }}>
              Features coming soon:
            </p>
            <ul style={{ display: "flex", gap: "20px", justifyContent: "center", flexWrap: "wrap" }}>
              <li>🎯 Team Dashboard</li>
              <li>📤 Bulk Analysis</li>
              <li>📚 Learning Programs</li>
              <li>📊 Reporting & Analytics</li>
            </ul>
          </div>
        </section>
      </main>
    </>
  );
}

export default EnterprisePage;
