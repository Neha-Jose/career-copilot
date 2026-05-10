/**
 * PricingPage - Pricing & Plans
 * Displays pricing tiers for different user types
 */
function PricingPage() {
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
            <h1 className="acip-panel-title">Pricing Plans</h1>
            <p className="acip-panel-sub">Choose the perfect plan for your needs</p>
          </div>

          <div style={{ padding: "40px", textAlign: "center" }}>
            <p style={{ fontSize: "18px", marginBottom: "20px" }}>
              Flexible Pricing Options
            </p>
            <div style={{ display: "flex", gap: "20px", justifyContent: "center", flexWrap: "wrap", marginTop: "30px" }}>
              <div style={{ border: "1px solid #E2DDD6", padding: "20px", borderRadius: "10px", flex: "1", minWidth: "200px" }}>
                <h3>Career</h3>
                <p style={{ fontSize: "24px", fontWeight: "bold", margin: "10px 0" }}>Free</p>
                <p style={{ color: "#7A746C" }}>Perfect for job seekers</p>
                <ul style={{ textAlign: "left", marginTop: "20px" }}>
                  <li>✓ Resume analysis</li>
                  <li>✓ Career quiz</li>
                  <li>✓ Learning roadmap</li>
                </ul>
              </div>

              <div style={{ border: "2px solid #1A3C5E", padding: "20px", borderRadius: "10px", flex: "1", minWidth: "200px" }}>
                <h3>Recruitment</h3>
                <p style={{ fontSize: "24px", fontWeight: "bold", margin: "10px 0" }}>$99/mo</p>
                <p style={{ color: "#7A746C" }}>For recruiters</p>
                <ul style={{ textAlign: "left", marginTop: "20px" }}>
                  <li>✓ Job posting</li>
                  <li>✓ Candidate matching</li>
                  <li>✓ Analytics dashboard</li>
                </ul>
              </div>

              <div style={{ border: "1px solid #E2DDD6", padding: "20px", borderRadius: "10px", flex: "1", minWidth: "200px" }}>
                <h3>Enterprise</h3>
                <p style={{ fontSize: "24px", fontWeight: "bold", margin: "10px 0" }}>Custom</p>
                <p style={{ color: "#7A746C" }}>For large teams</p>
                <ul style={{ textAlign: "left", marginTop: "20px" }}>
                  <li>✓ Team management</li>
                  <li>✓ Bulk analysis</li>
                  <li>✓ Custom reports</li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

export default PricingPage;
