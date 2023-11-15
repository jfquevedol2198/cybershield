export const RiskLevel = {
  low: {
    label: "low",
    color: "risk-4",
  },
  medium: {
    label: "medium",
    color: "risk-3",
  },
  high: {
    label: "high",
    color: "risk-2",
  },
  critical: {
    label: "critical",
    color: "risk-1",
  },
  none: {
    label: "none",
    color: "gray-1",
  },
};

export const getRiskLevel = (score) => {
  if (score >= 75) return "critical";
  else if (score >= 50) return "high";
  else if (score >= 25) return "medium";
  else if (score > 0) return "low";
  else return "none";
};
