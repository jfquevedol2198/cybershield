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
  compliance,
  configuration,
  incidents,
  insights,
  risks,
  shops,
  sites,
  updateDate,
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
    ...compliance(httpClient),
    ...sites(httpClient),
    ...updateDate(httpClient),
    ...risks(httpClient),
    ...configuration(httpClient),
  };
  return apiClient;
};
