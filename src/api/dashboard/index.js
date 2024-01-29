export const assets = (httpClient) => ({
  getAssets({ cellId }) {
    return httpClient.get(`/assets_view${cellId ? "/cell/" + cellId : ""}`);
  },
  getSiteAssets(siteId) {
    return siteId
      ? httpClient.get(`/assets/site/${siteId}`)
      : httpClient.get("/assets_view");
  },
  getAssetsView(siteId, cellId) {
    let url = "/assets_sites_view";
    if (siteId) {
      url = `${url}/${siteId}`;
      if (cellId) {
        url = `${url}/${cellId}`;
      }
    }
    return httpClient.get(url);
  },
});

export const cells = (httpClient) => ({
  getCellsOfShop({ shopId }) {
    return httpClient.get(
      `/view_cells_shopsf${shopId ? "?shop_id=" + shopId : ""}`
    );
  },
  getSiteCells(siteId) {
    return httpClient.get(`/cells_sites_view/${siteId}`);
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
  getDwAlerts() {
    return httpClient.get("/dw_alerts_view");
  },
  getAlertsView(siteId) {
    return httpClient.get(`/alerts_sites_view${siteId ? "/" + siteId : ""}`);
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

export const compliance = (httpClient) => ({
  getQuestions() {
    return httpClient.get("/questions_view");
  },
  getStatus() {
    return httpClient.get("/compliance_view");
  },
});

export const sites = (httpClient) => ({
  getSites() {
    return httpClient.get("/sites");
  },
});

export const updateDate = (httpClient) => ({
  getUpdateDate() {
    return httpClient.get("/etl_table_view");
  },
});

export const risks = (httpClient) => ({
  getRisks(siteId) {
    return httpClient.get(siteId ? `/risk_view/${siteId}` : "/risk_all_view");
  },
});
