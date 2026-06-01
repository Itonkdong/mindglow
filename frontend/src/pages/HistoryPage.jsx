import { useEffect, useState } from "react";
import { deleteEntry, listEntries } from "../api/wellnessApi";

function formatHistoryDate(value) {
  if (!value) return "";
  return new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(`${value}T00:00:00`));
}

export default function HistoryPage() {
  const [entries, setEntries] = useState([]);
  async function load() {
    const { data } = await listEntries();
    setEntries(data);
  }
  useEffect(() => { load(); }, []);
  const averageScore = entries.length ? Math.round(entries.reduce((sum, entry) => sum + entry.wellness_score, 0) / entries.length) : null;
  const averageMood = entries.length ? (entries.reduce((sum, entry) => sum + entry.mood, 0) / entries.length).toFixed(1) : null;
  const latestEntry = entries[0];

  return (
    <main className="page history-page">
      <section className="history-hero">
        <div>
          <span className="eyebrow">Check-in history</span>
          <h1>Your reflection archive.</h1>
          <p>Look back at past check-ins as a personal wellbeing journal, not a ranking board.</p>
        </div>
        {entries.length > 0 && <div className="history-summary">
          <article><span>Entries</span><strong>{entries.length}</strong></article>
          <article><span>Avg mood</span><strong>{averageMood}</strong></article>
          <article><span>Avg score</span><strong>{averageScore}</strong></article>
          <article><span>Latest</span><strong className="date-value">{formatHistoryDate(latestEntry?.date)}</strong></article>
        </div>}
      </section>

      {entries.length === 0 ? <section className="empty-state"><span>🌱</span><h2>Start your first check-in to see your history here</h2><p>Your reflections will gather gently over time.</p></section> : <section className="history-list">
        <div className="history-section-head">
          <div>
            <span className="eyebrow">Entries</span>
            <h2>Past check-ins</h2>
          </div>
          <p>{entries.length} saved reflection{entries.length === 1 ? "" : "s"}</p>
        </div>
        {entries.map((entry) => (
          <article className="history-card" key={entry.id}>
            <div className="history-card-head">
              <div>
                <span className="eyebrow">{formatHistoryDate(entry.date)}</span>
                <h2>{entry.wellness_label || "Daily check-in"}</h2>
              </div>
              <span className={`score-badge ${entry.wellness_score >= 75 ? "high" : entry.wellness_score >= 50 ? "mid" : "low"}`}>{entry.wellness_score}</span>
            </div>
            <div className="history-metrics">
              <span>Mood <strong>{entry.mood}/10</strong></span>
              <span>Stress <strong>{entry.stress_level}/10</strong></span>
              <span>Anxiety <strong>{entry.anxiety_level}/10</strong></span>
              <span>Sleep <strong>{entry.sleep_hours}h</strong></span>
              <span>Activity <strong>{entry.physical_activity_minutes}m</strong></span>
              <span>Screen <strong>{entry.screen_time_hours}h</strong></span>
            </div>
            {entry.journal_note && <p className="history-note">{entry.journal_note}</p>}
            <button className="link-btn" onClick={async () => { await deleteEntry(entry.id); await load(); }}>Delete check-in</button>
          </article>
        ))}
      </section>}
    </main>
  );
}
