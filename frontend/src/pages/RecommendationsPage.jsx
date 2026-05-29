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
      <div className="page-head"><h1>Recommendations</h1><button className="button" onClick={async () => { const { data } = await generateRecommendations(); setItems(data); }}>Refresh</button></div>
      <section className="feature-grid">{items.map((item) => <RecommendationCard key={item.id} item={item} />)}</section>
    </main>
  );
}
