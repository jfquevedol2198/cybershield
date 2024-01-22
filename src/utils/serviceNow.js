import axios from "axios";

import config from "../config";

export const createServiceNowUser = async (data) => {
  try {
    const auth = {
      username: config.serviceNowAuthUsername,
      password: config.serviceNowAuthPassword,
    };
    const url =
      // "https://windustriesdev.service-now.com/api/now/v1/table/sys_user";
      "https://windustriesdev.service-now.com/api/now/table/sys_user";
    const response = axios.post(url, data, {
      auth,
    });

    console.log(response);
  } catch (error) {
    console.log(error);
  }
};
