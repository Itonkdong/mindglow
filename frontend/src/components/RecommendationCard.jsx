export default function RecommendationCard({ item, index }) {
  return (
    <section className="recommendation-item">
      <div className="recommendation-number">{index ?? "•"}</div>
      <div className="recommendation-body">
        <div className="recommendation-topline">
          <span>{item.category}</span>
          <span className={`pill ${item.priority}`}>{item.priority}</span>
        </div>
        <h3>{item.title}</h3>
        <p>{item.message}</p>
        <small>{item.reason}</small>
      </div>
    </section>
  );
}
