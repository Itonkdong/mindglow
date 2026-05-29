import { Link } from "react-router-dom";

export default function LandingPage() {
  const features = [
    ["Daily check-ins", "Reflect on mood, sleep, stress, and habits with a soft daily rhythm."],
    ["Wellness dashboard", "See gentle trends that make your patterns easier to understand."],
    ["Daily challenges", "Try small care practices that feel realistic on busy school days."],
    ["Supportive assistant", "Talk through stress with warm, practical, non-clinical support."],
  ];
  return (
    <main className="landing">
      <section className="hero">
        <div className="hero-copy">
          <span className="eyebrow">Youth wellbeing</span>
          <h1>A calmer way to understand your day.</h1>
          <p>MindGlow helps young people track mood, stress, sleep, and everyday habits, then turns those patterns into small, practical steps.</p>
          <Link className="button" to="/register">Start tracking</Link>
        </div>
        <aside className="hero-preview" aria-label="MindGlow wellness preview">
          <div className="preview-card main">
            <span>Today’s wellbeing</span>
            <strong>72</strong>
            <p>Balanced day</p>
          </div>
          <div className="preview-list">
            <div><span>Mood</span><i style={{ width: "72%" }} /></div>
            <div><span>Stress</span><i style={{ width: "48%" }} /></div>
            <div><span>Sleep</span><i style={{ width: "68%" }} /></div>
          </div>
          <p className="preview-note">Small reflections. Clearer patterns. Kinder next steps.</p>
        </aside>
      </section>
      <section className="feature-grid">
        {features.map(([title, description]) => (
          <article className="card feature-card" key={title}><h3>{title}</h3><p>{description}</p></article>
        ))}
      </section>
    </main>
  );
}
