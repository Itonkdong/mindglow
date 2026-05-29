export default function WellnessScoreCard({ entry }) {
  const score = entry?.wellness_score ?? "--";
  return (
    <section className="score-panel">
      <p>Wellbeing indicator</p>
      <strong>{score}</strong>
      <span>{entry?.wellness_label || "Add a check-in to see your score"}</span>
    </section>
  );
}
