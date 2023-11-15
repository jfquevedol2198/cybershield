import { Navigate } from "react-router-dom";

import { ReactComponent as AssetsIcon } from "../assets/images/assets.svg";
import { ReactComponent as ComplianceIcon } from "../assets/images/compliance.svg";
import { ReactComponent as Factory1Icon } from "../assets/images/factory1.svg";
import { ReactComponent as IncidentsIcon } from "../assets/images/incidents.svg";
import { ReactComponent as InvestigateIcon } from "../assets/images/investigate.svg";
import { ReactComponent as RiskManagementIcon } from "../assets/images/risk-management.svg";
import { ReactComponent as SecureRemoteManagementIcon } from "../assets/images/secure-remote-management.svg";
import Error404 from "../containers/404";
import { App } from "../containers/App";
import ForgotPassword from "../containers/ForgotPassword";
import Login from "../containers/Login";
import AuthCodeVerify from "../containers/MFA/AuthCodeVerify";
import Scan from "../containers/MFA/Scan";
import { Register } from "../containers/Register";
import RiskManagement from "../containers/RiskManagement";
import Template from "../containers/Template";
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
    path: "compliance",
    title: "Compliance",
    Icon: ComplianceIcon,
    Component: Template,
  },
  {
    path: "factory-1",
    title: "Factory 1",
    Icon: Factory1Icon,
    Component: Template,
    children: [
      {
        path: "site-dashboard",
        title: "Site Dashboard",
        Component: Template,
      },
      {
        path: "shops",
        title: "Shops",
        Component: Template,
      },
      {
        path: "cells",
        title: "Cells",
        Component: Template,
      },
      {
        path: "assets",
        title: "Assets",
        Component: Template,
      },
    ],
  },
  {
    path: "investigate",
    title: "Investigate",
    Icon: InvestigateIcon,
    Component: Template,
    children: [
      {
        path: "alerts",
        title: "Alerts",
        Component: Template,
      },
      {
        path: "insights",
        title: "Insights",
        Component: Template,
      },
      {
        path: "vulnerabilities",
        title: "Vulnerabilities",
        Component: Template,
      },
    ],
  },
  {
    path: "assets",
    title: "Assets",
    Component: Template,
    Icon: AssetsIcon,
  },
  {
    path: "incidents",
    title: "Incidents",
    Icon: IncidentsIcon,
    Component: Template,
  },
  {
    path: "secure-remote-management",
    title: "Secure Remote Management",
    Icon: SecureRemoteManagementIcon,
    Component: Template,
  },
];

export const createRoutes = () => [
  {
    path: "/",
    element: <Navigate to="/dashboard/risk-management" replace={true} />,
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
    ],
  },
  {
    path: "*",
    Component: Error404,
  },
];
