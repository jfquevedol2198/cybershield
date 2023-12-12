import { useLocation } from "react-router-dom";

import useCommon from "../../hooks/useCommon";
import { MY_ACCOUNT_SIDEBAR_ITEMS } from "../../router";
import NormalButton from "../NormalButton";

const MyAccountSidebar = () => {
  const location = useLocation();
  const { setShowSignoutModal } = useCommon();
  return (
    <div className="w-[13.75rem] bg-white p-8">
      <div className="mb-4 text-[1.375rem] font-bold">My Account</div>
      {MY_ACCOUNT_SIDEBAR_ITEMS.map(({ Icon, ...item }) => {
        const isActive = location.pathname.indexOf(item.path) > -1;
        return (
          <>
            {item.path && (
              <NormalButton
                key={item.path}
                href={`/dashboard/my-account/${item.path}`}
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
            )}
            {item.onClick && (
              <NormalButton
                key={item.onClick}
                onClick={() => {
                  if (item.onClick === "signout") {
                    setShowSignoutModal(true);
                  }
                }}
              >
                <div className="flex w-full justify-between py-3 text-left text-base font-light text-gray-4">
                  <div className="flex flex-row items-center gap-2">
                    {Icon && <Icon />}
                    <span className={isActive ? "font-bold" : ""}>
                      {item.title}
                    </span>
                  </div>
                </div>
              </NormalButton>
            )}
          </>
        );
      })}
    </div>
  );
};

export default MyAccountSidebar;
