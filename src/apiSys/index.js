import axios from "axios";

import { createUserApiClient } from "../api/apiClient";
import config from "../config";

const httpClient = axios.create({
  baseURL: config.BASE_USER_API_URL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

const userApiClient = createUserApiClient(httpClient);

export default userApiClient;
