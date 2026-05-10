import { useNavigate } from "react-router-dom";

/**
 * NotFound - 404 Page Not Found
 */
function NotFound() {
  const navigate = useNavigate();

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
          <div className="acip-panel-header" style={{ textAlign: "center" }}>
            <h1 className="acip-panel-title" style={{ fontSize: "64px", marginBottom: "10px" }}>
              404
            </h1>
            <p className="acip-panel-sub" style={{ fontSize: "24px", marginBottom: "30px" }}>
              Page Not Found
            </p>
          </div>

          <div style={{ padding: "40px", textAlign: "center" }}>
            <p style={{ fontSize: "16px", color: "#7A746C", marginBottom: "30px" }}>
              Sorry, the page you're looking for doesn't exist.
            </p>
            <button
              onClick={() => navigate("/career")}
              className="acip-btn-primary"
              style={{ padding: "12px 32px", fontSize: "16px" }}
            >
              Go to Career Page
            </button>
          </div>
        </section>
      </main>
    </>
  );
}

export default NotFound;
