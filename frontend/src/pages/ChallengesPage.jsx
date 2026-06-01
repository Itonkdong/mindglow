import { useEffect, useState } from "react";
import { Info } from "lucide-react";
import { challengeHistory, completeChallenge, todayChallenge } from "../api/challengesApi";
import ChallengeCard from "../components/ChallengeCard.jsx";

export default function ChallengesPage() {
  const [today, setToday] = useState(null);
  const [history, setHistory] = useState([]);
  async function load() {
    const [todayResponse, historyResponse] = await Promise.all([todayChallenge(), challengeHistory()]);
    setToday(todayResponse.data);
    setHistory(historyResponse.data);
  }
  useEffect(() => { load(); }, []);
  const completed = history.filter((item) => item.completed).length;
  const progress = history.length ? Math.round((completed / history.length) * 100) : 0;
  return (
    <main className="page challenges-page">
      <section className="challenge-board-head">
        <div>
          <span className="eyebrow">Daily practice</span>
          <h1>Challenges</h1>
          <p>Small actions for stress, sleep, movement, confidence, and connection.</p>
        </div>
        <div className="head-actions">
          <details className="info-popover">
            <summary aria-label="How challenges work"><Info size={18} /></summary>
            <p>You get one challenge each day. Completing it adds it to your progress, and a new one appears on the next day.</p>
          </details>
          <div className="challenge-ring" style={{ "--progress": `${progress}%` }}>
            <strong>{completed}</strong>
            <span>completed</span>
          </div>
        </div>
      </section>

      <section className="challenge-board">
        <div className="today-column">
          <div className="section-kicker">Today</div>
          <ChallengeCard item={today} onComplete={async (id) => { await completeChallenge(id); await load(); }} />
        </div>
        <aside className="challenge-history-panel">
          <div className="challenge-progress compact"><span>{progress}% progress</span><div><i style={{ width: `${progress}%` }} /></div></div>
          <div className="section-kicker">Recent assignments</div>
          <section className="challenge-timeline">{history.map((item) => <article className={item.completed ? "timeline-item done" : "timeline-item"} key={item.id}><span>{item.completed ? "Done" : "Open"}</span><strong>{item.challenge.title}</strong><small>{item.assigned_date}</small></article>)}</section>
        </aside>
      </section>
    </main>
  );
}
