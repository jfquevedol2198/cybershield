import { Auth } from "aws-amplify";
import PropTypes from "prop-types";
import { createContext, useContext, useEffect, useState } from "react";

import apiClient from "../api";
import {
  AUTH_TOKEN,
  getCookieValue,
  redirectToAuth,
  setCookieValue,
} from "../utils";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [userInfo, setUserInfo] = useState({});
  const [tempUser, setTempUser] = useState(null);
  const [authToken, setAuthToken] = useState(null);

  useEffect(() => {
    if (user) {
      const token = user.signInUserSession?.accessToken?.jwtToken;
      setCookieValue(AUTH_TOKEN, token, 2, "hour");
    }
  }, [user]);

  useEffect(() => {
    const fetch = async () => {
      const user = await Auth.currentUserInfo();
      if (user) {
        setUser(user);
      }
      const {
        data: [userInfo],
      } = await apiClient.getSysUserView(user.username);
      setUserInfo(userInfo);
    };
    const token = getCookieValue(AUTH_TOKEN);
    setAuthToken(token);
    if (token) {
      fetch();
    } else {
      redirectToAuth();
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        userInfo,
        setUser,
        tempUser,
        setTempUser,
        authToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default function useAuth() {
  return useContext(AuthContext);
}
