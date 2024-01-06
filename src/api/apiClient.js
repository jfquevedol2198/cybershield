import {
  createLoginApi,
  resetPasswordApi,
  updatePasswordApi,
  verifyCodeApi,
} from "./auth";
import {
  alerts,
  assets,
  cellsOfShop,
  incidents,
  insights,
  shops,
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
    ...cellsOfShop(httpClient),
    ...vulnerabilities(httpClient),
    ...alerts(httpClient),
    ...insights(httpClient),
    ...incidents(httpClient),
  };
  return apiClient;
};
