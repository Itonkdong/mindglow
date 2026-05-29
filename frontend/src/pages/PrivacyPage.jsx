export default function PrivacyPage() {
  return (
    <main className="page info-page">
      <section className="info-hero">
        <div>
          <span className="eyebrow">Privacy policy</span>
          <h1>Your reflections should feel private.</h1>
          <p>MindGlow handles wellbeing information carefully. The goal is to support personal awareness without exposing sensitive mood, journal, or habit data to other users.</p>
        </div>
        <aside className="info-summary">
          <strong>Privacy principle</strong>
          <p>Each user can only access their own check-ins, recommendations, challenges, and assistant conversations.</p>
        </aside>
      </section>

      <section className="info-content-grid">
        <article className="info-content-card">
          <h2>Information stored</h2>
          <p>The app stores account details, daily wellness entries, challenge progress, recommendations, chat sessions, and chat messages needed for the product experience.</p>
        </article>
        <article className="info-content-card">
          <h2>How data is used</h2>
          <p>Wellbeing data is used to calculate personal indicators, show dashboard trends, generate rule-based recommendations, assign challenges, and provide context to the assistant.</p>
        </article>
        <article className="info-content-card">
          <h2>AI and API keys</h2>
          <p>The frontend does not call AI providers directly. AI-related requests are handled by the backend, and API keys should never be placed in frontend code.</p>
        </article>
      </section>
    </main>
  );
}
