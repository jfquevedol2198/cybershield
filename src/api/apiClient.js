import {
  createLoginApi,
  resetPasswordApi,
  updatePasswordApi,
  verifyCodeApi,
} from "./auth";
import {
  alerts,
  assets,
  cells,
  incidents,
  insights,
  questions,
  shops,
  users,
  vulnerabilities,
} from "./dashboard";

export const createApiClient = (httpClient) => {
  const apiClient = {
    ...createLoginApi(httpClient),
    ...resetPasswordApi(httpClient),
    ...updatePasswordApi(httpClient),
    ...verifyCodeApi(httpClient),
    ...assets(httpClient),
    ...shops(httpClient),
    ...cells(httpClient),
    ...vulnerabilities(httpClient),
    ...alerts(httpClient),
    ...insights(httpClient),
    ...incidents(httpClient),
    ...users(httpClient),
    ...questions(httpClient),
  };
  return apiClient;
};
