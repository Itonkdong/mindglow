import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createEntry } from "../api/wellnessApi";

const today = new Date().toISOString().slice(0, 10);
const initial = { date: today, mood: 6, stress_level: 5, anxiety_level: 5, sleep_hours: 7, sleep_quality: 6, physical_activity_minutes: 20, screen_time_hours: 4, school_pressure: 5, social_interaction_level: 6, journal_note: "" };
const sliders = ["mood", "stress_level", "anxiety_level", "sleep_quality", "school_pressure", "social_interaction_level"];

export default function CheckInPage() {
  const [form, setForm] = useState(initial);
  const [error, setError] = useState("");
  const navigate = useNavigate();

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
    <main className="page narrow">
      <h1>Daily check-in</h1>
      <form className="form-panel wide" onSubmit={submit}>
        <label>Date<input type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} /></label>
        {sliders.map((field) => <label key={field}>{field.replaceAll("_", " ")} <strong>{form[field]}</strong><input type="range" min="1" max="10" value={form[field]} onChange={(e) => setForm({ ...form, [field]: Number(e.target.value) })} /></label>)}
        <div className="input-grid">
          <label>Sleep hours<input type="number" min="0" max="14" step="0.5" value={form.sleep_hours} onChange={(e) => setForm({ ...form, sleep_hours: e.target.value })} /></label>
          <label>Physical activity minutes<input type="number" min="0" max="300" value={form.physical_activity_minutes} onChange={(e) => setForm({ ...form, physical_activity_minutes: Number(e.target.value) })} /></label>
          <label>Screen time hours<input type="number" min="0" max="16" step="0.5" value={form.screen_time_hours} onChange={(e) => setForm({ ...form, screen_time_hours: e.target.value })} /></label>
        </div>
        <textarea placeholder="Optional journal note" value={form.journal_note} onChange={(e) => setForm({ ...form, journal_note: e.target.value })} />
        {error && <p className="error">{error}</p>}
        <button className="button">Save check-in</button>
      </form>
    </main>
  );
}
