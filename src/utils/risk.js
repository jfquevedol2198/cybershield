export const RiskLevel = {
  none: {
    order: 0,
    label: "None",
    color: "risk-5",
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
  if (score >= 7.5) return "critical";
  else if (score >= 5.0 && score < 7.5) return "high";
  else if (score >= 2.5 && score < 5.0) return "medium";
  else if (score > 0 && score < 2.5) return "low";
  else return "none";
};

export const getRiskDataByCategory = (data = [], key) =>
  data.reduce(
    (_data, v) => {
      const cveScore = v[key];
      _data[getRiskLevel(cveScore)]++;
      return _data;
    },
    { medium: 0, critical: 0, high: 0, low: 0, none: 0 }
  );
