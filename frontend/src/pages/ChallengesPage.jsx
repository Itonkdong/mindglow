import { useEffect, useState } from "react";
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
    <main className="page">
      <div className="page-head"><h1>Challenges</h1><p>{completed} completed so far</p></div>
      <div className="challenge-progress"><span>Challenge progress</span><div><i style={{ width: `${progress}%` }} /></div></div>
      <ChallengeCard item={today} onComplete={async (id) => { await completeChallenge(id); await load(); }} />
      <section className="list">{history.map((item) => <article className="row-card" key={item.id}><span>{item.assigned_date}</span><strong>{item.challenge.title}</strong><span>{item.completed ? "Completed" : "Open"}</span></article>)}</section>
    </main>
  );
}
