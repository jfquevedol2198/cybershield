export const compliance = (httpClient) => ({
  insertAnswer(data) {
    return httpClient.post("/insert_quest_user_answer/", data);
  },
  updateAnswer(data) {
    return httpClient.put("/update_quest_user_answer/", data);
  },
});

export const createApiClient = (httpClient) => {
  const apiClient = {
    ...compliance(httpClient),
  };
  return apiClient;
};
