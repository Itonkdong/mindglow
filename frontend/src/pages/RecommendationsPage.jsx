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
    <main className="page">
      <div className="page-head"><h1>Recommendations</h1><button className="button outline" onClick={async () => { const { data } = await generateRecommendations(); setItems(data); }}>Refresh</button></div>
      {items.length === 0 ? <section className="skeleton-grid"><div /><div /><div /></section> : <section className="feature-grid">{items.map((item) => <RecommendationCard key={item.id} item={item} />)}</section>}
    </main>
  );
}
