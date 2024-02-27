export const users = (httpClient) => ({
  createUser(data) {
    return httpClient.post("/create_user", data);
  },
  updateUser(userId, data) {
    return httpClient.put(`/update_user/${userId}`, data);
  },
});

export const incident = (httpClient) => ({
  createIncident(data) {
    return httpClient.post("/create_incident", data);
  },
});

export const createApiClient = (httpClient) => {
  const apiClient = {
    ...users(httpClient),
    ...incident(httpClient),
  };
  return apiClient;
};
