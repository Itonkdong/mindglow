export default function RecommendationCard({ item }) {
  return (
    <section className="card">
      <span className={`pill ${item.priority}`}>{item.priority}</span>
      <h3>{item.title}</h3>
      <p>{item.message}</p>
      <p className="muted">{item.reason}</p>
    </section>
  );
}
