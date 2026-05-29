export function scoreTone(score) {
  if (score == null) return "neutral";
  if (score < 40) return "low";
  if (score < 60) return "medium";
  return "strong";
}
