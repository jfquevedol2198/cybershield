export const RiskLevel = {
  none: {
    order: 0,
    label: "None",
    color: "gray-1",
  },
  low: {
    order: 1,
    label: "Low",
    color: "risk-4",
  },
  medium: {
    order: 2,
    label: "Medium",
    color: "risk-3",
  },
  high: {
    order: 3,
    label: "High",
    color: "risk-2",
  },
  critical: {
    order: 4,
    label: "Critical",
    color: "risk-1",
  },
};

export const getRiskLevel = (score) => {
  if (score >= 75) return "critical";
  else if (score >= 50) return "high";
  else if (score >= 25) return "medium";
  else if (score > 0) return "low";
  else return "none";
};
