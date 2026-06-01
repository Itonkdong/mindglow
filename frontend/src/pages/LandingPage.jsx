import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getSummary } from "../api/wellnessApi";
import { useAuth } from "../context/AuthContext.jsx";

export default function LandingPage() {
  const { user } = useAuth();
  const [summary, setSummary] = useState(null);

  useEffect(() => {
    if (!user) {
      setSummary(null);
      return;
    }
    getSummary().then(({ data }) => setSummary(data)).catch(() => setSummary(null));
  }, [user]);

  const latestEntry = summary?.latest_entry;
  const preview = {
    eyebrow: "Your latest wellbeing",
    score: latestEntry?.wellness_score ?? "--",
    label: latestEntry?.wellness_label || "Add a check-in to see your score",
    mood: `${((latestEntry?.mood ?? 0) / 10) * 100}%`,
    stress: `${((latestEntry?.stress_level ?? 0) / 10) * 100}%`,
    sleep: `${((latestEntry?.sleep_quality ?? 0) / 10) * 100}%`,
    note: latestEntry ? "Your dashboard turns daily reflections into patterns you can use." : "Start with today's check-in to build your first wellbeing snapshot.",
  };

  return (
    <main className="landing">
      <section className="hero">
        <div className="hero-copy">
          <span className="eyebrow">Youth wellbeing</span>
          <h1>A calmer way to understand your day.</h1>
          <p>MindGlow helps young people track mood, stress, sleep, and everyday habits, then turns those patterns into small, practical steps.</p>
          <div className="hero-actions">
            <Link className="button" to={user ? "/check-in" : "/register"}>{user ? "Check in today" : "Start tracking"}</Link>
            <Link className="button outline" to={user ? "/dashboard" : "/about"}>{user ? "View dashboard" : "Learn about MindGlow"}</Link>
          </div>
        </div>
        {user ? (
          <aside className="hero-preview" aria-label="MindGlow wellness preview">
            <div className="preview-card main">
              <span>{preview.eyebrow}</span>
              <strong>{preview.score}</strong>
              <p>{preview.label}</p>
            </div>
            <div className="preview-list">
              <div><span>Mood</span><b><i style={{ width: preview.mood }} /></b></div>
              <div><span>Stress</span><b><i style={{ width: preview.stress }} /></b></div>
              <div><span>Sleep</span><b><i style={{ width: preview.sleep }} /></b></div>
            </div>
            <p className="preview-note"><span>Daily guidance</span>{preview.note}</p>
          </aside>
        ) : (
          <aside className="hero-preview guest-preview" aria-label="MindGlow overview">
            <span className="eyebrow">How MindGlow works</span>
            <div className="guest-flow">
              <div><strong>1</strong><span>Check in once a day</span><p>Reflect on mood, stress, sleep, and habits without overthinking it.</p></div>
              <div><strong>2</strong><span>See gentle patterns</span><p>Your dashboard turns daily entries into simple trends you can understand.</p></div>
              <div><strong>3</strong><span>Get small next steps</span><p>Challenges and recommendations stay practical, warm, and manageable.</p></div>
            </div>
            <Link className="button full" to="/register">Create your private space</Link>
          </aside>
        )}
      </section>
    </main>
  );
}
