import { useEffect, useState } from "react";
import { generateRecommendations, listRecommendations } from "../api/recommendationsApi";
import RecommendationCard from "../components/RecommendationCard.jsx";

export default function RecommendationsPage() {
  const [items, setItems] = useState([]);
  async function load() {
    const { data } = await listRecommendations();
    setItems(data);
  }
  useEffect(() => { load(); }, []);
  return (
    <main className="page recommendations-page">
      <section className="recommendations-head">
        <div>
          <span className="eyebrow">Personal guidance</span>
          <h1>Recommendations</h1>
          <p>Practical suggestions based on recent check-ins. Refresh after adding new wellbeing data.</p>
        </div>
        <button className="button outline" onClick={async () => { const { data } = await generateRecommendations(); setItems(data); }}>Refresh</button>
      </section>
      {items.length === 0 ? <section className="skeleton-grid"><div /><div /><div /></section> : <section className="recommendation-feed">{items.map((item, index) => <RecommendationCard key={item.id} item={item} index={index + 1} />)}</section>}
    </main>
  );
}
