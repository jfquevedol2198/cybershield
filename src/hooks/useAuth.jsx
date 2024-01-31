import { Auth } from "aws-amplify";
import PropTypes from "prop-types";
import { createContext, useContext, useEffect, useState } from "react";

import apiClient from "../api8000";
import {
  AUTH_TOKEN,
  getCookieValue,
  redirectToAuth,
  setCookieValue,
} from "../utils";
import snack from "../utils/snack";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [userInfo, setUserInfo] = useState({});
  const [tempUser, setTempUser] = useState(null);
  const [authToken, setAuthToken] = useState(null);
  const [configuration, setConfiguration] = useState({});

  useEffect(() => {
    if (user) {
      const token = user.signInUserSession?.accessToken?.jwtToken;
      setCookieValue(AUTH_TOKEN, token, 2, "hour");
    }
  }, [user]);

  const fetchUserInfo = async (username) => {
    try {
      const {
        data: [userInfo],
      } = await apiClient.getSysUserView(username);
      return userInfo;
    } catch (error) {
      console.log(error);
      if (error?.response?.status === 404) {
        return null;
      }
    }
    return {};
  };

  useEffect(() => {
    const fetch = async () => {
      const user = await Auth.currentUserInfo();
      if (user) {
        setUser(user);
      }
      const userInfo = await fetchUserInfo(user.username);
      if (!userInfo) {
        return redirectToAuth();
      }
      setUserInfo(userInfo);

      const {
        data: [configuration],
      } = await apiClient.getConfiguration();
      setConfiguration(configuration);
    };
    const token = getCookieValue(AUTH_TOKEN);
    setAuthToken(token);
    if (token) {
      fetch();
    } else {
      redirectToAuth();
    }
  }, []);

  const updateConfiguration = async (config) => {
    try {
      const data = {
        ...configuration,
        ...config,
      };
      delete data.account_id;
      const res = await apiClient.updateConfiguration(data);
      console.log(res);
      setConfiguration(data);
      snack.success("Configuration updated successfully");
    } catch (error) {
      snack.error("Configuration updated failed");
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        userInfo,
        configuration,
        setUser,
        tempUser,
        setTempUser,
        authToken,
        updateConfiguration,
        fetchUserInfo,
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
