import AxiosMockAdapter from "axios-mock-adapter";

import {
  mockCodeVerify,
  mockLogin,
  mockResetPassword,
  mockUpdatePassword,
} from "./auth/mock";
import {
  mockGetAlerts,
  mockGetAssets,
  mockGetCells,
  mockGetInsights,
  mockGetShops,
  mockGetVulnerabilities,
} from "./dashboard/mock";

export const createMocks = (apiClient, delayResponse = 2000) => {
  const mock = new AxiosMockAdapter(apiClient, {
    onNoMatch: "throwException",
    delayResponse,
  });

  mockLogin(mock);
  mockResetPassword(mock);
  mockUpdatePassword(mock);
  mockCodeVerify(mock);
  mockGetAssets(mock);
  mockGetShops(mock);
  mockGetCells(mock);
  mockGetVulnerabilities(mock);
  mockGetAlerts(mock);
  mockGetInsights(mock);
};
