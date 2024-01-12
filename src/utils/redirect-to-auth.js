/**
 * redirectToAuth
 */
import { Auth } from "aws-amplify";

import { clearCookies } from "./cookies";

export const redirectToAuth = async () => {
  clearCookies();
  await Auth.signOut();
  window.location.assign(`/login`);
};
