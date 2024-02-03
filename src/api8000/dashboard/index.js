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
  getVulnerabilitiesAssetView() {
    return httpClient.get("/vulnerabilities_assets_view");
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
    return httpClient.get(`/alerts_assets_cells_shops_view${siteId ? "/" + siteId : ""}`);
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

  getAssignedIncidents() {
    return httpClient.get("/assign_incidents_view");
  },
});

export const users = (httpClient) => ({
  getSysUserView(email) {
    return httpClient.get(`/sys_user_view/${email}`);
  },
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
  getComplianceStats() {
    return httpClient.get("/compliance_view");
  },
  getAnswersByUserId(userId) {
    return httpClient.get(`/answers_user/${userId}`);
  },
  getAnswersAll() {
    return httpClient.get("/answers_user");
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

export const configuration = (httpClient) => ({
  getConfiguration() {
    return httpClient.get("/configuration");
  },
  updateConfiguration(data) {
    return httpClient.put("/update_configuration/1", data);
  },
});
