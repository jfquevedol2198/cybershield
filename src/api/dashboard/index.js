export const assets = (httpClient) => ({
  getAssets(data) {
    return httpClient.post(`/assets`, data);
  },
});

export const cellsOfShop = (httpClient) => ({
  getCellsOfShop({ shopId }) {
    return httpClient.get(
      `/view_cells_shopsf${shopId ? "?shop_id=" + shopId : ""}`
    );
  },
});

export const shops = (httpClient) => ({
  getShops() {
    return httpClient.get("/shops");
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

export const incidents = (httpClient) => ({
  getIncidents() {
    return httpClient.get("/incidents");
  },
});
