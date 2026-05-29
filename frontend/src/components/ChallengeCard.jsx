export default function ChallengeCard({ item, onComplete }) {
  if (!item) return <section className="card">No challenge yet.</section>;
  return (
    <section className="card">
      <span className="pill">{item.challenge.category}</span>
      <h3>{item.challenge.title}</h3>
      <p>{item.challenge.description}</p>
      <p className="muted">{item.challenge.estimated_minutes} minutes · {item.challenge.difficulty}</p>
      <button className="button" disabled={item.completed} onClick={() => onComplete?.(item.challenge.id)}>
        {item.completed ? "Completed" : "Complete challenge"}
      </button>
    </section>
  );
}
