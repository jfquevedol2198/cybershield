import { Outlet } from "react-router-dom";

import Header from "../Header";
import Sidebar from "../Sidebar";

const MainLayout = () => (
  <div className="main-layout flex min-h-screen flex-col">
    <Header />
    <div className="dashboard-content flex h-full w-full flex-row">
      <Sidebar />
      <div className="flex-1 bg-background px-5 py-8">
        <Outlet />
      </div>
    </div>
  </div>
);

export default MainLayout;
