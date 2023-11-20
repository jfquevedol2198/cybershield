import { Outlet } from "react-router-dom";

import Header from "../Header";
import Sidebar from "../Sidebar";

const MainLayout = () => (
  <div className="main-layout flex min-h-screen flex-col">
    <Header />
    <div className="dashboard-content flex h-full w-full flex-row">
      <Sidebar />
      <div
        className="flex-auto bg-background px-5 py-8"
        style={{ width: "calc(100vw - 256px)" }}
      >
        <Outlet />
      </div>
    </div>
  </div>
);

export default MainLayout;
