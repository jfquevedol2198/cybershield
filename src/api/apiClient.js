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
  sites,
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
    ...sites(httpClient),
  };
  return apiClient;
};

export const createUserApiClient = (httpClient) => {
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
    ...sites(httpClient),
  };
  return apiClient;
};
