import clsx from "clsx";
import { Outlet, useLocation } from "react-router-dom";

import { CommonProvider } from "../../hooks/useCommon";
import Header from "../Header";
import Sidebar from "../Sidebar";
import SignoutModal from "../SignoutModal";

const MainLayout = () => {
  const location = useLocation();

  return (
    <CommonProvider>
      <div className="main-layout flex min-h-screen flex-col">
        <Header />
        <div className="dashboard-content flex h-full w-full flex-row">
          <Sidebar />
          <div
            className={clsx(
              "flex-auto overflow-y-auto bg-background",
              location.pathname.indexOf("compliance") === -1 && "px-5 py-8"
            )}
            style={{
              width: "calc(100vw - 256px)",
              height: "calc(100vh - 52px)",
            }}
          >
            <Outlet />
          </div>
        </div>
        <SignoutModal />
      </div>
    </CommonProvider>
  );
};

export default MainLayout;
