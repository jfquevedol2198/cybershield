import { Navigate } from "react-router-dom";

import { ReactComponent as AssetsIcon } from "../assets/images/assets.svg";
import { ReactComponent as ComplianceIcon } from "../assets/images/compliance.svg";
import { ReactComponent as Factory1Icon } from "../assets/images/factory1.svg";
import { ReactComponent as IncidentsIcon } from "../assets/images/incidents.svg";
import { ReactComponent as InvestigateIcon } from "../assets/images/investigate.svg";
import { ReactComponent as LogoutSvg } from "../assets/images/logout.svg";
import { ReactComponent as RiskManagementIcon } from "../assets/images/risk-management.svg";
import Error404 from "../containers/404";
import { App } from "../containers/App";
import Assets from "../containers/Assets";
import CompleteProfile from "../containers/CompleteProfile";
import Nist80082 from "../containers/Compliance/Nist80082";
import ConfirmAccount from "../containers/ConfirmAccount";
import ConfirmPassword from "../containers/ConfirmPassword";
import ForgotPassword from "../containers/ForgotPassword";
import Incidents from "../containers/Incidents";
import Alerts from "../containers/Investigate/Alerts";
import Vulnerabilities from "../containers/Investigate/Vulnerabilities";
import Login from "../containers/Login";
import AuthCodeVerify from "../containers/MFA/AuthCodeVerify";
import Scan from "../containers/MFA/Scan";
import MyAccount from "../containers/MyAccount";
import AccountInformation from "../containers/MyAccount/AccountInformation";
import ChangePassword from "../containers/MyAccount/ChangePassword";
import { Register } from "../containers/Register";
import RiskManagement from "../containers/RiskManagement";
import Settings from "../containers/Settings";
import TimeRefresh from "../containers/Settings/TimeRefresh";
import UploadLogo from "../containers/Settings/UploadLogo";
import Users from "../containers/Settings/Users";
import FactoryAssets from "../containers/Sites/Assets";
import FactoryCells from "../containers/Sites/Cells";
import FactoryShops from "../containers/Sites/Shops";
import UpdatePassword from "../containers/UpdatePassword";
import { authorizationLoader } from "./authorizationLoader";

export const SIDEBAR_ITEMS = [
  {
    path: "risk-management",
    title: "Risk Management",
    Icon: RiskManagementIcon,
    Component: RiskManagement,
  },
  {
    path: "site/:siteId",
    isSite: true,
    Icon: Factory1Icon,
    children: [
      {
        path: "site-dashboard",
        title: "Site Dashboard",
        Component: RiskManagement,
      },
      {
        path: "shops",
        title: "Shops",
        Component: FactoryShops,
      },
      {
        path: "cells",
        title: "Cells",
        Component: FactoryCells,
      },
      {
        path: "assets",
        title: "Assets",
        Component: FactoryAssets,
      },
    ],
  },
  {
    path: "investigate",
    title: "Investigate",
    Icon: InvestigateIcon,
    children: [
      {
        path: "alerts",
        title: "Alerts",
        Component: Alerts,
      },
      // {
      //   path: "insights",
      //   title: "Insights",
      //   Component: Insights,
      // },
      {
        path: "vulnerabilities",
        title: "Vulnerabilities",
        Component: Vulnerabilities,
      },
    ],
  },
  {
    path: "assets",
    title: "Assets",
    Component: Assets,
    Icon: AssetsIcon,
  },
  {
    path: "incidents",
    title: "Incidents",
    Icon: IncidentsIcon,
    Component: Incidents,
  },
  {
    path: "compliance",
    title: "Compliance",
    Icon: ComplianceIcon,
    children: [
      {
        path: "nist-800-82",
        title: "NIST 800-82",
        Component: Nist80082,
      },
    ],
  },
  // {
  //   path: "secure-remote-management",
  //   title: "Secure Remote Management",
  //   Icon: SecureRemoteManagementIcon,
  //   Component: Template,
  // },
];

export const SETTINGS_SIDEBAR_ITEMS = [
  {
    path: "time-refresh",
    title: "Time refresh",
    Component: TimeRefresh,
  },
  {
    path: "upload-logo",
    title: "Organization Logo",
    Component: UploadLogo,
  },
  {
    path: "users",
    title: "Users",
    Component: Users,
  },
];

export const MY_ACCOUNT_SIDEBAR_ITEMS = [
  {
    path: "account-information",
    title: "Account Information",
    Component: AccountInformation,
  },
  {
    path: "change-password",
    title: "New Password",
    Component: ChangePassword,
  },
  {
    title: "Sign out",
    Component: TimeRefresh,
    Icon: LogoutSvg,
    onClick: "signout",
  },
];

export const createRoutes = () => [
  {
    path: "/",
    element: <Navigate to="/login" replace={true} />,
  },
  {
    path: "/login",
    Component: Login,
  },
  {
    path: "/register",
    Component: Register,
  },
  {
    path: "/forgot-password",
    Component: ForgotPassword,
  },
  {
    path: "/reset-password",
    Component: UpdatePassword,
  },
  {
    path: "/confirm-password",
    Component: ConfirmPassword,
  },
  {
    path: "/confirm-account",
    Component: ConfirmAccount,
  },
  {
    path: "/complete-profile",
    Component: CompleteProfile,
  },
  {
    path: "/mfa/scan",
    Component: Scan,
  },
  {
    path: "/mfa/auth-code-verify",
    Component: AuthCodeVerify,
  },
  {
    path: "/dashboard",
    loader: authorizationLoader(),
    Component: App,
    children: [
      {
        index: true,
        element: <Navigate to="/dashboard/risk-management" replace={true} />,
      },
      ...SIDEBAR_ITEMS.map((item) => ({
        path: `/dashboard/${item.path}`,
        Component: item.Component,
        children: item.children?.length
          ? item.children.map((subItem) => ({
              path: `/dashboard/${item.path}/${subItem.path}`,
              Component: subItem.Component,
            }))
          : undefined,
      })),
      {
        path: "/dashboard/settings",
        Component: Settings,
        children: SETTINGS_SIDEBAR_ITEMS.map((item) => ({
          path: `/dashboard/settings/${item.path}`,
          Component: item.Component,
        })),
      },
      {
        path: "/dashboard/my-account",
        Component: MyAccount,
        children: MY_ACCOUNT_SIDEBAR_ITEMS.map((item) => ({
          path: `/dashboard/my-account/${item.path}`,
          Component: item.Component,
        })),
      },
    ],
  },
  {
    path: "*",
    Component: Error404,
  },
];
