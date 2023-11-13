export const createLoginApi = (httpClient) => ({
  login(data) {
    return httpClient.post("/login", data);
  },
});

export const resetPasswordApi = (httpClient) => ({
  resetPassword(data) {
    return httpClient.post("/forgot-password", data);
  },
});

export const updatePasswordApi = (httpClient) => ({
  updatePassword(data) {
    return httpClient.post("/reset-password", data);
  },
});

export const verifyCodeApi = (httpClient) => ({
  verifyCode(code) {
    return httpClient.get(`/verify-code?code=${code}`);
  },
});
