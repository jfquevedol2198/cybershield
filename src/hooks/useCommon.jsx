import PropTypes from "prop-types";
import { createContext, useContext, useState } from "react";

import { redirectToAuth } from "../utils";

const CommonContext = createContext({});

export const CommonProvider = ({ children }) => {
  const [showSignoutModal, setShowSignoutModal] = useState(false);
  const [sites, setSites] = useState([]);
  const onSignout = redirectToAuth;

  return (
    <CommonContext.Provider
      value={{
        showSignoutModal,
        setShowSignoutModal,
        onSignout,
        sites,
        setSites,
      }}
    >
      {children}
    </CommonContext.Provider>
  );
};

CommonProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default function useCommon() {
  return useContext(CommonContext);
}
