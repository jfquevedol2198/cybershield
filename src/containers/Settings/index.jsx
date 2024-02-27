import { Outlet } from "react-router-dom";

import SettingsSidebar from "../../components/SettingsSidebar";

const Settings = () => {
  return (
    <div className="-my-8 -ml-5 flex h-full flex-row">
      <SettingsSidebar />
      <div className="flex-auto py-8 pl-10 pr-5">
        <Outlet />
      </div>
    </div>
  );
};

export default Settings;
