import { useEffect, useState } from "react";
import { Bar, BarChart, CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import ChallengeCard from "../components/ChallengeCard.jsx";
import MetricCard from "../components/MetricCard.jsx";
import RecommendationCard from "../components/RecommendationCard.jsx";
import WellnessScoreCard from "../components/WellnessScoreCard.jsx";
import { completeChallenge, todayChallenge } from "../api/challengesApi";
import { listRecommendations } from "../api/recommendationsApi";
import { getSummary } from "../api/wellnessApi";

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

  return (
    <main className="page">
      <div className="page-head"><h1>Your dashboard</h1><p>Small patterns, clearer choices.</p></div>
      <div className="dashboard-grid">
        <WellnessScoreCard entry={summary?.latest_entry} />
        <MetricCard label="Mood avg" value={summary?.average_mood} />
        <MetricCard label="Stress avg" value={summary?.average_stress} />
        <MetricCard label="Sleep avg" value={summary?.average_sleep} suffix="h" />
      </div>
      <section className="chart-panel"><h2>Mood, stress, anxiety</h2><ResponsiveContainer height={260}><LineChart data={chartData}><CartesianGrid strokeDasharray="3 3" /><XAxis dataKey="date" /><YAxis domain={[0, 10]} /><Tooltip /><Line dataKey="mood" stroke="#2f855a" /><Line dataKey="stress_level" stroke="#d97706" /><Line dataKey="anxiety_level" stroke="#805ad5" /></LineChart></ResponsiveContainer></section>
      <section className="chart-panel"><h2>Sleep and activity</h2><ResponsiveContainer height={240}><BarChart data={chartData}><CartesianGrid strokeDasharray="3 3" /><XAxis dataKey="date" /><YAxis /><Tooltip /><Bar dataKey="sleep_hours" fill="#3182ce" /><Bar dataKey="physical_activity_minutes" fill="#38a169" /></BarChart></ResponsiveContainer></section>
      <div className="split"><ChallengeCard item={challenge} onComplete={async (id) => { await completeChallenge(id); await load(); }} /><div>{recommendations.map((item) => <RecommendationCard key={item.id} item={item} />)}</div></div>
    </main>
  );
}
