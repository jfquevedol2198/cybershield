export const assets = (httpClient) => ({
  getAssets({ cellId }) {
    return httpClient.get(`/assets_view${cellId ? "/cell/" + cellId : ""}`);
  },
});

export const cells = (httpClient) => ({
  getCellsOfShop({ shopId }) {
    return httpClient.get(
      `/view_cells_shopsf${shopId ? "?shop_id=" + shopId : ""}`
    );
  },
  getSiteCells() {
    return httpClient.get("/cells_view");
  },
});

export const shops = (httpClient) => ({
  getShops() {
    return httpClient.get("/shops");
  },
  getSiteShops(siteId) {
    return httpClient.get(`/shops/site/${siteId}`);
  },
});

export const vulnerabilities = (httpClient) => ({
  getVulnerabilities() {
    return httpClient.get("/vulnerabilities_view");
  },
});

export const alerts = (httpClient) => ({
  getAlerts() {
    return httpClient.get("/alerts");
  },
});

export const insights = (httpClient) => ({
  getInsights() {
    return httpClient.get("/insights");
  },
});

export const incidents = (httpClient) => ({
  getIncidents() {
    return httpClient.get("/incident");
  },
});

export const users = (httpClient) => ({
  getSysUsers() {
    return httpClient.get("/sys_user");
  },
  updateSysUser(id, data) {
    return httpClient.put(`/sys_user/${id}`, data);
  },
});

export const questions = (httpClient) => ({
  getQuestions() {
    return httpClient.get("/questions_view");
  },
});

export const sites = (httpClient) => ({
  getSites() {
    return httpClient.get("/sites");
  },
});
