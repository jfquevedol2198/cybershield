import { Disclosure } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import { Fragment } from "react";
import { useLocation } from "react-router-dom";

import { SIDEBAR_ITEMS } from "../../router";
import NormalButton from "../NormalButton";

const Sidebar = () => {
  const location = useLocation();
  return (
    <div className="sidebar">
      {SIDEBAR_ITEMS.map((menu) => {
        const Icon = menu.Icon;
        const isActive =
          location.pathname.indexOf(`/dashboard/${menu.path}`) === 0;
        if (menu.children && menu.children.length > 0) {
          return (
            <Fragment key={menu.path}>
              <Disclosure>
                {({ open }) => (
                  <>
                    <Disclosure.Button
                      className={clsx(
                        "flex w-full justify-between px-5 py-2 text-left text-base font-medium text-gray-1",
                        isActive ? "bg-background text-gray-4" : ""
                      )}
                    >
                      <div className="flex flex-row items-center gap-2">
                        {Icon && <Icon />}
                        {menu.title}
                      </div>
                      <ChevronUpIcon
                        className={clsx(
                          "h-5 w-5",
                          open ? "rotate-180 transform" : "",
                          isActive ? "text-primary-3" : "text-gray-1"
                        )}
                      />
                    </Disclosure.Button>
                    <Disclosure.Panel>
                      {menu.children.map((subMenu) => (
                        <NormalButton
                          key={subMenu.path}
                          href={`/dashboard/${menu.path}/${subMenu.path}`}
                        >
                          <div className="flex w-full justify-between px-5 py-2 text-left text-base font-medium text-gray-1">
                            <div className="flex flex-row items-center gap-2">
                              <div className="flex h-6 w-6 items-center justify-center">
                                {isActive &&
                                  location.pathname.indexOf(
                                    `/${subMenu.path}`
                                  ) > -1 && (
                                    <span className="h-2 w-2 rounded-full bg-background" />
                                  )}
                              </div>
                              {subMenu.title}
                            </div>
                          </div>
                        </NormalButton>
                      ))}
                    </Disclosure.Panel>
                  </>
                )}
              </Disclosure>
            </Fragment>
          );
        }
        return (
          <NormalButton key={menu.path} href={`/dashboard/${menu.path}`}>
            <div
              className={clsx(
                "flex w-full justify-between px-5 py-2 text-left text-base font-medium text-gray-1",
                isActive ? "bg-background text-gray-4" : ""
              )}
            >
              <div className="flex flex-row items-center gap-2">
                {Icon && <Icon />}
                {menu.title}
              </div>
            </div>
          </NormalButton>
        );
      })}
    </div>
  );
};

export default Sidebar;
