/**
 * redirectToAuth
 */
import { clearCookies } from "./cookies";

export const redirectToAuth = () => {
  clearCookies();
  window.location.assign(`/login`);
};
