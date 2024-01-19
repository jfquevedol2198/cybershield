import axios from "axios";

import config from "../config";

export const createServiceNowUser = async (data) => {
  try {
    const url =
      "https://windustriesdev.service-now.com/api/now/v1/table/sys_user";
    const response = axios.post(url, data, {
      auth: {
        username: config.serviceNowAuthUsername,
        password: config.serviceNowAuthPassword,
      },
    });
    console.log(response);
  } catch (error) {
    console.log(error);
  }
};
