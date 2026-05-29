export default function AboutPage() {
  return (
    <main className="page info-page">
      <section className="info-hero">
        <div>
          <span className="eyebrow">About MindGlow</span>
          <h1>Built for calmer self-awareness.</h1>
          <p>MindGlow is a youth wellbeing platform that helps young people understand stress, anxiety, sleep, school pressure, and daily habits through simple reflection and supportive guidance.</p>
        </div>
        <aside className="info-summary">
          <strong>Our purpose</strong>
          <p>Help students notice patterns, build healthier routines, and feel supported without making the experience clinical or judgmental.</p>
        </aside>
      </section>

      <section className="info-content-grid">
        <article className="info-content-card">
          <h2>What MindGlow does</h2>
          <p>Users can complete daily check-ins, review dashboard trends, receive small wellness challenges, read personalized recommendations, and use a supportive assistant for reflection.</p>
        </article>
        <article className="info-content-card">
          <h2>Who it is for</h2>
          <p>The app is designed primarily for teenagers and students who want a private, approachable way to understand mood, pressure, sleep, and habits over time.</p>
        </article>
        <article className="info-content-card">
          <h2>What it is not</h2>
          <p>MindGlow is not a medical product, diagnostic tool, therapy service, or emergency support system. It is a wellbeing and self-reflection prototype.</p>
        </article>
      </section>
    </main>
  );
}
