import axios from "axios";

import config from "../config";
import { createUserApiClient } from "./apiClient";

const httpClient = axios.create({
  baseURL: config.BASE_USER_API_URL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

const userApiClient = createUserApiClient(httpClient);

export default userApiClient;
