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
    // const response = axios.post(url, data, {
    //   auth,
    // });
    const response = await fetch(url, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Basic " +
          btoa(
            `${config.serviceNowAuthUsername}:${config.serviceNowAuthPassword}`
          ),
      },
      body: JSON.stringify(data), // body data type must match "Content-Type" header
    });
    const res = await response.json(); // parses JSON response into native JavaScript objects

    console.log(res);
  } catch (error) {
    console.log(error);
  }
};
