export default function MetricCard({ label, value, suffix = "" }) {
  return <section className="metric"><span>{label}</span><strong>{value ?? "--"}{value != null ? suffix : ""}</strong></section>;
}
