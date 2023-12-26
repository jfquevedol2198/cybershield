/**
 * redirectToAuth
 */
import { signOut } from "aws-amplify/auth";

import { clearCookies } from "./cookies";

export const redirectToAuth = async () => {
  clearCookies();
  await signOut();
  window.location.assign(`/login`);
};
