/**
 * redirectToAuth
 */
import { Auth } from "aws-amplify";

import { clearCookies } from "./cookies";

export const redirectToAuth = async () => {
  try {
    clearCookies();
    await Auth.signOut();
    window.location.assign(`/login`);
  } catch (error) {
    console.error("Error signing out", error);
  }
};
