import {
  createLoginApi,
  resetPasswordApi,
  updatePasswordApi,
  verifyCodeApi,
} from "./auth";
import { assets, cells, shops, vulnerabilities } from "./dashboard";

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
  };
  return apiClient;
};
