import axios from "axios";

import config from "../config";

export const createServiceNowUser = async (data) => {
  try {
    const url = "https://windustriesdev.service-now.com/api/now/table/sys_user";
    const response = axios.post(url, data, {
      headers: {
        Authorization:
          "Basic " +
          btoa(
            `${config.serviceNowAuthUsername}:${config.serviceNowAuthPassword}`
          ),
      },
    });

    console.log(response);
  } catch (error) {
    console.log(error);
  }
};
