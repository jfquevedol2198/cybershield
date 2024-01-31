import axios from "axios";

import { createApiClient } from "../api8080/apiClient";
import config from "../config";

const httpClient = axios.create({
  baseURL: config.BASE_API_URL_8080,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

const apiClient8080 = createApiClient(httpClient);

export default apiClient8080;
