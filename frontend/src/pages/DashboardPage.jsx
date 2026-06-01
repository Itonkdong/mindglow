import { useEffect, useState } from "react";
import { Bar, BarChart, CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import ChallengeCard from "../components/ChallengeCard.jsx";
import MetricCard from "../components/MetricCard.jsx";
import RecommendationCard from "../components/RecommendationCard.jsx";
import WellnessScoreCard from "../components/WellnessScoreCard.jsx";
import { completeChallenge, todayChallenge } from "../api/challengesApi";
import { listRecommendations } from "../api/recommendationsApi";
import { getSummary } from "../api/wellnessApi";

function dashboardGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
}

export default function DashboardPage() {
  const [summary, setSummary] = useState(null);
  const [challenge, setChallenge] = useState(null);
  const [recommendations, setRecommendations] = useState([]);

  async function load() {
    const [summaryResponse, challengeResponse, recommendationResponse] = await Promise.all([getSummary(), todayChallenge(), listRecommendations()]);
    setSummary(summaryResponse.data);
    setChallenge(challengeResponse.data);
    setRecommendations(recommendationResponse.data.slice(0, 2));
  }

  useEffect(() => { load(); }, []);
  const chartData = summary?.entries_last_7_days || [];
  const greeting = dashboardGreeting();

  return (
    <main className="page">
      <div className="page-head"><h1>{greeting} 🌿</h1><p>Small patterns, clearer choices.</p></div>
      <div className="dashboard-grid">
        <WellnessScoreCard entry={summary?.latest_entry} />
        <MetricCard label="Mood avg" value={summary?.average_mood} />
        <MetricCard label="Stress avg" value={summary?.average_stress} />
        <MetricCard label="Sleep avg" value={summary?.average_sleep} suffix="h" />
      </div>
      <section className="chart-panel"><h2>Mood, stress, anxiety</h2><ResponsiveContainer height={260}><LineChart data={chartData}><CartesianGrid strokeDasharray="3 3" stroke="#E8E3DC" /><XAxis dataKey="date" stroke="#7B746D" /><YAxis domain={[0, 10]} stroke="#7B746D" /><Tooltip /><Line dataKey="mood" stroke="#1E4D35" strokeWidth={3} /><Line dataKey="stress_level" stroke="#F2A980" strokeWidth={3} /><Line dataKey="anxiety_level" stroke="#7AAB8A" strokeWidth={3} /></LineChart></ResponsiveContainer></section>
      <section className="chart-panel"><h2>Sleep and activity</h2><ResponsiveContainer height={240}><BarChart data={chartData}><CartesianGrid strokeDasharray="3 3" stroke="#E8E3DC" /><XAxis dataKey="date" stroke="#7B746D" /><YAxis stroke="#7B746D" /><Tooltip /><Bar dataKey="sleep_hours" fill="#F2D5C4" radius={[12, 12, 0, 0]} /><Bar dataKey="physical_activity_minutes" fill="#7AAB8A" radius={[12, 12, 0, 0]} /></BarChart></ResponsiveContainer></section>
      <section className="dashboard-actions">
        <article className="dashboard-action-panel">
          <div className="dashboard-action-head">
            <span className="eyebrow">Today's challenge</span>
          </div>
          <ChallengeCard item={challenge} onComplete={async (id) => { await completeChallenge(id); await load(); }} />
        </article>
        <article className="dashboard-action-panel recommendation-panel">
          <div className="dashboard-action-head">
            <span className="eyebrow">Recommendation</span>
          </div>
          {recommendations[0]
            ? <RecommendationCard item={recommendations[0]} />
            : <section className="recommendation-item empty-recommendation"><div className="recommendation-body"><p>No recommendation yet. Add a check-in to get a more useful suggestion.</p></div></section>}
        </article>
      </section>
    </main>
  );
}
