import dayjs from "dayjs";

import { AUTH_TOKEN } from "./constants";

/**
 * Get the value of a cookie by name.
 */
export const getCookieValue = (name) => {
  // const cookie = document.cookie
  //   .split(";")
  //   .find((c) => c.trim().startsWith(`${name}=`));
  // return cookie ? cookie.split("=")[1] : null;
  return window.localStorage.getItem(name) || null;
};

export const setCookieValue = (
  key,
  value,
  period = null,
  periodType = null
) => {
  // const expires = period ? dayjs().add(period, periodType).toISOString() : null;
  // document.cookie =
  //   `${key}=${value};` + (expires ? `expires=${expires};Secure` : "");
  window.localStorage.setItem(key, value);
};

export const clearCookies = () => {
  // const cookies = document.cookie.split(";");
  // for (let i = 0; i < cookies.length; i++) {
  //   const cookie = cookies[i];
  //   const eqPos = cookie.indexOf("=");
  //   const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
  //   document.cookie = name + "=; Max-Age=0";
  // }
  window.localStorage.removeItem(AUTH_TOKEN);
};
