import {
  createLoginApi,
  resetPasswordApi,
  updatePasswordApi,
  verifyCodeApi,
} from "./auth";

export const createApiClient = (httpClient) => {
  const apiClient = {
    ...createLoginApi(httpClient),
    ...resetPasswordApi(httpClient),
    ...updatePasswordApi(httpClient),
    ...verifyCodeApi(httpClient),
  };
  return apiClient;
};
