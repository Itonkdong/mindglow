import { Link } from "react-router-dom";

export default function LandingPage() {
  const features = [
    ["🌿", "Daily check-ins", "Reflect on mood, sleep, stress, and habits with a soft daily rhythm."],
    ["📈", "Wellness dashboard", "See gentle trends that make your patterns easier to understand."],
    ["✨", "Daily challenges", "Try small care practices that feel realistic on busy school days."],
    ["💬", "Supportive AI assistant", "Talk through stress with warm, practical, non-clinical support."],
  ];
  return (
    <main className="landing">
      <section className="hero">
        <div>
          <h1>Understand your mood. Reduce stress. Build healthier habits.</h1>
          <p>A youth wellbeing platform for tracking stress, anxiety, sleep, daily habits, and small steps that make hard days easier.</p>
          <Link className="button" to="/register">Start tracking</Link>
        </div>
      </section>
      <section className="feature-grid">
        {features.map(([icon, title, description]) => (
          <article className="card feature-card" key={title}><span className="feature-icon">{icon}</span><h3>{title}</h3><p>{description}</p></article>
        ))}
      </section>
      <p className="disclaimer">This platform provides wellbeing support and self-reflection tools. It is not a replacement for therapy, medical advice, or emergency mental health support.</p>
    </main>
  );
}
