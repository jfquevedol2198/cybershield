import AxiosMockAdapter from "axios-mock-adapter";

import {
  mockCodeVerify,
  mockLogin,
  mockResetPassword,
  mockUpdatePassword,
} from "./auth/mock";

export const createMocks = (apiClient, delayResponse = 2000) => {
  const mock = new AxiosMockAdapter(apiClient, {
    onNoMatch: "throwException",
    delayResponse,
  });

  mockLogin(mock);
  mockResetPassword(mock);
  mockUpdatePassword(mock);
  mockCodeVerify(mock);
};
