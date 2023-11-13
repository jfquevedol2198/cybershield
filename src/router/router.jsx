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
import Template from "../containers/Template";
import UpdatePassword from "../containers/UpdatePassword";
import { authorizationLoader } from "./authorizationLoader";

export const SIDEBAR_ITEMS = [
  {
    path: "risk-management",
    title: "Risk Management",
    Icon: RiskManagementIcon,
    Component: Template,
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
    children: [],
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
    path: "/",
    loader: authorizationLoader(),
    Component: App,
    children: SIDEBAR_ITEMS.map((item) => ({
      path: `/${item.path}`,
      Component: item.Component,
      children: item.children?.length
        ? item.children.map((subItem) => ({
            path: `/${item.path}/${subItem.path}`,
            Component: subItem.Component,
          }))
        : undefined,
    })),
  },
  {
    path: "*",
    Component: Error404,
  },
];
