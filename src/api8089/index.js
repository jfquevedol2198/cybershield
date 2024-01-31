import axios from "axios";

import { createApiClient } from "../api8089/apiClient";
import config from "../config";

const httpClient = axios.create({
  baseURL: config.BASE_API_URL_8089,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

const apiClient8089 = createApiClient(httpClient);

export default apiClient8089;
