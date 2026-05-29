import { Link } from "react-router-dom";

export default function LandingPage() {
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
        {["Daily check-ins", "Wellness dashboard", "Daily challenges", "Supportive AI assistant"].map((title) => (
          <article className="card" key={title}><h3>{title}</h3><p>Simple tools for self-reflection, balance, and emotional awareness.</p></article>
        ))}
      </section>
      <p className="disclaimer">This platform provides wellbeing support and self-reflection tools. It is not a replacement for therapy, medical advice, or emergency mental health support.</p>
    </main>
  );
}
