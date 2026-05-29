import { useEffect, useState } from "react";
import { deleteEntry, listEntries } from "../api/wellnessApi";

export default function HistoryPage() {
  const [entries, setEntries] = useState([]);
  async function load() {
    const { data } = await listEntries();
    setEntries(data);
  }
  useEffect(() => { load(); }, []);
  return (
    <main className="page">
      <h1>Check-in history</h1>
      <div className="table-wrap">
        <table>
          <thead><tr><th>Date</th><th>Mood</th><th>Stress</th><th>Anxiety</th><th>Sleep</th><th>Score</th><th></th></tr></thead>
          <tbody>{entries.map((entry) => <tr key={entry.id}><td>{entry.date}</td><td>{entry.mood}</td><td>{entry.stress_level}</td><td>{entry.anxiety_level}</td><td>{entry.sleep_hours}h</td><td>{entry.wellness_score}</td><td><button className="link-btn" onClick={async () => { await deleteEntry(entry.id); await load(); }}>Delete</button></td></tr>)}</tbody>
        </table>
      </div>
    </main>
  );
}
