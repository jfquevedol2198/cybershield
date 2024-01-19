import axios from "axios";

import config from "../config";
import { createApiClient } from "./apiClient";
import { createMocks } from "./mock";

const httpClient = axios.create({
  baseURL: config.BASE_API_URL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

const apiClient = createApiClient(httpClient);
if (config.isMockEnabled) {
  createMocks(httpClient);
}

export default apiClient;
