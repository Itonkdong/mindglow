export default function TermsPage() {
  return (
    <main className="page info-page">
      <section className="info-hero">
        <div>
          <span className="eyebrow">Terms of service</span>
          <h1>Supportive tools with clear boundaries.</h1>
          <p>MindGlow is designed for self-reflection, habit building, and wellbeing support. By using it, users should understand its limits and seek real human help when needed.</p>
        </div>
        <aside className="info-summary">
          <strong>Important boundary</strong>
          <p>MindGlow is not therapy, medical advice, diagnosis, crisis intervention, or emergency support.</p>
        </aside>
      </section>

      <section className="info-content-grid">
        <article className="info-content-card">
          <h2>Appropriate use</h2>
          <p>Use MindGlow to reflect on mood, stress, anxiety, sleep, school pressure, digital balance, social connection, and small healthy habits.</p>
        </article>
        <article className="info-content-card">
          <h2>Safety</h2>
          <p>If someone is in immediate danger, feels unsafe, or is thinking about self-harm, they should contact emergency services, a trusted adult, a school counselor, or a mental health professional immediately.</p>
        </article>
        <article className="info-content-card">
          <h2>No guarantees</h2>
          <p>MindGlow provides supportive information and personal tracking. It does not guarantee health outcomes and should not replace professional care.</p>
        </article>
      </section>
    </main>
  );
}
