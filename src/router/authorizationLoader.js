import { AUTH_TOKEN, getCookieValue, redirectToAuth } from "../utils";

export const authorizationLoader = () => async () => {
  const cookie = getCookieValue(AUTH_TOKEN);
  if (!cookie) {
    redirectToAuth();
    return false;
  }
  return true;
};
