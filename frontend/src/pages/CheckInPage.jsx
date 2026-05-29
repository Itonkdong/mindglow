import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createEntry } from "../api/wellnessApi";

const today = new Date().toISOString().slice(0, 10);
const initial = { date: today, mood: 6, stress_level: 5, anxiety_level: 5, sleep_hours: 7, sleep_quality: 6, physical_activity_minutes: 20, screen_time_hours: 4, school_pressure: 5, social_interaction_level: 6, journal_note: "" };
const sliders = [
  ["mood", "How did your mood feel today?", "1 means really low, 10 means light and positive. This helps you notice what lifts or drains you."],
  ["stress_level", "How much stress did you carry?", "Think about school, responsibilities, pressure, or tension in your body."],
  ["anxiety_level", "How anxious did you feel?", "This can include worry, racing thoughts, restlessness, or feeling on edge."],
  ["sleep_quality", "How restful was your sleep?", "Not just hours. Rate how restored, calm, or tired you felt after sleeping."],
  ["school_pressure", "How heavy did school pressure feel?", "Include homework, tests, deadlines, expectations, or concentration load."],
  ["social_interaction_level", "How connected did you feel?", "This is about feeling seen, supported, or able to talk with someone, even briefly."],
];

export default function CheckInPage() {
  const [form, setForm] = useState(initial);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const filledFields = Object.entries(form).filter(([, value]) => value !== "" && value !== null).length;

  async function submit(event) {
    event.preventDefault();
    try {
      await createEntry(form);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.date || "Could not save this check-in.");
    }
  }

  return (
    <main className="page checkin-page">
      <section className="checkin-hero">
        <div>
          <span className="eyebrow">Daily reflection</span>
          <h1>Daily check-in</h1>
          <p>Take one quiet minute to name what today felt like. There are no perfect answers here, just useful signals for your future self.</p>
        </div>
        <div className="form-progress"><span>{filledFields}/10 fields filled</span><div><i style={{ width: `${Math.min(100, (filledFields / 10) * 100)}%` }} /></div></div>
      </section>

      <form className="checkin-form" onSubmit={submit}>
        <section className="checkin-section intro-section">
          <div>
            <span className="eyebrow">When</span>
            <h2>Which day are you reflecting on?</h2>
            <p>The dashboard uses this date to connect your mood, sleep, stress, and habits over time.</p>
          </div>
          <label>Date<input type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} /></label>
        </section>

        <section className="checkin-section">
          <div className="section-copy">
            <span className="eyebrow">Feelings</span>
            <h2>Emotional weather</h2>
            <p>Use the sliders as gentle estimates. Low numbers are not bad, they just tell the app where you may need more care.</p>
          </div>
          <div className="reflection-grid">
            {sliders.map(([field, title, description]) => (
              <label className="reflection-card" key={field}>
                <span className="reflection-head"><span><b>{title}</b><small>{description}</small></span><strong>{form[field]}</strong></span>
                <input type="range" min="1" max="10" value={form[field]} onChange={(e) => setForm({ ...form, [field]: Number(e.target.value) })} />
                <span className="range-scale"><small>1 low</small><small>10 high</small></span>
              </label>
            ))}
          </div>
        </section>

        <section className="checkin-section">
          <div className="section-copy">
            <span className="eyebrow">Habits</span>
            <h2>Body and screen rhythm</h2>
            <p>These details help reveal patterns, like stress after short sleep or better mood on active days.</p>
          </div>
          <div className="input-grid habit-grid">
            <label><span>Sleep hours</span><small>About how many hours did you sleep?</small><input type="number" min="0" max="14" step="0.5" value={form.sleep_hours} onChange={(e) => setForm({ ...form, sleep_hours: e.target.value })} /></label>
            <label><span>Physical activity minutes</span><small>Walking, sports, stretching, dancing, anything that moved your body.</small><input type="number" min="0" max="300" value={form.physical_activity_minutes} onChange={(e) => setForm({ ...form, physical_activity_minutes: Number(e.target.value) })} /></label>
            <label><span>Screen time hours</span><small>Estimate total time on phone, laptop, gaming, or social media.</small><input type="number" min="0" max="16" step="0.5" value={form.screen_time_hours} onChange={(e) => setForm({ ...form, screen_time_hours: e.target.value })} /></label>
          </div>
        </section>

        <section className="checkin-section journal-section">
          <div>
            <span className="eyebrow">Optional note</span>
            <h2>Anything you want to remember?</h2>
            <p>A few words are enough. You can write what helped, what felt hard, or what you need tomorrow.</p>
          </div>
          <textarea placeholder="Example: I felt tense before the test, but walking home helped me calm down." value={form.journal_note} onChange={(e) => setForm({ ...form, journal_note: e.target.value })} />
        </section>

        {error && <p className="error">{error}</p>}
        <button className="button full checkin-submit">Save check-in</button>
      </form>
    </main>
  );
}
