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
    const endpoint = siteId ? `/alerts_assets_cells_shops_view/${siteId}` : "/alerts_assets_cells_shops_view";
    return httpClient.get(endpoint);
  },
  getAlertById(alertId) {
    return httpClient.get(`/alerts/${alertId}`);
  }

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
    const endpoint = siteId ? `/risk_view/${siteId}` : "/risk_all_view";
    return httpClient.get(`${endpoint}`);
  },

  getRiskOverTime(siteId) {
    const endpoint = siteId ? "/historical_risk_view" : "/sum_risk_by_date";
    return httpClient.get(`${endpoint}`);
  }
});

export const configuration = (httpClient) => ({
  getConfiguration() {
    return httpClient.get("/configuration");
  },
  updateConfiguration(data) {
    return httpClient.put("/update_configuration/1", data);
  },
});

export const managers = (httpClient) => ({
  getManagers() {
    return httpClient.get("/sys_user_manager_view");
  },
});
