export const assets = (httpClient) => ({
  getAssets(data) {
    return httpClient.post(`/assets`, data);
  },
});

export const cells = (httpClient) => ({
  getCells(data) {
    return httpClient.post("/cells", data);
  },
});

export const shops = (httpClient) => ({
  getShops(data) {
    return httpClient.post("/shops", data);
  },
});

export const vulnerabilities = (httpClient) => ({
  getVulnerabilities() {
    return httpClient.get("/vulnerabilities");
  },
});

export const alerts = (httpClient) => ({
  getAlerts() {
    return httpClient.post("/alerts");
  },
});

export const insights = (httpClient) => ({
  getInsights() {
    return httpClient.get("/insights");
  },
});
