import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <main className="landing">
      <section className="hero">
        <div className="hero-copy">
          <span className="eyebrow">Youth wellbeing</span>
          <h1>A calmer way to understand your day.</h1>
          <p>MindGlow helps young people track mood, stress, sleep, and everyday habits, then turns those patterns into small, practical steps.</p>
          <div className="hero-actions">
            <Link className="button" to="/register">Start tracking</Link>
            <Link className="button outline" to="/about">Learn about MindGlow</Link>
          </div>
        </div>
        <aside className="hero-preview" aria-label="MindGlow wellness preview">
          <div className="preview-card main">
            <span>Today’s wellbeing</span>
            <strong>72</strong>
            <p>Balanced day</p>
          </div>
          <div className="preview-list">
            <div><span>Mood</span><b><i style={{ width: "72%" }} /></b></div>
            <div><span>Stress</span><b><i style={{ width: "48%" }} /></b></div>
            <div><span>Sleep</span><b><i style={{ width: "68%" }} /></b></div>
          </div>
          <p className="preview-note"><span>Daily guidance</span> Small reflections become clearer patterns and kinder next steps.</p>
        </aside>
      </section>
    </main>
  );
}
