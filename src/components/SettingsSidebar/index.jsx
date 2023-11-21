import { useLocation } from "react-router-dom";

import { SETTINGS_SIDEBAR_ITEMS } from "../../router";
import NormalButton from "../NormalButton";

const SettingsSidebar = () => {
  const location = useLocation();
  return (
    <div className="w-[13.75rem] bg-white p-8">
      <div className="mb-4 text-[1.375rem] font-bold">Settings</div>
      {SETTINGS_SIDEBAR_ITEMS.map((item) => {
        const isActive = location.pathname.indexOf(item.path) > -1;
        return (
          <NormalButton
            key={item.path}
            href={`/dashboard/settings/${item.path}`}
          >
            <div className="flex w-full justify-between py-3 text-left text-base font-light text-gray-4">
              <div className="flex flex-row items-center gap-2">
                {isActive &&
                  location.pathname.indexOf(`/${item.path}`) > -1 && (
                    <span className="h-2 w-2 rounded-full bg-gray-4" />
                  )}
                <span className={isActive ? "font-bold" : ""}>
                  {item.title}
                </span>
              </div>
            </div>
          </NormalButton>
        );
      })}
    </div>
  );
};

export default SettingsSidebar;
